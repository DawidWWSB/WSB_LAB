
// Pobieramy elementy z documentu o konkretnym id
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// Dodajemy event kliknięcia na przycisk z id login-form-submit
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Wyciągamy wartości z inputów username oraz password w formularzu
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Sprawdzamy czy wpisane hasło zgadza się z tym, które zadeklarowaliśmy pod spodem w intrukcji warunkowej.
    // Jeśli dane będą takie same, wyświetlimy alert, że zalogowaliśmy się poprawnie oraz przeładujemy stronę
    if (username === "" && password === "") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        // Pokażemy komunikat z błędem dając opacity na 1
        loginErrorMsg.style.opacity = 1;
    }
})