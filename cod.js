const apiBaseUrl = 'http://localhost:3000';

// Função para buscar comentários de um jogo
async function fetchComments(gameId) {
    const response = await fetch(`${apiBaseUrl}/comments/${gameId}`);
    const comments = await response.json();
    const commentsList = document.getElementById(`comments-list-${gameId}`);
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const commentItem = document.createElement('p');
        commentItem.textContent = `${comment.username}: ${comment.comment}`;
        commentsList.appendChild(commentItem);
    });
}

// Função para adicionar um novo comentário
async function addComment(gameId) {
    const usernameInput = document.getElementById(`username-${gameId}`);
    const commentText = document.getElementById(`comment-text-${gameId}`);

    const username = usernameInput.value.trim();
    const comment = commentText.value.trim();

    if (!username || !comment) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const response = await fetch(`${apiBaseUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, username, comment }),
    });

    if (response.ok) {
        usernameInput.value = '';
        commentText.value = '';
        fetchComments(gameId);
    } else {
        alert('Erro ao adicionar comentário. Tente novamente.');
    }
}

// Inicializar comentários ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchComments('game1');
    fetchComments('game2');
});
