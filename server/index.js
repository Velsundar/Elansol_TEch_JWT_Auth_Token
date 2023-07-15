// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create an instance of Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sundaravel:1234@cluster0.hvamb56.mongodb.net/Login_Logout_JWT?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Define user model
const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;


  if (!name || !dateOfBirth || !email || !password) {
    return res.status(300).send({ message: "please enter all fields" });
  }
  try {
    const existinguser = await User.findOne({ email: email });
    console.log(existinguser)
    if (existinguser) {
      return res.status(409).send({ message: "user already exists" });
    } else {
      const newUser = await User.create({ name, dateOfBirth, email, password });
      console.log(newUser)
      return res.status(200).send({ user: newUser, message: "user created" });
    }
  }
  catch (err) {
    console.log(err)
    return res.status(500).send({ error: err });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email, !password) {
      return res.status(301).send({ message: "Entere all fields" });
    }
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).send({ message: "user does not exists" });
    }
    // Compare passwords
    if (password != user.password) {
      return res.status(404).send({ message: "Email or password incorrect" });
    }
    const token = jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(200).send({ message: "User logged in ", token: token });
  } catch (error) {
    return res.status(500).send({ err: err });
  }
});

//GET HOme
app.get('/home', async (req,res) => {
  console.log(req)
  try{
      const result = await User.find();
      res.status(200).json(result);
      }
  catch(err){
      res.status(500).send({err});
  }
})

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});
// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}
// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});