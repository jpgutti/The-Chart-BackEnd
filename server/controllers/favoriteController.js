// const express = require('express');
// const User = require("../models/User");

// const router = express.Router();

// router.post('/favorite', async (req, res) => {

//     const { _id, favorite } = req.body;

//     try{
//         const user = await User.findById({ _id });

//         if(!user){
//             return res.status(400).send({ error: "User not found" });
//         }

//         user.favoriteList.push(favorite);


//         res.send({ user })


//     } catch(err){
//         console.log(err)
//         return res.status(400).send({error: err})
//     }

// }) 

// module.exports = app => app.use('/user', router)