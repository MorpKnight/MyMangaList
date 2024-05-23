const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/Auth.routes');
const detailRoutes = require('./src/routes/Detail.routes');
const rankRoutes = require('./src/routes/Rank.routes');
const homeRoutes = require('./src/routes/Home.routes');
const profileRoutes = require('./src/routes/Profile.routes');

const app = express();
require('dotenv').config();
require('./src/config/db.config').connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/auth', authRoutes);
app.use('/detail', detailRoutes);
app.use('/rank', rankRoutes);
app.use('/home', homeRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});