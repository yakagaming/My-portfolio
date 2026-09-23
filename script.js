/* =========================================================
   UMESH KAUSHALYA PORTFOLIO - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= EMAILJS INIT ================= */

    emailjs.init({
        publicKey: "QUFutkVjr4ddLU2jX"
    });


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    });


    /* ================= PROJECT FILTER ================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");


            projectCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "block";

                    setTimeout(() => {

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    }, 50);

                } else {

                    card.style.opacity = "0";
                    card.style.transform =
                        "translateY(20px)";


                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });


    /* ================= BACK TO TOP ================= */

    const backToTop =
        document.getElementById("back-to-top");


    if (backToTop) {

        backToTop.style.opacity = "0";
        backToTop.style.visibility = "hidden";
        backToTop.style.transform =
            "translateY(20px)";


        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                backToTop.style.opacity = "1";
                backToTop.style.visibility = "visible";
                backToTop.style.transform =
                    "translateY(0)";

            } else {

                backToTop.style.opacity = "0";
                backToTop.style.visibility = "hidden";
                backToTop.style.transform =
                    "translateY(20px)";

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= SMOOTH SCROLL ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (targetId === "#") return;

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       CONTACT FORM - EMAILJS
    ===================================================== */

    const contactForm =
        document.getElementById("contact-form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const form = this;

                const submitButton =
                    form.querySelector(".submit-btn");


                const name =
                    document.getElementById("name")
                    .value.trim();

                const email =
                    document.getElementById("email")
                    .value.trim();

                const subject =
                    document.getElementById("subject")
                    .value.trim();

                const message =
                    document.getElementById("message")
                    .value.trim();


                /* Validation */

                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    alert(
                        "Please fill in all fields."
                    );

                    return;

                }


                /* Email Validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                /* Loading */

                submitButton.disabled = true;

                submitButton.innerHTML =
                    'Sending... <i class="fas fa-spinner fa-spin"></i>';


                /* ================= SEND EMAIL ================= */

                emailjs.sendForm(

                    "service_9scovj9",

                    "template_9aoc9nv",

                    form

                )

                .then(() => {

                    alert(
                        "Message sent successfully! ✅"
                    );

                    form.reset();

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        'Send Message <i class="fas fa-paper-plane"></i>';

                })

                .catch((error) => {

                    console.error(
                        "EmailJS Error:",
                        error
                    );

                    alert(
                        "Message could not be sent ❌"
                    );

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        'Send Message <i class="fas fa-paper-plane"></i>';

                });

            }
        );

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".section-title, .about-content, .skill-card, .project-card, .contact-content"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* ================= TYPING EFFECT ================= */

    const heroTitle =
        document.querySelector(".hero h2");


    if (heroTitle) {

        const words = [
            "Web Developer & Designer",
            "Frontend Developer",
            "UI/UX Designer",
            "Creative Web Designer"
        ];


        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                heroTitle.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;

                }

            } else {

                heroTitle.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;


                    if (
                        wordIndex >=
                        words.length
                    ) {

                        wordIndex = 0;

                    }

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 50 : 90
            );

        }


        typeEffect();

    }

});


/* =========================================================
   EXTRA REVEAL CSS
========================================================= */

const revealStyle =
    document.createElement("style");


revealStyle.innerHTML = `

.reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
}

.reveal.show {
    opacity: 1;
    transform: translateY(0);
}

.project-card {
    transition:
        opacity 0.25s ease,
        transform 0.35s ease,
        box-shadow 0.35s ease,
        border-color 0.35s ease;
}

#back-to-top {
    transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        transform 0.3s ease;
}

`;

document.head.appendChild(revealStyle);

const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

elements.forEach((element) => observer.observe(element));