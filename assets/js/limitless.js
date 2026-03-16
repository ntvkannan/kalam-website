////////////////////////////////
// Mega Menu
const megaMenu = document.querySelector('.mega-menu');
const toggleMenu = document.querySelector('.toggle-menu');
const links = document.querySelectorAll('.mega-menu a');

if(toggleMenu){
    toggleMenu.addEventListener('click', function(){
        megaMenu.classList.add('show');
    });
}


const closeMenu = document.querySelector('.close-menu');
if(closeMenu){
    closeMenu.addEventListener('click', function(){
        megaMenu.classList.remove('show');
    });
}

if(links){
    links.forEach( link => {
        link.addEventListener('click', function(){
            megaMenu.classList.remove('show');
        })
    });
}

///////////////////////////////////////////////////
// SVG ICONs

const svgs = document.querySelectorAll('.svg-icon');

const observer = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add('animate'); // Add the class to trigger the animation
        } else {
        entry.target.classList.remove('animate'); // Remove the class if out of view
        }
    });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
);

if(svgs){
    svgs.forEach((svg) => observer.observe(svg));
}

