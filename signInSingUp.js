
document.addEventListener("DOMContentLoaded", function (event) {
    let images = document.getElementsByTagName('img');
    for (i = 0; i < images.length; i++) {

        if (images[i].alt == 'www.000webhost.com') {
            images[i].style.display = 'none';
        }
    }
});

// junatishdan oldin tekshirigan natijalarni bir oladigan o'garuvchilar
let valUserName;
let valEmail;
let valPass;

// forma elementlarini animatsiya qilish
function animatedForm() {
    const arrows = document.querySelectorAll('.fa-arrow-down');

    arrows.forEach(arrow => {
        const input = arrow.previousElementSibling;
        const parent = arrow.parentElement;

        input.addEventListener('change', () => {

            if (input.name == 'username') {
                valUserName = validateUser(input);
            }
            if (input.name == 'email') {
                valEmail = validateEmail(input)
            }
            if (input.name == 'password') {
                valPass = validatePass(input)
            }

        })
        const emailRe = /^([A-z0-9_/-/.]+)\@([A-z0-9_/-/.]+)\.([A-z0-9]{2,9})$/;
        const nameRe = /^[\w]{3,13}$/;
        const passwordRe = /^([\w\W]{6,16})$/;
        //    Username maydonini tekshirish
        function validateUser(input) {
            if (!nameRe.test(input.value)) {
                error(input.nextElementSibling, 'rgb(189, 87, 98)', 90);
                return false;
            } else {
                error(input.nextElementSibling, 'rgb(87,189,130)', 0);
                return true;
            }
        }
        //    Email maydonini tekshirish
        function validateEmail(input) {
            if (!emailRe.test(input.value)) {
                error(input.nextElementSibling, 'rgb(189, 87, 98)', 90);
                return false;
            } else {
                error(input.nextElementSibling, 'rgb(87,189,130)', 0);
                return true;
            }
        }
        //    Password maydonini tekshirish
        function validatePass(input) {
            if (!passwordRe.test(input.value)) {
                error(input.nextElementSibling, 'rgb(189, 87, 98)', 90);
                return false;
            } else {
                error(input.nextElementSibling, 'rgb(87,189,130)', 0);
                return true;
            }
        }
        //     Xato maydonni ko'rsatish
        function error(arrow, color, corner) {
            arrow.style.color = color;
            arrow.style.transform = `rotateZ(${corner}deg)`;
        }
    })
}
animatedForm();
const formIn = document.querySelector('.singIn form');

const formUp = document.querySelector('.singUp form');

formUp.onsubmit = (e) => {
    if (!(valEmail && valPass)) {
        e.preventDefault();
    }
}




// idintifikatsiya uchun random string olish
const api_url = 'https://apis.firefox.uz/api/';

const randString = () => {
    let string = "";
    for (let i = 1; i < 32; i++) {
        string += String.fromCharCode(Math.floor(Math.random() * 75 + 48));
    }
    return string;
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
        var expires = "; expires=" + date.toGMTString(); // + added
    }
    else var expires = "";

    if (!document.cookie) {
        document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
    }
}

window.addEventListener('load', () => {
    setCookie('user_id', randString(), 365);
})
