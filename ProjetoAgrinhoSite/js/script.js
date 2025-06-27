const produtos = [
  { nome: "Maçã", categoria: "frutas" },
  { nome: "Banana", categoria: "frutas" },
  { nome: "Alface", categoria: "hortaliças" },
  { nome: "Tomate", categoria: "hortaliças" },
  { nome: "Queijo Colonial", categoria: "laticínios" },
  { nome: "Leite Integral", categoria: "laticínios" },
  { nome: "Geleia Artesanal", categoria: "outros" }
];

const carrinho = [];

function mostrarProdutos(lista) {
  const div = document.getElementById("produtos");
  div.innerHTML = "";

  lista.forEach((produto, index) => {
    const el = document.createElement("div");
    el.classList.add("produto");
    el.innerHTML = `
      <strong>${produto.nome}</strong><br/>
      <em>Categoria: ${produto.categoria}</em><br/>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar ao carrinho</button>
    `;
    div.appendChild(el);
  });
}

function adicionarAoCarrinho(index) {
  const item = produtos[index];
  if (!carrinho.includes(item.nome)) {
    carrinho.push(item.nome);
    atualizarCarrinho();
  } else {
    alert("Esse produto já está no carrinho.");
  }
}

function atualizarCarrinho() {
  const ul = document.getElementById("carrinho");
  ul.innerHTML = "";
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function limparCarrinho() {
  carrinho.length = 0;
  atualizarCarrinho();
}

function filtrarProdutos() {
  const categoria = document.getElementById("filtro").value;
  if (categoria === "todos") {
    mostrarProdutos(produtos);
  } else {
    const filtrados = produtos.filter(p => p.categoria === categoria);
    mostrarProdutos(filtrados);
  }
}

// Inicializa com todos os produtos
document.addEventListener("DOMContentLoaded", () => mostrarProdutos(produtos));

function enviarCesta(event) {
  event.preventDefault();

  const selecionados = Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(el => el.value);
  const dataEntrega = document.getElementById("dataEntrega").value;
  const confirmacao = document.getElementById("confirmacao");

  if (selecionados.length === 0) {
    confirmacao.innerHTML = "<p style='color:red;'>Selecione pelo menos um produto para montar sua cesta.</p>";
    return;
  }

  if (!dataEntrega) {
    confirmacao.innerHTML = "<p style='color:red;'>Escolha uma data de entrega.</p>";
    return;
  }

  confirmacao.innerHTML = `
    <p style="color:green;">
      Sua cesta foi agendada com sucesso para o dia <strong>${dataEntrega}</strong>!<br>
      Produtos: <strong>${selecionados.join(", ")}</strong>
    </p>
  `;

  document.getElementById("formCesta").reset();
}

function assinar(plano) {
  const mensagem = document.getElementById("mensagemAssinatura");
  mensagem.innerHTML = `
    <p style="color: green;">
      Obrigado por assinar o <strong>${plano}</strong>!<br>
      Em breve você receberá sua primeira cesta diretamente da nossa produção rural.
    </p>
  `;
}

function enviarContato(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;
  const resposta = document.getElementById("respostaContato");

  if (nome && email && mensagem) {
    resposta.innerHTML = `
      <p style="color: green;">
        Obrigado pelo seu contato, <strong>${nome}</strong>!<br>
        Responderemos em breve no e-mail <strong>${email}</strong>.
      </p>
    `;
    document.getElementById("formContato").reset();
  } else {
    resposta.innerHTML = `<p style="color: red;">Preencha todos os campos.</p>`;
  }
}

// Animação de entrada com fade-in
document.addEventListener("DOMContentLoaded", () => {
  const fadeItems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeItems.forEach(item => observer.observe(item));
});
