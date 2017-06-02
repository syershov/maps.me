$(function(){
    var mobileMenu = document.querySelector('.mobile-menu'),
        mobileMenuBtnOpen = document.querySelector('.mobile-menu__open'),
        mobileMenuBtnClose = document.querySelector('.mobile-menu__close'),
        mobileMenuOpenClass = 'mobile-menu_open';

    /* focus, blur */
    mobileMenuBtnOpen.addEventListener("click", function( event ) {
        addClass(mobileMenu, mobileMenuOpenClass);
    }, true);
    mobileMenuBtnClose.addEventListener("click", function( event ) {
        removeClass(mobileMenu, mobileMenuOpenClass)
    }, true);
    /* focus, blur */
});