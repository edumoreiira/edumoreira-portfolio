import { PredefinedMessage } from "../components/layout/chat-mail/chat-mail.component";

export interface LanguageApllication {
    navbar: {
        menu: {
            home: string;
            works: string;
            techs: string;
        }
        contact: string;
    },
    main: {
        misc: string;
        title: string[];
        description: string;
        button1: string;
        button2: string;
    },
    works: {
        title: string;
        description: string;
        accordions: { title: string; description: string; button: string }[];
        previewer: {
            techsHeader: string;
            loading: string;
        }
    },
    advantages: {
        title: string,
        items: { title: string, description: string }[];
    },
    techs: {
        title: string;
        year: string;
        misc: string;
    },
    contact: {
        title: string;
        description: string;
        chat: {
            predefined_messages: PredefinedMessage[]
            placeholder: string;
            button: string;
        }
        email_subject: string;
    }
    cta: {
        title: string[];
        description: string;
        button: string;
    },
    footer: {
        copyright: string;
    }

    projects: {
        title: string;
        filters: [string, string, string];
        tooltips: {
            link: string;
            commit: { plural: string; singular: string };
        }
        card: {
            titles: [string, string, string];
            buttons: {
                details: string;
                preview: string;
            }
        }
    }
}

export const language_pt_br: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Trabalhos",
            techs: "Tecnologias",
        },
        contact: "Entrar em contato",
    },
    main: {
        misc: "Muito Prazer!",
        title: ["Meu nome é", "Eduardo!"],
        description: "Sou desenvolvedor e designer, crio sites modernos, rápidos e com design de impacto. Transformo ideias em páginas que valorizam seu negócio e destacam sua marca na internet.",
        button1: "Fale comigo",
        button2: "Meus trabalhos",
    },
    works: {
        title: "Meus Trabalhos",
        description: "Aqui estão alguns dos meus projetos mais recentes. Cada um deles foi desenvolvido com atenção aos detalhes e foco na experiência do usuário.",
        accordions: [
            {
                title: "Bera Pools",
                description: "Website oficial desenvolvido para Bera Pools, um projeto de portfólio e gerenciamento de carteiras Web3 na rede Berachain.",
                button: "Visitar Website"
            },
            {
                title: "e-art",
                description: "Website criado para e-art, uma vitrine digital pensado para a exposição e apreciação de obras artísticas no ambiente online.",
                button: "Visitar Website"
            },
            {
                title: "Aju Films",
                description: "Landing Page desenvolvida para a Aju Films, empresa de aplicação de película residencial.",
                button: "Visitar Website"
            }
        ],
        previewer: {
            techsHeader: "Tecnologias:",
            loading: "Carregando website"
        }
    },
    advantages: {
        title: "Por que me escolher?",
        items: [ 
            {
                title: "Entrega rápida",
                description: "As entregas dos sites são sempre realizadas dentro do prazo, muitas vezes antes."
            },
            {
                title: "Design que vende",
                description: "Sites pensados para chamar atenção e converter visitantes em clientes."
            },
            {
                title: "Totalmente responsivo",
                description: "Seu site funciona perfeitamente em celulares, tablets e computadores."
            },
            {
                title: "Atendimento personalizado",
                description: "Você fala direto comigo, sem intermediários. Escuto suas ideias e explico tudo com clareza."
            },
            {
                title: "Seu site no Google",
                description: "O site é construído com técnicas de SEO que facilitam sua aparição nos resultados de busca, aumentando a visibilidade e atraindo mais visitantes de forma orgânica."
            }
        ]
    },
    contact: {
        title: "Vamos conversar sobre seu site?",
        description: "Escreva sua ideia, objetivos e o que espera da sua nova página. Vou verificar e responder rapidinho!",
        chat: {
            predefined_messages: [
                { label: "Pedir informações...", value: "Gostaria de fazer um site para o meu negócio. Pode me explicar os próximos passos?" },
                { label: "Solicitar orçamento...", value: "Olá, gostaria de solicitar um orçamento para desenvolvimento de um site. Pode me informar os valores e prazos?" }
            ],
            placeholder: "Preciso de um site profissional, você pode me ajudar?",
            button: "Enviar"
        },
        email_subject: "Olá, quero fazer o orçamento de um site"
    },
    techs: {
        title: "Tecnologias que eu domino",
        year: "2025",
        misc: "2023"
    },
    cta: {
        title: ["Seu site nas mãos de quem tem o" , "molho", "do design" ],
        description: "Combino experiência em design com conhecimento em programação para criar páginas que chamam atenção, passam confiança e ajudam seu negócio a crescer. Bora dar vida ao seu site?",
        button: "Vamos lá!"
    },
    footer: {
        copyright: "Desenvolvido com carinho e café por mim © 2025"
    },

    projects: {
        title: "Meus Projetos",
        filters: ["Criação", "Destaques", "Commits"],
        tooltips: {
            link: "Ir para repositório",
            commit: { plural: "commits", singular: "commit" }
        },
        card: {
            titles: ["Sobre", "Funcionalidades", "Boas Práticas"],
            buttons: {
                details: "Detalhes técnicos",
                preview: "Preview"
            }
        }
    }
}

export const language_en_us: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Works",
            techs: "Technologies",
        },
        contact: "Get in touch",
    },
    main: {
        misc: "Nice to meet you!",
        title: ["My name is", "Eduardo!"],
        description: "I'm a developer and designer creating modern, fast websites with impactful design. I turn ideas into pages that add value to your business and highlight your brand on the internet.",
        button1: "Get in touch",
        button2: "My works",
    },
    works: {
        title: "My Works",
        description: "Here are some of my latest projects. Each one was developed with attention to detail and a focus on user experience.",
        accordions: [
            {
                title: "Bera Pools",
                description: "Oficial website developed for Bera Pools, a portfolio and Web3 wallet management project on the Berachain network.",
                button: "Visit Website"
            },
            {
                title: "e-art",
                description: "Website created for e-art, a digital showcase designed for the exhibition and appreciation of artistic works in the online environment.",
                button: "Visit Website"
            },
            {
                title: "Aju Films",
                description: "Landing page developed for Aju Films, a residential film application company.",
                button: "Visit Website"
            }
        ],
        previewer: {
            techsHeader: "Technologies:",
            loading: "Loading website"
        }
    },
    advantages: {
        title: "Why choose me?",
        items: [
            {
                title: "Fast delivery",
                description: "Websites are always delivered on time, often even earlier."
            },
            {
                title: "Design that sells",
                description: "Websites designed to attract attention and convert visitors into customers."
            },
            {
                title: "Fully responsive",
                description: "Your website works perfectly on mobile phones, tablets, and computers."
            },
            {
                title: "Personalized service",
                description: "You talk directly to me, with no intermediaries. I listen to your ideas and explain everything clearly."
            },
            {
                title: "Your site on Google",
                description: "The site is built with SEO techniques that make it easier to appear in search results, increasing visibility and attracting more visitors organically."
            }
        ]
    },
    contact: {
        title: "Let's talk about your website?",
        description: "Write down your idea, goals, and what you expect from your new page. I'll check it out and respond quickly!",
        chat: {
            predefined_messages: [
                { label: "Request information...", value: "I would like to create a website for my business. Can you explain the next steps?" },
                { label: "Request quote...", value: "Hello, I would like to request a quote for website development. Can you provide me with the prices and deadlines?" }
            ],
            placeholder: "I need a professional website, can you help me?",
            button: "Send"
        },
        email_subject: "Hello, I want to get a website quote"
    },
    techs: {
        title: "Technologies I'm skilled at",
        year: "2025",
        misc: "2023"
    },
    cta: {
        title: ["Your site with a dash of design", "sauce", "expertise" ],
        description: "I combine design experience with programming skills to create pages that grab attention, build trust, and help your business grow. Ready to bring your site to life?",
        button: "Let's go!"
    },
    footer: {
        copyright: "Developed with love and coffee by me © 2025"
    },
    projects: {
        title: "My Projects",
        filters: ["Creation", "Highlights", "Commits"],
        tooltips: { 
            link: "Go to repository",
            commit: { plural: "commits", singular: "commit" }
        },
        card: {
            titles: ["About", "Features", "Best Practices"],
            buttons: {
                details: "Technical details",
                preview: "Preview"
            }
        }
    }

}