const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { passport } = require('./configs');
const routes = require('./routes');

app.use(passport.initialize());
app.use(bodyParser.json());
routes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
