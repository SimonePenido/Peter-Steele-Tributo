// Seleciona todas as imagens da galeria
const images = document.querySelectorAll('.galeria-container img');
let currentImageIndex = 0;

// Função para abrir a imagem em tela cheia
function openImageInFullscreen(index) {
    currentImageIndex = index; // Armazena o índice atual
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Cria a imagem em tela cheia
    const image = document.createElement('img');
    image.src = images[currentImageIndex].src;
    image.classList.add('fullscreen');

    // Botão anterior
    const prevButton = document.createElement('button');
    prevButton.textContent = '◄';
    prevButton.classList.add('prev');
    prevButton.onclick = (event) => {
        event.stopPropagation(); // Impede o clique no overlay de fechar a imagem
        changeImage(currentImageIndex - 1);
    };

    // Botão próximo
    const nextButton = document.createElement('button');
    nextButton.textContent = '►';
    nextButton.classList.add('next');
    nextButton.onclick = (event) => {
        event.stopPropagation(); // Impede o clique no overlay de fechar a imagem
        changeImage(currentImageIndex + 1);
    };

    // Adiciona os elementos ao overlay
    overlay.appendChild(prevButton);
    overlay.appendChild(image);
    overlay.appendChild(nextButton);
    document.body.appendChild(overlay);

    // Fecha o overlay ao clicar fora da imagem
    overlay.onclick = () => document.body.removeChild(overlay);
}

// Função para mudar de imagem
function changeImage(newIndex) {
    if (newIndex < 0) {
        newIndex = images.length - 1; // Volta para a última imagem se estiver na primeira
    } else if (newIndex >= images.length) {
        newIndex = 0; // Volta para a primeira imagem se estiver na última
    }

    // Atualiza a imagem no overlay
    const overlayImage = document.querySelector('#overlay img');
    if (overlayImage) {
        overlayImage.src = images[newIndex].src;
        currentImageIndex = newIndex; // Atualiza o índice atual
    }
}

// Adiciona o evento de clique a todas as imagens
images.forEach((img, index) => {
    img.addEventListener('click', () => openImageInFullscreen(index));
});
