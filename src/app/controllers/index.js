const fs = require("fs"); //trabalhar com FileSystem do node (Carregar Arquivos)
const path = require("path") // Trabalhar com caminhos das pastas

module.exports = app => {
    fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
    .forEach(file => require(path.resolve(__dirname, file))(app));
}