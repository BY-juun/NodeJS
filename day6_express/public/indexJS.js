
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");

btn1.addEventListener("onClick",()=>{
    try{
        window.open('http://localhost:3000/1');
    }catch(error){
        console.error(error);
    }
})