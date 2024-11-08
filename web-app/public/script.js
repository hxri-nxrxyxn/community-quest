const inputName = document.querySelector('.register__name');
const inputPassword = document.querySelector('.register__password');
const inputEmail = document.querySelector('.register__email');

//add event  
submit.addEventListener('click',async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/addevent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email" : inputEmail.value, "password" : inputPassword.value})
        });
        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
