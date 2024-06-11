//2 passo 
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');

const app = express()

// Conectar ao banco de dados
connectDB()

// Middleware para analisar JSON
app.use(express.json({extend: false}))

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

app.get('/', (req, res) => res.send('API Running'))

// Definir rotas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/products/:id', require('./routes/products'))
app.use('/api/payments', require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))