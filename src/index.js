const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());

app.use((request, response, next) => {
    //console.log("Acessou o middleware");
    response.header("Access-Control-Allow-Origin","*"); 
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    /*pode colocar Localhost:3334 | * libera para todos., serve para os metodos tbm, put,get, post*/
    app.use(cors());
    next();//USADO PARA LIBERAR A APLICAÇÃO
  });


  require('./controllers/authController')(app);

  app.get('/', (req,res) => {
      res.send('OK');
  })



app.listen(3001);