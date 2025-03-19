const decadeContainer = document.querySelector("#decadeContainer");
const selectDecade = document.querySelector("#selectDecade");
const buttonEvolution = document.querySelector("#buttonEvolution");
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

  if (count < urlArray.length) {
    intervalID = setInterval(() => {
      count++;
      decadeContainer.innerHTML = "";
      getDecade(urlArray[count], years);
    }, 5000);
  }
  clearInterval(intervalID);
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

    resultDecade.slice(0, 10).forEach((element) => {
      let movie = document.createElement("li");
      movie.innerText = element.original_title;
      movieList.appendChild(movie);
    });
  } catch (error) {
    console.error("Failed to catch data :", error);
  }
}

/*******USER CHOICE*******
 **************************/

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
});

buttonEvolution.addEventListener("click", () => {
  decadeContainer.innerHTML = "";
  getEvolution();
});
