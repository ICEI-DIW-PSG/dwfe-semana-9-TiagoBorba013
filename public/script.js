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


  let productList = document.getElementById("product-list");
  let productDetails = document.getElementById("product-details");
  let searchInput = document.querySelector("#search");
  let categorySelect = document.querySelector("#category");
  let btnRender = document.querySelector("#btnRender");

  
  function formatPrice(preco) {

      return "R$ " + preco.toFixed(2);
  }

  function createProductCard(produto) {

      let colDiv = document.createElement("div");
      colDiv.classList.add("col");

      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.setAttribute("data-id", produto.id);
      
      
      cardDiv.style.border = "1px solid #ccc";
      cardDiv.style.padding = "10px";

      
      let img = document.createElement("img");
      img.setAttribute("src", produto.imagem);
      img.classList.add("card-img-top");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

     
      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerHTML = produto.nome;

   
      let category = document.createElement("p");
      category.innerHTML = "Categoria: " + produto.categoria;

  
      let price = document.createElement("h6");
      price.innerHTML = formatPrice(produto.preco);

   
      let btnDetails = document.createElement("button");
      btnDetails.classList.add("btn", "btn-primary", "m-1");
      btnDetails.innerHTML = "Ver detalhes";
      btnDetails.addEventListener("click", function() {
          showProductDetails(produto);
      });


      let btnHighlight = document.createElement("button");
      btnHighlight.classList.add("btn", "btn-warning", "m-1");
      btnHighlight.innerHTML = "Destacar";
      btnHighlight.addEventListener("click", function() {
 
          cardDiv.classList.add("highlight");
      });


      cardBody.appendChild(title);
      cardBody.appendChild(category);
      cardBody.appendChild(price);
      cardBody.appendChild(btnDetails);
      cardBody.appendChild(btnHighlight);

      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      
      colDiv.appendChild(cardDiv);

      return colDiv;
  }

  function renderProducts(produtos) {
     
      productList.innerHTML = "";
      
      for (let i = 0; i < produtos.length; i++) {
          let card = createProductCard(produtos[i]);
          productList.appendChild(card);
      }

      let cards = document.querySelectorAll(".card");
      for (let i = 0; i < cards.length; i++) {
          let id = cards[i].getAttribute("data-id");
          console.log("O card com ID " + id + " foi criado na tela.");
      }
  }


  function renderCategories() {
      let categoriasUnicas = [];
      
   
      for (let i = 0; i < data.produtos.length; i++) {
          let categoria = data.produtos[i].categoria;
          if (categoriasUnicas.indexOf(categoria) === -1) {
              categoriasUnicas.push(categoria);
          }
      }
      
    
      for (let i = 0; i < categoriasUnicas.length; i++) {
          let option = document.createElement("option");
          option.setAttribute("value", categoriasUnicas[i]);
          option.innerHTML = categoriasUnicas[i];
          categorySelect.appendChild(option);
      }
  }

  function showProductDetails(produto) {
      let statusEstoque = "";
      if (produto.emEstoque === true) {
          statusEstoque = "Disponível";
      } else {
          statusEstoque = "Esgotado";
      }

      
      productDetails.innerHTML = 
          "<div style='border: 2px solid blue; padding: 20px; margin-bottom: 20px;'>" +
              "<h3>" + produto.nome + "</h3>" +
              "<img src='" + produto.imagem + "' style='max-width: 200px;'><br>" +
              "<strong>Preço:</strong> " + formatPrice(produto.preco) + "<br>" +
              "<strong>Categoria:</strong> " + produto.categoria + "<br>" +
              "<strong>Estoque:</strong> " + statusEstoque + "<br>" +
              "<strong>Descrição:</strong> " + produto.descricao + "<br>" +
          "</div>";
  }

  function filterProducts() {
      let textoBusca = searchInput.value.toLowerCase();
      let categoriaSelecionada = categorySelect.value;

      let produtosFiltrados = [];

      for (let i = 0; i < data.produtos.length; i++) {
          let produto = data.produtos[i];
          let nomeDoProduto = produto.nome.toLowerCase();
          
          let nomeBate = nomeDoProduto.includes(textoBusca);
          let categoriaBate = false;
          
          if (categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada) {
              categoriaBate = true;
          }

          if (nomeBate && categoriaBate) {
              produtosFiltrados.push(produto);
          }
      }

      renderProducts(produtosFiltrados);
  }


  searchInput.addEventListener("input", function() {
      filterProducts();
  });

  categorySelect.addEventListener("change", function() {
      filterProducts();
  });
  
  btnRender.addEventListener("click", function() {
      filterProducts();
  });

 
  renderCategories();
  renderProducts(data.produtos);