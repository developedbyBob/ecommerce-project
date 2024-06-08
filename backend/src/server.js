const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Conectar ao banco de dados
connectDB()

// Middleware para analisar JSON
app.use(express.json({extend: false}))

app.get('/', (req, res) => res.send('API Running'))

// Definir rotas
// Exemplo: app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))