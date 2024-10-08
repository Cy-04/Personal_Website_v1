//MAIN NAV EVENT START
/*const btn_hamburger = document.querySelector('.toggle-button-icons');
btn_hamburger.addEventListener('click', function (){
    const nav_container = document.getElementById('mainNav');
    let nav_chckBox = document.getElementById('mainNav-checkbox');
    if(nav_chckBox.checked){
        nav_container.style.backdropFilter = "blur(10px)";
        nav_container.style.background = "rgba(255,255,255,0.3";
    }else{
        nav_container.style.backdropFilter = "none";
        nav_container.style.background = "rgba(0,0,0,0.5";
    }
});*/
//MAIN NAV EVENT END

//CAROUSEL EVENTS START
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".carousel-container i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];
let isDragging = false, startX, startScrollLeft, timeoutId;

//get the number of cards that can fit in the carouse at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//Add event listener for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        
    console.log(btn.id);
        carousel.scrollLeft += btn.id === "btn-scroll-left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    //Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) =>{
    if(!isDragging) return; //if isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
//CAROUSEL EVENTS END