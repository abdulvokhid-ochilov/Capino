const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


//mongoose

mongoose.connect('mongodb+srv://admin-asliddin:AB17071998@@cluster0.yktos.mongodb.net/CapinoDB',
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

