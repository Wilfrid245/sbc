document.getElementById('submitOrder').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const quantity = document.querySelector('input[name="quantity"]:checked').value;

    const orderData = { name, tel, email, order: "Liquid Soap", quantity };

    try {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            alert('Order submitted successfully!');
        } else {
            alert('Failed to submit order. Please try again.');
        }
    } catch (error) {
        alert('Error: Unable to connect to the server.');
        console.error(error);
    }
});
