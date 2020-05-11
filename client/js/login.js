const api_url = "http://localhost:5000/"
let users = [
    {
        userName: "Jeff",
        password: "movies"
    },

    {
        userName: "Lacy",
        password: "wick"
    },
    {
        userName: "Jamal",
        password: "trending"
    }
]

// document.querySelector("#submit").addEventListener("click", async (event) => {
//     event.preventDefault()
//     let name = document.querySelector("#userEmail")
//     let password = document.querySelector('#password')

//     console.log(`${name.value} and password is ${password.value}`)
//     console.log(event)

//     const found = users.find(({ userName }) => userName === name.value);

//     console.log(found)
// })


document.querySelector("#submit").addEventListener("click", async (event) => {
    event.preventDefault();
    //let name = document.querySelector("#userName")
    let email = document.querySelector("#userEmail")
    let password = document.querySelector('#password')

    // console.log(`${name.value} and password is ${password.value}`);
    console.log(event);

    let reqObj = {
        //check email to see if it is a valid format in the login.html user email input
        //name: name.value,
        email: email.value,
        password: password.value
    }

    console.log(reqObj)

    const response = await fetch(api_url + "api/user/login", {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const json = response.text();
    console.log(json)
});