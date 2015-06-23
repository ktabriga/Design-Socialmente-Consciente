'use strict';

var usuarioRepositorio = require('./usuarioRepositorio'),
  usuarioServico = require('./usuarioServico'),
  router = require('express').Router();

module.exports = function (configuracao) {

  function autenticar(req, res, next) {
    var dadosUsuario = req.body;

    usuarioRepositorio.buscarUsuarioPorEmail(dadosUsuario.email)
      .then(verificar);

    function verificar(usuario) {
      if(!usuario) {
        next(Error('usuario.invalido'));
      }

      if (usuarioServico.validarSenha(usuario.senha, dadosUsuario.senha)) {
        var token = usuarioServico.gerarToken(configuracao, usuario);
        return res.json({
          token: token
        });
      }

      next(Error('usuario.invalido'));

    }
  }

  router.post('/', autenticar);
  return router;
};



