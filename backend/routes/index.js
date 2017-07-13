const express = require('express');
const authRouter = express.Router();
const apiRouter = express.Router();
const { authenticate } = require('../configs');

const UserController = require('../controllers/user_controller');
const AuthenticationController = require('../controllers/auth_controller');

authRouter.post('/signup', AuthenticationController.signup);
authRouter.post('/signin', AuthenticationController.signin);

apiRouter.use(authenticate());
apiRouter.get('/user', UserController.index);

module.exports = (app) => {
  app.use('/api', apiRouter);
  app.use('/', authRouter);
};
