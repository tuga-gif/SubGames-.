// Aguardar o carregamento do conteúdo
document.addEventListener("DOMContentLoaded", function() {
    loadGamesFromLocalStorage();
});

// Captura o formulário de envio
const gameForm = document.getElementById("gameForm");
const gamesContainer = document.getElementById("gamesContainer");

// Evento para adicionar jogo
gameForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Coletando os dados do formulário
    const gameName = document.getElementById("gameName").value;
    const gameDescription = document.getElementById("gameDescription").value;
    const gamePrice = document.getElementById("gamePrice").value;
    const gameCredits = document.getElementById("gameCredits").value;
    const gameLink = document.getElementById("gameLink").value;

    // Coletando as imagens e vídeo (se houver)
    const gameImages = [
        document.getElementById("gameImage1").files[0],
        document.getElementById("gameImage2").files[0],
        document.getElementById("gameImage3").files[0]
    ];
    const gameVideo = document.getElementById("gameVideo").files[0];

    // Usando FileReader para converter as imagens em URLs de dados
    const imageUrls = [];
    gameImages.forEach((image, index) => {
        if (image) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imageUrls[index] = event.target.result;
                if (imageUrls.length === gameImages.filter(img => img).length) {
                    saveGameToLocalStorage({
                        name: gameName,
                        description: gameDescription,
                        price: gamePrice,
                        credits: gameCredits,
                        link: gameLink,
                        images: imageUrls,
                        video: gameVideo ? gameVideo.name : null
                    });
                    displayGame({
                        name: gameName,
                        description: gameDescription,
                        price: gamePrice,
                        credits: gameCredits,
                        link: gameLink,
                        images: imageUrls,
                        video: gameVideo ? gameVideo.name : null
                    });
                }
            };
            reader.readAsDataURL(image);
        }
    });

    // Resetando o formulário
    gameForm.reset();
});

// Função para exibir o jogo no catálogo
function displayGame(game) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    // Exibindo as imagens
    let imagesHTML = "";
    game.images.forEach(image => {
        if (image) {
            imagesHTML += `<img src="${image}" alt="${game.name}">`;
        }
    });

    // Exibindo o conteúdo do jogo
    gameCard.innerHTML = `
        ${imagesHTML}
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p><strong>Preço:</strong> ${game.price}</p>
        <p><strong>Créditos:</strong> ${game.credits}</p>
        <a href="${game.link}" target="_blank">Jogar no Roblox</a>
    `;

    // Adiciona o jogo no container
    gamesContainer.appendChild(gameCard);
}

// Função para salvar o jogo no localStorage
function saveGameToLocalStorage(game) {
    const savedGames = JSON.parse(localStorage.getItem("games")) || [];
    savedGames.push(game);
    localStorage.setItem("games", JSON.stringify(savedGames));
}

// Função para carregar os jogos do localStorage
function loadGamesFromLocalStorage() {
    const savedGames = JSON.parse(localStorage.getItem("games")) || [];
    savedGames.forEach(game => {
        displayGame(game);
    });
}
