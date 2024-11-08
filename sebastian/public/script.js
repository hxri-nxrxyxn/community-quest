const eventId =document.getElementById("eventid")
const eventName = document.getElementById("eventname")
const laddoo = document.getElementById("laddoo")
const submit = document.getElementById("submit");

//add event  
submit.addEventListener('click',async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/addevent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "eventId" : eventId.value, "eventName" : eventName.value, "laddoo" : laddoo.value})
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
