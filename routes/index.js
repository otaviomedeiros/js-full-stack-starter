const express = require('express');
const authRouter = express.Router();
const apiRouter = express.Router();

const { UserController } = require('../user');
const { AuthenticationController, authenticate } = require('../authentication');

authRouter.post('/signup', AuthenticationController.signup);
authRouter.post('/signin', AuthenticationController.signin);

apiRouter.use(authenticate());
apiRouter.get('/user', UserController.index);

module.exports = (app) => {
  app.use('/api', apiRouter);
  app.use('/', authRouter);
};
