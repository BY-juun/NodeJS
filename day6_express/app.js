const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cookieParser = require("cookie-parser");

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/",(req,res)=>{
    res.send("hello express!");
});

app.get('/category/:name',(req,res)=>{
    res.send(`hello ${req.params.name}`);
    console.log(`${req.params.name}`);
});

app.get('/about',(req,res)=>{
    res.send("about");
});

app.use((req,res,next)=>{
    res.status(404).send("404지롱");
});

app.use((err,req,res,next)=>{ //에러 미들 웨어
    console.error(err);
    res.send("에러 발생")
});

app.listen(app.get('port'),()=>{
    console.log('익스프레스 서버 실행');
});