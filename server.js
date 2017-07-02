const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthenticationController = require('./controllers/auth_controller');
require('./config');

app.use(bodyParser.json());

app.post('/api/signup', AuthenticationController.signup);
app.post('/api/signin', AuthenticationController.signin);


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
