//Каталог
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        const btn = document.getElementById(id);
        if (btn) {
            showFilteredContent(btn, Array.from(btn.parentNode.parentNode.children).indexOf(btn.parentNode));
        }
    }
});

//Разделы
const allFilterItems = document.querySelectorAll('.card');
const allFilterBtns = document.querySelectorAll('.pets-button');
const allFilterUnder = document.querySelectorAll('.underline');
let PetType = 'all';

allFilterBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn, index);
    });
});

function showFilteredContent(btn, index) {             
    resetActiveBtn();
    btn.classList.add('active-btn');
    allFilterUnder[index].classList.add('underline-active');            
    PetType = btn.id;   
    getAllData();
   
}

function resetActiveBtn() {
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
    allFilterUnder.forEach((underline) => {
        underline.classList.remove('underline-active');
    });

    const div = document.querySelector('.cards');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


////////////////////////////////////////////LIKE

document.querySelectorAll(".like-pet").forEach(button => {
    button.addEventListener("click", function() {
        this.classList.toggle("chosen");
    });
});

////////////////////Фильтр чекбокс

const selectBtns = document.querySelectorAll(".select-btn");

selectBtns.forEach(selectBtn => {
    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    });
});

const containers = document.querySelectorAll(".container");

containers.forEach(container => {
    const items = container.querySelectorAll(".item");
    const selectBtn = container.querySelector(".select-btn");
    const btnText = selectBtn.querySelector(".btn-text");
    const originalText = btnText.getAttribute("data-prefix");

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");

            let checked = container.querySelectorAll(".checked");

            if (checked.length > 0) {
                btnText.innerText = `${originalText} (${checked.length})`;
            } else {
                btnText.innerText = originalText;
            }
        });
    });
});


document.body.addEventListener("click", (event) => {
    selectBtns.forEach(selectBtn => {
        if (!selectBtn.contains(event.target)) { // Close dropdown if the click target is not inside the dropdown button
            selectBtn.classList.remove("open");
        }
    });
});

document.querySelectorAll(".list-items").forEach(list => {
    list.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event from bubbling up to the document body
    });
});













// Define empty arrays to store selected parameters
let selectedSize = ['small', 'medium', 'big','all'];
let selectedAge = ['young', 'middle', 'old','all'];
let selectedGender = ['male', 'female','all'];

console.log("Selected Size:", selectedSize);
console.log("Selected Age:", selectedAge);
console.log("Selected Gender:", selectedGender);

// Function to handle the search button click event
function handleSearchButtonClick() {
    // Clear the arrays before adding new selections
    selectedSize = [];
    selectedAge = [];
    selectedGender = [];

    // Iterate through dropdown menus and populate respective arrays
    containers.forEach(container => {
        const items = container.querySelectorAll(".item.checked");
        const parameterType = container.getAttribute("id");

        items.forEach(item => {
            const value = item.getAttribute("id");

            // Populate respective arrays based on parameter type
            switch (parameterType) {
                case "size":
                    selectedSize.push(value);
                    break;
                case "age":
                    selectedAge.push(value);
                    break;
                case "gender":
                    selectedGender.push(value);
                    break;
                default:
                    break;
            }
        });
    });

    if (selectedSize.length === 0 || selectedSize.includes('all')) {
        selectedSize = ['small', 'medium', 'big','all'];
    }
    
    if (selectedAge.length === 0 || selectedAge.includes('all')) {
        selectedAge = ['young', 'middle', 'old','all'];
    }
    
    if (selectedGender.length === 0 || selectedGender.includes('all')) {
        selectedGender = ['male', 'female','all'];
    }

    console.log("Selected Size:", selectedSize);
    console.log("Selected Age:", selectedAge);
    console.log("Selected Gender:", selectedGender);

    // Send the selected parameters to PHP using AJAX
    fetch('profile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selectedSize: selectedSize,
            selectedAge: selectedAge, // Include your predefined array here
            selectedGender: selectedGender
        })
    })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data); // Log the response from PHP (if needed)
    //     // Handle the response as needed
    // })
    // .catch(error => {
    //     console.error(error); // Log any errors (if needed)
    // });
   
}

// Add click event listener to the "Search" button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearchButtonClick);
