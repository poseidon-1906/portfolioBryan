document.addEventListener("DOMContentLoaded", () => {
  const progressConfigs = [
    {
      container: document.querySelector(".html-css"),
      valueEl: document.querySelector(".html-progress"),
      endValue: 90,
      color: "var(--accent-secondary)",
    },
    {
      container: document.querySelector(".javascript"),
      valueEl: document.querySelector(".javascript-progress"),
      endValue: 65,
      color: "var(--accent-primary)",
    },
    {
      container: document.querySelector(".sql"),
      valueEl: document.querySelector(".sql-progress"),
      endValue: 80,
      color: "var(--accent-tertiary)",
    },
    {
      container: document.querySelector(".reactjs"),
      valueEl: document.querySelector(".reactjs-progress"),
      endValue: 75,
      color: "rgba(93, 158, 255, 0.95)",
    },
    {
      container: document.querySelector(".nodejs"),
      valueEl: document.querySelector(".nodejs-progress"),
      endValue: 60,
      color: "#ff4d4f",
    },
  ];

  const trackColor = "rgba(255,255,255,0.08)";

  const animateCircularProgress = ({ container, valueEl, endValue, color }) => {
    if (!container || !valueEl) return;
    let currentValue = 0;
    const step = () => {
      currentValue += 1;
      valueEl.textContent = `${currentValue}%`;
      container.style.background = `conic-gradient(${color} ${
        currentValue * 3.6
      }deg, ${trackColor} ${currentValue * 3.6}deg)`;
      if (currentValue < endValue) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const startProgressAnimations = () => {
    progressConfigs.forEach((config) => {
      if (config.hasAnimated || !config.container || !config.valueEl) return;
      config.hasAnimated = true;
      config.valueEl.textContent = "0%";
      config.container.style.background = `conic-gradient(${config.color} 0deg, ${trackColor} 0deg)`;
      animateCircularProgress(config);
    });
  };

  const skillSection = document.querySelector("#competances");
  if (skillSection) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startProgressAnimations();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(skillSection);
  } else {
    startProgressAnimations();
  }

  $(".filter-item").on("click", function () {
    const value = $(this).attr("data-filter");
    if (value === "all") {
      $(".post").fadeIn(400);
    } else {
      $(".post").hide(0);
      $(".post")
        .filter("." + value)
        .fadeIn(400);
    }
    $(".filter-item").removeClass("active");
    $(this).addClass("active");
  });
  $(".filter-item[data-filter='all']").addClass("active");

  const navbar = document.getElementById("navbar-top");
  const updateNavbarState = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("fixed-top");
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      document.body.style.paddingTop = `${navbarHeight}px`;
    } else {
      navbar.classList.remove("fixed-top");
      document.body.style.paddingTop = "0";
    }
  };

  const backToTopButton = document.getElementById("btn-back-to-top");
  const toggleBackToTop = () => {
    if (!backToTopButton) return;
    if (window.scrollY > 120) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };

  const handleScroll = () => {
    updateNavbarState();
    toggleBackToTop();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

//=========================== Email JS===========================

function envoiMail(){
  var parmsP = {
    noms : document.getElementById("exampleFormControlInput1").value,
    email : document.getElementById("exampleFormControlInput2").value,
    message : document.getElementById("exampleFormControlTextarea1").value,
 };

 emailjs.send('service_xbevvz7', 'template_qo5iqt5', parmsP).then(
    (response) => {
      alert("Votre mail à bien été envoyé !");
         // --- Ajout pour vider les champs ---
      document.getElementById("exampleFormControlInput1").value = ''; // Vide le champ Nom
      document.getElementById("exampleFormControlInput2").value = ''; // Vide le champ Email
      document.getElementById("exampleFormControlTextarea1").value = ''; // Vide le champ Message
    },
      (error) => {
      alert("ERREUR !");
      },)
};