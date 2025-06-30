const express = require('express');

const dotenv = require('dotenvg)'; 
dotenv.config();

const cors = require('cors');

const authRoutes = require('./routes/auth');
 
const taskRoutes = require('./routes/tasks');
 
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

 const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
