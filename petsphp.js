
// document.addEventListener('DOMContentLoaded', () => {
//     getAllData();
// });


async function getAllData() {
    const res = await fetch('./profile.php');
    const data = await res.json();
    data.forEach(profile => {
        const profileCard = createProfile(profile, PetType); // Pass PetType as an argument
        createButton(profile, profileCard);
    });
}

function createProfile(data, type) {
    const profileDiv = document.createElement('div');
    const dataType = data.type;
    profileDiv.classList.add('card');
    
    if(dataType == type) { // Compare dataType with the type parameter
        profileDiv.id = data.name;
        profileDiv.innerHTML = `
            <img src="imagesPets/${data.img}">        
            <h3>${data.name}</h3>            
            <h4>${data.gender}, ${data.age} ${data.type}</h4>
        `;
        document.querySelector('.cards').appendChild(profileDiv);
    }
    else if(type == "all") { // Compare dataType with the type parameter
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



function createButton(data, profileCard) {
    const linksDiv = document.createElement('div');
    linksDiv.classList.add('card_links');
    linksDiv.innerHTML = `    
        <button class="button yellow-pet" onclick="showModal()">Усиновити</button>
        <button class="like-pet">а</button>
    `;
    
    const likePetButton = linksDiv.querySelector('.like-pet');
    
    likePetButton.addEventListener('click', function() {
        this.classList.toggle('chosen');
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


