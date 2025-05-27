document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  const response = await fetch(`/caption/${data.image_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const result = await response.text();
    console.log('Succeed', result);
    window.location.reload();
  } else if (response.status === 401) {
    const errorMessage = await response.json();
    const error = document.getElementById('error')
    error.textContent = errorMessage.error || 'Please log in to post a comment.'
  } else if (response.status === 400) {
    const result = await response.json();
    result.errors.forEach(err => {
      const error = document.getElementById('error');
      error.textContent = err.msg;
    });
  }
    else {
    console.error('error:', response.status, response.statusText);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.like-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      likeComment(id);
    });
  });
});

async function likeComment(captionId) {
  const btn = document.querySelector(`.like-button[data-id="${captionId}"]`);
  const countSpan = document.getElementById(`like-count-${captionId}`);
  try {
    const response = await fetch(`/like/${captionId}`, { method: 'POST' });
    if (response.status === 401) {
      alert("You must be logged in to like this comment");
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
};
