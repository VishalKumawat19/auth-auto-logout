const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors')

const corsOptions = {
    origin: 'https://auth-auto-logout-ui.vercel.app',
    credentials: true
  }
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

module.exports= app