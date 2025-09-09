# Portfólio Pessoal - Eduardo Moreira

Este repositório contém o código-fonte do meu portfólio pessoal, uma Single Page Application (SPA) desenvolvida com Angular. O projeto foi criado para ser uma vitrine das minhas habilidades e projetos, com foco em uma experiência de usuário moderna, interativa e visualmente agradável.

O design se destaca por suas cores neutras, animações fluidas e um efeito de brilho sutil que segue o cursor do mouse, iluminando as bordas dos elementos interativos, criando uma navegação única e engajante.

## 🚀 Acesso Rápido (Live Demo)

**Navegue pelo site acessando o link:**

### **[https://edumoreira-portfolio.vercel.app/](https://edumoreira-portfolio.vercel.app/)**

## ✨ Funcionalidades

  - **Showcase de Projetos Interativo:** Logo na página inicial, há um showcase dos meus principais trabalhos. O usuário pode visualizar e interagir com os sites ao vivo dentro de um `iframe`, sem precisar sair do portfólio.
  - **Efeito "Glowing Border":** Um efeito de brilho sutil e dinâmico segue o cursor do mouse, destacando as bordas dos cards e outros elementos com os quais o usuário interage, criado através de uma diretiva customizada.
  - **Chat para Contato:** Um componente de chat permite que os visitantes enviem mensagens diretamente para mim, com a opção de escolher se a comunicação continuará via WhatsApp ou E-mail.
  - **Animações Fluidas:** A aplicação conta com animações de transição entre rotas e de entrada para elementos, que são ativadas conforme o scroll do usuário, utilizando a `Intersection Observer API`.
  - **Multi-idioma:** O Projeto suporta múltiplos idiomas (pt-br/en-us).

## ⚙️ Tecnologias Utilizadas

  - **Angular:** Framework principal, utilizando **Standalone Components** para uma arquitetura moderna e desacoplada.
  - **TypeScript:** Garantindo um código mais seguro e manutenível.
  - **Tailwind CSS:** Para a estilização da interface, configurado via PostCSS para uma abordagem utility-first moderna e eficiente.
  - **Angular Animations:** Para as animações de transição de rota.
  - **Intersection Observer API:** Para animações de scroll performáticas.

## 🛠️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/edumoreiira/edumoreira-portfolio.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd edumoreira-portfolio
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    ng serve
    ```

    Acesse `http://localhost:4200/` no seu navegador.

## 🤝 Boas Práticas e Convenções

O projeto foi construído com foco na componentização, reutilização de código e interatividade.

### Angular & TypeScript

  - **Diretivas Customizadas:** O projeto faz uso extensivo de diretivas para manipular o DOM e criar comportamentos reutilizáveis. Um exemplo chave é a `glowingBorderDirective`, que abstrai toda a lógica do efeito de brilho que segue o mouse, podendo ser aplicada em qualquer elemento HTML.
  - **Serviços e Injeção de Dependência:** Serviços como o `LanguageService` e `SitePreviewerService` centralizam a lógica de negócio e o estado da aplicação, como o gerenciamento do idioma e a exibição de projetos no `iframe`.
  - **Componentes `standalone`:** A aplicação adota a arquitetura de componentes `standalone`, o que simplifica o gerenciamento de dependências e torna cada componente mais autocontido e fácil de testar.
  - **Animações de Rota:** O arquivo `default-transitions.animations.ts` define animações reutilizáveis que são aplicadas durante a troca de rotas, criando uma experiência de navegação mais suave e profissional.

### HTML & Tailwind CSS

  - **Abordagem Utility-First:** A estilização é construída com Tailwind CSS, aplicando classes de utilidade diretamente no HTML. Isso agiliza o desenvolvimento, mantém a consistência visual e evita a necessidade de escrever CSS customizado na maior parte do tempo.
  - **Acessibilidade:** Foi dada atenção à semântica do HTML para garantir uma base acessível, com o uso de `aria-labels` e tags apropriadas.
