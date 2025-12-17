// Seleção de elementos
const about = document.querySelector('#about');
const formulario = document.querySelector('#formulario');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// ============================================
// BUSCAR DADOS DO GITHUB
// ============================================
async function getApiGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/rafaelq80');
        const perfil = await resposta.json();

        about.innerHTML = `
            <figure class="about_image">
                <img src="${perfil.avatar_url}" alt="Foto do perfil - ${perfil.name}">
            </figure>

            <article class="about_content">
                <h2>Sobre mim</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda, quasi sit reiciendis nihil id enim facilis iste exercitationem nostrum minus ipsa neque officia dolorum ea optio est quis magni.</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta assumenda, quasi sit reiciendis nihil id enim facilis iste exercitationem nostrum minus ipsa neque officia dolorum ea optio est quis magni.</p>

                <div class="about_buttons_data">
                    <div class="buttons_container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">Ver GitHub</a>
                        <a href="#" target="_blank" class="botao_outline">Currículo</a>
                    </div>
                    
                    <div class="data_container">
                        <div class="data_item">
                            <p class="data_number">${perfil.followers}</p>
                            <p class="data_label">Seguidores</p>
                        </div>
                        <div class="data_item">
                            <p class="data_number">${perfil.public_repos}</p>
                            <p class="data_label">Repositórios</p>
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
async function getGithubRepos() {
    try {
        const resposta = await fetch('https://api.github.com/users/rafaelq80/repos?sort=updated&per_page=6');
        const repos = await resposta.json();

        const swiperWrapper = document.querySelector('.swiper-wrapper');
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
                <div class="project_language_badge">
                    <span class="project_language_dot" style="background-color: ${config.cor};"></span>
                    <span class="project_language_name">${linguagemExibir}</span>
                </div>
            `;

            const tags = repo.topics?.length > 0
                ? repo.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagemExibir}</span>`;

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project_card">
                        <a href="${repo.html_url}" target="_blank" class="project_image_link">
                            <div class="project_image">
                                <img src="${urlIcone}" 
                                     alt="Ícone ${linguagemExibir}"
                                     onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                            </div>
                        </a>
                        <div class="project_content">
                            ${badge}
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project_tags">${tags}</div>
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
// INICIALIZAR SWIPER
// ============================================
function iniciarSwiper() {
    
    new Swiper('.projectsSwiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        watchOverflow: true,
        
        breakpoints: {
             768: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 24 
            },
            1024: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 52 
            }
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
        },
    });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validação do Nome
    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');
    
    if (nome.value.length < 3) {
        erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        nome.focus();
        return;
    }
    erroNome.innerHTML = '';

    // Validação do Email
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    
    if (!email.value.match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um e-mail válido.';
        email.focus();
        return;
    }
    erroEmail.innerHTML = '';

    // Validação do Assunto
    const assunto = document.querySelector('#assunto');
    const erroAsunto = document.querySelector('#erro-assunto');
    
    if (assunto.value.length < 5) {
        erroAsunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        assunto.focus();
        return;
    }
    erroAsunto.innerHTML = '';

    // Validação da Mensagem
    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');
    
    if (mensagem.value.length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
        mensagem.focus();
        return;
    }
    erroMensagem.innerHTML = '';

    // Se passou em todas as validações, envia o formulário
    formulario.submit();
});

// Inicialização
getApiGithub();
getGithubRepos();