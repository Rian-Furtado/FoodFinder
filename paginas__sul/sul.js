function showForm() {
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
  
  }
  
  function selectCard(element) {
    element.classList.add('selected');
  }
  
  function deselectCard(element) {
    element.classList.remove('selected');
  }
  
  
  function showModal() {
    // document.getElementById("myModal").style.display = "block";
  
    // Recupera a URL da imagem do atributo de dados
    let imageUrl = event.target.dataset.imageUrl;
  
    // Seleciona a imagem do modal
    let modalImg = document.querySelector('#myModal img');
  
    // Atualiza a imagem do modal
    modalImg.src = imageUrl;
  
    // Mostra o modal
    document.querySelector('#myModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  function loadCards() {
    fetch('https://api-broccoli.onrender.com/api/foods/region/Sul')
      .then(response => response.json())
      .then(data => {
        // Seleciona o container onde os cards serão inseridos
        let container = document.querySelector('.dsc-catalog-cards');
  
        if (data.length == 0) {
          return;
        }
  
        // Itera sobre cada comida
        for (let i = 0; i < data.length; i++) {
          // Seleciona o card existente ou cria um novo
          let card = container.children[i] || document.createElement('div');
          card.className = 'dsc-card';
          card.dataset.id = data[i].id;
  
          // Cria o botão "Deletar" apenas se ele não existir
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
                    // Remove o card após deletar a comida
                    card.remove();
                  } else {
                    console.error('Erro ao deletar a comida:', response.statusText);
                  }
                })
                .catch(error => console.error('Error:', error));
            }
          };
  
  
          card.onmousedown = function () { selectCard(this); };
          card.onmouseup = function () { deselectCard(this); };
  
          // Cria a parte superior do card
          let top = card.querySelector('.dsc-catalog-card-top') || document.createElement('div');
          top.className = 'dsc-catalog-card-top dsc-line-bottom';
          let img = top.querySelector('img') || document.createElement('img');
          img.src = data[i].imageUrl;
          img.dataset.imageUrl = data[i].imageUrl;
          img.alt = data[i].name;
          img.ondblclick = showModal;
          top.appendChild(img);
  
          // Cria a parte inferior do card
          let bottom = card.querySelector('.dsc-catalog-card-bottom') || document.createElement('div');
          bottom.className = 'dsc-catalog-card-bottom';
          let h3 = bottom.querySelector('h3') || document.createElement('h3');
          h3.textContent = data[i].name;
          let p = bottom.querySelector('p') || document.createElement('p');
          p.textContent = data[i].description;
          bottom.appendChild(h3);
          bottom.appendChild(p);
          bottom.appendChild(deleteButton);
  
          // Adiciona as partes superior e inferior ao card
          card.appendChild(top);
          card.appendChild(bottom);
  
          // Adiciona o card ao container
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
  
  