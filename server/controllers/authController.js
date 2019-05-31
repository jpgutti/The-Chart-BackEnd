const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt  = require("jsonwebtoken");

const authConfig = require('../config/auth');

const router = express.Router();

function genToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async (req, res) => {

    const { email } = req.body

    try {

        if (await User.findOne({email})) {
            return res.status(400).send({ error: "Duplicated Entry"})
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user, token: genToken({ id: user.id })});
    } catch (err){
        console.log(err)
        return res.status(400).send({error: "Registration Failed"})
    }
});

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    try{
        if(!user){
            return res.status(400).send({ error: "User not found" });
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({ error: "Invalid password" });
        }

        user.password = undefined;

        res.send({ user, token: genToken({ id: user.id }) });

    } catch (err){
        console.log(err)
        return res.status(400).send({error: "Something Exploded :("})
    }

});

module.exports = app => app.use('/auth', router);