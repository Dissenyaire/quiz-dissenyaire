var models=require('../models/models.js');

// GET /quizes/question

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quiz) { // Aquí me parece que hay que cambiar quizes por quiz
    res.render('quizes/index.ejs', { quizes: quizes});
    })
  };


// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};

exports.answer = function(req, res) { // Esto se queda igual en teoría
  models.Quiz.find(req.params.quizId).then(function(quiz) { // Ahora buscará en la tabla quiz
    if (req.query.respuesta === quiz.respuesta) { // Compara si la respuesta y lo almacenado en la tabla es lo mismo
      res.render('quizes/answer', // Renderiza
                 { quiz: quiz, respuesta: 'Correcto' });
      } else {
        res.render('quizes/answer',  // Renderiza según la condición
                 { quiz: quiz, respuesta: 'Incorrecto'});
      }
    })
};
