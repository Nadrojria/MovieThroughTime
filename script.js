const decadeContainer = document.querySelector("#decadeContainer");
const selectDecade = document.querySelector("#selectDecade");

const dateStart = [1970, 1980, 1990, 2000, 2010, 2020];
const dateEnd = [1979, 1989, 1999, 2009, 2019, 2029];

/****SECONDARY FUNCTION******
***************************/
function getUrl (dateStart, dateEnd){
 let urlDecade =
  `https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=${dateStart}-01-01&primary_release_date.lte=${dateEnd}-12-31&sort_by=popularity.desc&vote_count.gte=5000&api_key=07d42f5abde4196c2595e75f9ee0975a`;
  return urlDecade;
}

function getEvolution(years) {
  let count = 0;
  while (count < dateStart.length) {
    setInterval(getDecade(getUrl(dateStart[count], dateEnd[count]), years), 5000);
    count++;
  }
  
}


/****PRINCIPAL FUNCTION******
****************************/
async function getDecade(url, years) {
  try {
    const response = await fetch(url);
    const dataDecade = await response.json();
    console.log(dataDecade);

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
    case "70's":
      let fetchUrl = getUrl(dateStart[0], dateEnd[0]);
      getDecade(fetchUrl, decade);
      break;
    case "80's":
      getDecade(getUrl(dateStart[1], dateEnd[1]), decade);
      break;
    case "90's":
      getDecade(getUrl(dateStart[2], dateEnd[2]), decade);
      break;
    case "00's":
      getDecade(getUrl(dateStart[3], dateEnd[3]), decade);
      break;
    case "10's":
      getDecade(getUrl(dateStart[4], dateEnd[4]), decade);
      break;
    case "20's":
      getDecade(getUrl(dateStart[5], dateEnd[5]), decade);
      break;
    // case "evolution":
    //   //getEvolution(decade);
    //   break;
    default:
      break;
  }
});
