const hamburger_button = document.getElementById("btn-hamburger");
const dropdown_nav = document.getElementById("mainNav-dropdown-menu");
let toggle = 0;
hamburger_button.addEventListener('click', function(){

if(toggle == 0){
toggle = 1;
dropdown_nav.classList.add('active');
}else{
toggle = 0;
dropdown_nav.classList.remove('active');
}
});