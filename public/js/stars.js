let b1 = document.querySelector(".b1");
let b2 = document.querySelector(".b2");
let b3 = document.querySelector(".b3");
let b4 = document.querySelector(".b4");
let b5 = document.querySelector(".b5");

let range = document.querySelector("#rating"); 

range.style.display = "none";

b1.addEventListener("click" , () => {
    
    b1.style.color = "rgb(0, 148, 197)";
    b2.style.color = "black";
    b3.style.color = "black";
    b4.style.color = "black";
    b5.style.color = "black";
    range.value = 1;
})

b2.addEventListener("click" , () => {
    
    b2.style.color = "rgb(0, 148, 197)";
    b3.style.color = "black";
    b4.style.color = "black";
    b5.style.color = "black";
    range.value = 2;
})

b3.addEventListener("click" , () => {
    
    b2.style.color = "rgb(0, 148, 197)";
    b3.style.color = "rgb(0, 148, 197)";
    b4.style.color = "black";
    b5.style.color = "black";
    range.value = 3;
})

b4.addEventListener("click" , () => {
    
    b2.style.color = "rgb(0, 148, 197)";
    b3.style.color = "rgb(0, 148, 197)";
    b4.style.color = "rgb(0, 148, 197)";
    b5.style.color = "black";
    range.value = 4;
})

b5.addEventListener("click" , () => {

    b2.style.color = "rgb(0, 148, 197)";
    b3.style.color = "rgb(0, 148, 197)";
    b4.style.color = "rgb(0, 148, 197)";
    b5.style.color = "rgb(0, 148, 197)";
    range.value = 5;
})