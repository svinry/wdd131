const humbagBtn = document.querySelector("#menu")
const navigation = document.querySelector('.navigation')

humbagBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    humbagBtn.classList.toggle('open');
})