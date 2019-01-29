document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {

    // vrijednost unesenu u input polje (broj viceva) spremamo u varijablu
    const number = document.querySelector('input[type="number"]').value;

    // instanciramo XMLHttpRequest objekt (koristi se za razmjenu podataka sa serverom)
    const xhr = new XMLHttpRequest();

    // GET metodom dohvaćamo viceve iz baze podataka s vicevima pomoću api url-a, a true nam osigurava da je u pitanju asinkronost
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    // ovo činimo kad dobijemo podatke: 
    xhr.onload = function() {
        // provjeravamo je li status xhr objekta 200 (znači da je o.k.)
        if(this.status === 200) {
            // responseText je property od xhr objekta koji vraća tekst primljen sa servera nakon što je poslan zahtjev
            // JSON.parse metodom pretvaramo tekst u objekt
            const response = JSON.parse(this.responseText);
            
            // deklariram praznu varijablu output u koju će ići podaci dobiveni forEach petljom
            let output = '';

            // prvo se treba osigureti da je type: succes
            if(response.type === 'success') {

                // response ima propertije "type" i "value", pa mi forEach petljom prolazimo kroz "value" (u njemu se nalazi array s vicevima), a ne kroz sami response
                response.value.forEach( function(joke) {
                    // appendamo output
                    output += `<li>${joke.joke}</li>` // value ima propertije "id" i "joke", pa mi ovdje dohvaćamo "joke"                    
                });

                document.querySelector('.jokes').innerHTML = output;
            }

            else {
                output += '<li>Nešto je pošlo po krivu :(</li>'
            }

        }
    }

    xhr.send();

    e.preventDefault();
}
