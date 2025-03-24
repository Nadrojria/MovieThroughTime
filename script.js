const decadeContainer = document.querySelector("#decadeContainer");
const detailsContainer = document.querySelector("#detailsContainer");
const selectDecade = document.querySelector("#selectDecade");
const buttonEvolution = document.querySelector("#buttonEvolution");
const buttonStopEvolution = document.querySelector("#buttonStopEvolution");
let buttonCloseModal = document.createElement("button"); // déclaration bouton fermeture modal

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2Q0MmY1YWJkZTQxOTZjMjU5NWU3NWY5ZWUwOTc1YSIsIm5iZiI6MTc0MjIwODExMi45NDgsInN1YiI6IjY3ZDdmYzcwMzE2NzhjYzNmODAxYTdkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3IbqW6n5lro3z8X40WTDt5fpLO4niF6uWAt3EaEiEAo'
  }
}

let intervalID;

const urlSeventies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1970-01-01&primary_release_date.lte=1979-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";
const urlEighties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";
const urlNineties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";
const urlTwenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31&sort_by=vote_average.desc&vote_count.gte=10000&api_key=07d42f5abde4196c2595e75f9ee0975a";
const urlTwentyTenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31&sort_by=vote_average.desc&vote_count.gte=20000&api_key=07d42f5abde4196c2595e75f9ee0975a";
const urlTwentyTwenties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2020-01-01&primary_release_date.lte=2029-12-31&sort_by=vote_average.desc&vote_count.gte=10000&api_key=07d42f5abde4196c2595e75f9ee0975a";


const urlArray = [
  urlSeventies,
  urlEighties,
  urlNineties,
  urlTwenies,
  urlTwentyTenies,
  urlTwentyTwenties,
];

let listId = [];

/****SECONDARY FUNCTION******
 ***************************/


function getEvolution() {
  let count = 0;
  getDecade(urlArray[count]);

  intervalID = setInterval(() => {
    count++;
    if (count < urlArray.length) {
      decadeContainer.innerHTML = "";
      getDecade(urlArray[count]);
    } else {
      clearInterval(intervalID);
      selectDecade.disabled = false;
    }
  }, 2000);
}

function movieList() {
  let moviesList = document.createElement("ol");
  decadeContainer.appendChild(moviesList);
  return moviesList;
}

function TheTopThree(list) {
  let divTopThree = document.createElement("div");
  divTopThree.classList.add("topThree");
  list.appendChild(divTopThree);
  return divTopThree;
}

function TheLastSeven(list) {
  let divLastSeven = document.createElement("div");
  divLastSeven.classList.add("topLastSeven");
  list.appendChild(divLastSeven);
  return divLastSeven;
}

function displayDetails(elem) {
  let poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
  detailsContainer.appendChild(poster);

  let title = document.createElement("div");
  title.innerText = `Title: ${elem.title}`;
  detailsContainer.appendChild(title);

  let releaseDate = document.createElement("div");
  releaseDate.innerText = `Release date: ${elem.release_date}`;
  detailsContainer.appendChild(releaseDate);

  let runtime = document.createElement("div");
  runtime.innerText = `Runtime: ${elem.runtime} minutes`;
  detailsContainer.appendChild(runtime);

  let genre = elem.genres;
  let genresName = document.createElement("div");
  let result = "";
  for (let value of genre) {
    result += value.name + " ";
  }
  genresName.innerText = `Genre(s): ${result}`;
  detailsContainer.appendChild(genresName);
  
  let overview = document.createElement("div");
  overview.innerText = `Overview: ${elem.overview}`;
  detailsContainer.appendChild(overview);

  let voteAverage = document.createElement("div");
  voteAverage.innerText = `Score: ${elem.vote_average}`;
  detailsContainer.appendChild(voteAverage);
}

function createDiv(list, elem, number) {
  let titlePoster = document.createElement("div");
  titlePoster.classList.add(`titlePoster${number}`);
  list.appendChild(titlePoster);

  let poster = document.createElement("img");
  poster.classList.add(`moviePoster${number}`);
  poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`; //correspond à un setAttribute
  titlePoster.appendChild(poster);

  let movie = document.createElement("li");
  movie.classList.add("title");
  movie.innerText = elem.title;
  titlePoster.appendChild(movie);

  
  poster.addEventListener("click", () => { /* quand on clique sur le poster, ça affiche le modal avec le bouton close*/
    detailsContainer.innerHTML = "";
    // let buttonCloseModal = document.createElement("button");
    buttonCloseModal.setAttribute("id", "closeButton"); //ajout d'un bouton pour fermer le modal
    buttonCloseModal.innerText = "Close"; // ajout du texte sur le bouton
    detailsContainer.appendChild(buttonCloseModal); // ajout du bouton dans le detailsContainer
    moviesDetails(elem.id);
    detailsContainer.showModal(); // appel de la fonction modal
  })

}

// function createDivLastSeven(list, elem) {
  // let titlePoster = document.createElement("div");
  // titlePoster.classList.add("titlePosterLastSeven");
  // list.appendChild(titlePoster);

  // let poster = document.createElement("img");
  // poster.classList.add("moviePosterSeven");
  // poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`; //correspond à un setAttribute
  // titlePoster.appendChild(poster);

  // let movie = document.createElement("li");
  // movie.classList.add("title");
  // movie.innerText = elem.title;
  // titlePoster.appendChild(movie);
// }

function fetchID(elem) {
  let fetchId = elem.id;
  listId.push(fetchId);
}


/****PRINCIPAL FUNCTIONS******
 ****************************/

let arrayDataDetails = [];
async function moviesDetails(id_movie) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}`, options);
    const dataDetails = await response.json();
    console.log(dataDetails);

    displayDetails(dataDetails);

  } catch (error) {
    console.error("Failed to catch data details:", error);
  }
}


async function getDecade(url) {
  try {
    const response = await fetch(url);
    const dataDecade = await response.json();

    let resultDecade = dataDecade.results;
    let topThree = resultDecade.slice(0, 3);
    let topLastSeven = resultDecade.slice(3, 10);

    let listOfMovies = movieList();
    let listTopThree = TheTopThree(listOfMovies);
    let listLastSeven = TheLastSeven(listOfMovies);

    topThree.forEach((element) => {
      createDiv(listTopThree, element, "Three");
      fetchID(element);
    });

    topLastSeven.forEach((element) => {
      createDiv(listLastSeven, element, "Seven");
      fetchID(element);
    });
    console.log(listId);

  } catch (error) {
    console.error("Failed to catch data :", error);
  }
}



/*******START*******
 **************************/

buttonStopEvolution.disabled = true;

selectDecade.addEventListener("change", () => {
  decadeContainer.innerHTML = "";
  const decade = selectDecade.value;
  listId = [];

  switch (decade) {
    case "70":
      getDecade(urlSeventies, decade);
      break;
    case "80":
      getDecade(urlEighties, decade);
      break;
    case "90":
      getDecade(urlNineties, decade);
      break;
    case "00":
      getDecade(urlTwenies, decade);
      break;
    case "10":
      getDecade(urlTwentyTenies, decade);
      break;
    case "20":
      getDecade(urlTwentyTwenties, decade);
      break;
    default:
      break;
  }
  selectDecade.value = "";
});

buttonEvolution.addEventListener("click", () => {
  decadeContainer.innerHTML = "";
  selectDecade.disabled = true;
  buttonEvolution.disabled = true;
  buttonStopEvolution.disabled = false;
  getEvolution();
});

buttonStopEvolution.addEventListener("click", () => {
  selectDecade.disabled = false;
  buttonEvolution.disabled = false;
  buttonStopEvolution.disabled = true;
  clearInterval(intervalID);
})


buttonCloseModal.addEventListener("click", () => { /* fermer la page de détails*/
  detailsContainer.close();
})
