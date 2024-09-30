let FormEl=document.getElementById('registration-form');
FormEl.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address })
    })
    .then(response => {
        if (response.ok) {
                 return response.json();
        } else {
            throw new Error('User registration failed.');
        }
    })
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => {
        document.getElementById('response').innerText = error.message;
    });
});