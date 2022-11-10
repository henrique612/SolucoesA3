const express = require('express');
const cors = require('cors');
const configurations = require('./src/configurations/firebase');
const firebase = require('firebase');
const { request } = require('express');

firebase.initializeApp(configurations);
const database = firebase.firestore();
const User = database.collection("users");

const app = express();
app.use(express.json());
app.use(cors());

/*
const pool = firebase.createPool({
    host: DB_HOST,
    user: DB_id,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });*/

//Registro de usuário
app.post('/user/register', async (req, res) => {
    const data = req.body;
    await User.add(data);
    res.status(201).send({ msg: "Usuário criado com sucesso!" });
})

app.get('/get-all-users', async (req, res) => {
    const snapshot = await User.get();
    const listUsers = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
    res.send(listUsers);
})

//Atualização de Usuário

app.put('/user/update/:id', async (req, res) => {
    const id = req.params.id;
    await User.doc(id).update(req.body);
    res.send({msg: "Usuário atualizado com sucesso !"});
})

app.listen(3000, () => {
    console.log("Servidor ativo http://localhost:3000");
})

//Login do usuário

