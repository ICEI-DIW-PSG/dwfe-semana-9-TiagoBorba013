const data = {
    "produtos": [
      {
        "id": 1,
        "nome": "Smartphone Galaxy S23",
        "preco": 3499.90,
        "categoria": "Celulares",
        "imagem": "imgs/galaxy_s23.jpg",
        "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
        "emEstoque": true
      },
      {
        "id": 2,
        "nome": "Notebook Dell Inspiron 15",
        "preco": 4599.00,
        "categoria": "Notebooks",
        "imagem": "imgs/dell_inspiron.jpg",
        "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
        "emEstoque": false
      },
      {
        "id": 3,
        "nome": "iPhone 14 Pro",
        "preco": 6299.00,
        "categoria": "Celulares",
        "imagem": "imgs/iphone_14.jpg",
        "descricao": "O mais novo iPhone com chip A16 Bionic e câmera de 48MP.",
        "emEstoque": true
      },
      {
        "id": 4,
        "nome": "MacBook Air M2",
        "preco": 8999.00,
        "categoria": "Notebooks",
        "imagem": "imgs/macbook_air.jpg",
        "descricao": "Notebook ultrafino da Apple com o poderoso chip M2.",
        "emEstoque": true
      },
      {
        "id": 5,
        "nome": "Fone de Ouvido Sony WH-1000XM5",
        "preco": 1999.00,
        "categoria": "Acessórios",
        "imagem": "imgs/sony_headphones.jpg",
        "descricao": "Fone de ouvido com cancelamento de ruído líder do setor.",
        "emEstoque": true
      },
      {
        "id": 6,
        "nome": "Teclado Mecânico Keychron K2",
        "preco": 650.00,
        "categoria": "Acessórios",
        "imagem": "imgs/hero-1920x1024.webp",
        "descricao": "Teclado mecânico sem fio com layout 75% e switches Gateron.",
        "emEstoque": true
      },
      {
        "id": 7,
        "nome": "PlayStation 5",
        "preco": 4299.00,
        "categoria": "Games",
        "imagem": "imgs/playstation_5.jpg",
        "descricao": "Console de última geração da Sony com SSD ultrarrápido.",
        "emEstoque": false
      },
      {
        "id": 8,
        "nome": "Nintendo Switch OLED",
        "preco": 2399.00,
        "categoria": "Games",
        "imagem": "imgs/nintendo_switch.jpg",
        "descricao": "Console híbrido com tela OLED vibrante de 7 polegadas.",
        "emEstoque": true
      }
    ]
  };

  
function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement('div');
  card.classList.add('card', 'h-100');
  card.setAttribute('data-id', produto.id);

  const img = document.createElement('img');
  img.src = produto.imagem;
  img.alt = produto.nome;
  img.classList.add('card-img-top');
  img.style.height = '180px';
  img.style.width = '100%';
  img.style.objectFit = 'contain';
  img.style.backgroundColor = '#f8f8f8';
  img.style.padding = '10px';
  card.appendChild(img);

  const corpo = document.createElement('div');
  corpo.classList.add('card-body');
  corpo.innerHTML = `
    <h5 class="card-title">${produto.nome}</h5>
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button>Ver detalhes</button>
    <button>Destacar</button>
  `;
  card.appendChild(corpo);

  const botoes = corpo.querySelectorAll('button');

botoes[0].addEventListener('click', function() {
  showProductDetails(produto);
});

botoes[1].addEventListener('click', function() {
  card.classList.toggle('border-warning');
  card.style.boxShadow = '0 0 10px orange';
});

  return card;
}

function renderProducts(produtos) {
  const lista = document.getElementById('product-list');
  lista.innerHTML = '';
  produtos.forEach(function(produto) {
    const col = document.createElement('div');
    col.classList.add('col');
    const card = createProductCard(produto);
    col.appendChild(card);
    lista.appendChild(col);
  });
}

function renderCategories() {
  const select = document.querySelector('#category');
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];
  categorias.forEach(function(categoria) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    select.appendChild(option);
  });
}

function filterProducts() {
  const texto = document.querySelector('#search').value.toLowerCase();
  const categoria = document.querySelector('#category').value;
  return data.produtos.filter(function(produto) {
    const nomeContem = produto.nome.toLowerCase().includes(texto);
    const categoriaContem = categoria === 'Todas' || produto.categoria === categoria;
    return nomeContem && categoriaContem;
  });
}

function showProductDetails(produto) {
  const detalhes = document.getElementById('product-details');
  detalhes.innerHTML = `
    <h3>${produto.nome}</h3>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Em estoque: ${produto.emEstoque ? 'Sim' : 'Não'}</p>
    <p>Descrição: ${produto.descricao}</p>
  `;
}

document.getElementById('btnRender').addEventListener('click', function() {
  renderProducts(filterProducts());
});
document.querySelector('#search').addEventListener('input', function() {
  renderProducts(filterProducts());
});
document.querySelector('#category').addEventListener('change', function() {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  console.log(card.getAttribute("data-id"));
});