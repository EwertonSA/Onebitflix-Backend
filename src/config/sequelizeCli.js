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
        require: false, // Necessário para garantir que a conexão será feita via SSL
        rejectUnauthorized: false, // Defina como "false" se o certificado não for verificado (comum em alguns bancos)
      },
    },
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
