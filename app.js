document.addEventListener("DOMContentLoaded", function (event) {
    let images = document.getElementsByTagName('img');
    for (i = 0; i < images.length; i++) {

        if (images[i].alt == 'www.000webhost.com') {
            images[i].style.display = 'none';
        }
    }
});

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

// yangi vazifa qoshish tugmasi
const addNewTaskBtn = document.querySelector('.addNewTask');

// yangi element qayerga qo'shilayotganini ko'rsatisgni tanlash
const whereAdd = document.querySelector('.tanlash');
const pressEnter = document.querySelector('.add input');

// yangi vazifa qoshish funkiyasi
addNewTaskBtn.onclick = addNewItem;
pressEnter.onkeyup = (e) => {
    if (e.which == '13') {
        addNewItem()
    }
}


function addNewItem() {
    if (addNewTaskBtn.previousElementSibling.value != "") {

        // Vazifa yozilgan stringni o'zlashtirish va un yoboriladigan 
        // requestning body qismiga yoziladi
        let taskText = addNewTaskBtn.previousElementSibling.value;

        const newTask = document.createElement('li');
        newTask.classList.add('disable')
        // element uchun span yaratamiz va ichiga vazifa stiringini joylaymiz
        const newSpan = document.createElement('span');
        newSpan.innerHTML = taskText;

        // element uchun button check ni yaratamiz
        const newButtonOne = document.createElement('button');
        newButtonOne.classList.add("status", "btn");
        newButtonOne.innerHTML = `<i class='fas fa-check'></i>`;

        // element uchun button delete ni yaratamiz
        const newButtonTwo = document.createElement('button');
        newButtonTwo.classList.add("delete", "btn");
        newButtonTwo.innerHTML = `<i class="fas fa-trash-alt"></i>`;


        // yartilgan elemetntlarni li elementi ichiga joylaysh
        newTask.append(newSpan, newButtonOne, newButtonTwo);

        // yaratigan li elementini ul elementi ichiga joylash
        whereAdd.insertBefore(newTask, whereAdd.firstChild);

        const myHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        // yoboriladigan data
        var urlencoded = new URLSearchParams();
        urlencoded.append("user_id", document.cookie);
        urlencoded.append("todo", taskText);
        urlencoded.append("status", "0");

        // fetchning optionlari
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        // data junatish 
        fetch(`${api_url}/item/create`, requestOptions)
            .then(response => response.text())
            .then(function (result) {
                let json = JSON.parse(result);
                newButtonTwo.setAttribute('data-id', json.id)
                newButtonOne.setAttribute('data-id', json.id)
            })

        // elment qo'shilgandan so'ng input maydoni tozalash
        addNewTaskBtn.previousElementSibling.value = "";

        // har safar element qo'shilganda uni qolgan funksiyalarga ko'rsatish
        // getData();
        deleteItem();
        isDone();
    }
}

// --------------


// orqicha elementlarni o'chirib tashlash funksiyasi

const deleteItem = async () => {
    // delete tugmasini tanlab olish
    const deleteBtn = document.querySelectorAll('.delete')
    deleteBtn.forEach(item => {
        item.onclick = () => {
            item.parentElement.classList.add("fall");

            item.parentElement.ontransitionend = () => {
                item.parentElement.remove();
            }

            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
              };
              
              fetch(`https://apis.firefox.uz/api/item/delete?id=${item.dataset.id}`, requestOptions)
        }
    })
}

// ishni bajarganmi yo'qmi belgilash funksiyasi

const isDone = async () => {
    // vazifani tekshirish tugmasi
    const statusBtn = document.querySelectorAll('.status');
    statusBtn.forEach(item => {
        item.onclick = () => {
            if (item.parentElement.classList.value == 'enable') {
                item.parentElement.classList.add('disable');
                item.parentElement.classList.remove('enable');
            } else {
                item.parentElement.classList.add('enable');
                item.parentElement.classList.remove('disable');
            }

             const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                
                const urlencoded = new URLSearchParams();
                if(item.dataset.status == "1"){  
                    urlencoded.append("status", "0");
                    item.dataset.status = "0";
                }
                else {
                    urlencoded.append("status", "1");
                    item.dataset.status = "1";
                }

                const requestOptions = {
                  method: 'PATCH',
                  headers: myHeaders,
                  body: urlencoded,
                  redirect: 'follow'
                };
                
                fetch("https://apis.firefox.uz/api/item/update?id="+item.dataset.id, requestOptions);
        }
    })
}

// ------------------

// qilingan ishlarni saralash bajarildimi bajarilmadimi va barchasini ko'rsatish

const openBtn = document.querySelector('.fa-sort-amount-down');

openBtn.onclick = openClose;

// ro'yxatni ochib yopish 
function openClose() {
    if (!openBtn.nextElementSibling.style.height) {
        openBtn.nextElementSibling.style.height = openBtn.nextElementSibling.scrollHeight + "px";
    } else {
        openBtn.nextElementSibling.style.height = null;
    }
}

const selectItems = document.querySelectorAll(".item")

selectItems.forEach(item => {
    item.onclick = () => {
        const items = document.querySelectorAll('.tanlash li')
        items.forEach(e => {
            e.style.display = 'none';
            if (item.innerHTML == 'Barchasi') {
                e.style.display = 'block';
                document.querySelector('.selected').innerHTML = "Barchasi";
            }
            if (item.innerHTML == 'Bajarilgan' && e.classList.value == 'enable') {
               
                    e.style.display = 'block';
                    document.querySelector('.selected').innerHTML = "Bajarilgan";
            }
            if (item.innerHTML == 'Bajarmaganlar' && e.classList.value == 'disable') {
               
                    e.style.display = 'block';
                    document.querySelector('.selected').innerHTML = "Bajarilmaganlar";
            }
        })
        openClose();
    }
})


// bazadan kelgan ma'limotlarni yaratish va chop etish

const getData = async () => {
    const response = await fetch(api_url + 'item/find?user_id=' + document.cookie + "&sort=-id")
    const data = await response.json();
    let oldData = [];
    data.map(item => {
        oldData += `<li class="${item.status == 1 ? "enable" : "disable"}">
        <span>${item.todo}</span>   
        <button data-id=${item.id} data-status=${item.status} class="status btn"><i class="fas fa-check"></i></button>
        <button data-id=${item.id}  class="delete btn"><i class="fas fa-trash-alt"></i></button></li>`;
    })
    whereAdd.innerHTML = oldData;
    deleteItem();
    isDone();
}

getData()





