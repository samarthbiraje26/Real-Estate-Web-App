const mongoose = require('mongoose');
const uri = 'mongodb+srv://samarthbiraje811:<Samarth26>@rbrickktech.cynwqpl.mongodb.net/RBrickkTech?retryWrites=true&w=majority&appName=RBrickkTech'; // Replace with your full MONGO_URI
mongoose.connect(uri)
  .then(() => console.log('Connected successfully'))
  .catch(err => console.log('Error:', err));