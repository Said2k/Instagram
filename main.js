let  inpLogo = document.querySelector(".section__add-logo")
let  inpName = document.querySelector(".section__add-name")
let  inpImg = document.querySelector(".section__add-img")
let  inpText = document.querySelector(".section__add-text")
let accordionHeader = document.querySelector(".accordion-header")

let headerUser = document.querySelector(".header-user")


// ! LOG IN START

headerUser.addEventListener("click", ()=>{
  let logIn = prompt("Введите пароль")
  let section = document.querySelector(".section")
  if(logIn == "admin"){
    section.style.display = "flex"
  }else if (logIn == "exit"){
    section.style.display = "none"
  }else{
    alert("Error")
  }

})

// ? LOG IN END








// ! ACCORDION START

accordionHeader.addEventListener("click",()=>{
    accordionHeader.classList.toggle("active")
    let accordionBody = document.querySelector(".accordion-body")
    if(accordionHeader.classList.contains("active")){
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    }else{
        accordionBody.style.maxHeight = 0
    }
})

// ? ACCORDION END