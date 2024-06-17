const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./db/config');
const routes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use the port from .env or default to 3000

app.use(express.json());
app.use(cors());

require('./model/userSchema');

const requireToken = require('./middleware/requireToken');
const authRoutes = require('./routes/authRoutes');
app.use(bodyParser.json());

app.get('/',requireToken,(req,res)=>{
    res.send("your email is " + req.user.email);
})
app.use('/api',routes,requireToken)



app.listen(PORT, () => {
  console.log(`server running on port number ${PORT}`);
});
