
/* =====================================================
   FILM ZONE ADMIN PANEL
   FRONTEND VERSION
   Firebase can be connected later
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY =
    "filmZoneAdminFilms";


let films = [];


/* =====================================================
   ELEMENTS
===================================================== */

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const mobileMenu =
    document.getElementById("mobileMenu");

const pageTitle =
    document.getElementById("pageTitle");

const form =
    document.getElementById("filmForm");

const filmId =
    document.getElementById("filmId");

const filmTitle =
    document.getElementById("filmTitle");

const filmCategory =
    document.getElementById("filmCategory");

const filmType =
    document.getElementById("filmType");

const filmYear =
    document.getElementById("filmYear");

const filmRating =
    document.getElementById("filmRating");

const filmDescription =
    document.getElementById("filmDescription");

const filmTags =
    document.getElementById("filmTags");

const filmTrending =
    document.getElementById("filmTrending");

const filmPublished =
    document.getElementById("filmPublished");

const posterInput =
    document.getElementById("posterInput");

const videoInput =
    document.getElementById("videoInput");

const posterPreview =
    document.getElementById("posterPreview");

const videoPreview =
    document.getElementById("videoPreview");

const videoName =
    document.getElementById("videoName");

const filmGrid =
    document.getElementById("filmGrid");

const filmEmpty =
    document.getElementById("filmEmpty");

const filmSearch =
    document.getElementById("filmSearch");

const categorySort =
    document.getElementById("categorySort");

const typeSort =
    document.getElementById("typeSort");

const recentFilms =
    document.getElementById("recentFilms");

const totalFilms =
    document.getElementById("totalFilms");

const trendingFilms =
    document.getElementById("trendingFilms");

const totalCategories =
    document.getElementById("totalCategories");

const averageRating =
    document.getElementById("averageRating");

const formTitle =
    document.getElementById("formTitle");

const saveFilmBtn =
    document.getElementById("saveFilmBtn");

const cancelEdit =
    document.getElementById("cancelEdit");

const toast =
    document.getElementById("toast");

const previewModal =
    document.getElementById("previewModal");

const closePreview =
    document.getElementById("closePreview");

const previewMedia =
    document.getElementById("previewMedia");

const previewTitle =
    document.getElementById("previewTitle");

const previewCategory =
    document.getElementById("previewCategory");

const previewMeta =
    document.getElementById("previewMeta");

const previewDescription =
    document.getElementById("previewDescription");


/* =====================================================
   LOAD DATA
===================================================== */

function loadFilms() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        films =
            saved
                ? JSON.parse(saved)
                : [];

    } catch (error) {

        console.error(error);

        films = [];

    }

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveFilms() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(films)
        );

    } catch (error) {

        console.error(error);

        showToast(
            "Storage limit reached. Firebase Storage will solve this later."
        );

    }

}


/* =====================================================
   GENERATE ID
===================================================== */

function generateId() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    if (!toast) return;

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =====================================================
   NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(
        function (section) {

            section.classList.toggle(
                "active",
                section.id === sectionId
            );

        }
    );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        function (link) {

            link.classList.toggle(
                "active",
                link.dataset.section === sectionId
            );

        }
    );


    const titles = {

        dashboard:
            "Dashboard",

        films:
            "Films",

        "add-film":
            "Add Film",

        settings:
            "Settings"

    };


    if (pageTitle) {

        pageTitle.textContent =
            titles[sectionId] ||
            "Dashboard";

    }


    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.classList.remove(
            "show"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   NAVIGATION EVENTS
===================================================== */

document.querySelectorAll(
    ".nav-link"
).forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                showSection(
                    link.dataset.section
                );

            }
        );

    }
);


document.querySelectorAll(
    "[data-open-section]"
).forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                showSection(
                    button.dataset.openSection
                );

            }
        );

    }
);


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

mobileMenu?.addEventListener(
    "click",
    function () {

        sidebar?.classList.add(
            "open"
        );

        sidebarOverlay?.classList.add(
            "show"
        );

    }
);


sidebarOverlay?.addEventListener(
    "click",
    function () {

        sidebar?.classList.remove(
            "open"
        );

        sidebarOverlay?.classList.remove(
            "show"
        );

    }
);


/* =====================================================
   IMAGE UPLOAD
===================================================== */

let selectedPoster =
    "";


posterInput?.addEventListener(
    "change",
    function () {

        const file =
            posterInput.files?.[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                selectedPoster =
                    event.target.result;


                posterPreview.innerHTML = `
                    <img
                        src="${selectedPoster}"
                        alt="Poster Preview"
                    >
                `;

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* =====================================================
   VIDEO UPLOAD
===================================================== */

let selectedVideo =
    "";


videoInput?.addEventListener(
    "change",
    function () {

        const file =
            videoInput.files?.[0];


        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                selectedVideo =
                    event.target.result;

            };


        reader.readAsDataURL(
            file
        );


        if (videoName) {

            videoName.textContent =
                file.name;

        }


        if (videoPreview) {

            videoPreview.innerHTML = `

                <span>✓</span>

                <p>
                    Video selected
                </p>

                <small>
                    ${file.name}
                </small>

            `;

        }

    }
);


/* =====================================================
   RESET FORM
===================================================== */

function resetForm() {

    form?.reset();


    if (filmId) {

        filmId.value = "";

    }


    selectedPoster =
        "";


    selectedVideo =
        "";


    if (posterPreview) {

        posterPreview.innerHTML = `

            <span>🖼️</span>

            <p>
                Click to upload poster
            </p>

        `;

    }


    if (videoPreview) {

        videoPreview.innerHTML = `

            <span>▶</span>

            <p>
                Click to select video
            </p>

            <small>
                No video selected
            </small>

        `;

    }


    if (formTitle) {

        formTitle.textContent =
            "Add New Film";

    }


    if (saveFilmBtn) {

        saveFilmBtn.textContent =
            "＋ Add Film";

    }


    if (filmPublished) {

        filmPublished.checked =
            true;

    }

}


/* =====================================================
   ADD / UPDATE FILM
===================================================== */

form?.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            filmTitle.value.trim();


        const category =
            filmCategory.value;


        const type =
            filmType.value;


        if (
            !title ||
            !category ||
            !type
        ) {

            showToast(
                "Please fill the required fields."
            );

            return;

        }


        const existingId =
            filmId.value;


        const existingFilm =
            films.find(
                function (film) {

                    return film.id ===
                        existingId;

                }
            );


        const film = {

            id:
                existingId ||
                generateId(),

            title:

                title,

            category:

                category,

            type:

                type,

            year:

                filmYear.value ||
                "",

            rating:

                Number(
                    filmRating.value
                ) || 0,

            description:

                filmDescription.value.trim(),

            tags:

                filmTags.value
                    .split(",")
                    .map(
                        function (tag) {
                            return tag.trim();
                        }
                    )
                    .filter(Boolean),

            trending:

                filmTrending.checked,

            published:

                filmPublished.checked,

            poster:

                selectedPoster ||
                existingFilm?.poster ||
                "",

            video:

                selectedVideo ||
                existingFilm?.video ||
                "",

            createdAt:

                existingFilm?.createdAt ||
                Date.now(),

            updatedAt:

                Date.now()

        };


        if (existingFilm) {

            const index =
                films.findIndex(
                    function (item) {

                        return item.id ===
                            existingId;

                    }
                );


            films[index] =
                film;


            showToast(
                "Film updated successfully."
            );

        } else {

            films.unshift(
                film
            );


            showToast(
                "Film added successfully."
            );

        }


        saveFilms();

        renderAll();

        resetForm();

        showSection(
            "films"
        );

    }
);


/* =====================================================
   RENDER FILMS
===================================================== */

function renderFilms() {

    if (!filmGrid) return;


    const search =
        (
            filmSearch?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    const category =
        categorySort?.value ||
        "all";


    const type =
        typeSort?.value ||
        "all";


    const filtered =
        films.filter(
            function (film) {

                const matchesSearch =

                    !search ||

                    film.title
                        .toLowerCase()
                        .includes(search) ||

                    film.category
                        .toLowerCase()
                        .includes(search) ||

                    film.type
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all" ||

                    film.category ===
                        category;


                const matchesType =

                    type === "all" ||

                    film.type ===
                        type;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesType
                );

            }
        );


    filmGrid.innerHTML = "";


    if (filtered.length === 0) {

        filmEmpty?.classList.add(
            "show"
        );

        return;

    }


    filmEmpty?.classList.remove(
        "show"
    );


    filtered.forEach(
        function (film) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "film-admin-card";


            const poster =
                film.poster ||
                "data:image/svg+xml," +
                encodeURIComponent(`
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="500"
                        height="700"
                    >
                        <rect
                            width="100%"
                            height="100%"
                            fill="#17171e"
                        />
                        <text
                            x="50%"
                            y="50%"
                            text-anchor="middle"
                            fill="#777"
                            font-size="25"
                        >
                            No Poster
                        </text>
                    </svg>
                `);


            card.innerHTML = `

                <div class="film-admin-poster">

                    <img
                        src="${poster}"
                        alt="${escapeHTML(film.title)}"
                    >

                    ${
                        film.trending
                            ? `
                                <span class="trending-label">
                                    🔥 TRENDING
                                </span>
                              `
                            : ""
                    }

                </div>


                <div class="film-admin-info">

                    <h3>
                        ${escapeHTML(film.title)}
                    </h3>


                    <div class="film-admin-meta">

                        ${escapeHTML(
                            capitalize(film.category)
                        )}

                        •

                        ${escapeHTML(
                            capitalize(film.type)
                        )}

                        ${
                            film.year
                                ? ` • ${escapeHTML(
                                    String(film.year)
                                  )}`
                                : ""
                        }

                        ${
                            film.rating
                                ? ` • ⭐ ${film.rating}`
                                : ""
                        }

                    </div>


                    <div class="film-actions">

                        <button
                            data-action="preview"
                            data-id="${film.id}"
                        >
                            👁 View
                        </button>

                        <button
                            data-action="edit"
                            data-id="${film.id}"
                        >
                            ✏ Edit
                        </button>

                        <button
                            class="delete-btn"
                            data-action="delete"
                            data-id="${film.id}"
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>

            `;


            filmGrid.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(value) {

    if (!value) return "";

    return value.charAt(0)
        .toUpperCase() +
        value.slice(1);

}


/* =====================================================
   FILM ACTIONS
===================================================== */

filmGrid?.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) return;


        const id =
            button.dataset.id;


        const action =
            button.dataset.action;


        const film =
            films.find(
                function (item) {

                    return item.id === id;

                }
            );


        if (!film) return;


        if (action === "edit") {

            editFilm(film);

        }


        if (action === "delete") {

            deleteFilm(film);

        }


        if (action === "preview") {

            previewFilm(film);

        }

    }
);


/* =====================================================
   EDIT FILM
===================================================== */

function editFilm(film) {

    showSection(
        "add-film"
    );


    filmId.value =
        film.id;


    filmTitle.value =
        film.title || "";


    filmCategory.value =
        film.category || "";


    filmType.value =
        film.type || "";


    filmYear.value =
        film.year || "";


    filmRating.value =
        film.rating || "";


    filmDescription.value =
        film.description || "";


    filmTags.value =
        (film.tags || []).join(
            ", "
        );


    filmTrending.checked =
        Boolean(
            film.trending
        );


    filmPublished.checked =
        film.published !== false;


    selectedPoster =
        film.poster || "";


    selectedVideo =
        film.video || "";


    if (film.poster) {

        posterPreview.innerHTML = `

            <img
                src="${film.poster}"
                alt="Poster"
            >

        `;

    }


    if (film.video) {

        videoPreview.innerHTML = `

            <span>✓</span>

            <p>
                Existing video
            </p>

            <small>
                Video ready
            </small>

        `;

    }


    formTitle.textContent =
        "Edit Film";


    saveFilmBtn.textContent =
        "✓ Update Film";

}


/* =====================================================
   DELETE FILM
===================================================== */

function deleteFilm(film) {

    const confirmed =
        confirm(
            `Delete "${film.title}"?`
        );


    if (!confirmed) return;


    films =
        films.filter(
            function (item) {

                return item.id !==
                    film.id;

            }
        );


    saveFilms();

    renderAll();


    showToast(
        "Film deleted."
    );

}


/* =====================================================
   PREVIEW FILM
===================================================== */

function previewFilm(film) {

    if (!previewModal) return;


    previewTitle.textContent =
        film.title;


    previewCategory.textContent =
        capitalize(
            film.category
        );


    previewMeta.textContent =

        [
            film.year,
            capitalize(film.type),
            film.rating
                ? `⭐ ${film.rating}`
                : ""
        ]
            .filter(Boolean)
            .join(" • ");


    previewDescription.textContent =
        film.description ||
        "No description available.";


    previewMedia.innerHTML = "";


    if (film.video) {

        const video =
            document.createElement(
                "video"
            );


        video.controls = true;

        video.autoplay = false;

        video.playsInline = true;

        video.src =
            film.video;


        previewMedia.appendChild(
            video
        );

    } else if (film.poster) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            film.poster;


        image.alt =
            film.title;


        previewMedia.appendChild(
            image
        );

    } else {

        previewMedia.innerHTML = `
            <div
                style="
                    height:100%;
                    display:grid;
                    place-items:center;
                    color:#777;
                "
            >
                No media available
            </div>
        `;

    }


    previewModal.classList.add(
        "show"
    );

}


/* =====================================================
   CLOSE PREVIEW
===================================================== */

function closePreviewModal() {

    if (!previewModal) return;


    previewModal.classList.remove(
        "show"
    );


    previewMedia.innerHTML =
        "";

}


closePreview?.addEventListener(
    "click",
    closePreviewModal
);


previewModal?.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            previewModal
        ) {

            closePreviewModal();

        }

    }
);


/* =====================================================
   SEARCH / FILTER
===================================================== */

filmSearch?.addEventListener(
    "input",
    renderFilms
);


categorySort?.addEventListener(
    "change",
    renderFilms
);


typeSort?.addEventListener(
    "change",
    renderFilms
);


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

    if (totalFilms) {

        totalFilms.textContent =
            films.length;

    }


    const trending =
        films.filter(
            function (film) {

                return film.trending;

            }
        );


    if (trendingFilms) {

        trendingFilms.textContent =
            trending.length;

    }


    const categories =
        new Set(
            films.map(
                function (film) {

                    return film.category;

                }
            )
        );


    if (totalCategories) {

        totalCategories.textContent =
            categories.size;

    }


    const ratings =
        films
            .map(
                function (film) {

                    return Number(
                        film.rating
                    );

                }
            )
            .filter(
                function (rating) {

                    return rating > 0;

                }
            );


    const average =
        ratings.length
            ? ratings.reduce(
                function (
                    total,
                    rating
                ) {

                    return total +
                        rating;

                },
                0
            ) / ratings.length
            : 0;


    if (averageRating) {

        averageRating.textContent =
            average.toFixed(1);

    }

}


/* =====================================================
   RECENT FILMS
===================================================== */

function renderRecentFilms() {

    if (!recentFilms) return;


    recentFilms.innerHTML =
        "";


    const latest =
        [...films]
            .sort(
                function (a, b) {

                    return (
                        b.createdAt -
                        a.createdAt
                    );

                }
            )
            .slice(0, 4);


    if (latest.length === 0) {

        recentFilms.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    padding:40px;
                    text-align:center;
                    color:#777;
                "
            >
                No films added yet.
            </div>

        `;

        return;

    }


    latest.forEach(
        function (film) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "recent-item";


            item.innerHTML = `

                <img
                    src="${
                        film.poster ||
                        ""
                    }"
                    alt="${escapeHTML(
                        film.title
                    )}"
                >

                <div
                    class="recent-item-info"
                >

                    <strong>
                        ${escapeHTML(
                            film.title
                        )}
                    </strong>

                    <small>
                        ${capitalize(
                            film.category
                        )}
                        ${
                            film.year
                                ? ` • ${film.year}`
                                : ""
                        }
                    </small>

                </div>

            `;


            recentFilms.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function renderAll() {

    renderFilms();

    renderDashboard();

    renderRecentFilms();

}


/* =====================================================
   CANCEL EDIT
===================================================== */

cancelEdit?.addEventListener(
    "click",
    function () {

        resetForm();

        showSection(
            "films"
        );

    }
);


/* =====================================================
   REFRESH
===================================================== */

document.getElementById(
    "refreshBtn"
)?.addEventListener(
    "click",
    function () {

        loadFilms();

        renderAll();

        showToast(
            "Admin panel refreshed."
        );

    }
);


/* =====================================================
   VIEW SITE
===================================================== */

document.getElementById(
    "viewSiteBtn"
)?.addEventListener(
    "click",
    function () {

        /*
           Change this later if your
           index.html is in another folder.
        */

        window.location.href =
            "index.html";

    }
);


/* =====================================================
   LOGOUT
===================================================== */

document.getElementById(
    "logoutBtn"
)?.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) return;


        /*
           Firebase Authentication
           will be connected here later.
        */

        showToast(
            "Logout system will be connected with Firebase."
        );

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closePreviewModal();

            sidebar?.classList.remove(
                "open"
            );

            sidebarOverlay?.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

loadFilms();

renderAll();

showSection(
    "dashboard"
);

