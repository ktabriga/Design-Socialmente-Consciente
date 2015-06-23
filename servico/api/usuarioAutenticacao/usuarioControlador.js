'use strict';

var usuarioRepositorio = require('./usuarioRepositorio'),
  usuarioServico = require('./usuarioServico'),
  router = require('express').Router();

module.exports = function (restringir) {

  router.route('/')
    .post(criar)
    .get(restringir, listar);
  router.route('/:id')
    .put(restringir, atualizar)
    .delete(restringir, remover)
    .get(restringir, buscar);

  return router;

  function criar(req, res, next) {
    var usuario = req.body;
    console.log('Criar function', req.body);
    usuarioRepositorio.buscarUsuarioPorEmail(usuario.email)
      .then(function (usuarioEncontrado) {
        if (usuarioEncontrado){
          return next(Error('email.existente'));
        }
        console.log(usuarioRepositorio);
        console.log(usuario);
        usuario.senha = usuarioServico.gerarSenha(usuario.senha);
        usuarioRepositorio.salvar(usuario)
          .then(function (usuarioSalvo) {
            res.status(201)
              .json(usuarioSalvo);
          }).catch(next);
      });

  }

  function atualizar(req, res, next) {
    var usuario = req.body;
    var id = req.params.id;

    usuarioRepositorio.buscarUsuarioPorEmail(usuario.email)
      .then(function (usuarioEncontrado) {
        if (usuarioEncontrado && usuarioEncontrado._id != id) {
          return next(Error('email.existente'));
        }

        usuario.senha = usuarioServico.gerarSenha(usuario.senha);
        usuarioRepositorio.atualizar(id, usuario)
          .then(function (usuarioSalvo) {
            res.json(usuarioSalvo);
          }).catch(next);
      });

  }

  function remover(req, res, next) {
    var id = req.params.id;

    usuarioRepositorio.remover(id)
      .then(function () {
        res.json().status(200);
      }).catch(next);
  }

  function listar(req, res, next) {
    var filtro = req.query;

    usuarioRepositorio.listar(filtro)
      .then(function (usuarios) {
        res.json(usuarios);
      }).catch(next);
  }

  function buscar(req, res, next) {
    var id = req.params.id;

    usuarioRepositorio.buscar(id)
      .then(function (usuario) {
        res.json(usuario);
      }).catch(function (erro) {
        erro.status = 404;
        next(erro);
      });
  }

};



