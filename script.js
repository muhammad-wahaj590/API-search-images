const accessKey = "iIkkohwx9y7gHIGrcxKUa9Y_fCeGVJUfrqQKdVK04rI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";  //to store all input data
let page = 1;        //sett by default page no.1

async function searchImages(){  //we use fetch and response that;s why we use async function
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`//dunamic url based on inputData

    const response = await fetch(url);
    const data = await response.json();  //converting response to json format

    const results = data.results;

    if(page === 1){
        searchResult.innerHTML = ""  //show default page
    }
    results.map((result)=>{
        const imageWrapper = document.createElement("div");    //creating div with 'img' and 'a' tag 
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);

        page++;                      // if user want more result so page will incremented
        if(page > 1){
            showMore.style.display = "block"        //and button will be show
        }
    })
}

formEl.addEventListener("submit", event =>{  //add evenmt on form search bar
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", ()=>{     // add event on show more
    searchImages();
})
