var models=require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};


// GET /quizes
exports.index = function(req, res) {
    models.Quiz.findAll().then(
    function(quizes) {
      // añadimos error, quitamos espacios y ponemos punto y coma
      res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }
  // añadimos error, quitamos espacios y ponemos punto y coma
  ).catch(function(error){next(error)});
  };


// GET /quizes/:id
exports.show = function(req, res) {
  // añadimos error
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

exports.answer = function(req, res) { // Esto se queda igual en teoría
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }

  // añadimos error
  res.render(
    'quizes/answer',
    { quiz: req.quiz,
      respuesta: resultado,
      errors: []
    }
  );
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  // añadimos error
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');
  })   // res.redirect: Redirección HTTP a lista de preguntas
};
  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')})
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  );
};
