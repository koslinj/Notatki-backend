const mongoose = require('mongoose');
const { database } = require('../config')
mongoose.set('strictQuery', false);

// db connect
mongoose.connect(database, {dbName: 'notes-app'});

