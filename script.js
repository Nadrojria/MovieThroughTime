import {apikey, token} from "./keyapi.js";

const decadeContainer = document.querySelector("#decadeContainer");
const detailsContainer = document.querySelector("#detailsContainer");
const selectDecade = document.querySelector("#selectDecade");
const buttonEvolution = document.querySelector("#buttonEvolution");
const buttonStopEvolution = document.querySelector("#buttonStopEvolution");
const buttonCloseModal = document.createElement("button");
const decadeDisplay = document.querySelector("#decadeDisplay");
const body = document.querySelector("body");
const bodyClass = body.classList;

const urlSeventies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1970-01-01&primary_release_date.lte=1979-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=" + apikey;
const urlEighties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=" + apikey;
const urlNineties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&sort_by=vote_average.desc&vote_count.gte=5000&api_key=" + apikey;
const urlTwenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31&sort_by=vote_average.desc&vote_count.gte=10000&api_key=" + apikey;
const urlTwentyTenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31&sort_by=vote_average.desc&vote_count.gte=20000&api_key=" + apikey;
const urlTwentyTwenties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2020-01-01&primary_release_date.lte=2029-12-31&sort_by=vote_average.desc&vote_count.gte=10000&api_key=" + apikey;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
}

const urlArray = [
  urlSeventies,
  urlEighties,
  urlNineties,
  urlTwenies,
  urlTwentyTenies,
  urlTwentyTwenties,
];

const yearsArray = [
  "70's",
  "80's",
  "90's",
  "00's",
  "10's",
  "20's",
]

let intervalID;


/****SECONDARY FUNCTION******
 ***************************/
function getEvolution() {
  let count = 0; // on initialise un compteur à 0 pour changer d'url et d'années suivant l'évolution
  decadeContainer.classList.add("fade-in"); // ajoute l'effet fade au départ
  getDecade(urlArray[count], yearsArray[count]); // affiche la première décennie

  intervalID = setInterval(() => { // lance un interval de 8 secondes entre 2 décennies
    count++; // incrémente le compteur afin de changer d'url et d'années 
    if (count < urlArray.length) { // s'il y a encore une url à récupérer
      decadeContainer.innerHTML = "";
      decadeContainer.classList.add("fade-in");
      getDecade(urlArray[count], yearsArray[count]); // affiche la décennie et son top 10 en cours
    } else { // quand il n'y a plus d'url à récupérer, on stoppe tout
      decadeContainer.classList.remove("fade-in"); // retrait de l'effet fade
      clearInterval(intervalID); // on stoppe le temps
      selectDecade.disabled = false; // on réactive le bouton de selection de décennie
    }
  }, 8000);
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
  let detailsDiv = document.createElement("div");
  detailsDiv.classList.add("detailsDiv");
  
  let posterDiv = document.createElement("div");
  posterDiv.classList.add("posterDiv");
  detailsContainer.appendChild(posterDiv);
 
  let poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;
  posterDiv.appendChild(poster);

  let title = document.createElement("div");
  title.innerText = `Title: ${elem.title}`;
  detailsDiv.appendChild(title);

  let releaseDate = document.createElement("div");
  releaseDate.innerText = `Release date: ${elem.release_date}`;
  detailsDiv.appendChild(releaseDate);

  let runtime = document.createElement("div");
  runtime.innerText = `Runtime: ${elem.runtime} minutes`;
  detailsDiv.appendChild(runtime);
  
  let genre = elem.genres;
  let genresName = document.createElement("div");
  let result = "";
  for (let value of genre) {
    result += value.name + " "; // rajoute à la suite tous les genres
  }
  genresName.innerText = `Genre(s): ${result}`;
  detailsDiv.appendChild(genresName);
  
  let overview = document.createElement("div");
  overview.innerText = `Overview: ${elem.overview}`;
  overview.classList.add("overviewContainer");
  detailsDiv.appendChild(overview);
  
  let voteAverage = document.createElement("div");
  voteAverage.innerText = `Score: ${elem.vote_average}`;
  detailsDiv.appendChild(voteAverage);

  detailsContainer.appendChild(detailsDiv); // place tous les éléments de détails dans la boite de dialogue
}

function displayCloseButton() {
  buttonCloseModal.setAttribute("id", "closeButton"); //button for closing modal
  buttonCloseModal.classList.add("closeButton");
  buttonCloseModal.innerText = "Close"; //naming button
  detailsContainer.appendChild(buttonCloseModal); //append to the detailContainer (a dialog, not a div?)
}

function createDiv(list, elem, number, position) {
  let titlePoster = document.createElement("div");
  titlePoster.classList.add(`titlePoster${number}`);
  list.appendChild(titlePoster);

  let poster = document.createElement("img");
  poster.classList.add(`moviePoster${number}${position}`);
  poster.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`; //correspond à un setAttribute
  titlePoster.appendChild(poster);

  let movieTitle = document.createElement("p");
  movieTitle.classList.add(`title${number}`);
  movieTitle.innerText = elem.title;
  titlePoster.appendChild(movieTitle);
  
  poster.addEventListener("click", () => { // lorsqu'on clique sur une affiche
    detailsContainer.innerHTML = "";
    moviesDetails(elem.id); // appelle la fonction async pour récupérer les détails d'un film selon son id 
    detailsContainer.classList.add("modalFadeIn"); // permet une animation css sur l'ouverture de la boite de dialogue
    bodyClass.add("blurBackground"); // permet de flouter le fond via css lors de l'ouverture de la boite de dialogue
  })
 return titlePoster;
}


/****PRINCIPAL FUNCTIONS******
 ****************************/
async function moviesDetails(id_movie) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}`, options); // on récupère les détails des films grâce à l'id de la précédente requête API
    const dataDetails = await response.json(); 

    detailsContainer.showModal(); // permet d'ouvrir une boite de dialogue créée dans le HTML
    displayDetails(dataDetails); // affiche les détails du film sélectionné dans la boite de dialogue
    displayCloseButton(); // affiche le bouton pour fermer la boite de dialogue

  } catch (error) {
    console.error("Failed to catch data details:", error);
  }
}

async function getDecade(url, year) {
  try {
    const response = await fetch(url); // récupère les données de l'API suivant un url précisé
    const dataDecade = await response.json(); // met la réponse en JSON

    decadeDisplay.innerText = `Top of the ${year}`; // affiche la décennie en cours

    let resultDecade = dataDecade.results; // on se place au niveau "results" dans la réponse de l'API
    let topThree = resultDecade.slice(0, 3); // on stocke les 3 premiers films
    let topLastSeven = resultDecade.slice(3, 10); // on stocke les 7 films suivants
    let count = 1; // on initialise un compteur à 1 qui servira à différencier les classes des affiches (or, argent, bronze)

    let listOfMovies = movieList(); // on crée une liste de films
    let listTopThree = TheTopThree(listOfMovies); // on crée une div qui englobe les 3 premiers films
    let listLastSeven = TheLastSeven(listOfMovies); // on crée une div qui englobe les 7 suivants

    topThree.forEach((element) => {
      createDiv(listTopThree, element, "Three", count); // on crée le contenu du top 3 films
      count ++; // on incrémente count afin de différencier les classes des affiches
    });

    topLastSeven.forEach((element) => {
      createDiv(listLastSeven, element, "Seven", count); // on crée le contenu des 7 films suivants
    });

  } catch (error) {
    console.error("Failed to catch data :", error); // message en cas de problèmes de requêtes API
  }
}


/*******START*******
 *******************/
buttonStopEvolution.disabled = true;

selectDecade.addEventListener("change", () => {
  decadeContainer.innerHTML = "";
  const decade = selectDecade.value; // il récupère la valeur du bouton select de HTML (la décennie)
  decadeContainer.classList.remove("fade-in"); // stoppe l'effet fade de l'évolution

  switch (decade) { // lance la fonction getDecade en fonction de la décennie choisie
    case "70":
      getDecade(urlSeventies, "70's");
      break;
    case "80":
      getDecade(urlEighties, "80's");
      break;
    case "90":
      getDecade(urlNineties, "90's");
      break;
    case "00":
      getDecade(urlTwenies, "00's");
      break;
    case "10":
      getDecade(urlTwentyTenies, "10's");
      break;
    case "20":
      getDecade(urlTwentyTwenties, "20's");
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
  decadeContainer.classList.remove("fade-in");// on stoppe l'effet fade css
  selectDecade.disabled = false;
  buttonEvolution.disabled = false;
  buttonStopEvolution.disabled = true;
  clearInterval(intervalID); // on stoppe l'évolution
})

buttonCloseModal.addEventListener("click", () => {
  detailsContainer.close(); // permet de fermer la boite de dialogue
  decadeContainer.classList.remove("modalFadeIn"); // enlève l'effet fade
  bodyClass.remove("blurBackground"); // enlève le floutage
})
