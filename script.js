

const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0; // Indice actuel pour le carrousel
const totalImages = images.length;

// Clonage d'images pour créer un carrousel circulaire
const firstImageClone = images[0].cloneNode(true);
const lastImageClone = images[totalImages - 1].cloneNode(true);
carouselSlide.appendChild(firstImageClone); // Ajouter une copie de la première image à la fin
carouselSlide.insertBefore(lastImageClone, images[0]); // Ajouter une copie de la dernière image au début

const totalClonedImages = totalImages + 2; // Inclut les clones

// Mettre à jour le carrousel
function updateCarousel() {
    carouselSlide.style.transform = `translateX(-${(currentIndex + 1) * 100 / 2.5}%)`; // 1 pour gérer le clone au début
}


// Fonction pour changer d'image automatiquement
function autoSlide() {
    currentIndex++;
    if (currentIndex >= totalClonedImages - 1) {
        currentIndex = 1; // Retour à la première image réelle
        carouselSlide.style.transition = 'none'; // Désactiver la transition pour éviter le saut
        updateCarousel(); // Mettre à jour immédiatement
        setTimeout(() => {
            carouselSlide.style.transition = 'transform 0.5s ease'; // Réactiver la transition
        }, 50); // Petite pause
    } else {
        updateCarousel();
    }
}

// Changer d'image toutes les 2 secondes
let intervalId = setInterval(autoSlide, 2000);

// Gérer le clic sur le bouton suivant
nextBtn.addEventListener('click', () => {
    clearInterval(intervalId); // Arrête le défilement automatique
    currentIndex++;
    if (currentIndex >= totalClonedImages - 1) {
        currentIndex = 1; // Retour à la première image réelle
        carouselSlide.style.transition = 'none'; // Désactiver la transition
        updateCarousel(); // Mettre à jour immédiatement
        setTimeout(() => {
            carouselSlide.style.transition = 'transform 0.5s ease'; // Réactiver la transition
        }, 50); // Petite pause
    } else {
        updateCarousel();
    }
    intervalId = setInterval(autoSlide, 2000); // Redémarre le défilement automatique
});

// Gérer le clic sur le bouton précédent
prevBtn.addEventListener('click', () => {
    clearInterval(intervalId); // Arrête le défilement automatique
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalClonedImages - 2; // Va à l'avant-dernière image réelle
        carouselSlide.style.transition = 'none'; // Désactiver la transition
        updateCarousel(); // Mettre à jour immédiatement
        setTimeout(() => {
            carouselSlide.style.transition = 'transform 0.5s ease'; // Réactiver la transition
        }, 50); // Petite pause
    } else {
        updateCarousel();
    }
    intervalId = setInterval(autoSlide, 2000); // Redémarre le défilement automatique
});

document.addEventListener("DOMContentLoaded", function() {
    const letters = document.querySelectorAll('.letter');
    const boltPath = document.getElementById('bolt-path');
    const svgContainer = document.getElementById('svg-container');
  
    letters.forEach((letter, index) => {
      const delay = index * 0.3;
  
      // Appliquer des effets variés à chaque lettre
      if (letter.textContent === "A") {
        gsap.to(letter, {
          duration: 1,
          delay: delay,
          opacity: 1,
          scale: 1.5,
          y: 50,
          ease: "elastic.out(1, 0.3)"
        });
      } else if (letter.textContent === "o") {
        gsap.to(letter, {
          duration: 1,
          delay: delay,
          opacity: 1,
          rotation: 360,
          ease: "power2.inOut"
        });
      } else if (letter.textContent === "n") {
        gsap.to(letter, {
          duration: 1,
          delay: delay,
          opacity: 1,
          x: 100,
          ease: "power2.out"
        });
      } else if (letter.textContent === "t") {
        gsap.to(letter, {
          duration: 1,
          delay: delay,
          opacity: 1,
          onComplete: function() {
            // Remplacer la lettre par le SVG éclair
            svgContainer.style.display = 'block';
            gsap.to(boltPath, {strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut"});
            gsap.to(letter, {opacity: 0});
          }
        });
      } else {
        gsap.to(letter, {
          duration: 1,
          delay: delay,
          opacity: 1,
          scale: 1.2,
          ease: "back.out(1.7)"
        });
      }
    });
  });
  