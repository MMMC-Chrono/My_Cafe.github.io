const selectEl = selector => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Something went wrong, make sure that $(selector) exists or is typed correctly.`);
}

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