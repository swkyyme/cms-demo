require('dotenv').config();

const express = require('express');
require('express-async-errors'); //change express

// const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routes');

const connectToDB = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');

// const PORT = 4000;
const PORT = process.env.PORT ||3000;

// app.get("/", (req,res) => {
//     res.json("hello world");
// });
app.use(express.json());

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

app.use('/v1', routes);

app.use(errorHandler);


connectToDB()
    .then(() => {
        console.log('DB connected');
        app.listen(PORT, () => {console.log(`server listening ${PORT}`)});
    })
    .catch(error => {
        console.log('DB connection failed');
        // console.log(error.message);
        console.error(error.message);
        process.exit(1);
    });
