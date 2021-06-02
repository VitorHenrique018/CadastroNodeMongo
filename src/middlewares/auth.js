const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.lenght === 2) {
    return res.status(401).send({ error: "Token Error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    //verifica se a palavra scheme tem o valor Bearer
    return res.status(401).send({ error: "Token malformatted" });
  }

  //ver se o token bate com a requisição, podia fazer apenas essa, porem, consome muito processamento????
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    //decoded é o userId
    if (err) {
      return res.status(401).send({ error: "Token Invalid" });
    }

    req.userId = decoded.id;

    return next(); //se os campos nao forem aceitos, ele não avança
  });
};
