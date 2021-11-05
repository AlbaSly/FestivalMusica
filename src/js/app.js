const headerHeigth = document.querySelector('.header').offsetHeight;
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('#bar');


document.addEventListener('DOMContentLoaded', runApp);

function runApp() {
    fixNav();
    scrollNav();
    loadGallery();
    
    window.onscroll = function() {
        scrollEffect();
    }    
}

function scrollEffect() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage  = (winScroll / height) * 100;
    
    if (winScroll >= headerHeigth) {
        progressContainer.style.display = 'block';
        progressContainer.classList.add('animation');
    } else {
        progressContainer.style.display = 'none';
    }
    
    progressBar.style.width = scrollPercentage + '%';
}

function scrollNav() {
    const links = document.querySelectorAll('.header-nav a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const scrollSection = event.target.attributes.href.value;
            const section = document.querySelector(scrollSection);

            section.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function fixNav() {
    const header = document.querySelector('.header');
    const lineup = document.querySelector('.lineup');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if (lineup.getBoundingClientRect().top < 0 + progressContainer.clientHeight) {
            header.classList.add('header-fixed');
            if (this.innerHeight >= 768) {
                body.style.paddingTop = header.clientHeight + 'px';
            }
        } else {
            header.classList.remove('header-fixed');
            body.style.paddingTop = '';
        }
    });
}

function loadGallery() {
    const gallery = document.querySelector('.gallery-images');

    for (let x = 1; x <= 12; x++) {
        const img = document.createElement('picture');
        img.innerHTML = `
            <source srcset="build/img/thumb/${x}.avif" type="image/avif">
            <source srcset="build/img/thumb/${x}.webp" type="image/webp">
            <img loading="lazy" width="300" height="200" src="build/img/thumb/${x}.jpg" alt="Image about a concert">
        `;
        img.classList.add('image');
        img.addEventListener('click', function() {
            showImage(x);
        });

        gallery.appendChild(img);
    }
}

function showImage(id) {
    const picture = document.createElement('picture');
    picture.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="300" height="200" src="build/img/grande/${id}.jpg" alt="Image about a concert">
    `;
    picture.classList.add('picture');

    const closePicBtn = document.createElement('p');
    closePicBtn.textContent = 'x';
    closePicBtn.classList.add('close-picture-btn');
    closePicBtn.onclick = function() {
        closePicture();
    }

    const pictureBg = document.createElement('div');
    pictureBg.classList.add('picture-bg');
    pictureBg.appendChild(closePicBtn);
    picture.appendChild(pictureBg);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay','animation');
    overlay.onclick = function() {
        closePicture();
    }
    overlay.appendChild(picture);
    
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fix-body');
}

function closePicture() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('animation-end');
    setTimeout(() => {
        overlay.remove();
    }, 500);
    document.querySelector('body').classList.remove('fix-body');
}