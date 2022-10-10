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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // modal.classList.toggle('show');
            document.body.style.overflow = 'hidden'; // убираем прокрутку страницы про открытом попапе
        });
    });
   
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
         // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    // при клике на подложку закрываем окно
    modal.addEventListener('click', (e) => {
        if(e.target === modal){
            closeModal();
        }
    });

    // закрываем окно при нажатии на клавишу Escape
    document.addEventListener('keydown', (e) => { // keyDown - срабатывает когда нажимается кнопка
        if(e.code === 'Escape' && modal.classList.contains('show') ){
            closeModal();
        }
    });
    // /Modal

});