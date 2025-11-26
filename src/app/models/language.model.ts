import { PredefinedMessage } from "../components/layout/chat-mail/chat-mail.component";
import { developer_en_us, developer_pt_br } from "./about_me.model";

export interface LanguageApllication {
    navbar: {
        menu: {
            home: string;
            works: string;
            techs: string;
        }
        contact: string;
    },
    home: {
        misc: string;
        title: string[];
        description: { 
            freelancer: string;
            developer: string;
            home: string;
        };
        selector: {
            label: {
                freelancer: string;
                developer: string;
            }
            description: {
                freelancer: string[];
                developer: string[];
                home: string[];
            }
        }
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
    },

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
    },

    developer: {
        main_info: {
            title: string;
            descriptions: string[];
            cv_button: string;
            portfolio_button: string;
        }
        explanation: {
            title: string;
            description: string;
            warn_box: {
                text: string;
                button: string;
            }
        },
        timeline_items: {
            title: { text: string; year: string; };
            descriptions: { text: string; highlight: boolean; }[];
            bonus_info?: string | string[];
        }[]
    },

    project_cta: {
        title: string;
        button: string;
    }
}

export const language_pt_br: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Portfólio",
            techs: "Tecnologias",
        },
        contact: "Entrar em contato",
    },
    home: {
        misc: "Muito Prazer!",
        title: ["Meu nome é", "Eduardo!"],
        description: {
            freelancer: "Sou desenvolvedor e designer, crio sites modernos, rápidos e com design de impacto. Transformo ideias em páginas que valorizam seu negócio e destacam sua marca na internet.",
            developer: "Trabalho com desenvolvimento web há mais de 2 anos. Esta página foi feita com o intuito de mostrar um pouco mais sobre minhas habilidades e experiências na área.",
            home: "Este portal reúne duas seções: uma com meus serviços de freelancer e outra com minhas principais habilidades e experiências como desenvolvedor."
        },
        selector: {
            label: {
                freelancer: "Quero um website",
                developer: "Sou um recrutador"
            },
            description: {
                home: ["Selecione ", '"Quero um Website"', "caso queira contratar meus serviços como freelancer, ou ", '"Sou um recrutador"', "caso tenha interesse em me contratar como um desenvolvedor."  ],
                freelancer: ["Caso você seja um recrutador e está buscando um desenvolvedor, alterne para a aba ", '"Sou um recrutador"', "." ],
                developer: ["Caso você queira contratar meus serviços como freelancer, alterne para a aba ", '"Quero um Website"', "."]
            }
        }
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
        title: "Tecnologias que eu utilizo",
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
    },
    developer: developer_pt_br,
    project_cta: {
        title: "Portfólio",
        button: "Confira todos os meus trabalhos"
    }
}

export const language_en_us: LanguageApllication = {
    navbar: {
        menu: {
            home: "Home",
            works: "Portfolio",
            techs: "Technologies",
        },
        contact: "Get in touch",
    },
    home: {
        misc: "Nice to meet you!",
        title: ["My name is", "Eduardo!"],
        "description": {
          "freelancer": "I am a developer and designer, I create modern, fast websites with impactful design. I transform ideas into pages that add value to your business and make your brand stand out online.",
          "developer": "I have been working with web development for over 2 years. This page was created to showcase a bit more about my skills and experience.",
          "home": "This portal brings together two sections: one with my services as a freelancer, and another with my main skills and experience as a developer."
        },
        "selector": {
          "label": {
            "freelancer": "I want a website",
            "developer": "I'm a recruiter"
          },
          "description": {
            "home": [
              "Select ",
              "\"I want a website\" ",
              "if you want to hire my services as a freelancer, or ",
              "\"I'm a recruiter\" ",
              "if you are interested in hiring me as a developer."
            ],
            "freelancer": [
              "If you are a recruiter looking for a developer, switch to the ",
              "\"I'm a recruiter\"",
              " tab."
            ],
            "developer": [
              "If you want to hire my services as a freelancer, switch to the ",
              "\"I want a website\"",
              " tab."
            ]
          }
        }
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
        title: "Technologies that I use",
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
    },
    developer: developer_en_us,
    project_cta: {
        title: "Portfolio",
        button: "Check out all my works"
    }

}