(function() {
  'use strict';

  var fs          =   require('fs');
  var path        =   require('path');
  var del         =   require('del');
  var merge       =   require('merge-stream');
  var stylish     =   require('jshint-stylish');
  var gulp        =   require('gulp');
  var ngAnnotate  =   require('gulp-ng-annotate');
  var concat      =   require('gulp-concat');
  var rename      =   require('gulp-rename');
  var uglify      =   require('gulp-uglify');
  var jshint      =   require('gulp-jshint');
  var sourcemaps  =   require('gulp-sourcemaps');
  var cache       =   require('gulp-cached');

  var pastas = {
    destino: 'cliente/build',
    modulos: 'cliente/modulos',
    app: [
      'cliente/modulos/**/*.modulo.js',
      'cliente/base/*.modulo.js',
      'cliente/base/**/*.configuracoes.js',
      'cliente/modulos/**/*.configuracoes.js',
      'cliente/modulos/**/*.rotas.js',
      'cliente/base/*.rotas.js',
      'cliente/base/*.js'
    ],
    jshint: [
      'cliente/**/*.js'
    ],
    ignorar: [
      '!cliente/build/**/*.js',
      '!cliente/base/babel/**/*.js',
      '!cliente/componentes/**/*.js'
    ]
  };

  gulp.task('modulos', ['limpar'], function() {
    var folders = getFolders(pastas.modulos);
    console.log('[gulp]: Iniciando a compactação dos módulos..');

    var tasks = folders.map(function(folder) {

      console.log('[gulp]: Compactando o módulo ' + folder + '..');

      return gulp.src([path.join(pastas.modulos, folder, '/**/*.js'), '!'+pastas.modulos+'/**/*.modulo.js', '!'+pastas.modulos+'/**/*.rotas.js', '!'+pastas.modulos+'/**/*.configuracoes.js'])
        //Inicio do Source Map
        .pipe(sourcemaps.init())
          // Concatena os arquivos
          .pipe(concat(folder + '.js',  {newLine: ';'}))

          .pipe(ngAnnotate())
          // Minifica
          .pipe(uglify({ mangle: false }))
        //Fim do Source Map
        .pipe(sourcemaps.write())
        // Renomea para "Modulo".min.js
        .pipe(rename(folder + '.min.js'))
        // Grava o arquivo na pasta destino ("Modulo".min.js)
        .pipe(gulp.dest(pastas.destino));
    });

    return merge(tasks);
  });

  gulp.task('app', ['limpar'], function(){
    console.log('[gulp]: Iniciando a compactação do app base..');
    var arquivos = pastas.app.concat(pastas.ignorar);

    return gulp.src(arquivos)
      //Inicio do Source Map
      .pipe(sourcemaps.init())
        //Concatena os arquivos
        .pipe(concat('App.min.js'),  {newLine: ';'})

        .pipe(ngAnnotate())
        //Minifica
        .pipe(uglify())
      //Fim do Source Map
      .pipe(sourcemaps.write())
      // Grava o arquivo na pasta de destino App.min.js
      .pipe(gulp.dest(pastas.destino));
  });

  gulp.task('jshint', function() {
    console.log('[gulp]: Iniciando a verificação do código..');
    var arquivos = pastas.jshint.concat(pastas.ignorar);

    return gulp.src(arquivos)
      // Realiza cache dos arquivos ja verificados
      .pipe(cache('jshintCache'))
      // Analisa o código usando o jshint seguindo os padrões estabelecidos no arquivo .jshintrc
      .pipe(jshint('.jshintrc'))
      // Utiliza o reporter stylish para exibir os resultados
      .pipe(jshint.reporter(stylish));
  });

  gulp.task('limpar', function(cb) {
    // Limpa a pasta build
    del(pastas.destino, cb);
  });

  gulp.task('monitorar', function() {
    // Monitora os arquivos do projeto para refazer o build caso houver alteração
    gulp.watch(pastas.jshint.concat(pastas.ignorar), ['jshint', 'app', 'modulos']);
  });

  gulp.task('default', ['jshint', 'modulos', 'app', 'monitorar']);

  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }
})();

