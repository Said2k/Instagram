let API = " http://localhost:8000/card"
let API2 = "http://localhost:8000/comments"
let  inpLogo = document.querySelector(".section__add-logo")
let  inpName = document.querySelector(".section__add-name")
let  inpImg = document.querySelector(".section__add-img")
let  inpText = document.querySelector(".section__add-text")
let accordionHeader = document.querySelector(".accordion-header")

let headerUser = document.querySelector(".header-user")
let cardContainer = document.querySelector(".card-container")

// COMMENT

let comments = document.querySelector(".comments") 







// инпут и переменная для пойска
let inpSearch =document.querySelector(".search-txt")
let searchValue=inpSearch.value;

//paginate
let prevBtn=document.querySelector('#prev-btn');
let nextBtn=document.querySelector('#next-btn');
let currentPage = 1;
let limit = 1;

//filter
let form=document.querySelector("form");
let category = "all";






// NAVBAR

let searchBtn = document.querySelector(".search-btn")


// modal
let modalLogo = document.querySelector(".section__add-logo")
let modalName = document.querySelector(".section__add-name")
let modalImg =document.querySelector(".section__add-img")
let modalText = document.querySelector(".section__add-text")
let modalBtn = document.querySelector(".section__add-btn-add")

//  EDIT INPUT 

let inpEditName = document.querySelector(".window__edit_name");
let inpEditLogo = document.querySelector(".window__edit_logo");
let inpEditText = document.querySelector(".window__edit_text");
let inpEditImg = document.querySelector(".window__edit_img");

let btnEditModal = document.querySelector(".window__edit_btn-save");
let btnCloseModal = document.querySelector(".window__edit_close")
let mainModal = document.querySelector(".main-modal")


// ! LOG IN START

headerUser.addEventListener("click", ()=>{
  let logIn = prompt("Введите пароль")
  let section = document.querySelector(".section")
  let cardEditDel = document.querySelector(".card-edit-delete")
  if(logIn == "admin"){
    console.log("fgh");
    section.style.display = "flex"
    cardEditDel.style.display = "block"
  }else if (logIn == "exit"){
    section.style.display = "none"
    cardEditDel.style.display = "none"

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
let comm =[  {
  "comm1": "dw",
  "postId":1,
  "id": 1
},
{
  "comm1": "dwd",
  "postId":2,
  "id": 2
}]

// ? CREATE END

// ! READ START 
let page = 0
async function readPosts(){
  let data = await fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=${limit}&${category === "all" ? "" : "category=" + category}`).then((res)=>res.json())
  
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
      <div class ="card-icons">
      <div class="card-items">
        <img class="like"
          src="file:///C:/Users/Admin/OneDrive/%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB/makers/JS/WEEK%208/lesson%201%20project%20with%20mentor/png-clipart-heart-computer-icons-symbol-heart-love-text-removebg-preview.png"
          width="30px"
          height="25px"
          alt="" onclick=" like()"
        />
        <p class="like-num"></p>

        <img class="direct"
          src="https://cdn-icons-png.flaticon.com/512/2526/2526496.png"
          width="25px"
          height="20px"
          alt=""
        />
      </div>
      <div class="card-edit-delete">
      <img class="edit-icon" src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" width="20px" class="read_del" onclick="deletePost(${item.id})" />
            <img class="edit-icon" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" width="20px" onclick=" editHandle(${item.id})" />
      </div>
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
        /><button class="card-btn" onclick="createCom(${item.id})">Опубликовать</button>
        
      </div>
    </div>`
  })
  pageTotal()
}
readPosts()

// ? READ END


// ! LIKE START
let count = 0
 function like(){
  let likeBtn =  document.querySelector(".like")
  let num = document.querySelector(".like-num")
likeBtn.style.background = "red"
count+=1
num.innerHTML = `${count}`

}

// ? LIKE END


 // ! =========== EDIT START ==========

 async function editPosts(id,editeObj){
  if (!inpEditName.value.trim() 
  || !inpEditLogo.value.trim()
   || !inpEditImg.value.trim()
    || !inpEditText.value.trim() ){
      alert("Заполните поля!")
      return;
  }
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editeObj),

  });
  readPosts()
}
 
let editId = ""
async function editHandle(id){
  mainModal.style.display = "block"
   let data = await fetch(`${API}/${id}`).then((res)=>res.json())
  // console.log(data);
  inpEditName.value=data.name
  inpEditLogo.value = data.logo
  inpEditImg.value=data.img
  inpEditText.value = data.text
  editId = data.id;
}

btnEditModal.addEventListener("click",()=>{
  let editObj = {
    name: inpEditName.value,
    logo: inpEditLogo.value,
    img: inpEditImg.value,
    text: inpEditText.value,
  }
  console.log(editObj);
  editPosts(editId, editObj)
  mainModal.style.display = "none"
  // readProducts()
})


btnCloseModal.addEventListener("click",()=>{
  mainModal.style.display = "none"
})


//   ? ============== EDIT END ==========






//! =============== DELETE START ===========

async function deletePost(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  readPosts();
}

//? ======== DELETE END ==============












// ! paginate start
let countPage = 1
async function pageTotal(){
    let data = await fetch(`${API}?q=${searchValue}`).then((res)=> res.json());
    // console.log(data.length)
    countPage = Math.ceil(data.length / limit);
}

prevBtn.addEventListener('click', ()=>{
    if(currentPage<=1)return;
    currentPage--;
    readPosts();
});
nextBtn.addEventListener('click', ()=>{
    if(currentPage>=countPage)return;
    currentPage++;
    readPosts();
});
//? paginate end

//! ====================SEARCH START===============
inpSearch.addEventListener('input', (e)=>{
  searchValue= e.target.value;
  readPosts()
})
//? ====================SEARCH END==================






// ! COMMETNT START



// ! CREATE START
async function createCom(){
  let  inpCom = document.querySelector(".card-inp-comment")
if(!inpCom.value.trim()){
  alert("Напишите комментарий")
}
let objCom = {
  comm1: inpCom.value,
}
inpCom = ""

  
  await fetch(API2, {
       method: "POST",
       headers: {
           "Content-type": "application/json; charset=utf-8"
       },
       body: JSON.stringify(objCom)
           
   }).then((res) =>res.json())
   readCom()
}

// ? CREATE END


// ! READ START
async function readCom(){
  let data = await fetch(`${API2}?q=&_page=&_limit=&`).then((res)=>res.json())
  
  console.log(data)
  
  comments.innerHTML =""
  data.forEach(item => {
    
    // console.log(item);
    if(inpCom.value !=""){
      comments.innerHTML += ` <p>NONANE :${item.comm1}</p>`}
  })
}
readCom()
// ? READ END


// ? COMMENT END








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