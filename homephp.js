let parameters = [];

document.addEventListener('DOMContentLoaded', () => {    
    getDataPhp();
});

async function getParamPhp(answers) {
    const res = await fetch('./parameters.php');
    parameters = await res.json(); 
    
    const valuesArray = parameters.map(Object.values);//массив без названий

    console.log(valuesArray); 

    const mixedMatrix = valuesArray.map(row => {
        const [firstElement, ...rest] = row;
        return [firstElement, ...rest.map(value => parseInt(value, 10))];
    });

console.log(mixedMatrix); 
let minValue;
let minName;
console.log(minValue);
mixedMatrix.forEach(pet => {
    let formula = pet
        .slice(1)
        .map((attribute, idx) => {
            return Math.pow(attribute-answers[idx],2)
        })
        .reduce((accum, value) => accum + value,0);
    
    formula = Math.sqrt(formula); 

    if(minValue > formula || !minValue){
        minValue = formula;
        minName = pet[0];
    }       
});

console.log(minValue);
console.log(minName);
showBestCard(minName);
}

function showBestCard(minName){
    const bestCard = data.find( minCard => minCard.name === minName);
    console.log(bestCard);

    const profileDiv = document.createElement('div');
    profileDiv.classList.add('best-card');
    
    profileDiv.id = bestCard.name;
    profileDiv.innerHTML = `
        <img src="imagesPets/${bestCard.img}">        
        <h3>${bestCard.name}</h3>            
        <h4>${bestCard.info}</h4>
    `;
    document.querySelector('.best-cards').appendChild(profileDiv);
    
     // Trigger reflow to restart the transition
     profileDiv.offsetHeight;
     // Apply fade-in animation by changing opacity
     profileDiv.style.opacity = '1'; 
    // return profileDiv;
    createBestButton(profileDiv);
}

function createBestButton(profileCard) {
    const linksDiv = document.createElement('div');
    linksDiv.classList.add('card_links');
    linksDiv.innerHTML = `    
        <button class="button yellow-pet">Усиновити</button>
        <button class="like-pet">а</button>
    `;
    const likePetButton = linksDiv.querySelector('.like-pet');
    const yellowPetButton = linksDiv.querySelector('.button.yellow-pet');

    if(likedId.includes(profileCard.id)){
        likePetButton.classList.add('chosen');

    }; // Append the button to the profile card    
        
    likePetButton.addEventListener('click', function() {
        this.classList.toggle('chosen');

        const parentClass = this.closest('.best-card');
        const parentId = parentClass.id;
        
        if (this.classList.contains('chosen')) {
            
            likedId.push(parentId);
            
        } else {
            const index = likedId.indexOf(parentId);        
            likedId.splice(index,1);
        }

        localStorage.setItem("likedId", likedId);
        showLikedCards();
        
    });

    yellowPetButton.addEventListener('click', function() {
        const parentClass = this.closest('.best-card');
        const parentId = parentClass.id;
        localStorage.setItem('petPageId', parentId);
        console.log('petPageId');
        window.location = 'petPage.html';

    });

    profileCard.appendChild(linksDiv); // Append the button to the profile card
}



//  side-bar
document.addEventListener('DOMContentLoaded', () => {
    showLikedCards();
  });
    
  const homeLike =document.getElementById("home-like-btn");
  
  // Перебираем каждый элемент коллекции и добавляем обработчик событий
  
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
        const cardId = document.querySelector(`.liked-card#${parentId}`);

            // Находим кнопку "like-pet" внутри элемента "card"
        const likeCardButton = cardId.querySelector('.like-pet');
            // Применяем toggle к классу "chosen" кнопки "like-pet"
        likeCardButton.classList.toggle('chosen');
                    
        const index = likedId.indexOf(parentId);
        likedId.splice(index,1);
        
        showLikedCards();
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
