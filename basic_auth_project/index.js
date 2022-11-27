
// Ładowanie modułu expressa
const express = require("express");
var path = require('path');

// Tworzenie instancji expressa
const app = express();

function authentication(req, res, next) {
    // Pobieramy z nagłówka authorization klucz Basic
	var authheader = req.headers.authorization;
	console.log(req.headers);

    // Jeśli nie znalazło wartości w nagłówku authorization wyświetlamy błąd, że nie zostaliśmhy zautentykowani
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}
    
    // Z nagłówka pobieramy zakodowany w formacie base64 klucz w którym znajdują się zahashowane dane, np user:user
    // Robimy split i wrzucamy to wszystko do listy
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
    // Pobieramy z listy 0 index, jest nim login usera
	var user = auth[0];
    // Pobieramy z listy 1 index, jest nim hasło usera
	var pass = auth[1];

    // Sprawdzamy czy login oraz hasło równa się tym, co uzupełniliśmy w ifie jako login i hasło dla usera
    // Jeśli warunek przejdzie przepuszczamy usera jako poprawnie zautentykowane do index.html
	if (user == 'test' && pass == 'test') {
		// If Authorized user
		next();
	} else {
        // Jeśli się nie uda zwracamy error 
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// Dodajemy do expressa metodę, która odpowiada za autentykacje użytkownika
app.use(authentication)
// Dajemy znać expressowi gdzie znajdują się nasze statyczne pliki
app.use(express.static(path.join(__dirname, 'public')));

// Ustawiamy port na którym będzie nasłuchiwał nasz serwer, w tym przypadku 3000
app.listen((3000), () => {
	console.log("Server is Running");
})