// Função para exibir as informações do jogo
function showGameInfo(gameId) {
    // Esconde todas as informações
    const allGameDetails = document.querySelectorAll('.game-details');
    allGameDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    // Exibe o detalhe do jogo selecionado
    const selectedGame = document.getElementById(gameId);
    selectedGame.classList.add('active');
}
