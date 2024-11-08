const inputName = document.querySelector('.register__name');
const inputPassword = document.querySelector('.register__password');
const inputEmail = document.querySelector('.register__email');
const submit = document.querySelector('.btn-login')

//add event  
submit.addEventListener('click',async () => {
    console.log("clicked")
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email" : inputEmail.value, "password" : inputPassword.value})
        });
        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
            console.log('Login successful!');
        } else {
            alert(data.error);
            console.log(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
