let API = " http://localhost:8000/card"
let  inpLogo = document.querySelector(".section__add-logo")
let  inpName = document.querySelector(".section__add-name")
let  inpImg = document.querySelector(".section__add-img")
let  inpText = document.querySelector(".section__add-text")
let accordionHeader = document.querySelector(".accordion-header")

let headerUser = document.querySelector(".header-user")
let cardContainer = document.querySelector(".card-container")



// NAVBAR

let searchBtn = document.querySelector(".search-btn")


// modal
let modalLogo = document.querySelector(".section__add-logo")
let modalName = document.querySelector(".section__add-name")
let modalImg =document.querySelector(".section__add-img")
let modalText = document.querySelector(".section__add-text")
let modalBtn = document.querySelector(".section__add-btn-add")




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


// ! CREATE START

async function createPost(obj){
  await fetch(API, {
       method: "POST",
       headers: {
           "Content-type": "application/json; charset=utf-8"
       },
       body: JSON.stringify(obj)
           
   }).then((res) =>res.json())
  //  readProducts()
}

modalBtn.addEventListener("click", ()=>{
  if (!inpName.value.trim() 
  || !inpLogo.value.trim()
   || !inpImg.value.trim()
    || !inpText.value.trim()
    ){
      alert("Заполните поля!")
      return;
  }
  let obj ={
      name: inpName.value,
      logo: inpLogo.value,
      img: inpImg.value,
      text: inpText.value,
  }
  inpName.value = "" 
  inpLogo.value = ""
   inpImg.value = ""
    inpText.value = ""
  createPost(obj)
})


// ? CREATE END

// ! READ START 

async function readPosts(){
  let data = await fetch(`${API}?q=&_page=&_limit=&`).then((res)=>res.json())
  
  cardContainer.innerHTML =""
  data.forEach(item => {
    
    console.log(item);
      cardContainer.innerHTML += `<div class="card">
      <div class="card-user">
        <div class="card-user-img" style="background-image: url(${item.logo})">
        </div>
        <p>${item.name}</p>
      </div>
      <div class="card-img">
        <img
          src= ${item.img}
          width="100%"
          height=""
          alt=""
        />
      </div>
      <div class="card-items">
        <img
          src="file:///C:/Users/Admin/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/makers/JS/WEEK%208/lesson%201%20project%20with%20mentor/png-clipart-heart-computer-icons-symbol-heart-love-text-removebg-preview.png"
          width="30px"
          height="25px"
          alt=""
        />

        <img
          src="https://cdn-icons-png.flaticon.com/512/2526/2526496.png"
          width="25px"
          height="20px"
          alt=""
        />
      </div>
      <div class="card-text">
        <h6>${item.name}</h6>
        <p>
      ${item.text}
        </p>
      </div>
      <div class="card-inp-btn">
        <input
          class="card-inp-comment"
          type="text"
          placeholder="Добавьте комментарий..."
        /><button class="card-btn">Опубликовать</button>
      </div>
    </div>`
  })
}
readPosts()

// ? READ END








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