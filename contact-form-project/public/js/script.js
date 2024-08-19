
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  fetch('http://localhost:3000/submit-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('contactForm').reset();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});
