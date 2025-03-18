// 70's
const decadeContainer = document.querySelector("#decadeContainer");

async function getSeventies() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?page=1&primary_release_date.gte=1970-01-01&primary_release_date.lte=1979-04-01&sort_by=popularity.desc&vote_count.gte=1000&api_key=07d42f5abde4196c2595e75f9ee0975a");
        const dataSeventies = await response.json();

        let movieList = document.createElement("ol");
        movieList.innerText = "Top 10 in 70's"
        decadeContainer.appendChild(movieList);

        let resultSeventies = dataSeventies.results;

        resultSeventies.slice(0, 10).forEach(element => {
            let movie = document.createElement("li");
            movie.innerText = element.original_title;
            movieList.appendChild(movie);
        });

    } catch (error) {
        console.error("failed to catch data :", error);
    }
}

getSeventies();
