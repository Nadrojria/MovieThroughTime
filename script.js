const decadeContainer = document.querySelector("#decadeContainer");
const selectDecade = document.querySelector("#selectDecade");
const buttonEvolution = document.querySelector("#buttonEvolution");
const buttonStopEvolution = document.querySelector("#buttonStopEvolution");

let intervalID;

// const dateStart = [1970, 1980, 1990, 2000, 2010, 2020];
// const dateEnd = [1979, 1989, 1999, 2009, 2019, 2029];

const urlSeventies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1970-01-01&primary_release_date.lte=1979-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlEighties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlNineties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlTwenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlTwentyTenies =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlTwentyTwenties =
  "https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=2020-01-01&primary_release_date.lte=2029-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a";

const urlArray = [
  urlSeventies,
  urlEighties,
  urlNineties,
  urlTwenies,
  urlTwentyTenies,
  urlTwentyTwenties,
];

/****SECONDARY FUNCTION******
 ***************************/
// function getUrl (dateStart, dateEnd){
//  let urlDecade =
//   `https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=${dateStart}-01-01&primary_release_date.lte=${dateEnd}-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a`;
//   return urlDecade;
// }

function getEvolution(years) {
  let count = 0;
  getDecade(urlArray[count], years);

  intervalID = setInterval(() => {
    count++;
    if (count < urlArray.length) {
    decadeContainer.innerHTML = "";
    getDecade(urlArray[count], years);
    } else {
      clearInterval(intervalID);
      selectDecade.disabled = false;
    }
  }, 2000);
}


/****PRINCIPAL FUNCTION******
 ****************************/
async function getDecade(url, years) {
  try {
    const response = await fetch(url);
    const dataDecade = await response.json();

    let movieList = document.createElement("ol");
    movieList.innerText = `Top 10 in the ${years}'s`;
    decadeContainer.appendChild(movieList);

    let resultDecade = dataDecade.results;
    let topThree = resultDecade.slice(0, 3);
    console.log(topThree)
    let topFourToTen = resultDecade.slice(3, 10);
    console.log(topFourToTen)

    topThree.forEach((element) => {
      let movie = document.createElement("li");
      movie.innerText = element.original_title;
      movieList.appendChild(movie);

      let poster = document.createElement("img");
      poster.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`; //correspond à un setAttribute
      movie.appendChild(poster);

    });

    topFourToTen.forEach((element) => {
      let movie = document.createElement("li");
      movie.innerText = element.original_title;
      movieList.appendChild(movie);

      let poster = document.createElement("img");
      poster.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`; //correspond à un setAttribute
      movie.appendChild(poster);

    });
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
