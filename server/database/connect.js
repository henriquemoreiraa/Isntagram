const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(``);

        console.log('Database connected');
    } catch (error) {
        console.log('Error on database', error);
        process.exit(1);
    };
};

module.exports = connectDB;