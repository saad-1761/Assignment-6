const loadAllTrees = (event) => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayTrees(data.categories));
};

const removeActive = () => {
  const buttons = document.querySelectorAll(".plant-buttons");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
};

const loadTrees = (id) => {
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
        <button class="mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Add to Cart</button>
      </div>
        `;
    productContainer.appendChild(productDiv);
  }
};

const displayTrees = (trees) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = `<h2 class="text-2xl font-bold text-center mb-4">Categories</h2>
    <button id="all-category" class="btn btn-ghost  w-full text-left px-3 py-2 hover:bg-green-200">All Category</button>`;
  for (let tree of trees) {
    const treeDiv = document.createElement("div");
    treeDiv.innerHTML = `
        <button id="plant-btn-${tree.id}" onclick="loadTrees(${tree.id})" class="btn btn-ghost  w-full text-left px-3 py-2 hover:bg-green-200 plant-buttons">${tree.category_name}</button>
        `;
    treeContainer.appendChild(treeDiv);
  }
};

loadAllTrees();
