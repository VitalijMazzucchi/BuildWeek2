// registrazione
function registrati() {

    let obj = {
        id: '',
        nome: document.querySelector('form input:first-of-type').value,
        username: document.querySelector('form  input:nth-child(2)').value,
        email: document.querySelector('form  input:nth-child(3)').value,
        address: {
            street: document.querySelector('form input:nth-child(4)').value,
            suite: document.querySelector('form input:nth-child(5)').value,
            city: document.querySelector('form input:nth-child(6)').value,
            zipcode: document.querySelector('form input:nth-child(7)').value,
        },
        phone: document.querySelector('form input:nth-child(8)').value,
        website: document.querySelector('form input:nth-child(9)').value,

    }
    fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));

}

// LOGIN
function login() {
    fetch('http://localhost:3000/api/users/login/', {
        method: "POST",
        headers: {
            "Accept": "application/json,",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: document.querySelector('input[name="username"]').value,
            email: document.querySelector('input[name="email"]').value
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (data == 'no') {
                alert("Errore Username o Password");
            } else if (data == 'si') {
                window.open(
                    "homepage.html", "_self" /* per aprire nella stessa finestra senza aprirne altre */
                );
            }
        })
        .catch((err) => {
            console.log(err);
        });

}





// homepage
document.addEventListener('DOMContentLoaded', function () {
    stampaPost()
})
function stampaPost() {
    let sezPost = document.querySelector('.allPost');
    fetch('http://localhost:3000/api/post')
        .then((response) => response.json())
        .then((json) =>

            json.forEach(ele => {
                let div = document.createElement('div')
                div.innerHTML = `
                                <h3>${ele.title}</h3>
                                <p>${ele.body}</p>
                                <button> Vedi i commenti</button>
                                `
                sezPost.appendChild(div)
            }));
}
/* fetch('http://localhost:3000/api/users/', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
 */



