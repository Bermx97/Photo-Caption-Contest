document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  const id = Object.keys(data);
  const response = await fetch(`/caption/${id}`, {
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
  } else {
    console.error('error:', response.status, response.statusText);
  }
});