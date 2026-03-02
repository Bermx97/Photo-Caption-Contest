document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('form');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch(`/caption/${data.image_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Succeed', result);
      window.location.reload();
    } else if (response.status === 401) {
      const errorMessage = await response.json();
      const error = document.getElementById('error');
      error.textContent = errorMessage.error || 'Please log in to post a comment.';
    } else if (response.status === 400) {
      const result = await response.json();
      result.errors.forEach(err => {
        const error = document.getElementById('error');
        error.textContent = err.msg;
      });
    } else {
      console.error('error:', response.status, response.statusText);
    }
  });

  document.querySelectorAll('.like-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      likeComment(id);
    });
  });

  async function likeComment(captionId) {
    const btn = document.querySelector(`.like-button[data-id="${captionId}"]`);
    const countSpan = document.getElementById(`like-count-${captionId}`);
    try {
      const response = await fetch(`/likes/${captionId}`, { method: 'POST', credentials: 'include' });
      if (response.status === 401) {
        alert("You must be logged in to like this caption");
        return;
      }
      if (response.status === 400) {
        const data = await response.json();
        alert(data.error || "You already liked this caption");
        return;
      }
      if (!response.ok) {
        alert("something went wrong");
        return;
      }
      if (btn) {
        btn.classList.add('liked');
        setTimeout(() => btn.classList.remove('liked'), 500);
      }
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
      localStorage.setItem(`liked-${captionId}`, "true");
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const editModal = document.getElementById('editModal');
  const editBackdrop = document.getElementById('modalBackdrop');
  const editInput = document.getElementById('modalInput');
  const editForm = document.getElementById('modalForm');
  const editCancelBtn = document.getElementById('cancelModal');
  let currentEditId = null;

  document.querySelectorAll('.edit-button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentEditId = btn.dataset.id;
      const p = btn.closest('p');
      const textSpan = p.querySelector('.caption-text');
      const text = textSpan ? textSpan.textContent : '';
      editInput.value = text.trim();
      editModal.classList.add('show');
      editBackdrop.classList.add('show');
      editInput.focus();
    });
  });

  editCancelBtn.addEventListener('click', () => {
    editModal.classList.remove('show');
    editBackdrop.classList.remove('show');
    currentEditId = null;
  });

  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentEditId) return;
    try {
      const response = await fetch(`/caption/${currentEditId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newcaption: editInput.value, id: currentEditId })
      });
      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });

  const deleteModal = document.getElementById('deleteModal');
  const deleteBackdrop = document.getElementById('deleteBackdrop');
  const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
  const deleteCancelBtn = document.getElementById('deleteCancelBtn');
  let currentDeleteId = null;

  function openDeleteModal(captionId) {
    currentDeleteId = captionId;
    deleteModal.classList.add('show');
    deleteBackdrop.classList.add('show');
  }

  function closeDeleteModal() {
    deleteModal.classList.remove('show');
    deleteBackdrop.classList.remove('show');
    currentDeleteId = null;
  }

  document.querySelectorAll('.delete-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const captionId = btn.dataset.id;
      openDeleteModal(captionId);
    });
  });

  deleteConfirmBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentDeleteId) return;
    try {
      const response = await fetch(`/caption/${currentDeleteId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        closeDeleteModal();
        window.location.reload();
      } else {
        alert('Could not delete comment');
        closeDeleteModal();
      }
    } catch (err) {
      console.error(err);
      closeDeleteModal();
    }
  });

  deleteCancelBtn.addEventListener('click', () => {
    closeDeleteModal();
  });

  deleteBackdrop.addEventListener('click', () => {
    closeDeleteModal();
  });
});
