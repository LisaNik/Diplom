let data = [];
let likedId =[];

document.addEventListener('DOMContentLoaded', () => {
    getDataPhp();
    likedId=localStorage.getItem('likedId').split(',');
    console.log(likedId);
});

function showLikedCards(){    
    const div = document.querySelector('.sidebar-cards');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    data.forEach(profile => {
        if (likedId.includes(profile.name)) {
            const profileLikedCard = createLikedProfile(profile);
            createLikeButton(profileLikedCard);            
        }
    });
}

async function getDataPhp() {
    const res = await fetch('./profile.php');
    data = await res.json();
    // sessionStorage.setItem('petData',data);
    getAllData();
    showLikedCards();
}

function getAllData() {
    const div = document.querySelector('.cards');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    data.forEach(profile => {
        const profileCard = createProfile(profile, PetType,selectedSize, selectedGender, selectedAge); // Pass PetType as an argument
        createButton(profileCard);
    });
}

function createProfile(data, type, size, gender, age) {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('card');
    
    if((type == "all" || data.type == type) && gender.includes(data.gender) && age.includes(data.age) && size.includes(data.size))  { // Compare dataType with the type parameter
        profileDiv.id = data.name;
        profileDiv.innerHTML = `
            <img src="imagesPets/${data.img}">        
            <h3>${data.name}</h3>            
            <h4>${data.info}</h4>
        `;
        document.querySelector('.cards').appendChild(profileDiv);
    }

    if(likedId.includes(data.name)){

    }
     // Trigger reflow to restart the transition
     profileDiv.offsetHeight;
     // Apply fade-in animation by changing opacity
     profileDiv.style.opacity = '1'; 
    return profileDiv;
}

// function getAllLikedData() {
//     const div = document.querySelector('.liked-cards');
//     while (div.firstChild) {
//         div.removeChild(div.firstChild);
//     }

//     data.forEach(profile => {
//         const profileCard = createProfile(profile, PetType,selectedSize, selectedGender, selectedAge); // Pass PetType as an argument
//         createButton(profileCard);
//     });


//     // //Проверка пустого div cards
//     // const element =  document.querySelector('.cards');

//     // if (element.classList.length == 0) {
//     //     element.innerHTML = "<h1>hello</h1>";
//     // }
// }

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


function createButton(profileCard) {
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

        const parentClass = this.closest('.card');
        const parentId = parentClass.id;
        
        if (this.classList.contains('chosen')) {
            
            likedId.push(parentId);
            // document.getElementById('likes').innerHTML = `
            //         <h1>${data}</h1>
            //     `;
            
        } else {
            const index = likedId.indexOf(parentId);        
            likedId.splice(index,1);
        }

        localStorage.setItem("likedId", likedId);
        showLikedCards();
        
    });

    yellowPetButton.addEventListener('click', function() {
        const parentClass = this.closest('.card');
        const parentId = parentClass.id;
        localStorage.setItem('petPageId', parentId);
        console.log('petPageId');
        window.location = 'petPage.html';

    });

    profileCard.appendChild(linksDiv); // Append the button to the profile card
}


function createLikeButton(profileCard) {
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
        const cardId = document.querySelector(`.card#${parentId}`);

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
        console.log('petPageId');
        window.location = 'petPage.html';

    });


    profileCard.appendChild(linksDiv); // Append the button to the profile card
}


document.querySelectorAll(".button.yellow-pet").addEventListener('click', function() {
    const parentClass = this.closest('.liked-card');
        const parentId = parentClass.id;
        const card = this.closest('.card');
        
     
});


// document.querySelectorAll("div.card button.button.yellow-pet").forEach(button => {
//     button.addEventListener('click', function() {
//         console.log("test1");

//         // // Найти ближайший родительский элемент с классом 'card'
//         const card = this.closest('.card');
//         console.log(card);        
//     });
// });

// document.querySelectorAll("div.liked-card button.button.yellow-pet").forEach(button => {
//     button.addEventListener('click', function() {
//         console.log("test2");

//         // Найти ближайший родительский элемент с классом 'liked-card'
//         const likedCard = this.closest('.liked-card');
//         console.log(likedCard);

//     });
// });


