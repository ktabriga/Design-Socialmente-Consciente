var router = require('express').Router(),
    template = require('./template/templateControlador'),
    autenticacao = require('./usuarioAutenticacao/autenticacaoControlador'),
    usuario = require('./usuarioAutenticacao/usuarioControlador'),
    expressJwt  = require("express-jwt");

module.exports = function (configuracao) {
  var restringir = expressJwt({secret: configuracao.SECRET});
  router.use(template());
  router.use("/privado", restringir);
  router.use("/autenticacao", autenticacao(configuracao));
  router.use("/usuarios", usuario(restringir));
  return router;
};