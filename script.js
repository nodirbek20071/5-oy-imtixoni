

const our = document.querySelector(".our");

async function fetchProducts() {
    showSpinner(); 

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        return products;
    } catch (error) {
        console.error(error);
    } finally {
        hideSpinner(); 
    }
}

function showSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    our.appendChild(spinner); 
}

function hideSpinner() {
    const spinner = document.querySelector(".spinner");
    spinner.remove(); 
}

async function init() {
    const products = await fetchProducts();
    render(products);
}

function render(products) {
    products.forEach(function (product) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `http://127.0.0.1:5500/product.html?id=${product.id}`;
        li.className = "our_item";

        const img = document.createElement("img");
        img.src = product.image;
        img.className = "our_img";
        li.appendChild(img);

        const button = document.createElement("button");
        button.textContent = "Add To Cart";
        button.classList.add("our_button");
        li.appendChild(button);

        const title = document.createElement("p");
        title.textContent = product.title;
        title.classList.add("text_item");
        a.appendChild(title);
        li.appendChild(a);

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("productInfo");

        const price = document.createElement("strong");
        price.textContent = product.price;

        const stars = "<span>⭐️</span>".repeat(Math.round(product.rating.rate));

        const ratingCount = document.createElement("div");
        ratingCount.textContent = `(${product.rating.count})`;

        infoContainer.appendChild(price);
        infoContainer.insertAdjacentHTML("beforeend", stars);
        infoContainer.appendChild(ratingCount);
        li.appendChild(infoContainer);

        our.appendChild(li);
    });
}

init();





