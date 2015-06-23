/**
 * Funções para centralizar a verificação de erros de resultados assincronos.
 *  @Auto Catabriga
 */
module.exports = {
 
  obterResultado: function (next, funcao) {

    return function(err, resultado) {
      if (err) {
        next(err);
        return;
      }

      return funcao(resultado);
    }

  }
};