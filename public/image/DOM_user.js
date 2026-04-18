const editNicknameBtn = document.getElementById('edit-nickname');
const editPasswordBtn = document.getElementById('edit-password');
const modal = document.getElementById('nickname-modal');
const backdrop = document.getElementById('modalBackdrop');
const form = document.getElementById('nickname-form');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancelBtn');

if (modal) modal.classList.add('show');
if (backdrop) backdrop.classList.add('show');
if (modal) modal.classList.remove('show');
if (backdrop) backdrop.classList.remove('show');

if (editNicknameBtn) {
  editNicknameBtn.addEventListener('click', () => openModal('nickname'));
}

if (editPasswordBtn) {
  editPasswordBtn.addEventListener('click', () => openModal('password'));
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeModal);
}

if (backdrop) {
  backdrop.addEventListener('click', closeModal);
}

let currentAction = null;

function openModal(action) {
  currentAction = action;

  if (action === 'nickname') {
    document.querySelector('.nickname-field').style.display = 'block';
    document.querySelectorAll('.password-field').forEach(f => f.style.display = 'none');
    document.getElementById('modalInput').value = '';
  } else if (action === 'password') {
    document.querySelector('.nickname-field').style.display = 'none';
    document.querySelectorAll('.password-field').forEach(f => f.style.display = 'block');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
  }

  modal.classList.add('show');
  backdrop.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  backdrop.classList.remove('show');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let url = '';
  let body = {};

  if (currentAction === 'nickname') {
    url = '/user/edit-nickname';
    body = { newNickname: document.getElementById('modalInput').value };
  } else if (currentAction === 'password') {
    url = '/user/edit-password';
    body = {
      currentPassword: document.getElementById('currentPassword').value,
      newPassword: document.getElementById('newPassword').value
    };
  }

  try {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const successMessageEl = document.getElementById('success-form-message');
  const errorMessageEl = document.getElementById('error-form-message');

  if (response.ok) {
    const data = await response.json();
    successMessageEl.textContent = 'Updated successfully';
    successMessageEl.style.color = '#4CAF50';


    if (currentAction === 'nickname') {
      document.getElementById('username').textContent = data.nickname;
    }
    closeModal();
  } else {
    const errorData = await response.json();
    document.getElementById('error-form-message').textContent = errorData.message;
    errorMessageEl.style.color = '#ff6b6b';
  }
} catch (err) {
  console.error(err);
  document.getElementById('error-form-message').textContent = 'Server error';
  errorMessageEl.style.color = '#ff6b6b';
} 
});

const input = document.getElementById('search');
const results = document.getElementById('results');

if (input && results) {
  input.addEventListener('input', async () => {
    const query = input.value;

    if (!query) {
      results.innerHTML = '';
      return;
    }

    const res = await fetch(`/user/search?username=${encodeURIComponent(query)}`);
    const data = await res.json();
    const users = data.users || data;

    results.innerHTML = users
      .map(user => `
        <li>
          <a href="/user/${user.username}">${user.username}</a>
        </li>
      `)
      .join('');
  });
}