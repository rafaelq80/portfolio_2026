// ============================================
// SELEÇÃO DE ELEMENTOS DA PÁGINA
// ============================================
const about = document.querySelector('#about');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const formulario = document.querySelector('#formulario');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// ============================================
// BUSCAR DADOS DO PERFIL DO GITHUB
// ============================================
async function getAboutGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/rafaelq80');
        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = `
            <figure class="about-image">
                <img src="${perfil.avatar_url}" alt="Foto do perfil - ${perfil.name}">
            </figure>

            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda, quasi sit reiciendis nihil id enim facilis iste exercitationem nostrum minus ipsa neque officia dolorum ea optio est quis magni.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda, quasi sit reiciendis nihil id enim facilis iste exercitationem nostrum minus ipsa neque officia dolorum ea optio est quis magni.</p>

                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">Ver GitHub</a>
                        <a href="#" target="_blank" class="botao-outline">Currículo</a>
                    </div>
                    
                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
    }
}

// ============================================
// BUSCAR REPOSITÓRIOS DO GITHUB
// ============================================
async function getProjectsGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/rafaelq80/repos?sort=updated&per_page=9');
        const repos = await resposta.json();

        swiperWrapper.innerHTML = '';

        // Cores e ícones das linguagens
        const linguagens = {
            'JavaScript': { icone: 'javascript', cor: '#f1e05a' },
            'TypeScript': { icone: 'typescript', cor: '#2b7489' },
            'Python': { icone: 'python', cor: '#3572A5' },
            'Java': { icone: 'java', cor: '#b07219' },
            'HTML': { icone: 'html', cor: '#e34c26' },
            'CSS': { icone: 'css', cor: '#563d7c' },
            'PHP': { icone: 'php', cor: '#4F5D95' },
            'C#': { icone: 'csharp', cor: '#178600' },
            'Go': { icone: 'go', cor: '#00ADD8' },
            'Kotlin': { icone: 'kotlin', cor: '#A97BFF' }
        };

        repos.forEach(repo => {
            const linguagemExibir = repo.language || 'GitHub';
            const config = linguagens[repo.language] || { icone: 'github', cor: '#6b36c8' };
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;
            
            const nomeFormatado = repo.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            const descricao = repo.description 
                ? (repo.description.length > 100 ? repo.description.substring(0, 97) + '...' : repo.description)
                : 'Projeto desenvolvido no GitHub';

            const badge = `
                <div class="project-language-badge">
                    <span class="project-language-dot" style="background-color: ${config.cor};"></span>
                    <span class="project-language-name">${linguagemExibir}</span>
                </div>
            `;

            const tags = repo.topics?.length > 0
                ? repo.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagemExibir}</span>`;

            // Botões de ação
            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repo.html_url}" target="_blank" class="project-button">
                        GitHub
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" class="project-button project-button-outline">
                            Deploy
                        </a>
                    ` : ''}
                </div>
            `;

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img src="${urlIcone}" 
                                alt="Ícone ${linguagemExibir}"
                                onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                        </div>

                        <div class="project-content">
                            ${badge}
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
        });

        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// ============================================
// CARROSSEL - SWIPER
// ============================================
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            768: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpar mensagens de erro anteriores
    document.querySelectorAll('form span').forEach(span => span.innerHTML = '');

    let isValid = true;

    // Validação do Nome
    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');
    
    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        if (isValid) nome.focus();
        isValid = false;
    }

    // Validação do Email
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    
    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um e-mail válido.';
        if (isValid) email.focus();
        isValid = false;
    }

    // Validação do Assunto (corrigido typo)
    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');
    
    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        if (isValid) assunto.focus();
        isValid = false;
    }

    // Validação da Mensagem
    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');
    
    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    // Se passou em todas as validações, envia o formulário
    if (isValid) {
        // Desabilitar botão para evitar múltiplos envios
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        formulario.submit();
    }
});

getAboutGithub();
getProjectsGithub();
