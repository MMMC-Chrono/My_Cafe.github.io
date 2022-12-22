const selectEl = selector => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Something went wrong, make sure that $(selector) exists or is typed correctly.`);
}

//nav-bar-shadow
const scrollHeader = () => {
    const headerEl = selectEl('#header');
    console.log(this.scrollY)
    if (this.scrollY >= 15) {
        headerEl.classList.add('nav-shadow');
    } else {
        headerEl.classList.remove('nav-shadow');
    }
    
}
window.addEventListener('scroll', scrollHeader);

//circles 
let coords = {x:0, y:0};
const circlesEl = document.querySelectorAll('.circles');

circlesEl.forEach(function(circleEl) {
    circleEl.x = 0;
    circleEl.y = 0;
})

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
})

const animateCircles = () => {
    let x = coords.x;
    let y = coords.y;

    circlesEl.forEach(function(circleEl, i) {
        circleEl.style.left = x + 'px';
        circleEl.style.top = y + 'px';

        circleEl.style.scale = (circlesEl.length - i) / circlesEl.length; 

        circleEl.x = x;
        circleEl.y = y;

        const nextCircle = circlesEl[i + 1] || circlesEl[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    })
    requestAnimationFrame(animateCircles);
}
animateCircles();

const colors = ['#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#b3b3b3', '#a6a6a6', '#999999', '#8c8c8c'];

circlesEl.forEach(function(circleEl, i) {
    circleEl.style.backgroundColor = colors[i];
    circleEl.style.zIndex = -i;
})

