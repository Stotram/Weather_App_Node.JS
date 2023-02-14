const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')
const messageThree=document.querySelector('#message3')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location=search.value 

    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    messageThree.textContent=""

    fetch ('http://localhost:3000/weather?address=' + location).then ((response)=>{
        response.json().then ((data)=>{
            if (data.error){
                messageOne.textContent=data.error
            }
            else {
                console.log(data)
                messageOne.textContent=data.location
                messageTwo.textContent="Current Temperature: " +data.temperature
                messageThree.textContent="Real feel: " +data.feelslike
            }
        })
    })
})