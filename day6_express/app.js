const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const cookieParser = require("cookie-parser");

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const { allowedNodeEnvironmentFlags } = require('process');


app.set('port',process.env.PORT || 3000);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(morgan('dev'));
app.use('/',express.static(path.join(__dirname,'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
    },
    name : "connect.sid",
}));
app.use(multer().array());

app.use('/',indexRouter);
app.use('/user',userRouter);

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