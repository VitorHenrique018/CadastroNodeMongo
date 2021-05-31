const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost/noderest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB Realizada com sucesso");
  })
  .catch((error) => {
    console.log("Erro: Conexão não foi Realizada com sucesso");
  });

  

module.exports = mongoose;

