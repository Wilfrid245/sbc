document.getElementById('submitOrder').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const quantity = document.querySelector('input[name="quantity"]:checked').value;

    const orderData = { name, tel, email, order: "Liquid Soap", quantity };

    try {
        const response = await fetch('https://your-server-domain:3000/orders', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Order submitted successfully!');
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to submit order. Please try again.');
        }
    } catch (error) {
        alert('Error: Unable to connect to the server.');
        console.error('Detailed error:', error);
    }
});
