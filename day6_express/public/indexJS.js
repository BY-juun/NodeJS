
const btn1 = document.getElementById("page1");
const btn2 = document.getElementById("page2");
const btn3 = document.getElementById("page3");

btn1.addEventListener("click",async ()=>{
    try{
        await axios.get("/1")
    }catch(error){
        console.error(error);
    }
})