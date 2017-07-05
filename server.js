require('./configs/db');

const express = require('express');
const app = express();
const { passport, authenticate } = require('./configs/passport');
const bodyParser = require('body-parser');
const AuthenticationController = require('./controllers/auth_controller');
const IndexController = require('./controllers/index_controller');

app.use(passport.initialize());
app.use(bodyParser.json());

app.get('/', authenticate(), IndexController.index);
app.post('/api/signup', AuthenticationController.signup);
app.post('/api/signin', AuthenticationController.signin);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
