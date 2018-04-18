const KEY = `2055f069ebab88a96da56841e6da6b78`;
const imageURL = `https://image.tmdb.org/t/p/w500/`;
const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;
const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=zootopia`;


/* /////////////////////////////////////////////////////////////////////// */
/* /                        MOST POPULAR MOVIES 1st ROW                  / */
/* /////////////////////////////////////////////////////////////////////// */

let popular1 = document.querySelector('#popular-1');


fetch(urlPopular)
.then(items => items.json())
.then(items =>{

    let content = '<ul>';
    console.log(items.results);

    content += `
        <li>
            <h2>${items.results[0].original_title}</h2>
            <img src="${imageURL}${items.results[0].backdrop_path}" alt="${items.results[0].original_title}">
        </li>
        <li>
            <h2>${items.results[1].original_title}</h2>
            <img src="${imageURL}${items.results[1].backdrop_path}" alt="${items.results[0].original_title}">
        </li>
    </ul>
    `;
   
    popular1.innerHTML = content

})

/* /////////////////////////////////////////////////////////////////////// */
/* /                        MOST POPULAR MOVIES 2nd ROW                  / */
/* /////////////////////////////////////////////////////////////////////// */

let popular2 = document.querySelector('#popular-2');

fetch(urlPopular)
.then(items => items.json())
.then(items =>{

    let content = '<ul>';
    console.log(items.results);

    content += `
        <li>
            <h2>${items.results[2].original_title}</h2>
            <img src="${imageURL}${items.results[2].backdrop_path}" alt="${items.results[2].original_title}">
        </li>
        <li>
            <h2>${items.results[3].original_title}</h2>
            <img src="${imageURL}${items.results[3].backdrop_path}" alt="${items.results[3].original_title}">
        </li>
        <li>
            <h2>${items.results[4].original_title}</h2>
            <img src="${imageURL}${items.results[4].backdrop_path}" alt="${items.results[4].original_title}">
        </li>
        <li>
            <h2>${items.results[5].original_title}</h2>
            <img src="${imageURL}${items.results[5].backdrop_path}" alt="${items.results[5].original_title}">
        </li>
    </ul>
    `;
   
    popular2.innerHTML = content

})

/* /////////////////////////////////////////////////////////////////////// */
/* /                           TOP RATED MOVIES ROW-1                    / */
/* /////////////////////////////////////////////////////////////////////// */

let topRated = document.querySelector('#top-rated');

fetch(urlTopRated)
.then(items => items.json())
.then(items => {
    console.log(items.results);
    
    let content = `
    <h1>Top Rated</h1>
    <ul>`;
    
    for(i=0; i<items.results.length -2; i++){
        content += `
        <li>
        <img src="${imageURL}${items.results[i].poster_path}" alt="${items.results[i].original_title}">
        </li>
        `
    }

     content += '</ul>';
   
    topRated.innerHTML = content;
   })
   

/* /////////////////////////////////////////////////////////////////////// */
/* /                            SEARCH                                   / */
/* /////////////////////////////////////////////////////////////////////// */


let searchURL =`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=`

document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    let userSearch = document.querySelector('#search').value;
    let search = searchURL + userSearch;
    console.log(search);



    fetch(search)
    .then(items => items.json())
    .then(items => {
        console.log(items);

        if(items.results.length == 0){
            
            let content = `
            <h1>No Results!</h1>`

            document.querySelector('#top-rated').innerHTML = content;           
            document.querySelector('#search').value = '';

        }
        else{

            let content = `
            <h1>Search Results</h1>
            <ul>`;
            
            items.results.forEach(element =>{
                content += `
                <li>
                <img src="${imageURL}${element.poster_path}" alt="${element.original_title}">
                </li>
                `
            })
        
            content += '</ul>';

            document.querySelector('#top-rated').innerHTML = content;
            document.querySelector('#search').value = '';
        }
        
    })

    // TODO:  add conditional to check for empty string in user input

    // Grab the items from local storage
    const searchItems = localStorage.getItem('searchValue');

    // Check if there are items in localstorage
    if(searchItems === null){ 
        // If there isn't an item in localstorage, populate it
        const newItems = [userSearch] // create new array with user input
        localStorage.setItem('searchValue', JSON.stringify(newItems)); 
    } else {    
        // JSON.parse to turn a string into an array
        const itemList = JSON.parse(searchItems); 
        // Push user input into array
        itemList.push(userSearch)
        // JSON.stringfy new array, and set new array back to localstorage
        localStorage.setItem('searchValue', JSON.stringify(itemList));
    }
    
    





})

/* /////////////////////////////////////////////////////////////////////// */
/* /                            MENU TAB                                 / */
/* /////////////////////////////////////////////////////////////////////// */       

document.querySelector('.btn').addEventListener('click', function(){

    if (document.querySelector('header nav ul').style.display != 'block'){
        document.querySelector('header nav ul').style.display = 'block'; 
    }
    else{
        document.querySelector('header nav ul').style.display = 'none'; 
    }   
    
})

/* /////////////////////////////////////////////////////////////////////// */
/* /                            STORAGE API                              / */
/* /////////////////////////////////////////////////////////////////////// */ 






//Makes use of the Web Storage API to save previous results

// const data = {
//       username: "Emily",	
//       colors: ["red", "green", "blue", "purple"],	
//       id: 1	
//     }	
//     const stringData = JSON.stringify(data)
//     localStorage.setItem('userdata', stringData)	
//     // Or, further condensed as...
//     localStorage.setItem('userdata', JSON.stringify(data))

// // Set values via the setItem method	
// localStorage.setItem('key', 'value')	
// // Get values via the getItem method	
// let myVariable = localStorage.getItem('key')	
// // Remove items via the removeItem method	
// localStorage.removeItem('key')
// // Clear all storage	
// localStorage.clear()