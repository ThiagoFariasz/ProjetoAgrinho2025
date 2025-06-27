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
