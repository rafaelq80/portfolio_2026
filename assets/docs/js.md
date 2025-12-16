<h1>Documentação do JavaScript - Projeto Portfólio</h1>



## 1. Manipulação do DOM

| **Comando / Método**       | **Função / Descrição**                                       | **Categoria / Tipo**    | **Exemplo no Código**                                        |
| -------------------------- | ------------------------------------------------------------ | ----------------------- | ------------------------------------------------------------ |
| `document.querySelector()` | Seleciona o primeiro elemento que corresponde a um seletor CSS. | Seleção de elementos    | `const about = document.querySelector('#about');`            |
| `innerHTML`                | Altera ou obtém o conteúdo HTML interno de um elemento.      | Propriedade de conteúdo | `about.innerHTML += conteudo;`                               |
| `addEventListener()`       | Adiciona um ouvinte de evento (listener) a um elemento.      | Manipulação de eventos  | `formulario.addEventListener('submit', function(event) {...});` |
| `event.preventDefault()`   | Impede o comportamento padrão do evento (neste caso, o envio automático do formulário). | Controle de evento      | `event.preventDefault();`                                    |
| `focus()`                  | Define o foco em um campo de formulário específico.          | Interação com input     | `campoNome.focus();`                                         |

<br />

## 2. Estruturas Básicas do JavaScript

| **Comando / Método** | **Função / Descrição**                          | **Categoria / Tipo** | **Exemplo no Código**                                |
| -------------------- | ----------------------------------------------- | -------------------- | ---------------------------------------------------- |
| `if / else`          | Estrutura condicional para validações.          | Controle de fluxo    | `if(campoNome.value.length < 3){ ... } else { ... }` |
| `return`             | Encerra a execução de uma função ou evento.     | Controle de execução | `return;`                                            |
| `try / catch`        | Captura e trata erros em operações assíncronas. | Tratamento de erros  | `try { ... } catch(error) { console.error(error); }` |

<br />

## 3. Requisições HTTP

| **Comando / Método** | **Função / Descrição**                               | **Categoria / Tipo**  | **Exemplo no Código**                                    |
| -------------------- | ---------------------------------------------------- | --------------------- | -------------------------------------------------------- |
| `fetch()`            | Realiza uma requisição HTTP (GET, POST, etc.).       | Requisição HTTP       | `await fetch('https://api.github.com/users/rafaelq80');` |
| `await`              | Pausa a execução até que uma Promise seja resolvida. | Assíncrono / Promises | `const dadosPerfil = await fetch(...);`                  |
| `.json()`            | Converte a resposta da API para formato JSON.        | Manipulação de dados  | `const perfilJson = await dadosPerfil.json();`           |
| `async function`     | Declara uma função assíncrona que pode usar `await`. | Função assíncrona     | `async function getApiGithub(){ ... }`                   |
| `console.error()`    | Exibe erros no console.                              | Depuração / Log       | `console.error(error);`                                  |

<br />

## 4. Validação do Formulário

| **Comando / Método** | **Função / Descrição**                                | **Categoria / Tipo**     | **Exemplo no Código**                                        |
| -------------------- | ----------------------------------------------------- | ------------------------ | ------------------------------------------------------------ |
| `.value`             | Obtém o valor de um campo de entrada.                 | Propriedade de input     | `campoEmail.value`                                           |
| `.length`            | Retorna o comprimento de uma string.                  | Validação de texto       | `campoNome.value.length < 3`                                 |
| `.match()`           | Testa uma expressão regular em uma string.            | Validação com regex      | `campoEmail.value.match(emailRegex)`                         |
| `.innerHTML`         | Exibe mensagens de erro ou limpa textos de validação. | Atualização de mensagens | `txtNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';` |
| `.submit()`          | Envia o formulário programaticamente.                 | Ação de formulário       | `formulario.submit();`                                       |

<br />

## 5. Expressões Regulares (Regex)

| **Elemento**                                                 | **Função / Descrição**         | **Categoria / Tipo** | **Exemplo no Código**                             |
| ------------------------------------------------------------ | ------------------------------ | -------------------- | ------------------------------------------------- |
| `const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/` | Padrão de validação de e-mail. | Expressão Regular    | `if(!campoEmail.value.match(emailRegex)) { ... }` |

<br />

## 6. Criação Dinâmica de Conteúdo

| **Comando / Método**                        | **Função / Descrição**                      | **Categoria / Tipo**    | **Exemplo no Código**                                 |
| ------------------------------------------- | ------------------------------------------- | ----------------------- | ----------------------------------------------------- |
| **Template String** (``texto ${variavel}``) | Cria HTML dinâmico com variáveis embutidas. | Interpolação de valores | let conteudo = `<img src="${perfilJson.avatar_url}">` |
| `+=`                                        | Adiciona conteúdo ao existente.             | Concatenação            | `about.innerHTML += conteudo;`                        |

<br />

## 7. Funções

| **Função**               | **Função / Descrição**                                | **Categoria / Tipo** | **Exemplo no Código**                                        |
| ------------------------ | ----------------------------------------------------- | -------------------- | ------------------------------------------------------------ |
| `getApiGithub()`         | Busca dados da API do GitHub e monta a seção "Sobre". | Função assíncrona    | `async function getApiGithub(){...}`                         |
| Função anônima de evento | Executa a validação e o envio do formulário.          | Função de callback   | `formulario.addEventListener('submit', function(event){...});` |

<br />

## 8. Variáveis e Constantes

| **Declaração** | **Função / Descrição**                 | **Tipo**               | **Exemplo no Código**                                       |
| -------------- | -------------------------------------- | ---------------------- | ----------------------------------------------------------- |
| `const`        | Cria uma constante (valor imutável).   | Declaração de variável | `const formulario = document.querySelector('#formulario');` |
| `let`          | Cria uma variável com escopo de bloco. | Declaração de variável | `let conteudo = \` ... `;`                                  |