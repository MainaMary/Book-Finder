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
        console.log(index / 7);
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

  // if (input === "") {
  //   const heading = document.getElementById("results");
  //   heading.innerHTML = "Please try again ";
  //   document.getElementById("main-div").innerHTML = "";
  // } else {
  //   const key = "AIzaSyCTrQa3w1nd0j5HMIWlaDZpq9M6cw1gN_0";

  //   const url = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyCTrQa3w1nd0j5HMIWlaDZpq9M6cw1gN_0`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  if (input.trim() === "") {
    const heading = document.getElementById("results");
    heading.innerHTML = "Please try again ";
    document.getElementById("main-div").innerHTML = "";
  } else {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(data.items);
        const arr= data.items.map(item=>{
          const categories = item.volumeInfo.categories;
          // console.log(categories.toString());
          // const randomSearch = Math.floor(Math.random() * Math.floor(6));
          // console.log(randomSearch);

        })
        displayData(data);
        displayCategory(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
});
const displayCategory = (data)=>{
  data.items.map(elem=>{
    console.log(elem.volumeInfo.categories);
  })

}
const displayData = (data) => {
  const input = document.getElementById('user-input').value

  document.getElementById("results").innerHTML= `Search results for ${input}`
  document.getElementById("main-div").innerHTML = data.items.map(
    (elem, index) =>
    
     `
    
    <div class ='book-wrapper'>
      <img src="${elem.volumeInfo.imageLinks.smallThumbnail}"/>
      <p>Title: ${elem.volumeInfo.title}</p>
      <p>Author: ${elem.volumeInfo.authors}</p>
      <a href="${elem.volumeInfo.infoLink}" target="blank">Read More</a>
 
  
   </div>
`
);
  document.getElementById('user-input').value=" "
  // const arr = data.items.map((elem, index) => {
  //   document.getElementById("results").innerHTML = " "
  //   console.log(elem.volumeInfo.title);

  //   const authors = elem.volumeInfo.authors;
  //   authors.map((author, index) => {
  //     console.log(author);
  //   });

  //   const wrapper = document.createElement("div");
  //   wrapper.classList.add("details");
  //   const title = document.createTextNode(
  //     `Book title: ${elem.volumeInfo.title}`
  //   );
  //   const titleContainer = document.createElement("div");
  //   titleContainer.appendChild(title);

  //   image.setAttribute("src", `${elem.volumeInfo.imageLinks.smallThumbnail}`);

  //   //mainDiv
  //   wrapper.appendChild(document.createElement("image"));
  //   wrapper.appendChild(titleContainer);
  // });
};

const text = document.querySelector(".text");
const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  text.classList.toggle("active");
  if (btn.innerHTML == "Read More") {
    btn.innerHTML = "Read Less";
  } else {
    btn.innerHTML = "Read More";
  }
});
