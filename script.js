// fetch refactor
const searchButton = document.querySelector(".search-button");              //select BTN di doc
searchButton.addEventListener("click", async function () {
    try {
        const inputKeyword = document.querySelector(".input-keyword");      // input elemen
        const movies = await getMovies(inputKeyword.value);
        updateUi(movies);
    } catch (err) {
        // alert(err);
        const movieContainer = document.querySelector(".movie-container");  //movCont
        movieContainer.innerHTML = `
        <div class="text-center">
            <h1 class="mb-5">${err}</h1>
            <img src="./error.jpg" width="550">
        </div>`;
    }
});

// Enter = search btn
const inS = document.querySelector(".input-keyword");
inS.addEventListener("keypress", e => {
    if (e.key == "Enter"){
        sama();
    }
})

const keyword = document.querySelector(".input-keyword");
document.addEventListener("keyup", e => {
    if(e.key == "/"){
        keyword.focus();
    }
})

// ketika show detail di klik
// Binding elemen event
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("modal-detail-button")) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbID);
        updateDetail(movieDetail);
    }
});


function getMovies(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=70392aec&s=" + keyword)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then((response) => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }

            return response.Search;
        });
}

function updateUi(movies) {
    let cards = "";
    movies.forEach((m) => {
        cards += showCards(m);
        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = cards;
    });
}

function getMovieDetail(movieId) {
    return fetch("http://www.omdbapi.com/?apikey=70392aec&i=" + movieId)
        .then((response) => response.json())
        .then((e) => e);
}

function updateDetail(movieTerpilih) {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = showMovieDetail(movieTerpilih);
}

// const baru = document.getElementsByClassName("movie-container")[0];
// console.log(baru.textContent.includes('"undefined'));

function showCards(m) {
    return `<div class="col-md-4 my-3">
                        <div class="card">
                            <img src="${m.Poster}" class="card-img-top" width="300" alt="Poster not found" />
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show detail</a>
                                </div>
                        </div>
                    </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot: </strong>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

async function sama () {
    try {
        const inputKeyword = document.querySelector(".input-keyword");
        const movies = await getMovies(inputKeyword.value);
        updateUi(movies);
    } catch (err) {
        // alert(err);
        const movieContainer = document.querySelector(".movie-container");
        movieContainer.innerHTML = `
        <div class="text-center">
            <h1 class="mb-5">${err}</h1>
            <img src="./error.jpg" width="550">
        </div>`;
    }
}
