var modal = document.getElementById("myModal2");
var btn = document.getElementById("btn-new");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function selectCard(element) {
  element.classList.add('selected');
}

function deselectCard(element) {
  element.classList.remove('selected');
}


function showModal() {
  let imageUrl = event.target.dataset.imageUrl;
  let modalImg = document.querySelector('#myModal img');
  modalImg.src = imageUrl;
  document.querySelector('#myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function loadCards() {
  fetch('https://api-broccoli.onrender.com/api/foods/region/Centro-Oeste')
    .then(response => response.json())
    .then(data => {
      let container = document.querySelector('.dsc-catalog-cards');

      if (data.length == 0) {
        return;
      }

      for (let i = 0; i < data.length; i++) {
        let card = container.children[i] || document.createElement('div');
        card.className = 'dsc-card';
        card.dataset.id = data[i].id;

        let deleteButton = card.querySelector('button') || document.createElement('button');
        if (!deleteButton.onclick) {
          deleteButton.textContent = 'Deletar';
          deleteButton.style.backgroundColor = '#4CAF50';
          deleteButton.style.color = 'white';
          deleteButton.style.padding = '14px 20px';
          deleteButton.style.margin = '8px 0px 0px 0px';
          deleteButton.style.border = 'none';
          deleteButton.style.cursor = 'pointer';
          deleteButton.onclick = () => {
            let foodId = card.dataset.id

            fetch(`https://api-broccoli.onrender.com/api/foods/${foodId}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (response.ok) {
                  console.log(`Comida com ID ${foodId} deletada com sucesso.`);
                  card.remove();
                } else {
                  console.error('Erro ao deletar a comida:', response.statusText);
                }
              })
              .catch(error => console.error('Error:', error));
          }
        };

        let shareButton = card.querySelector('.whatsapp-share-button') || document.createElement('button');
        if (!shareButton.onclick) {
          shareButton.textContent = 'Compartilhar no WhatsApp';
          shareButton.className = 'whatsapp-share-button';
          shareButton.style.backgroundColor = '#25D366';
          shareButton.style.color = 'white';
          shareButton.style.padding = '14px 20px';
          shareButton.style.margin = '8px 0px 0px 0px';
          shareButton.style.border = 'none';
          shareButton.style.cursor = 'pointer';
          shareButton.onclick = () => {
            let foodName = data[i].name;
            let foodDescription = data[i].description;
            let foodImageUrl = data[i].imageUrl;
            let message = `Olá! Confira este delicioso prato:\n\nNome: ${foodName}\nDescrição: ${foodDescription}\n\nVeja a imagem aqui: ${foodImageUrl}`;
            let encodedMessage = encodeURIComponent(message);
            let whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappUrl);
          }
        };

        card.onmousedown = function () { selectCard(this); };
        card.onmouseup = function () { deselectCard(this); };

        let top = card.querySelector('.dsc-catalog-card-top') || document.createElement('div');
        top.className = 'dsc-catalog-card-top dsc-line-bottom';
        let img = top.querySelector('img') || document.createElement('img');
        img.src = data[i].imageUrl;
        img.dataset.imageUrl = data[i].imageUrl;
        img.alt = data[i].name;
        img.ondblclick = showModal;
        top.appendChild(img);

        let bottom = card.querySelector('.dsc-catalog-card-bottom') || document.createElement('div');
        bottom.className = 'dsc-catalog-card-bottom';
        let h3 = bottom.querySelector('h3') || document.createElement('h3');
        h3.textContent = data[i].name;
        let p = bottom.querySelector('p') || document.createElement('p');
        p.textContent = data[i].description;
        bottom.appendChild(h3);
        bottom.appendChild(p);
        bottom.appendChild(deleteButton);
        bottom.appendChild(shareButton);

        card.appendChild(top);
        card.appendChild(bottom);

        if (!container.children[i]) {
          container.appendChild(card);
        }
      }
    })
    .catch(error => console.error('Error:', error));
}

loadCards();

document.querySelector('#myForm').addEventListener('submit', function (event) {
  // Previne o comportamento padrão do formulário
  event.preventDefault();

  // Cria um objeto com os dados do formulário
  let food = {
    name: document.querySelector('#name').value,
    region: document.querySelector('input[name="region"]:checked').value,
    description: document.querySelector('#description').value,
    imageUrl: document.querySelector('#imageUrl').value
  };

  // Envia a requisição para a API
  fetch('https://api-broccoli.onrender.com/api/foods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(food)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Limpa o formulário
      document.querySelector('#myForm').reset();

      // Carrega os cards novamente após adicionar um novo objeto
      loadCards();
    })
    .catch(error => console.error('Error:', error));
});

