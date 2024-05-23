const mongoose = require('mongoose');

exports.connectDB = async function () {
    const URL = process.env.MONGODB_URL;
    mongoose
        .connect(URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log(error));
};