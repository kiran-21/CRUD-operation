const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')

const mongoose = require('mongoose')
// const g2 = require('./models/g2info')
// const g2info = require('./models/g2info')
// const basicdata = require('./models/basicdata')

mongoose.connect('mongodb+srv://kiranksr:Kirsrl%401121@freedb.kmuom4v.mongodb.net/'),{useNewUrlParser: true}



// mongodb+srv://kiranksr:<password>@freedb.kmuom4v.mongodb.net/

app.listen(3002, ()=>{
 console.log("app is running on 3002")
})

const usermodel = require('./models/user')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));




app.get('/',(req, res)=>{
    res.render('register')
})

app.get('/userlist',(req, res)=>{
    res.render('userList', {user: null, userfound: false, errorMessage: null})
})




//Create Data in the Database
app.post('/newuser', async (req,res)=>{
    console.log({ body: req.body, req });
    console.log("post is working, but data not passing")
    await usermodel.create(req.body);
    res.redirect('/')
    });

// Read the Data from the Database
app.get('/users', async (req, res) => {
        try {
            const users = await usermodel.find();
            res.render('userList', { users });
        } catch (error) {
            console.error("Error fetching users from the database", error);
            res.status(500).send("Internal Server Error");
        }
    });
// Update the Data from the Database
app.post('/updateuser/:id', async (req, res) => {
        try {
            await usermodel.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/users');
        } catch (error) {
            console.error("Error updating user in the database", error);
            res.status(500).send("Internal Server Error");
        }
    });
    
// Route to delete a user
app.post('/deleteuser/:id', async (req, res) => {
        try {
            await usermodel.findByIdAndDelete(req.params.id);
            res.render('userList');
        } catch (error) {
            console.error("Error deleting user from the database", error);
            res.status(500).send("Internal Server Error");
        }
    });