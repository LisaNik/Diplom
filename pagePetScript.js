let data = [];
let petName;
let likedId =[];



document.addEventListener('DOMContentLoaded', () => {
    
    console.log(localStorage.getItem('likedId'));
    likedId=localStorage.getItem('likedId').split(',');
    console.log(likedId);
  
    // console.log(sessionStorage.getItem('petData'));
    getDataPhp();
    showLikedPetCards();    
});


async function getDataPhp() {
    const res = await fetch('./profile.php');
    data = await res.json();
    // sessionStorage.setItem('petData',data);
    // console.log(petProfile);

    getPetData();
}


function getPetData(){    
    
    data.forEach(profile => {
        if (profile.name === localStorage.getItem('petPageId')) {
          petName = profile.name; 

            document.querySelector('.info-name').textContent = profile.name;
            document.querySelector('.features-pet').textContent = profile.info;
            document.querySelector('.discr').textContent = profile.about;
            document.querySelector('.image-pet').src = `imagesPets/${profile.img}`;

            if(localStorage.getItem('likedId').includes(profile.name)){
              document.querySelector('.like-pet').classList.add('chosen');      
          };

    // console.log(localStorage.getItem('petPageId'));

        }
    });
}

const likePetButton = document.querySelector('.like-pet');
    
    likePetButton.addEventListener('click', function() {
              
      likePetButton.classList.toggle('chosen');

      if (this.classList.contains('chosen')) {            
        likedId.push(petName);        

        // document.getElementById('likes').innerHTML = `
        //         <h1>${data}</h1>
        //     `;
        
    } else {
        const index = likedId.indexOf(petName); 
        likedId.splice(index,1);
    }
    
    localStorage.setItem('likedId',likedId);
    
    console.log(localStorage.getItem('likedId'));

    });


(function () {
    var doc = document.documentElement;
    var w = window;
  
    var curScroll;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curDirection = 0;
    var prevDirection = 0;
  
    var header = document.getElementById('site-header');
    var toggled;
    var threshold = 100;
  
    var checkScroll = function () {
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) {
        // scrolled down
        curDirection = 2;
      } else {
        //scrolled up
        curDirection = 1;
      }
  
      if (curDirection !== prevDirection) {
        toggled = toggleHeader();
      }
  
      prevScroll = curScroll;
      if (toggled) {
        prevDirection = curDirection;
      }
    };
  
    var toggleHeader = function () {
      toggled = true;
      if (curDirection === 2 && curScroll > threshold) {
        header.classList.add('hide');
      } else if (curDirection === 1) {
        header.classList.remove('hide');
      } else {
        toggled = false;
      }
      return toggled;
    };
  
    window.addEventListener('scroll', checkScroll);
  })();

  const showModal = () => {
    const modal = document.getElementById('modal')
  
    modal.classList.add('visible')
  }
  
  const hideModal = () => {
    const modal = document.getElementById('modal')
  
    modal.classList.remove('visible')
  }
  

  const homeLike =document.getElementById("toggleSidebar");
  
  homeLike.addEventListener('click', function() {
    showSidebar();
    showLikedPetCards();
});

function showSidebar(){
const sidebar = document.querySelector('.sidebar');
sidebar.classList.toggle('active');

const blackBack = document.querySelector('.black-back');
if (sidebar.classList.contains('active')) {
    blackBack.classList.add('visible');
} else {
    blackBack.classList.remove('visible');
}
}

function showLikedPetCards(){    
const div = document.querySelector('.sidebar-cards');
while (div.firstChild) {
  div.removeChild(div.firstChild);
}

data.forEach(profile => {
  if (likedId.includes(profile.name)) {
      const profileLikedCard = createLikedProfile(profile);
      createLikePetButton(profileLikedCard);        
  }
});
}

function createLikePetButton(profileCard) {
const linksDiv = document.createElement('div');
linksDiv.classList.add('card_links');
linksDiv.innerHTML = `    
<button class="button yellow-pet" >Усиновити</button>
  <button class="like-pet chosen">а</button>
`;

const likePetButton = linksDiv.querySelector('.like-pet');
const yellowPetButton = linksDiv.querySelector('.button.yellow-pet');

likePetButton.addEventListener('click', function() {

  const parentClass = this.closest('.liked-card');
  const parentId = parentClass.id;

  //Ищем лайкнутую кнопку в классе card
  // const cardId = document.querySelector(`.liked-card#${parentId}`);

  //     // Находим кнопку "like-pet" внутри элемента "card"
  // const likeCardButton = cardId.querySelector('.like-pet');
  //     // Применяем toggle к классу "chosen" кнопки "like-pet"
  // likeCardButton.classList.toggle('chosen');

  likePetButton.classList.toggle('chosen');

              
  const index = likedId.indexOf(parentId);
  likedId.splice(index,1);
  
  showLikedPetCards();
  localStorage.setItem('likedId',likedId);
  
});

yellowPetButton.addEventListener('click', function() {
  const parentClass = this.closest('.liked-card');
  const parentId = parentClass.id;
  localStorage.setItem('petPageId', parentId);
  window.location = 'petPage.html';
  // console.log('petPageId');
});

profileCard.appendChild(linksDiv); // Append the button to the profile card
}


function createLikedProfile(data) {
  const profileDiv = document.createElement('div');
  profileDiv.classList.add('liked-card');
  
  profileDiv.id = data.name;
  profileDiv.innerHTML = `
      <img src="imagesPets/${data.img}">        
      <h3>${data.name}</h3>            
      <h4>${data.info}</h4>

  `;
  document.querySelector('.sidebar-cards').appendChild(profileDiv);
  
   // Trigger reflow to restart the transition
   profileDiv.offsetHeight;
   // Apply fade-in animation by changing opacity
   profileDiv.style.opacity = '1'; 
  return profileDiv;
}
