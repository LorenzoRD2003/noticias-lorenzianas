const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

try {
    mongoose.connect(MONGODB_URI);
    console.log("Base de datos conectada.");
} catch (err) {
    console.log(err);
}
