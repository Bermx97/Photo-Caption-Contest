document.getElementById('loginform').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = '';
  errorMessageElement.style.display = 'none';

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const result = await response.text();
    console.log('Succeed');
    window.location.href = '/gallery'
  } else {
    const errorData = await response.json();
    console.error('error', response.status, response.statusText);
    errorMessageElement.textContent = errorData.message || 'Incorrect loginInvalid login credentials';
    errorMessageElement.style.display = 'block';
  }
});