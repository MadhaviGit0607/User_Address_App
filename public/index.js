let FormEl = document.getElementById('registration-form');

FormEl.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, address })
        });

        if (!response.ok) {
            throw new Error('User registration failed.');
        }

        const data = await response.json();
        document.getElementById('response').innerText = data.message;

    } catch (error) {
        document.getElementById('response').innerText = error.message;
    }
});
