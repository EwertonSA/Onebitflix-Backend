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
        rejectUnauthorized: false, // Permite certificados autoassinados
      },
    } : {},
  },
};

client.connect()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((err) => {
    console.error("Erro de conexão", err.stack);
  });
console.log(process.env.DATABASE_URL);
