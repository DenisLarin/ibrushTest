import './styles/main.scss'
import('./styles/mobilePart.scss')


const openChooseBtn = document.querySelector(".selected");
openChooseBtn.addEventListener('click', ()=>{
   const selectBox = document.querySelector('.select-box');
   if (selectBox.classList.contains('active')){
       selectBox.classList.remove('active')
   }
   else{selectBox.classList.add('active')}
});