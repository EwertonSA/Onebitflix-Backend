require('dotenv').config();

module.exports = {
development: {
url: process.env.DATABASE_URL,
dialect: 'postgres',
},
production: {
url: process.env.DATABASE_URL,
dialect: 'postgres',
dialectOptions: process.env.NODE_ENV === 'production' ? {
ssl: {
require: true,
rejectUnauthorized: false,
},
} : {},
},
};


