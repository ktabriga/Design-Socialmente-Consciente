var router = require('express').Router(),
    rotasApi = require('./rotasApi');

/*
  configuração é um objeto com valos definidos no arquivo servico/configuracao/padrao
 */
module.exports = function (configuracao) {
  
  /*
    Quando a url conter prefixo /api direcionar para o modulo de rotas da api
  */
  router.use('/api', rotasApi(configuracao));

  /*
    Para as demais urls rederizar a index do cliente 
  */
  router.get('*', function (req, res, next) {
    res.render('index.jade');
  });

  return router;
};