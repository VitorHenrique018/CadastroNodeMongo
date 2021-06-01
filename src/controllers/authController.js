const express = require("express");

const User = require("../models/User");
const bcrypt = require("bcryptjs")

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }
    const user = await User.create(req.body);

    user.password = undefined //senha apagada da resposta apos ser cadastrado

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await (await User.findOne({ email })).isSelected('+password');

  if(!user) {
    return res.status(400).send({ error: 'User not found '});
  }

  if(!await bcrypt.compare(password, user.password)){ //comparando as duas senhas nao batem
    return res.status(400).send({ error: 'Invalid Password'});
  }

  res.send({ user });

})

module.exports = (app) => app.use("/auth", router); //repassando o router pro app com o prefixo auth
