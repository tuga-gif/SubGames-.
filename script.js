const accessCode = "SAN107"; // Código necessário para publicar
const productsList = document.getElementById("productsList");
const uploadForm = document.getElementById("uploadForm");

// Carregar produtos salvos no localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    productsList.innerHTML = ""; // Limpa lista

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a href="${product.file}" download>Baixar ZIP</a>
        `;
        productsList.appendChild(productElement);
    });
}

// Salvar produto no localStorage
function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

// Manipular o envio do formulário
uploadForm.addEventListener("submit", async event => {
    event.preventDefault();

    // Validar código de acesso
    const code = document.getElementById("accessCode").value.trim();
    if (code !== accessCode) {
        alert("Código de acesso inválido!");
        return;
    }

    // Obter os valores do formulário
    const name = document.getElementById("productName").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const imageFile = document.getElementById("productImage").files[0];
    const zipFile = document.getElementById("productFile").files[0];

    if (!name || !description || !imageFile || !zipFile) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const imageUrl = await readFileAsDataURL(imageFile);
        const zipUrl = await readFileAsDataURL(zipFile);

        const product = { name, description, image: imageUrl, file: zipUrl };
        saveProduct(product);
        loadProducts();

        // Resetar formulário
        uploadForm.reset();
        alert("Produto publicado com sucesso!");
    } catch (error) {
        console.error("Erro ao processar os arquivos:", error);
        alert("Erro ao processar os arquivos.");
    }
});

// Ler arquivo como Data URL
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

// Carregar lista de produtos ao iniciar
loadProducts();
