/* =====================================================
   FILM ZONE JAVASCRIPT
===================================================== */


/* =====================================================
   LOGIN
===================================================== */

function loginUser() {

    alert("Login system coming soon!");

}


/* =====================================================
   JOIN US
===================================================== */

function joinUser() {

    const modal =
        document.getElementById("joinModal");

    if (!modal) return;

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeJoinModal() {

    const modal =
        document.getElementById("joinModal");

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =====================================================
   WATCH NOW
===================================================== */

function watchNow() {

    const movies =
        document.querySelector(
            ".Home-movies"
        );

    if (movies) {

        movies.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   EXPLORE MOVIES
===================================================== */

function exploreMovies() {

    const movies =
        document.querySelector(
            ".Home-movies"
        );

    if (movies) {

        movies.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   MOVIE PLAYER MODAL ELEMENTS
===================================================== */

const moviePlayerModal =
    document.getElementById(
        "moviePlayerModal"
    );

const moviePlayer =
    document.getElementById(
        "moviePlayer"
    );

const playerTitle =
    document.getElementById(
        "playerTitle"
    );

const playerCategory =
    document.getElementById(
        "playerCategory"
    );

const playerYear =
    document.getElementById(
        "playerYear"
    );

const playerDescription =
    document.getElementById(
        "playerDescription"
    );

const playerPoster =
    document.getElementById(
        "playerPoster"
    );


/* =====================================================
   OPEN MOVIE PLAYER
===================================================== */

function openMoviePlayer(card) {

    if (!card || !moviePlayerModal) return;


    /* ---------------------------------------------
       MOVIE DATA
    --------------------------------------------- */

    const movieName =
        card.dataset.title ||
        card.querySelector("h3")?.textContent ||
        "Movie";


    const category =
        card.dataset.category ||
        "Movie";


    const year =
        card.dataset.year ||
        "";


    const description =
        card.dataset.description ||
        "Watch this movie on Film Zone.";


    const video =
        card.dataset.video ||
        "";


    const poster =
        card.querySelector("img")?.src ||
        "";


    /* ---------------------------------------------
       SET MOVIE TITLE
    --------------------------------------------- */

    if (playerTitle) {

        playerTitle.textContent =
            movieName;

    }


    /* ---------------------------------------------
       SET CATEGORY
    --------------------------------------------- */

    if (playerCategory) {

        playerCategory.textContent =
            category;

    }


    /* ---------------------------------------------
       SET YEAR
    --------------------------------------------- */

    if (playerYear) {

        playerYear.textContent =
            year;

    }


    /* ---------------------------------------------
       SET DESCRIPTION
    --------------------------------------------- */

    if (playerDescription) {

        playerDescription.textContent =
            description;

    }


    /* ---------------------------------------------
       SET POSTER
    --------------------------------------------- */

    if (playerPoster) {

        playerPoster.src =
            poster;

    }


    /* ---------------------------------------------
       SET VIDEO
    --------------------------------------------- */

    if (moviePlayer) {

        moviePlayer.pause();

        moviePlayer.removeAttribute(
            "src"
        );

        moviePlayer.load();


        if (video.trim() !== "") {

            moviePlayer.src =
                video;

            moviePlayer.style.display =
                "block";

        } else {

            moviePlayer.style.display =
                "none";

        }

    }


    /* ---------------------------------------------
       SHOW MODAL
    --------------------------------------------- */

    moviePlayerModal.classList.add(
        "show"
    );

    moviePlayerModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    /* ---------------------------------------------
       SCROLL TO TOP
    --------------------------------------------- */

    const playerBox =
        moviePlayerModal.querySelector(
            ".movie-player-box"
        );

    if (playerBox) {

        playerBox.scrollTop = 0;

    }

}


/* =====================================================
   CLOSE MOVIE PLAYER
===================================================== */

function closeMoviePlayer() {

    if (!moviePlayerModal) return;


    moviePlayerModal.classList.remove(
        "show"
    );

    moviePlayerModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    /* ---------------------------------------------
       STOP VIDEO
    --------------------------------------------- */

    if (moviePlayer) {

        moviePlayer.pause();

        moviePlayer.removeAttribute(
            "src"
        );

        moviePlayer.load();

    }

}


/* =====================================================
   MOVIE CARD CLICK
===================================================== */

const allMovieCards =
    document.querySelectorAll(
        ".movie-card"
    );


allMovieCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {


                /* -------------------------------------
                   HIDDEN CARD
                ------------------------------------- */

                if (
                    card.style.display === "none" ||
                    card.classList.contains(
                        "film-hidden"
                    )
                ) {

                    return;

                }


                /* -------------------------------------
                   OPEN PLAYER
                ------------------------------------- */

                openMoviePlayer(
                    card
                );

            }
        );

    }
);


/* =====================================================
   CLOSE PLAYER WHEN CLICKING BACKGROUND
===================================================== */

if (moviePlayerModal) {

    moviePlayerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                moviePlayerModal
            ) {

                closeMoviePlayer();

            }

        }
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        /* Close Movie Player */

        if (
            moviePlayerModal &&
            moviePlayerModal.classList.contains(
                "show"
            )
        ) {

            closeMoviePlayer();

            return;

        }


        /* Close Join Modal */

        closeJoinModal();

    }
);


/* =====================================================
   SEARCH + FILTER
===================================================== */


/* =====================================================
   GET FILTER ELEMENTS
===================================================== */

const movieSearch =
    document.getElementById(
        "movieSearch"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const typeFilter =
    document.getElementById(
        "typeFilter"
    );


const clearFilters =
    document.getElementById(
        "clearFilters"
    );


const movieResultCount =
    document.getElementById(
        "movieResultCount"
    );


const movieEmpty =
    document.getElementById(
        "movieEmpty"
    );


/* =====================================================
   NORMAL MOVIE CARDS ONLY
===================================================== */

const normalMovieCards =
    document.querySelectorAll(
        "#normalGrid .normal-card"
    );


/* =====================================================
   FILTER NORMAL FILMS ONLY
===================================================== */

function filterMovies() {

    const searchValue =
        (movieSearch?.value || "")
            .trim()
            .toLowerCase();


    const categoryValue =
        categoryFilter?.value ||
        "all";


    const typeValue =
        typeFilter?.value ||
        "all";


    let visibleCount = 0;


    normalMovieCards.forEach(
        function (card) {

            const title =
                (
                    card.dataset.title ||
                    ""
                ).toLowerCase();


            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const type =
                (
                    card.dataset.type ||
                    ""
                ).toLowerCase();


            const matchesSearch =
                !searchValue ||
                title.includes(
                    searchValue
                ) ||
                category.includes(
                    searchValue
                ) ||
                type.includes(
                    searchValue
                );


            const matchesCategory =
                categoryValue === "all" ||
                category ===
                    categoryValue;


            const matchesType =
                typeValue === "all" ||
                type === typeValue;


            const show =
                matchesSearch &&
                matchesCategory &&
                matchesType;


            if (show) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    /* =================================================
       RESULT COUNT
    ================================================= */

    if (movieResultCount) {

        if (
            searchValue === "" &&
            categoryValue === "all" &&
            typeValue === "all"
        ) {

            movieResultCount.textContent =
                "Showing all films";

        } else {

            movieResultCount.textContent =
                `Showing ${visibleCount} film${
                    visibleCount === 1
                        ? ""
                        : "s"
                }`;

        }

    }


    /* =================================================
       EMPTY RESULT
    ================================================= */

    if (movieEmpty) {

        movieEmpty.classList.toggle(
            "show",
            visibleCount === 0
        );

    }


    /* =================================================
       RESET SLIDER POSITION
    ================================================= */

    const normalGrid =
        document.getElementById(
            "normalGrid"
        );


    if (normalGrid) {

        normalGrid.scrollTo({

            left: 0,

            behavior: "smooth"

        });

    }

}


/* =====================================================
   SEARCH INPUT
===================================================== */

movieSearch?.addEventListener(
    "input",
    function () {

        filterMovies();

    }
);


/* =====================================================
   CATEGORY FILTER
===================================================== */

categoryFilter?.addEventListener(
    "change",
    function () {

        filterMovies();

    }
);


/* =====================================================
   TYPE FILTER
===================================================== */

typeFilter?.addEventListener(
    "change",
    function () {

        filterMovies();

    }
);


/* =====================================================
   CLEAR FILTERS
===================================================== */

clearFilters?.addEventListener(
    "click",
    function () {


        if (movieSearch) {

            movieSearch.value = "";

        }


        if (categoryFilter) {

            categoryFilter.value =
                "all";

        }


        if (typeFilter) {

            typeFilter.value =
                "all";

        }


        filterMovies();

    }
);


/* =====================================================
   NAVBAR CATEGORY MENU
===================================================== */

const categoryLinks =
    document.querySelectorAll(
        ".dropdown-parent:nth-child(3) .dropdown a"
    );


categoryLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                let selectedCategory =
                    link.textContent
                        .trim()
                        .toLowerCase();


                const categoryMap = {

                    "action":
                        "action",

                    "thriller":
                        "thriller",

                    "romance":
                        "romance",

                    "comedy":
                        "comedy",

                    "horror":
                        "horror",

                    "animation":
                        "animation"

                };


                selectedCategory =
                    categoryMap[
                        selectedCategory
                    ] || "all";


                /* Set category */

                if (categoryFilter) {

                    categoryFilter.value =
                        selectedCategory;

                }


                /* Reset search */

                if (movieSearch) {

                    movieSearch.value = "";

                }


                /* Reset type */

                if (typeFilter) {

                    typeFilter.value =
                        "all";

                }


                /* Apply */

                filterMovies();


                /* Scroll */

                const normalSection =
                    document.querySelector(
                        ".normal-films-section"
                    );


                if (normalSection) {

                    normalSection.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =====================================================
   NAVBAR TYPE MENU
===================================================== */

const typeLinks =
    document.querySelectorAll(
        ".dropdown-parent:nth-child(4) .dropdown a"
    );


typeLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                let selectedType =
                    link.textContent
                        .trim()
                        .toLowerCase();


                const typeMap = {

                    "movies":
                        "movie",

                    "dramas":
                        "drama",

                    "tv series":
                        "series",

                    "anime":
                        "anime"

                };


                selectedType =
                    typeMap[
                        selectedType
                    ] || "all";


                /* Set type */

                if (typeFilter) {

                    typeFilter.value =
                        selectedType;

                }


                /* Reset search */

                if (movieSearch) {

                    movieSearch.value = "";

                }


                /* Reset category */

                if (categoryFilter) {

                    categoryFilter.value =
                        "all";

                }


                /* Apply */

                filterMovies();


                /* Scroll */

                const normalSection =
                    document.querySelector(
                        ".normal-films-section"
                    );


                if (normalSection) {

                    normalSection.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    function () {

        if (!header) return;


        header.style.background =

            window.scrollY > 30

                ? "rgba(5,5,5,0.97)"

                : "rgba(5,5,5,0.88)";

    }
);


/* =====================================================
   FILM SLIDER
===================================================== */

function slideMovies(
    gridId,
    direction
) {

    const slider =
        document.getElementById(
            gridId
        );


    if (!slider) return;


    const card =
        slider.querySelector(
            ".movie-card:not([style*='display: none'])"
        );


    if (!card) return;


    const sliderStyle =
        getComputedStyle(
            slider
        );


    const gap =
        parseFloat(
            sliderStyle.gap
        ) || 20;


    const cardWidth =
        card.getBoundingClientRect()
            .width +
        gap;


    slider.scrollBy({

        left:
            cardWidth *
            direction *
            2,

        behavior:
            "smooth"

    });

}


/* =====================================================
   INITIAL FILTER
===================================================== */

filterMovies();


/* =====================================================
   MOBILE LEFT SIDE MENU
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const navList =
            document.getElementById(
                "navList"
            );


        if (
            !menuToggle ||
            !navList
        ) {

            return;

        }


        const menuIcon =
            menuToggle.querySelector(
                "i"
            );


        /* =================================================
           MOBILE MENU LOGO
        ================================================= */

        const mobileLogo =
            document.querySelector(
                ".mobile-menu-logo"
            );


        /* =================================================
           OPEN / CLOSE MENU
        ================================================= */

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const isOpen =
                    navList.classList.toggle(
                        "menu-open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                /* -----------------------------------------
                   SHOW MOBILE LOGO
                ----------------------------------------- */

                if (mobileLogo) {

                    mobileLogo.classList.toggle(
                        "show",
                        isOpen
                    );

                }


                /* -----------------------------------------
                   ☰ → X
                ----------------------------------------- */

                if (menuIcon) {

                    if (isOpen) {

                        menuIcon.classList.remove(
                            "fa-bars"
                        );

                        menuIcon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        menuIcon.classList.remove(
                            "fa-xmark"
                        );

                        menuIcon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        /* =================================================
           CATEGORY / TYPE MOBILE DROPDOWN
        ================================================= */

        document
            .querySelectorAll(
                ".dropdown-toggle"
            )
            .forEach(
                function (link) {


                    link.addEventListener(
                        "click",
                        function (event) {


                            if (
                                window.innerWidth <= 700
                            ) {

                                event.preventDefault();

                                event.stopPropagation();


                                const parent =
                                    this.closest(
                                        ".dropdown-parent"
                                    );


                                if (!parent) return;


                                parent.classList.toggle(
                                    "mobile-dropdown-open"
                                );

                            }

                        }
                    );

                }
            );


        /* =================================================
           NORMAL LINKS
        ================================================= */

        navList
            .querySelectorAll(
                "li:not(.dropdown-parent):not(.mobile-buttons) > a"
            )
            .forEach(
                function (link) {


                    link.addEventListener(
                        "click",
                        function () {

                            closeMobileMenu();

                        }
                    );

                }
            );


        /* =================================================
           DROPDOWN LINKS
        ================================================= */

        navList
            .querySelectorAll(
                ".dropdown a"
            )
            .forEach(
                function (link) {


                    link.addEventListener(
                        "click",
                        function () {

                            closeMobileMenu();

                        }
                    );

                }
            );


        /* =================================================
           MOBILE LOGIN / JOIN
        ================================================= */

        navList
            .querySelectorAll(
                ".mobile-buttons button"
            )
            .forEach(
                function (button) {


                    button.addEventListener(
                        "click",
                        function () {

                            closeMobileMenu();

                        }
                    );

                }
            );


        /* =================================================
           CLICK OUTSIDE MENU
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {


                if (
                    !navList.contains(
                        event.target
                    ) &&

                    !menuToggle.contains(
                        event.target
                    ) &&

                    !(
                        mobileLogo &&
                        mobileLogo.contains(
                            event.target
                        )
                    )
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* =================================================
           CLOSE MOBILE MENU
        ================================================= */

        function closeMobileMenu() {


            navList.classList.remove(
                "menu-open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            /* Hide logo */

            if (mobileLogo) {

                mobileLogo.classList.remove(
                    "show"
                );

            }


            /* Change X → ☰ */

            if (menuIcon) {

                menuIcon.classList.remove(
                    "fa-xmark"
                );

                menuIcon.classList.add(
                    "fa-bars"
                );

            }


            /* Close dropdowns */

            document
                .querySelectorAll(
                    ".dropdown-parent"
                )
                .forEach(
                    function (item) {

                        item.classList.remove(
                            "mobile-dropdown-open"
                        );

                    }
                );

        }


        /* =================================================
           DESKTOP RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {


                if (
                    window.innerWidth > 700
                ) {

                    closeMobileMenu();

                }

            }
        );


    }
);



/* =====================================================
   CUSTOM FILTER DROPDOWNS
===================================================== */

(function () {

    const categoryBox =
        document.getElementById("categoryFilterBox");

    const typeBox =
        document.getElementById("typeFilterBox");

    const categoryHidden =
        document.getElementById("categoryFilter");

    const typeHidden =
        document.getElementById("typeFilter");

    const categoryText =
        document.getElementById("categoryFilterText");

    const typeText =
        document.getElementById("typeFilterText");


    /* CATEGORY */

    if (categoryBox) {

        const btn =
            categoryBox.querySelector(".filter-dropdown-btn");

        const options =
            categoryBox.querySelectorAll(
                ".filter-dropdown-menu button"
            );


        btn.addEventListener("click", function (e) {

            e.stopPropagation();

            typeBox?.classList.remove("open");

            categoryBox.classList.toggle("open");

            btn.setAttribute(
                "aria-expanded",
                categoryBox.classList.contains("open")
            );

        });


        options.forEach(option => {

            option.addEventListener("click", function () {

                const value = this.dataset.value;
                const text = this.textContent.trim();

                categoryHidden.value = value;
                categoryText.textContent = text;

                options.forEach(item =>
                    item.classList.remove("selected")
                );

                this.classList.add("selected");

                categoryBox.classList.remove("open");

                btn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (typeof filterMovies === "function") {
                    filterMovies();
                }

            });

        });

    }


    /* TYPE */

    if (typeBox) {

        const btn =
            typeBox.querySelector(".filter-dropdown-btn");

        const options =
            typeBox.querySelectorAll(
                ".filter-dropdown-menu button"
            );


        btn.addEventListener("click", function (e) {

            e.stopPropagation();

            categoryBox?.classList.remove("open");

            typeBox.classList.toggle("open");

            btn.setAttribute(
                "aria-expanded",
                typeBox.classList.contains("open")
            );

        });


        options.forEach(option => {

            option.addEventListener("click", function () {

                const value = this.dataset.value;
                const text = this.textContent.trim();

                typeHidden.value = value;
                typeText.textContent = text;

                options.forEach(item =>
                    item.classList.remove("selected")
                );

                this.classList.add("selected");

                typeBox.classList.remove("open");

                btn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (typeof filterMovies === "function") {
                    filterMovies();
                }

            });

        });

    }


    /* CLOSE WHEN CLICK OUTSIDE */

    document.addEventListener("click", function () {

        categoryBox?.classList.remove("open");
        typeBox?.classList.remove("open");

    });

})();