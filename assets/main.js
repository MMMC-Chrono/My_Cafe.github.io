const selectEl = selector => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Something went wrong, make sure that $(selector) exists or is typed correctly.`);
}

//nav-bar-shadow
const scrollHeader = () => {
    const headerEl = selectEl('#header');
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

//hello animation

const alphabets = document.querySelectorAll('.alphabets');
let i = 0;

setInterval(function() {
    if ( i < alphabets.length) {
    alphabets[i].style.opacity = 1;
    i++;
    } else {
        alphabets.forEach(function(alphabet) {
            alphabet.style.opacity = 0;
        })
        i = 0;
    }    
}, 500)


//gallery slider
const imgBox = document.getElementById('gallery-image-box');

const onDown = e => {
    imgBox.dataset.mouseDownAt = e.clientX;
}

const onMove = e => {
    if (imgBox.dataset.mouseDownAt === '0') return;

    const mouseData = parseFloat(imgBox.dataset.mouseDownAt) - e.clientX,
        maxData = window.innerWidth * 7;
    
    const percentage = (mouseData / maxData) * -100,
        nextPercentageNoLimit = parseFloat(imgBox.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageNoLimit, 0), -12);
        
    console.log(window.frames.innerWidth)
    imgBox.dataset.percentage = nextPercentage;
    imgBox.animate({
        transform: `translate(${nextPercentage*8}%, -50%)`
    }, {
        duration: 1200, fill: "forwards"
    })

    for (const image of imgBox.getElementsByClassName('gallery-image')) {
        image.animate({
            objectPosition: `${(70+(nextPercentage*5))}% center`
        }, {
            duration: 1200, fill: 'forwards'
        })
    }
}

const onUp = () => {
    imgBox.dataset.mouseDownAt = "0";
    imgBox.dataset.prevPercentage = imgBox.dataset.percentage;
}

window.onmousedown = e => onDown(e);
window.onmousemove = e => onMove(e);
window.onmouseup = e => onUp(e);

window.ontouchstart = e => onDown(e.touches[0]);
window.ontouchmove = e => onMove(e.touches[0]);
window.ontouchend = e => onUp(e.touches[0]);