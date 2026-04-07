const editNicknameBtn = document.getElementById('edit-nickname');
const editPasswordBtn = document.getElementById('edit-password');
const modal = document.getElementById('nickname-modal');
const backdrop = document.getElementById('modalBackdrop');
const form = document.getElementById('nickname-form');

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

editNicknameBtn.addEventListener('click', () => openModal('nickname'));
editPasswordBtn.addEventListener('click', () => openModal('password'));
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let url = '';
  let body = {};

  if (currentAction === 'nickname') {
    url = '/user/edit-nickname';
    body = { value: document.getElementById('modalInput').value };
  } else if (currentAction === 'password') {
    url = '/user/edit-password';
    body = {
      currentPassword: document.getElementById('currentPassword').value,
      newPassword: document.getElementById('newPassword').value
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      if (currentAction === 'nickname') {
        document.getElementById('user-nickname').textContent = body.value;
      }
      closeModal();
    }
  } catch (err) {
    console.error(err);
  }
});