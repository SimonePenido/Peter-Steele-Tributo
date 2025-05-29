// Seleciona todas as imagens da galeria
const galeriaTodasImagens = document.querySelectorAll('.galeria-container img');
let galeriaIndiceAtual = 0;

// Elementos do Overlay (serão criados uma vez)
let overlayElemento;
let imagemFullscreenElemento;
let botaoAnteriorElemento;
let botaoProximoElemento;

/**
 * Cria e inicializa a estrutura do overlay da galeria.
 * Chamada uma vez quando a página carrega (se houver imagens na galeria).
 */
function inicializarGaleriaModal() {
    // 1. Cria o contêiner principal do overlay
    overlayElemento = document.createElement('div');
    overlayElemento.id = 'overlay'; // Deve corresponder ao ID no seu CSS

    // 2. Cria o elemento da imagem que será exibida em tela cheia
    imagemFullscreenElemento = document.createElement('img');
    imagemFullscreenElemento.classList.add('fullscreen'); // Classe do seu CSS

    // 3. Cria o botão "Anterior"
    botaoAnteriorElemento = document.createElement('button');
    botaoAnteriorElemento.textContent = '◄';
    botaoAnteriorElemento.classList.add('prev'); // Classe do seu CSS
    botaoAnteriorElemento.addEventListener('click', (evento) => {
        evento.stopPropagation(); // Impede que o clique feche o overlay
        navegarParaImagem(galeriaIndiceAtual - 1);
    });

    // 4. Cria o botão "Próximo"
    botaoProximoElemento = document.createElement('button');
    botaoProximoElemento.textContent = '►';
    botaoProximoElemento.classList.add('next'); // Classe do seu CSS
    botaoProximoElemento.addEventListener('click', (evento) => {
        evento.stopPropagation();
        navegarParaImagem(galeriaIndiceAtual + 1);
    });

    // 5. Adiciona os botões e a imagem ao overlay
    overlayElemento.appendChild(botaoAnteriorElemento);
    overlayElemento.appendChild(imagemFullscreenElemento);
    overlayElemento.appendChild(botaoProximoElemento);

    // 6. Adiciona o overlay ao corpo do documento (inicialmente invisível pelo CSS)
    document.body.appendChild(overlayElemento);

    // 7. Adiciona evento para fechar o overlay ao clicar fora da imagem/botões
    overlayElemento.addEventListener('click', () => {
        fecharImagemFullscreen();
    });

    // Impede que cliques na imagem ou botões fechem o overlay (se o clique "borbulhar")
    imagemFullscreenElemento.addEventListener('click', (e) => e.stopPropagation());

    // 8. Adiciona o evento de clique para cada imagem da galeria
    galeriaTodasImagens.forEach((img, index) => {
        img.addEventListener('click', () => {
            abrirImagemFullscreen(index);
        });
    });
}

/**
 * Abre o overlay e exibe a imagem selecionada.
 * @param {number} index - O índice da imagem a ser exibida.
 */
function abrirImagemFullscreen(index) {
    if (!galeriaTodasImagens || galeriaTodasImagens.length === 0) {
        console.warn("Nenhuma imagem encontrada na galeria.");
        return;
    }
    galeriaIndiceAtual = index;
    imagemFullscreenElemento.src = galeriaTodasImagens[galeriaIndiceAtual].src;
    overlayElemento.classList.add('active'); // Mostra o overlay
    // Adiciona ouvintes de teclado para navegação e fechar
    document.addEventListener('keydown', lidarComTecladoGaleria);
}

/**
 * Fecha o overlay da imagem em tela cheia.
 */
function fecharImagemFullscreen() {
    overlayElemento.classList.remove('active'); // Esconde o overlay
    // Remove ouvintes de teclado
    document.removeEventListener('keydown', lidarComTecladoGaleria);
}

/**
 * Altera a imagem exibida no overlay.
 * @param {number} novoIndice - O índice da nova imagem a ser exibida.
 */
function navegarParaImagem(novoIndice) {
    if (!galeriaTodasImagens || galeriaTodasImagens.length === 0) return;

    // Lógica para ciclo (loop) na galeria
    if (novoIndice < 0) {
        novoIndice = galeriaTodasImagens.length - 1; // Vai para a última
    } else if (novoIndice >= galeriaTodasImagens.length) {
        novoIndice = 0; // Vai para a primeira
    }

    imagemFullscreenElemento.src = galeriaTodasImagens[novoIndice].src;
    galeriaIndiceAtual = novoIndice;
}

/**
 * Lida com a navegação por teclado (Setas e Esc) quando o overlay está ativo.
 * @param {KeyboardEvent} evento - O evento do teclado.
 */
function lidarComTecladoGaleria(evento) {
    if (overlayElemento.classList.contains('active')) { // Verifica se o overlay está visível
        if (evento.key === 'ArrowLeft') {
            navegarParaImagem(galeriaIndiceAtual - 1);
        } else if (evento.key === 'ArrowRight') {
            navegarParaImagem(galeriaIndiceAtual + 1);
        } else if (evento.key === 'Escape') {
            fecharImagemFullscreen();
        }
    }
}

// Garante que o DOM esteja carregado antes de inicializar a galeria,
// ou chama diretamente se o script estiver no final do body.
// Se o script estiver no final do <body>, pode chamar diretamente:
// if (galeriaTodasImagens.length > 0) {
//     inicializarGaleriaModal();
// }
// Para maior segurança, especialmente se o script puder estar no <head>:
document.addEventListener('DOMContentLoaded', () => {
    if (galeriaTodasImagens.length > 0) {
        inicializarGaleriaModal();
    } else {
        console.warn("Galeria não inicializada: nenhuma imagem encontrada com '.galeria-container img'.");
    }
});
