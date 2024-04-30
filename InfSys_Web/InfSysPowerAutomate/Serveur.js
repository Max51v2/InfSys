const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Récupérer le chemin du fichier demandé
    const filePath = path.join(__dirname, req.url);

    // Vérifier si le fichier existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Si le fichier n'existe pas, renvoyer une erreur 404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            // Si le fichier existe, le lire et l'envoyer en réponse
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    // En cas d'erreur de lecture du fichier, renvoyer une erreur 500
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    // Envoyer la réponse avec le contenu du fichier et le type MIME approprié
		            res.setHeader("Access-Control-Allow-Origin", "*");
                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(data);
                }
            });
        }
    });
});

// Lancer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
