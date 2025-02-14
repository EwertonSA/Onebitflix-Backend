# OneBitFlix é uma plataforma de cursos online desenvolvida como parte do curso da Onebitcode.

OneBitFlix é uma plataforma de cursos online desenvolvida com **Node.js, Express, PostgreSQL, Sequelize e AdminJS**. O sistema permite gerenciar categorias, cursos e episódios, além de administrar usuários com diferentes níveis de acesso.

## 🚀 Tecnologias Utilizadas
- **Back-end:** Node.js, Express, AdminJS
- **Banco de Dados:** PostgreSQL com Sequelize
- **Autenticação:** JWT e AdminJS Authentication
- **Deploy:** Render

## 📦 Instalação e Configuração
### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/EwertonSA/Onebitflix-Backend
cd onebitflix
```

### 2️⃣ Instalar as dependências
```bash
npm install
```

### 3️⃣ Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as seguintes configurações:
```env
DATABASE_URL=postgresql://usuario:senha@host:porta/database?sslmode=require
ADMINJS_COOKIE_PASSWORD=sua_senha_segura
JWT_KEY=chave_para_token
NODE_ENV=production
```

### 4️⃣ Rodar as migrações do banco de dados
```bash
npx sequelize db:migrate
```

### 5️⃣ Rodar a aplicação
```bash
npm start
```
A aplicação será executada em `http://localhost:3000`

## 🔑 Acesso ao Painel Administrativo  
O painel administrativo pode ser acessado através do seguinte link:  
👉 **[OneBitFlix - Login](https://onebitflix-backend-qqh2.onrender.com/)**  

### 🔐 Credenciais de Acesso
- **Admin:** `admin@email.com / 123456` (Possui acesso total ao sistema - CRUD completo)

## 📌 Estrutura do Projeto
```
📂 src/
 ├── adminjs/       # Configuração do AdminJS
 ├── config/        # Configurações gerais
 ├── controllers/   # Lógica de controle das rotas
 ├── database/      # Configuração do banco de dados
 ├── models/        # Modelos Sequelize
 ├── routes/        # Definição das rotas
 ├── middleware/    # Middlewares de autenticação e validação
 ├── server.js      # Inicialização do servidor
```

## ✨ Contribuições
Sinta-se à vontade para abrir issues e enviar pull requests!

## 📄 Licença
Este projeto está sob a licença MIT.

---

Feito com ❤️ por [Ewerton Silva de Abreu](https://github.com/seu-usuario) 🚀

