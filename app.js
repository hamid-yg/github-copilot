const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const User = require('./model');
const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }).then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));

app.post('/users', async (req, res) => {
    const newUser = new User(req.body); // Crée une instance du modèle User avec les données de la requête
    try {
        await newUser.save(); // Sauvegarde l'utilisateur dans la base de données
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.route('/').get((req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
