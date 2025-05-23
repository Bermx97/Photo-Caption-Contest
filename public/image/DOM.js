document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  const response = await fetch(`/caption/${data.image_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
      const error = document.getElementById('error')
      error.textContent = err.msg
    });
  }

    else {
    console.error('error:', response.status, response.statusText);
  }
});

document.getElementById('error')