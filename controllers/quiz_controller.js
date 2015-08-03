var models=require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
  models.Quiz.findAll().then(function(quiz) { // Cambiamos success por then por ser más actual
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
    })
  };

// GET /quizes/answer
exports.answer = function(req, res) {
    models.Quiz.findAll().then(function(quiz) { // Cambiamos success por then por ser más actual
      if (req.query.respuesta === quiz[0].respuesta) {
        res.render('quizes/answer', { respuesta: 'Correcto' });
      } else {
        res.render('quizes/answer', { respuesta: 'Incorrecto'});
      }
    })
};
