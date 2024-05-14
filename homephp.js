let parameters = [];
let data = [];

document.addEventListener('DOMContentLoaded', () => {
    getParamPhp();
    getDataPhp();
});

async function getParamPhp() {
    const res = await fetch('./parameters.php');
    parameters = await res.json();    
}


async function getDataPhp() {
    const res = await fetch('./profile.php');
    data = await res.json();
    
}



function getBestCard(){
    data.forEach(parameter => {
        // if(data.name === "Куки"){

            const profileDiv = document.createElement('div');
            profileDiv.classList.add('best-card');
            profileDiv.id = data.name;
            profileDiv.innerHTML = `
                <img src="imagesPets/${data.img}">        
                <h3>${data.name}</h3>            
                <h4>${data.gender}, ${data.age} ${data.type}</h4>
            `;
            document.querySelector('.best-cards').appendChild(profileDiv);
     
        // }

    });
}


// function getBestCard() {
   
    // const bestCard = document.querySelector('.best-card');
     

//   data.forEach(profile => {

//       if(profile.id === '1'){
//           const profileCard = createProfile(profile); // Pass PetType as an argument
//           createButton(profileCard);
//       }
//   });
// }