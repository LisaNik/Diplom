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
        <h4>${bestCard.gender}, ${bestCard.age} ${bestCard.type}</h4>
    `;
    document.querySelector('.best-cards').appendChild(profileDiv);
    
     // Trigger reflow to restart the transition
     profileDiv.offsetHeight;
     // Apply fade-in animation by changing opacity
     profileDiv.style.opacity = '1'; 
    // return profileDiv;
    createButton(profileDiv);
}




