const usersController = require('../controllers').users;

module.exports = (app) => {
  // app.get('/', (req, res) => res.status(200).send({
  //   message: 'Welcome to the Users API!',
  // }));

  app.post('/users', usersController.create);
};