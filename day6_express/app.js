const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const multer = require('multer');
const cookieParser = require("cookie-parser");

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(cookieParser("by_juun_password"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'by_juun_password',
    cookie : {
        httpOnly : true,
    },
    name : "connect.sid",
}));
app.use(multer().array());


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get('/1',(req,res)=>{
    res.sendFile(path.join(__dirname,"index1.html"));
});

app.get('/2',(req,res)=>{
    res.sendFile(path.join(__dirname,"index2.html"));
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