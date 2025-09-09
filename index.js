const manageSpinner = (status) => {
  const loadingSection = document.getElementById("loading-indicator");
  if (status == true) {
    loadingSection.classList.remove("hidden");
    document.getElementById("product-container").classList.add("hidden");
  } else {
    loadingSection.classList.add("hidden");
    document.getElementById("product-container").classList.remove("hidden");
  }
};

const loadAllTrees = (event) => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayTrees(data.categories));
};

const removeActive = () => {
  const buttons = document.querySelectorAll(".plant-buttons");
  buttons.forEach((button) => button.classList.remove("active"));
};


const loadTrees = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`plant-btn-${id}`);
      clickBtn.classList.add("active");
      displayProducts(data.plants);
    });
};

const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
};

const displayPlantDetails = (details) => {
  console.log(details);
  const detailsBox = document.getElementById("modal-container");
  detailsBox.innerHTML = `
       <div class="">
        <h2 class="text-2xl font-bold mb-4">${details.name}</h2>
        <img id="modal-image" src="${details.image}" alt="" class="w-full bg-grey-100 h-50 mb-4 rounded-2xl"/>
        <h3 id="modal-title" class="font-bold text-lg mb-2">Category: <span class="font-semibold">${details.category}</span></h3>
        <h3 id="modal-price" class="font-bold text-lg mb-2">Price: <span class="font-semibold"></span>${details.price}</h3>
        <p id="modal-description" class="text-lg text-gray-600 mb-2"><span class="font-bold text-lg text-black">Description: </span>${details.description}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    `;
  document.getElementById("word_modal").showModal();
};

const displayProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  if (!products || products.length === 0) {
    productContainer.innerHTML = `
      <div class="col-span-full text-center text-lg bg-gray-100 text-black font-bold py-10">
        Select a category
      </div>`;
    return;
  }

  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      <div class="bg-white rounded-lg shadow p-4 flex flex-col min-h-120">
        <img src="${product.image}" class="h-50 mb-4 rounded-2xl"/>
        <h3 onclick="loadPlantDetails(${product.id})" class="font-semibold text-lg">${product.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${product.description}</p>
        <div class="flex justify-between items-center mt-auto">
          <span class="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">${product.category}</span>
          <span class="font-semibold">Tk.${product.price}</span>
        </div>
        <button onclick='addToCart(${JSON.stringify(product)})'
          class="mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Add to Cart
        </button>
      </div>`;
    productContainer.appendChild(productDiv);
  }
  manageSpinner(false);
};

displayProducts([]); // shows "Select a category"


const displayTrees = (trees) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = `<h2 class="text-2xl font-bold text-center mb-4">Categories</h2>
    <button id="all-category" onclick="loadAllCategory()" 
      class="btn btn-ghost w-full text-left px-3 py-2 hover:bg-green-200 plant-buttons">
      All Category
    </button>`;

  for (let tree of trees) {
    const treeDiv = document.createElement("div");
    treeDiv.innerHTML = `
        <button id="plant-btn-${tree.id}" onclick="loadTrees(${tree.id})" 
          class="btn btn-ghost w-full text-left px-3 py-2 hover:bg-green-200 plant-buttons">
          ${tree.category_name}
        </button>`;
    treeContainer.appendChild(treeDiv);
  }
};

const loadAllCategory = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const allBtn = document.getElementById("all-category");
      allBtn.classList.add("active");

      displayProducts(data.plants);
    });
};



loadAllTrees();

// Cart-section

let cart = [];

// Add to Cart
const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
};

// Remove from Cart
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
};

// Render Cart
const renderCart = () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalElement = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-white px-1 py-2 rounded";

    li.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <div class="flex gap-2 items-center">
        <span>Tk.${item.price * item.quantity}</span>
        <p onclick="removeFromCart(${item.id})" 
          class="text-red-600 hover:text-red-800"><i class="fa-solid fa-xmark"></i></p>
      </div>
    `;

    cartContainer.appendChild(li);
  });

  totalElement.textContent = `TK.${total}`;
};
