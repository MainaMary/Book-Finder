//Navbar section

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".main-navbar");

  navbar.classList.toggle("sticky", window.scrollY > 0);
  console.log("scroll");
});

const openNavbar = () => {
  const menu = document.querySelector(".menu");
  const ul = document.getElementById("nav__link");
  const li = document.querySelectorAll("#nav__link li");

  menu.addEventListener("click", () => {
    ul.classList.toggle("open");
    menu.classList.toggle("change");

    //animation delay on the navbar links
    // for( i=0; i< li.length; li++)
    li.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `animationLinks 1s ease forwards ${
          index / 7 + 1
        }s`;
        // console.log(index / 7);
      }
    });
  });
};
openNavbar();

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("user-input").value;
  console.log(input);
  if (input.trim() === "") {
    const heading = document.getElementById("results");
    heading.innerHTML = "Please try again ";
    document.getElementById("main-div").innerHTML = "";
  } else {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then((response) => response.json())
      .then((data) => {
        displayData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// const displayCategory = (data)=>{
//   console.log('category');
// }
const modal= document.querySelector('.modal__container')
const closeModal = document.querySelector('.close__modal')
const displayData = (data) => {
  const input = document.getElementById("user-input").value;

  document.getElementById("results").innerHTML = `Search results for ${input}`;

  const newDiv = document.createElement("div");
  newDiv.setAttribute('class','book-container')

  const bookCollection= []

  data.items.forEach((elem, index) => {
    const html = `
  
    
      <img src="${elem.volumeInfo.imageLinks.smallThumbnail}"/>
      <p>Title: ${elem.volumeInfo.title}</p>
      <p>Author: ${elem.volumeInfo.authors}</p>
   
      <p> Info: ${elem.searchInfo.textSnippet}</p>
     
      <a href="${elem.volumeInfo.infoLink}" target="blank">  link: Read More</a>

   
  `;
    const div = document.createElement("div");
    div.setAttribute("id", `${index}`);
    div.setAttribute("class", "bookItem");

    const content = document.createElement("div");
    content.setAttribute('class', 'book-wrapper')
    content.innerHTML = html;
    const button = document.createElement("button");
    button.setAttribute("class", "btn-add");

    button.innerText = "Add to collection";
    content.appendChild(button);
    div.appendChild(content);
    
   
    button.addEventListener("click", (e) => {
      //console.log(elem);
      bookCollection.push(elem)
     const indexItem= bookCollection.map((item, index)=>{
        //console.log(item)
      
       return item
      
     })
     
     modal.classList.add('show')
     let bookObj= JSON.parse(localStorage.getItem('bk'))
     
     //console.log(bookObj)
     
    
     localStorage.setItem('bk', JSON.stringify(indexItem));
     
     showModal(bookObj)
     
    });


    newDiv.appendChild(div);
    //console.log(bookCollection);
  });
  
 
  document.getElementById("main-div").appendChild(newDiv);

  
  




  document.getElementById("user-input").value = " ";
  document.getElementById("results").innerHTML = " ";
  
};

const showModal = (bookObj)=>{
  
  
  closeModal.addEventListener('click', ()=>{
    modal.classList.remove('show')
  })
  bookObj.map((item, index)=>{
    const items =`
    <img class='modal__image'src="${item.volumeInfo.imageLinks.smallThumbnail}"/>
    <p class='modal__title'>"${item.volumeInfo.title}"</p>
    <p class='modal__authors'>"${item.volumeInfo.authors}"</p>
    `;

    const modalDiv= document.createElement('div')
    const modalCont = document.createElement('div')
    modalCont.setAttribute('class',"modal__div")
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn__delete");

    btn.innerText = "Delete";
    modalCont.innerHTML = items
    
    modalCont.appendChild(btn);
    modalDiv.appendChild(modalCont)
    document.querySelector('.modal__wrapper').appendChild(modalDiv)
 })

}


//  const img= image.setAttribute("src", `${elem.volumeInfo.imageLinks.smallThumbnail}`);

//mainDiv
//  const img= image.setAttribute("src", `${elem.volumeInfo.imageLinks.smallThumbnail}`);
// wrapper.appendChild(img);
// wrapper.appendChild(titleContainer);
//document.getElementById('main-div').appendChild(wrapper)
// });

const checkCollection = () => {
  let collection = localStorage.getItem("collectionNumber");
  if (collection) {
    document.querySelector(".count").textContent = collection;
    console.log("colection");
  }
};

const addBooks = (arrItems) => {
  //console.log('Add to collection')
  const { img, link, authors, textt } = arrItems;
  console.log(`The product clicked is ${img} `);

  //show the book collection wrapper
  const bookWrapper = document.querySelector(".cart");
  bookWrapper.classList.add("show-cart");

  let collection = parseInt(localStorage.getItem("collectionNumber"));
  // console.log(typeof collection)

  //check if there is any item in the localstorage
  if (!collection) {
    localStorage.setItem("collectionNumber", 1);
    let bookCount = (document.querySelector(".count").textContent =
      collectionNumber);
  } else {
    localStorage.setItem("collectionNumber", collection + 1);
    document.querySelector(".count").textContent = collection + 1;
  }
};

checkCollection();
const text = document.querySelector(".text");
const btnRead = document.querySelector(".btn");

btnRead.addEventListener("click", (e) => {
  text.classList.toggle("active");
  if (btnRead.innerHTML == "Read More") {
    btnRead.innerHTML = "Read Less";
  } else {
    btnRead.innerHTML = "Read More";
  }
});
