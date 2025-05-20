const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const store = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions'
});

store.sync().then(() => {
  console.log('Session store synced');
}).catch(err => console.error('Session store sync error:', err));

app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 }
}));

app.use('/api', authRoutes);

app.get('/', (req, res) => res.send('Server running'));

sequelize.sync({ alter: true }).then(() => {
  app.listen(4000, () => console.log('Server running on port 4000'));
}).catch(err => console.error('Sequelize sync error:', err));
