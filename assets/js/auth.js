// Autenticación con localStorage (sin backend, solo para este proyecto estático)

const USERS_KEY = 'animesuge_users';
const SESSION_KEY = 'animesuge_session';

document.addEventListener('DOMContentLoaded', () => {
  renderAuthState();
  initRegisterForm();
  initLoginForm();
});

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function getSessionEmail() {
  return localStorage.getItem(SESSION_KEY);
}

function setSessionEmail(email) {
  localStorage.setItem(SESSION_KEY, email);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// SubtleCrypto solo está disponible en contextos seguros (https/localhost);
// si no lo está (p. ej. abriendo el HTML directamente con file://) usamos
// un hash simple de respaldo. Ninguno de los dos es seguridad real: es un
// proyecto sin backend, las contraseñas terminan en el localStorage del navegador.
async function hashPassword(password) {
  if (window.isSecureContext && window.crypto?.subtle) {
    const data = new TextEncoder().encode(password);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  return `fallback_${simpleHash(password)}`;
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Header: muestra Sign Up/Login o el usuario ya conectado
function renderAuthState() {
  const area = document.getElementById('auth-area');
  if (!area) return;

  const email = getSessionEmail();
  const user = email ? findUserByEmail(email) : null;

  if (user) {
    area.innerHTML = `
      <span class="welcome-user">Hi, ${escapeHtml(user.name)}</span>
      <button type="button" class="signup logout-btn" id="logout-btn">Log Out</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => {
      clearSession();
      renderAuthState();
    });
  } else {
    area.innerHTML = `
      <a href="login.html" class="user-icon-link" aria-label="Log in">
        <img src="assets/images/usuario.png" alt="User" class="user-icon">
      </a>
      <a href="registro.html" class="signup">Sign Up</a>
    `;
  }
}

function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  const errorEl = document.getElementById('register-error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      errorEl.textContent = 'Please fill in all fields.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorEl.textContent = 'Enter a valid email address.';
      return;
    }
    if (password.length < 6) {
      errorEl.textContent = 'Password must be at least 6 characters.';
      return;
    }
    if (password !== confirmPassword) {
      errorEl.textContent = 'Passwords do not match.';
      return;
    }
    if (findUserByEmail(email)) {
      errorEl.textContent = 'An account with this email already exists.';
      return;
    }

    const passwordHash = await hashPassword(password);
    const users = getUsers();
    users.push({ name, email, passwordHash });
    saveUsers(users);
    setSessionEmail(email);
    window.location.href = 'index.html';
  });
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const errorEl = document.getElementById('login-error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.textContent = '';

    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    const user = findUserByEmail(email);
    if (!user) {
      errorEl.textContent = 'No account found with that email.';
      return;
    }

    const passwordHash = await hashPassword(password);
    if (passwordHash !== user.passwordHash) {
      errorEl.textContent = 'Incorrect password.';
      return;
    }

    setSessionEmail(email);
    window.location.href = 'index.html';
  });
}
