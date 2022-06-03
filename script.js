// $(".search-button").on("click", function () {
//     $.ajax({
//         url: "http://www.omdbapi.com/?apikey=70392aec&s=" + $(".input-keyword").val(),

//         success: (result) => {
//             const movies = result.Search;
//             let cards = "";
//             movies.forEach((m) => {
//                 cards += showCards(m);
//             });

//             $(".movie-container").html(cards);
//             $(".modal-detail-button").on("click", function () {
//                 let film = $(this).data("imdbid");
//                 $.ajax({
//                     url: "http://www.omdbapi.com/?apikey=70392aec&i=" + film,
//                     success: (m) => {
//                         const movieDetail = showMovieDetail(m);

//                         $(".modal-body").html(movieDetail);
//                     },

//                     error: (e) => {
//                         console.log(e.responseText);
//                     },
//                 });
//             });
//         },

//         error: (e) => {
//             console.log(e.responseText);
//         },
//     });
// });

// Menggunakan fetch()
/* const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
    const inputKeyword = document.querySelector(".input-keyword");
    fetch("http://www.omdbapi.com/?apikey=70392aec&s=" + inputKeyword.value)
        .then((response) => response.json())
        .then((response) => {
            const movies = response.Search;
            let cards = "";
            movies.forEach((m) => {
                cards += showCards(m);
                const movieContainer = document.querySelector(".movie-container");
                movieContainer.innerHTML = cards;

                // ketika tombol detail di klik
                const modalDetailButton = document.querySelectorAll(".modal-detail-button");
                modalDetailButton.forEach((btn) => {
                    btn.addEventListener("click", function () {
                        const imdbID = this.dataset.imdbid;
                        fetch("http://www.omdbapi.com/?apikey=70392aec&i=" + imdbID)
                            .then((response) => response.json())
                            .then((m) => {
                                const movieDetail = showMovieDetail(m);
                                const modalBody = document.querySelector(".modal-body");
                                modalBody.innerHTML = movieDetail;
                            });
                    });
                });
            });
        });
}); */

// fetch refactor
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
    try {
        const inputKeyword = document.querySelector(".input-keyword");
        const movies = await getMovies(inputKeyword.value);
        updateUi(movies);
    } catch (err) {
        alert(err);
    }
});

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
                            <img src="${m.Poster}" class="card-img-top" alt="" />
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
