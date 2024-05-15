let data = [];
let petName;
let likedId =[];



document.addEventListener('DOMContentLoaded', () => {
    
    console.log(localStorage.getItem('likedId'));
    likedId=localStorage.getItem('likedId').split(',');
    console.log(likedId);
  
    // console.log(sessionStorage.getItem('petData'));
    getDataPhp();

    
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
  