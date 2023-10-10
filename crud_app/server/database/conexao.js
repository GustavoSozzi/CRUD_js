const mongoose = require("mongoose");
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const connectDB = async () => { //conectando ao BANCO DE DADOS

    try {
    //conexao do mongodb string
    const conection = await mongoose.connect(process.env.MONGO_URI, {
    });

    console.log(`MongoDB conectado: ${conection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
