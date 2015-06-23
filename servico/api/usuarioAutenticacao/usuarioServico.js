var passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken');

exports.gerarToken = function (configuracao, usuario) {
  var usuarioCopia = {
    nome: usuario.nome,
    email: usuario.email,
    linguagem: usuario.linguagem,
    privilegio: usuario.privilegio
  };

  return jwt.sign(usuarioCopia, configuracao.SECRET, {
    expiteInMinutes: 60 *5
  });
};

exports.validarSenha = function (senha, senhaInformada) {
  return passwordHash.verify(senhaInformada, senha);
};

exports.gerarSenha = function (senha) {
  return passwordHash.generate(senha);
};