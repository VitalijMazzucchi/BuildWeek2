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
            } else {
                localStorage.setItem('utente', 'Prova salvataggio su LocalStorage');
                let j = JSON.stringify(data);
                localStorage.setItem('users', j);
                window.open(
                    "homepage.html", "_self" /* per aprire nella stessa finestra senza aprirne altre */
                );
            }
        })
}





// homepage
document.addEventListener('DOMContentLoaded', function () {
    stampaPost()
    profilo();
    stampaUtenti();
})

function profilo() {
    let profilo = document.querySelector('.sinistra .profilo');
    let users = localStorage.getItem('users');
    let francesca = JSON.parse(users);
    profilo.innerHTML = `<div class="immagine">
                                     <img src="images/placeholder.png" alt="">
                                     </div>
                                     <div class="info">
                                     <p> ${francesca.name}</p>
                                     <a href="mailto:${francesca.email}">${francesca.email}</a>
                                     </div>
                                    `
    let infoPer = document.querySelector('.sinistra .info-personali');
    infoPer.innerHTML = `
                             <p>${francesca.address.city}, ${francesca.address.street}, ${francesca.address.zipcode}</p>
                            <a href="${francesca.website}">${francesca.website}</a>
                            <a href="tel:${francesca.phone}">${francesca.phone}</a>
                            <button onclick="modificaDati()">Modifica dati</button>
                        `
}

function stampaPost() {

    let sezPost = document.querySelector('.allPost');
    sezPost.innerHTML = '';
    fetch('http://localhost:3000/api/post')
        .then((response) => response.json())
        .then((json) =>

            json.reverse().forEach(ele => {
                let div = document.createElement('div')
                div.innerHTML = `
                                <h3>${ele.title}</h3>
                                <p>${ele.body}</p>
                                <button onclick="vediCommenti(${ele.id})">Vedi i commenti</button>`;
                sezPost.appendChild(div)
                let commenti = document.createElement('div')
                commenti.className = 'commenti' + ele.id;
                div.appendChild(commenti)
            }));
}

function stampaUtenti() {
    let allUser = document.querySelector('.destra .contacts');
    fetch('http://localhost:3000/api/users')
        .then((response) => response.json())
        .then((json) =>
            json.forEach(ele => {
                let div = document.createElement('div')
                div.className = 'info-card'
                div.innerHTML = `<div class="informazioni">
                                <img src="images/placeholder.png" alt="profile pic">
                                <span> ${ele.name}</span>
                                <button onclick="info(${ele.id})">Info</button>
                                </div>

                                <div class="more-info">
                                <p>${ele.address.city}, ${ele.address.street}, ${ele.address.zipcode}</p>
                                <a href="${ele.website}">${ele.website}</a>
                                <a href="tel:${ele.phone}">${ele.phone}</a> 
                                </div>
                                `



                allUser.appendChild(div)
            }))


}



function logout() {
    localStorage.clear();
    window.open(
        "index.html", "_self" /* per aprire nella stessa finestra senza aprirne altre */
    )
}
/*  function info(id) {
    let allUser = document.querySelector('.infoUtente' + id);
    let divinfo = document.createElement('span');

    divinfo.className = 'pienoVuoto' + id;
    let pienoVuoto = document.querySelectorAll('.pienoVuoto' + id)
    if (pienoVuoto.length == 1) {
        let x = document.querySelector('.pienoVuoto' + id)
        x.remove()
    } else if (pienoVuoto.length == 0) {
        allUser.appendChild(divinfo);
        fetch('http://localhost:3000/api/users/' + id)
            .then(res => res.json())
            .then(json => {
                divinfo.innerHTML = `
                 <p>${json.address.city}, ${json.address.street}, ${json.address.zipcode}</p>
                <a href="${json.website}">${json.website}</a>
                <a href="tel:${json.phone}">${json.phone}</a>`
            })
    }

}  */

/* function modificaDati(){

} */



function aggiungiPost() {
    let log = localStorage.getItem('users');
    let loggato = JSON.parse(log)
    let post = {
        userId: loggato.id,

        title: document.querySelector('input[name="tito"]').value,
        body: document.querySelector('input[name="contpost"]').value
    }

    fetch('http://localhost:3000/api/post/', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
    stampaPost();
}

function vediCommenti(id) {

    fetch('http://localhost:3000/api/commenti/' + id)
        .then(res => res.json())
        .then(json => {
            json.forEach(ele => {
                let allUser = document.querySelector('.commenti' + id);
                let divinfo = document.createElement('span');
                divinfo.className = 'pienoVuoto' + id;
                let pienoVuoto = document.querySelectorAll('.pienoVuoto' + id)
                if (pienoVuoto.length == 1) {
                    let x = document.querySelector('.pienoVuoto' + id)
                    x.remove()
                } else if (pienoVuoto.length == 0) {
                    allUser.appendChild(divinfo);
                    divinfo.innerHTML = `<div>
                                        <p>${ele.name}AAAAAAAAAAA</p>
                                        <p>${ele.body}</p>
                                        </div>`
                }
            }
            )
        })
}









