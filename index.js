const express = require('express');

const connectDB = require('./db');

require("dotenv").config(); //How to have access to .env file content.

const app = express();

// middleware example
//Middlewares are supposed to be positioned before the routes.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(express.json()); //middleware to parse JSON request body

//Get http method

app.get('/', (request, response) => {
    response.send('Welcome to my API');
})

app.get('/about', (req, res) => {
    res.send('This is the about page');
})

app.get('/profile', (request, response) => {
    response.send('This is my profile');
})

app.get('/users/:id', (req, res) => {
    const userID = req.params.id;
    res.send(`User ID: ${userID}`);
});

app.get('/search', (req, res) => {
    const query = req.query.keyword;
    res.send(`search keyword: ${query}`);
})

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice'},
        { id: 2, name: 'Bob'},
        { id: 3, name: 'Charlie'},
    ];
    res.json(users);
});


//post http method
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log('Received user data:', newUser);
    res.status(201).json({
        message: 'user created successfully',
        user: newUser
    })

})

app.post('/api/todo', (req,res) => {
    const newTodo = req.body;
    console.log('Received todo data:', newTodo);
    res.status(201).json({
        message: 'todo created successfully',
        todo: newTodo
    })
    
})

const PORT = process.env.PORT 

// const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})

connectDB();
