document.getElementById('registerform').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());


  try {
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const result = await response.text();
        window.location.href = '/';
    } else {
        const result = await response.json();
        if (result.errors) {
            result.errors.forEach(error => {
                const errorElement = document.getElementById(`${error.path}-error`);            
            if (errorElement) {
                errorElement.textContent = error.msg;
          }
        });
        } else if (result.error) {
            const generalError = document.getElementById('general-error');
            if (generalError) {
                generalError.textContent = result.error;
            }
        }
        }
    } catch (err) {
        console.error('registration error:', err);
    }
});

document.getElementById('buttongallery').addEventListener('click', async function(event) {
    window.location.href = '/gallery';
})