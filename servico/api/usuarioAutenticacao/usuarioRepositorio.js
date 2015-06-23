'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var q = require('q');
var _ = require('underscore');

var UsuarioSchema = Schema({
  nome: {
    type: String,
    required: 'nome.obrigagatorio',
    trim: true
  },

  senha: {
    type: String,
    required: 'senha.obrigatorio'
  },

  email: {
    type: String,
    required: 'email.obrigatorio',
    trim: true,
    unique: true
  },

  privilegio: {
    type: String,
    enum: ['USUARIO','ADMINISTRADOR'],
    default: 'USUARIO'
  },

  linguagem: {
    type: String,
    enum: ['PT-BR', 'US-EN', 'ES-ES'],
    default: 'US-EN'
  }
});

var Usuario = mongoose.model('Usuario', UsuarioSchema);

exports.salvar = salvar;
exports.buscar = buscar;
exports.buscarUsuarioPorEmail = buscarUsuarioPorEmail;
exports.listar = listar;
exports.atualizar = atualizar;
exports.remover = remover;

function buscarUsuarioPorEmail(email) {
  var diferir = q.defer(),
    consulta = {
      email: email
    };

  Usuario.findOne(consulta, function (erro, usuario) {
    if (erro) {
      return diferir.reject(erro);
    }

    diferir.resolve(usuario);
  });

  return diferir.promise;
}

function listar(filtro) {
  var diferir = q.defer();
  filtro = filtro || {};

  Usuario.find(filtro,{senha: 0}, function (erro, usuarios) {
    if (erro) {
      return diferir.reject(erro);
    }

    diferir.resolve(usuarios);
  });

  return diferir.promise;
}

function buscar(id) {
  var deferir = q.defer();

  Usuario.findOne({_id: id}, {senha: 0}, function (erro, usuario) {
    if (erro) {
      return deferir.reject(erro);
    }

    if (!usuario) {
      return deferir.reject(Error("naoEncontrado"));
    }

    deferir.resolve(usuario);
  });

  return deferir.promise;
}

function salvar(usuario) {
  var diferir = q.defer();
  var novoUsuario = new Usuario(usuario);

  novoUsuario.save(function (erro, usuarioSalvo) {
    if (erro) {
      return diferir.reject(erro);
    }

    var usuarioRetorno = usuarioSalvo.toObject();
    delete usuarioRetorno.senha;
    return diferir.resolve(usuarioRetorno);
  });

  return diferir.promise;
}

function atualizar(id, usuario) {
  var diferir = q.defer();
  delete  usuario._id;

  Usuario.update({_id: id}, usuario, function (erro, usuarioSalvo) {
    if (erro) {
      return diferir.reject(erro);
    }

    buscar(id)
      .then(diferir.resolve);
  });

  return diferir.promise;
}

function remover(id) {
  var diferir = q.defer();

  Usuario.remove({_id: id}, function (erro) {
    if (erro) {
      return diferir.reject(erro);
    }

    diferir.resolve();
  });

  return diferir.promise;
}


