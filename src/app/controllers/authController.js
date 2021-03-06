const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const crypto = require("crypto");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //expirar em um dia
  }); //informacao q difere um usuario do outro
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }
    const user = await User.create(req.body);

    user.password = undefined; //senha apagada da resposta apos ser cadastrado

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body; //passar como parametro email e senha

  const user = await User.findOne({ email }).select("+password"); //buscar email e senha dentro do banco de dados

  if (!user) {
    return res.status(400).send({ error: "User not found " }); // se o usuario nao for encontrado, essa é a resposta
  }

  if (!(await bcrypt.compare(password, user.password))) {
    //comparando se as duas senhas nao batem
    return res.status(400).send({ error: "Invalid Password" });
  }

  user.password = undefined; //remover o password da resposta

  res.send({
    user,
    token: generateToken({ id: user.id }),
  }); // se der tudo certo, aparece os dados
});

router.post("/forgot_password", async (req, res) => { //esta com erro
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({ error: "User not Found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();

    now.setHours(now.getGours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    console.log(token, now)

  } catch (err) {
    res.status(400).send({ error: "Erro on forgot password, try again" });
  }
});

module.exports = (app) => app.use("/auth", router); //repassando o router pro app com o prefixo auth
