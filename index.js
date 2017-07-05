require('./configs');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
  AuthenticationController,
  passport,
  authenticate
} = require('./authentication');
const { UserController } = require('./user');

app.use(passport.initialize());
app.use(bodyParser.json());

app.get('/api/user', authenticate(), UserController.index);
app.post('/api/signup', AuthenticationController.signup);
app.post('/api/signin', AuthenticationController.signin);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
