const express = require('express');
const path = require("path");

const router = express.Router();

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'));
});
router.get('/1',(req,res)=>{
    console.log("ff");
    res.sendFile(path.join(__dirname,'../views/index1.html'));
});

module.exports = router;