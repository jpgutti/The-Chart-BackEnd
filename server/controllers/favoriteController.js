const express = require('express');
const User = require("../models/user");

const router = express.Router();

router.post('/favorite', async (req, res) => {

    const { _id, favorite } = req.body;

    try{
        const user = await User.findById({ _id });

        if(!user){
            return res.status(400).send({ error: "User not found" });
        }

        // user.updateOne({_id}, {$push: {favoriteList: favorite}}, (a, b) => {
        //     if(a){
        //         console.log("a", a)
        //     } else {
        //         console.log("b", b)
        //     }
        // })

        // user.save((e,s) => {
        //     if(e){
            //     } else {
                //         res.send({error: s})
                //     }
                // })
                //   
        user.favoriteList = [...user.favoriteList, favorite];

        user.save(function(err){
            if(err){
                 console.log(err);
                 return;
            }
      
            res.send({ user });
      });
                 

    } catch(err){
        console.log(err)
        return res.status(400).send({error: err})
    }

}) 

module.exports = app => app.use('/user', router)