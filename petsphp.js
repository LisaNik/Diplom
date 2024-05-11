let data = [];
let likedId =[];
document.addEventListener('DOMContentLoaded', () => {
    getDataPhp();
});

async function getDataPhp() {

    const res = await fetch('./profile.php');
    data = await res.json();
    
    getAllData();
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


    //Проверка пустого div cards
    const element =  document.querySelector('.cards');

    if (element.classList.length == 0) {
        element.innerHTML = "<h1>hello</h1>";
    }
}

function createProfile(data, type, size, gender, age) {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('card');
    
    if((type == "all" || data.type == type) && gender.includes(data.gender) && age.includes(data.age) && size.includes(data.size))  { // Compare dataType with the type parameter
        profileDiv.id = data.name;
        profileDiv.innerHTML = `
            <img src="imagesPets/${data.img}">        
            <h3>${data.name}</h3>            
            <h4>${data.gender}, ${data.age} ${data.type}</h4>
        `;
        document.querySelector('.cards').appendChild(profileDiv);
    }
     // Trigger reflow to restart the transition
     profileDiv.offsetHeight;
     // Apply fade-in animation by changing opacity
     profileDiv.style.opacity = '1'; 
    return profileDiv;
}

function createLikedProfile(data) {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('card');
    
    profileDiv.id = data.name;
    profileDiv.innerHTML = `
        <img src="imagesPets/${data.img}">        
        <h3>${data.name}</h3>            
        <h4>${data.gender}, ${data.age} ${data.type}</h4>
    `;
    document.querySelector('.liked-cards').appendChild(profileDiv);
    
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
        <button class="button yellow-pet" onclick="showModal()">Усиновити</button>
        <button class="like-pet">а</button>
    `;
    
    const likePetButton = linksDiv.querySelector('.like-pet');
    
    likePetButton.addEventListener('click', function() {
        this.classList.toggle('chosen');

        const parentClass = this.closest('.card');
        const parentId = parentClass.id;

        
        if (this.classList.contains('chosen')) {
            
            likedId.push(parentId);
            document.getElementById('likes').innerHTML = `
                    <h1>${data}</h1>
                `;
            
        } else {
            
        const index = likedId.indexOf(parentId);
        
        likedId.splice(index,1);
            document.getElementById('likes').innerHTML = `
            <h1>${likedId}</h1>
        `;
        }


        data.forEach(profile => {
            if(likedId.includes(profile.name)){                
                createLikedProfile(profile);
            }
        });


    });

    profileCard.appendChild(linksDiv); // Append the button to the profile card
}

function adoptPet(id) {
    // Определите, какую страницу усыновления открывать в зависимости от ID
    let page = '';
    switch (id) {
        case 'Скрудж':
            page = 'petPage1.html';
            break;
        case '2':
            page = 'adopt_dog.html';
            break;
        // Добавьте другие варианты для разных животных, если необходимо
        default:
            page = 'adopt_default.html'; // Страница по умолчанию или обработка ошибки
            break;
    }

    // Перенаправляем пользователя на соответствующую страницу
    window.location.href = page;
}


