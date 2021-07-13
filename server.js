const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require("mongoose");
const app = require('./app');


//mongoose

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log('db is connected');
    });

app.listen(process.env.PORT || 3000, () => {
    console.log('the server is running on server 30000');
});

