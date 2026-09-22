const hamburgBtn = document.querySelector("#menu")
const navigation = document.querySelector('.navigation')

hamburgBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgBtn.classList.toggle('open');
})
