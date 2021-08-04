//Navbar section

window.addEventListener('scroll', ()=>{
  const navbar = document.querySelector('.main-navbar')

  navbar.classList.toggle("sticky", window.scrollY > 0)
  console.log('scroll')
})


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
  }else{
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      
      // const arr= data.items.map(item=>{
      //   const categories = item.volumeInfo.categories;
      //   // console.log(categories.toString());
      //   // const randomSearch = Math.floor(Math.random() * Math.floor(6));
      //   // console.log(randomSearch);

      // })
      displayData(data)
      
      
    })
    .catch((err) => {
      // console.log(err);
    });

  }
   
  

  })

  // const displayCategory = (data)=>{
  //   console.log('category');
  // }

  const displayData = (data) => {
    const input = document.getElementById('user-input').value
  
   document.getElementById("results").innerHTML= `Search results for ${input}`
  
   
  const newDiv= document.createElement('div')
  
  newDiv.innerHTML =data.items.map(
    (elem, index) =>
    //   const strlength= elem.searchInfo.textSnippet.strlength;
    //   if(!strlength > 10){
    //  return elem.searchInfo.textSnippet
    //   }else{
    //     const newStr = elem.searchInfo.textSnippet
    //   }
  
  
      `
    
      <div class ='book-wrapper'>
        <img src="${elem.volumeInfo.imageLinks.smallThumbnail}"/>
        <p>Title: ${elem.volumeInfo.title}</p>
        <p>Author: ${elem.volumeInfo.authors}</p>
     
        <p> Info: ${elem.searchInfo.textSnippet}</p>
       
        <a href="${elem.volumeInfo.infoLink}" target="blank">  link: Read More</a>
        <button class="btn-add">Add to collection</button>
    
    
     </div>
    `
    
   
     
  );
  const btn = document.createElement('button')
  const txt= document.createTextNode('Add to collection')
  newDiv.appendChild(btn.appendChild(txt))
  document.getElementById('main-div').appendChild(newDiv);
  
   const addToCart= document.querySelectorAll('.btn-add');
   let adjusted = []


   const arrItems= data.items.map((el, index)=>{
  
    const obj ={
      img:  el.volumeInfo.imageLinks.smallThumbnail,
      title:el.volumeInfo.title,
       authors: el.volumeInfo.authors,
       textt: el.searchInfo.textSnippet,
       link: el.volumeInfo.infoLink
    }
adjusted.push(obj)
   })
  //  console.log(adjusted)

   for(i =0; i< addToCart.length; i++){
     
    console.log(adjusted[i])
      
     addToCart[i].addEventListener('click', ()=>{
      
       addBooks(adjusted[i]);
     })
   }
    document.getElementById('user-input').value=" "
    document.getElementById("results").innerHTML = " "
   
  }
 
  
 // const arr = data.items.map((elem, index) => {
    // document.getElementById("results").innerHTML = " "
    // console.log(elem.volumeInfo.title);

    // const authors = elem.volumeInfo.authors;
    // authors.map((author, index) => {
    //   console.log(author);
    // });

    // const wrapper = document.createElement("div");
    // wrapper.classList.add("details");
    // const title = document.createTextNode(
    //   `Book title: ${elem.volumeInfo.title}`
    // );
    // const titleContainer = document.createElement("div");
    // titleContainer.appendChild(title);
    // const image= document.createElement('img')

    //  const img= image.setAttribute("src", `${elem.volumeInfo.imageLinks.smallThumbnail}`);

    //mainDiv
//  const img= image.setAttribute("src", `${elem.volumeInfo.imageLinks.smallThumbnail}`);
// wrapper.appendChild(img);
    // wrapper.appendChild(titleContainer);
    //document.getElementById('main-div').appendChild(wrapper)
 // });


const checkCollection =()=>{
let collection= localStorage.getItem('collectionNumber')
if(collection){
  document.querySelector('.count').textContent = collection
}

}
  

const addBooks =(arrItems)=>{
  //console.log('Add to collection')
  const {img, textt, link, authors, textt}= arrItems
 console.log(`The product clicked is ${img} `)

  //show the book collection wrapper
  const bookWrapper= document.querySelector('.cart');
  bookWrapper.classList.add('show-cart')

  

  let collection= parseInt(localStorage.getItem('collectionNumber'))
 // console.log(typeof collection)

//check if there is any item in the localstorage
  if(!collection){
    localStorage.setItem('collectionNumber', 1)
    let bookCount=document.querySelector('.count').textContent = collectionNumber
  }else{
    localStorage.setItem('collectionNumber', collection + 1)
    document.querySelector('.count').textContent= collection + 1;
    
  }        
}
  

 
  


  
    
  

 


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

