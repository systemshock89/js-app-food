"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
            // item.style.display = 'none';
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }

            });

        }

    });
    // /Tabs

    // Timer
    const deadline = '2023-05-11';

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

        } else {
   // Math.floor округление до ближайшего целого
            // (1000 * 60 * 60 * 24) сколько в сутках миллисекунд
            days = Math.floor(t / (1000 * 60 * 60 * 24));

            // 1000 * 60 * 60 делим на кол-во миллисекунд в одном часе
            // чтобы не получить 100 часов, нужно исп-ть %
            // % делит на 24 и возвращает остаток от деления
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000 ) % 60);
        }

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds

            };
    }

    // подсталяем 0 к цифрам, если они < 10, чтобы было напр 01
    function getZero(num){
        if(num >=0 && num < 10){
            return `0${num}`;
        } else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // чтобы не было мигания верстки с цифрами из верстки (тк по интервалу эта ф-я запустится только через 1 сек)
        updateClock();
        
        function updateClock(){
            const t = getTimeRemaining(endtime); // разница между планируемым временем и текущим
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    // /Timer

    // Modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; // убираем прокрутку страницы про открытом попапе
        clearInterval(modalTimerId); // если пользователь сам открыл попап, то уже не показываем ему попап снова через 5 сек
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
   
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
         // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // при клике на подложку, либо при клике на крестик закрываем окно
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    // закрываем окно при нажатии на клавишу Escape
    document.addEventListener('keydown', (e) => { // keyDown - срабатывает когда нажимается кнопка
        if(e.code === 'Escape' && modal.classList.contains('show') ){
            closeModal();
        }
    });

    // показывать попап через 50 сек после открытия страницы
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll(){
        // pageYOffset - сколько px отлистал пользователь по оси Y
         // document.documentElement.clientHeight - видимая часть, кот-ю видим на данный момент на сайте без прокрутки
         // document.documentElement.scrollHeight - высота с учетом прокрутки
         // в конце добавим -1px, тк на некоторых мониторах и браузерах без этого не срабатывает
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();

            // как только один раз пользователь долистал до конца и ему показался попап, обработчик удаляется, чтоб больше попап не показывался
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // когда пользователь долистает до самого конца страницы - показать попап
    window.addEventListener('scroll', showModalByScroll);
    // /Modal


    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // rest элемент для того чтобы передавать несколько классов
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс валют
            this.changeToUAH(); // можно ковертиацию вызвать здесь
        }

        changeToUAH(){ // ковертация $ в гривны
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            // если никакой класс не был передан, то присвоим класс по дефолту
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            
            this.parent.append(element);
        }
    }

    // получим данные карточек
    const getResource = async (url, data) => {
        const res = await fetch(url);      

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); // объект ошибки
            // оператор throw выкидывает новую ошибку
        }

        return await res.json(); 
   };

   getResource('http://localhost:3000/menu')
   .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию объекта. (вытащим св-ва)
            
            // надо передать в конструктор все св-ва объекта: obj.img, obj.alt и тд
            // но лучше исп-ть деструктуризацию объекта
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
   });

    // получим данные карточек (с помощью биб-ки axios)
    // возвращается более подробный ответ и data уже сконвертирована в массив
    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => { 
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // еще способ (когда не нужна шаблонизация, например, если необходимо только один раз что-то построить) c помощью ф-и createCard
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data){
    //     data.forEach( ({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         price = price * 27;

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // вручную заполняем конструктор с карточками данными (нужно повторить столько раз, сколько карточек)
    // испльзуем объект на месте, поэтому сократим запись 'const item ='
    // new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     "vegy", 
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     // "menu__item"
    //     ).render();
    // /Используем классы для карточек


    // Forms
    // вариант ajax использующий XMLHttpRequest
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failture: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        // postDataFormData(item);
        bindPostData(item);
    });

    const postData = async (url, data) => {

        // это ассинхронный код (не знаем, через сколько вернется ответ от сервера)
        // (fetch может не успеет выполнится, а res присвоится ничего) 
        // для этого перед ф-ей ставим оператор async
        // await - его парный оператор, который ставим перед теми операциями, кот-е необходимо дождаться
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        });      
        
        // здесь тоже возвращается промис и тоже нужно дождать результа промиса прежде чем 
        // выполнять return 
        return await res.json(); // преобразуем ответ в json
    };

    // отправляем данные в формате json
    // Метод Fetch
    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // spinner
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            // из FormData получим обычный объект (новый способ)
            // Сначала FormData превращаем в массив массивов (матрицу): ['сво-во', значение]. с помощью entries()
            // Затем превращаем ее в объект (Object)
            // А после объект превращаем в json Object.fromEntries()
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
            // из FormData получим обычный объект (классический способ перебора)
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // затем из объекта получим json JSON.stringify(object) и передадим его в ф-ю postData

            postData('http://localhost:3000/requests', json) 
            .then(data => { // если ok
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => { // если ошибка
                showThanksModal(message.failture);
            }).finally(() => {
                form.reset();
            });

        });
    }

     // отправляем данные в формате FormData
    // Метод Fetch
    function postDataFetchFormData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // spinner
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            fetch('server.php', {
                method: 'POST',
                // headers: {
                //     'Content-type': 'application/json'
                // },
                body: formData
            }).then((data) => data.text()) // преобразовали данные ответа сервера в текст
            .then(data => { // если ok
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => { // если ошибка
                showThanksModal(message.failture);
            }).finally(() => {
                form.reset();
            });

        });
    }

    // отправляем данные в формате json
    // Устар. метод XMLHttpRequest
    function postDataXMLHttpRequestJson(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);

            // из FormData получим обычный объект 
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            // из объекта получим json
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200){
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failture);
                }
            });

        });
    }

    // отправляем данные в формате FormData
      // Устар. метод XMLHttpRequest
      function postDataXMLHttpRequestFormData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // если отправляем заголовок, то получаем Missing boundary in multipart/form-data POST data in 
            // решение: не отправлять заголовок вовсе, он устанавливается автоматически
            // https://inoyakaigor.ru/blog/94
            // request.setRequestHeader('Content-type', 'multipart/form-data');

            // соберем все данные с формы в формат FormData
            // ! у всех input-ов обязательно должен быть атрибут name
            const formData = new FormData(form);
 
            // если в openserver HTTP apache, то получаем ошибку.
            // Нужно поставить Nginx 1.12 или apache + nginx
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200){ 
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failture;
                }
            });

        });

    }

    // ф-я показывающая сообщения после отправки формы
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        document.querySelector('.modal').append(thanksModal);

        // спустя 4 сек убирать сообщение и возвращать форму к изначальному состоянию
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    // /Forms


    // Slider variant 2
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0; // отступ, чтобы знать, на сколько отступили вправо/влево

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; // ширина = кол-во слайдов * 100%, чтобы все слайды поместились в этом блоке
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width; // чтобы все слайды были одинаковой ширины
    });

    next.addEventListener('click', () => {
        // если долистали до самого конца, то возвратимся в начало
        if(offset == +width.slice(0, width.length - 2) * (slides.length -1) ){ // width превратим в число и отрежем px
            offset = 0;
        } else { // если слайд не последний, то смещаем на ширину одного слайда
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `slideIndex`;
        }
    });

    prev.addEventListener('click', () => {
        // если долистали до самого начала, то возвратимся в конец слайдера
        if(offset == 0){ 
            offset = +width.slice(0, width.length - 2) * (slides.length -1);
        } else { // если слайд не первый, то смещаем на ширину одного слайда
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `slideIndex`;
        }
    });
    // Slider variant 2


    // Slider variant 1
    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');
    // let slideIndex = 1;
    
    // showSlides(slideIndex); // инициализируем слайдер, передав туда начальное знач-е slideIndex

    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){ // n - slideIndex

    //     // если ушли в правую границу слайдера, то перемещаемся в начало
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     // если ушли в левую границу, то перемещаемся в конец слайдера
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');       
    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }        
    // }

    // function plusSlides(n){
    //     showSlides( slideIndex += n); // slideIndex увеличен на значение n, либо уменьшен
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(+1);
    // });
    // /Slider variant 1

});