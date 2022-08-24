// imports the express and mongoose libraries
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// provides the mongoose connection and connects to the local database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}); 

// logs mongo queries that are being executed
mongoose.set('debug', true);

// allows the mongo server to connect to the port locally
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));