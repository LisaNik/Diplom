document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.getElementById('comment');
    var label = textarea.nextElementSibling;

    textarea.addEventListener('input', function() {
        if (textarea.value.trim() !== "") {
            textarea.parentNode.classList.add('textarea-has-content');
        } else {
            textarea.parentNode.classList.remove('textarea-has-content');
        }
    });
});


document.getElementById('send').addEventListener("click", e => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comment: document.getElementById('comment').value
    }
    
    if(data.name==='' || data.surname==='' || data.phone==='' || data.email ==='' ){        
        alert('Заповніть усі необхідні поля');
        console.log(data);        
    }
    else{
        sendForm(data);
    }
});


async function sendForm(data){
    const res = await fetch('./user.php',{
        method: 'POST',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(data);

    if(res.status === 201){
        alert('Заявка відправлена. Дякуємо вам!');
    }else{
        alert('Упс, щось пішло не так.');
    }
}

const showModal = (modalId) => {
    const modal = document.getElementById(modalId)
  
    modal.classList.add('visible')
  }
  
  const hideModal = (modalId) => {
    const modal = document.getElementById(modalId);  
    modal.classList.remove('visible');

    document.querySelectorAll('input').forEach(input => {
      input.value = ''; // Очищаем содержимое каждого поля ввода
  });
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.value = ''; // Очищаем содержимое каждого поля ввода
  });

  document.querySelector('.form-text').classList.remove('textarea-has-content');
  }
