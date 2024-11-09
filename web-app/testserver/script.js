
const password = document.getElementById('password'); //password textbox
const username = document.getElementById('username'); //username textbox
const email = document.getElementById('email'); //email textbox
const registerbtn = document.getElementById('register'); //register button
const loginbtn = document.getElementById('login'); //login button


// register function
const onregister = async() => {
    if (!username.value || !password.value || !email.value) {
        alert('All fields are required.');
        return;
    }
    try{
        const response = await fetch('http://localhost:5000/api/users/register', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username : String(username.value),
                password : String(password.value),
                email : String(email.value)
            })
        });
        const data = await response.json();
        if(response.ok){
            if(response.status == 201){
                //code if user is successfully created nad addedd to database
                alert('User created successfully');
            }
            if(response.status == 202){
                //code if the email already exists and is used for a diffrent user
                alert('User already exists');
            }
        }
        else{
            //if there is an error creating the user
            alert('user not created');
            console.log(response) //logs the error
        }
    }
    catch(error){
        //if there is an error during the fetching process
        console.log(error);
        alert('Error during the fetching process')
    }
}

 const onlogin = async() => {
    if (!password.value || !email.value) {
        alert('All fields are required.');
        return;
    }
    try{
        const response = await fetch('http://localhost:5000/api/users/login', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password : String(password.value),
                email : String(email.value)
            })
        });
        const data = await response.json();
        if(response.ok){
            if(response.status == 201){
                //if  email is successfully logged in
                alert('User Logged in succesfully');
            }
            if(response.status == 202){
                //if the email is not found
                alert('User not found');
            }
            if(response.status == 203){
                //if the email exists but the password is incorrect
                alert('password is incorrect');
            }
        }
        else{
            //if there is an error with logging into the user
            alert('error with logging in');
            console.log(response) //logs the error
        }
    }
    catch(error){
        //if there is an error during the fetching process
        console.log(error);
        alert('Error during the fetching process')
    }
 }

loginbtn.addEventListener('click',onlogin);
