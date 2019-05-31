const express = require('express');
const axios = require('axios')

const baseUrl = require('../config/baseUrl');

const router = express.Router();

router.get('/stackflow', async (req, res) => {

    const { query } = req
    
    try{
        const stack = await axios.get(`${baseUrl.stackflow}&pagesize=${query.perPage}`);

        return res.send({
            stack: {
                data:stack.data,
                origin: "Stack"
            }
        })
    } catch(err){
        return res.status(400).send({ error: err})
    }
    
});

router.get('/github', async (res, req) => {

    try{
        const header = {
            "Accept": "application/vnd.github.mercy-preview+json"
        }

        const github = await axios.get(`${baseUrl.github}`, header);

    } catch(err){
        return res.status(400).send({ error: err})
    }

});



module.exports = app => app.use("/api", router)