require('dotenv').config();

const config = {
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASS,

    elephantHost: process.env.ELEPHANT_HOST,
    elephantUser: process.env.ELEPHANT_USER,
    elephantPassword: process.env.ELEPHANT_PASSWORD,
    elephantDatabase: process.env.ELEPHANT_DATABASE,
    elephantPort: process.env.ELEPHANT_PORT,

    stripeKey: process.env.STRIPE_KEY
};

module.exports = config;