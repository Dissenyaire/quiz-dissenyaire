//Definición del modelo Quiz

module.exports = function (sequelize, DataTypes) {
      // si no se rellena los campos muestra mensaje 
      return sequelize.define(
  	'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      }
    }
  );
}
