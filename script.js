// 70's
const decadeContainer = document.querySelector("#decadeContainer");
const selectDecade = document.querySelector("#selectDecade");

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

async function getDecade(url) {
  try {
    const response = await fetch(url);
    const dataDecade = await response.json();
    console.log(dataDecade);

    let movieList = document.createElement("ol");
    movieList.innerText = "Top 10 in this decade";
    decadeContainer.appendChild(movieList);

    let resultDecade = dataDecade.results;

    resultDecade.slice(0, 10).forEach((element) => {
      let movie = document.createElement("li");
      movie.innerText = element.original_title;
      movieList.appendChild(movie);
    });
  } catch (error) {
    console.error("failed to catch data :", error);
  }
}

selectDecade.addEventListener("change", () => {
  //stocker la "" en focnton de sa valeur
  const decade = selectDecade.value;

  switch (decade) {
    case "70's":
      getDecade(urlSeventies);
      break;
    case "80's":
      getDecade(urlEighties);
      break;
    case "90's":
      getDecade(urlNineties);
      break;
    case "00's":
      getDecade(urlTwenies);
      break;
    case "10's":
      getDecade(urlTwentyTenies);
      break;
    case "20's":
      getDecade(urlTwentyTwenties);
      break;
      
    default:
      break;
  }
});
