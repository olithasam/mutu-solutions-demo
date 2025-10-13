const form = document.getElementById('quoteForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevent default submission

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/xovkpdgz', { // Replace with your Formspree ID
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      form.reset(); // Reset the form
    } else {
      const data = await response.json();
      alert(data.error || "Oops! There was a problem submitting your request.");
    }
  } catch (error) {
    alert("Oops! There was a problem submitting your request.");
  }
});