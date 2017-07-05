const mongoose = require('mongoose');
mongoose.connect(`${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`);
