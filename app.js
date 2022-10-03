const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")


const api_key =`api_key=0924e6736c5942a0471ffc6954cb4ed2`
const base_url =`https://api.themoviedb.org/3`
const api_url = base_url+`/discover/movie?sort_by=popularity.desc&`+ api_key
const image_url = `https://image.tmdb.org/t/p/w500`
getMovies(api_url)
const search_url = base_url+`/search/movie?`+api_key
function getMovies(url){
    fetch(url)
    .then((res)=>{
        if(!res.ok){
            throw new Error ("something went everthing")
        }
       return res.json()
    })
    .then((data)=>showMovies(data))
    .catch(err=>console.log(err))
}
function showMovies(data){
    const {results}=data
    main.innerHTML=""
    results.forEach(element => {
        const {title,poster_path,vote_average,overview}=element
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML=`
            <img src="${image_url+poster_path}" alt="" class="img">
            <div class="movie-info">
                <h3>"${title}"</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    });
}

function getColor(vote){
    if(vote>=8){
        return "green"
    }
    else if(vote>=6){
        return "orange"
    }
    else{}
        return "red"
    }

    form.addEventListener("submit",(e)=>{
        e.preventDefault()
       const searchTerm = search.value
        if(searchTerm){
            getMovies(search_url+`&query=`+searchTerm)
            console.log(search_url+`&query=`+searchTerm)
        }
        else{getMovies(api_url)}
    })