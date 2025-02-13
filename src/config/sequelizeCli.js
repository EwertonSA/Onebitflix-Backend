require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Necessário para garantir que a conexão será feita via SSL
        rejectUnauthorized: false, // Defina como "false" se o certificado não for verificado (comum em alguns bancos)
      },
    },
  },
};

console.log(process.env.DATABASE_URL);
