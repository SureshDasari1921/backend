
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/PersonalBankingSystem`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
 
 module.exports = connectDB   