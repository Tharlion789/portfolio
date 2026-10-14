// Main JavaScript for Portfolio
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Typing Effect
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Desenvolvedor Full Stack",
        "Software Engineer",
        "Especialista em WebRTC & Streaming",
        "Engenheiro de Aplicações com IA",
        "Criador de Ecossistemas em Tempo Real"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1600; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }
    if (typingElement) type();

    // 2. Animated Stats Counter
    const statCounters = document.querySelectorAll('.stat-counter');
    let hasAnimatedStats = false;

    function animateStats() {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                counter.textContent = currentVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + suffix;
                }
            }
            requestAnimationFrame(updateCount);
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                animateStats();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // 3. Project Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active', 'bg-indigo-600', 'text-white'));
            filterButtons.forEach(b => b.classList.add('bg-slate-800/80', 'text-slate-300'));

            btn.classList.add('active', 'bg-indigo-600', 'text-white');
            btn.classList.remove('bg-slate-800/80', 'text-slate-300');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 4. Modal System for Project Details
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBadge = document.getElementById('modal-badge');
    const modalDesc = document.getElementById('modal-description');
    const modalArch = document.getElementById('modal-architecture');
    const modalTechs = document.getElementById('modal-techs');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    const projectDetailsData = {
        'kumalive': {
            title: 'KumaLIVE — Plataforma de Streaming WebRTC, Comunidades & Motor Gráfico 2D',
            badge: 'WebRTC P2P • 1080p60 • Discord-Style',
            desc: 'Plataforma completa para streamers e comunidades virtuais, unindo transmissão de tela com latência ultra-baixa (<300ms), canais de voz WebRTC, chat instantâneo, molduras animadas SVG e motor gráfico procedural em Canvas 2D.',
            arch: [
                'Motor WebRTC P2P v2 com injeção de SDP (b=AS e b=TIAS) alcançando 15 Mbps de bitrate e 1080p a 60 FPS.',
                'Fila inteligente de ICE Candidates para entrada de espectadores sem atraso ou tela preta.',
                'Kuma FX Engine: renderizador procedural em Canvas 2D a 60 FPS em 3 camadas com 24+ skins animadas.',
                'Kuma Audio FX: síntese sonora procedural em tempo real com Web Audio API nativa.',
                'Arquitetura social completa estilo Discord: criação de servidores, canais de texto/voz, DMs privadas e moderação.',
                'Economia virtual integrada com KumaCoins, Passe de Temporada (Season Pass) e loja com raridades de itens.'
            ],
            techs: ['WebRTC', 'JavaScript ES6+', 'PHP 8.2+', 'MySQL (PDO)', 'HTML5 Canvas 2D', 'Web Audio API', 'CSS Glassmorphism', 'Linux/Nginx']
        },
        'kumastream': {
            title: 'KumaStream — Plataforma Elite de Streaming Privado & Arquitetura Cloud',
            badge: 'Streaming Privado • Multi-Account CDN • B2B SaaS',
            desc: 'Ecossistema privado de streaming de alta fidelidade preparado para Web, Android TV e Mobile. Desenvolvido com catálogo dinâmico integrado à API do TMDB, fluxo de assinaturas e rede de revendedores com split automático de comissões.',
            arch: [
                'Google Drive Service Accounts Pool: balanceamento de carga e failover automático de credenciais para contornar limitações diárias de 750 GB e cotas de requisição.',
                'CMS completo com ingestão automatizada de metadados via TMDB API e espelhamento de contingência para mídias populares.',
                'Painel do Revendedor B2B com calculadora dinâmica de margem de lucro por lote e automação de saques via PIX.',
                'Motor de campanhas de e-mail marketing integrado com visualizador WYSIWYG reativo e segmentação para combate ao churn.',
                'Segurança rigorosa com controle de sessões ativas simultâneas e compliance com LGPD.'
            ],
            techs: ['PHP 8.2+', 'MySQL', 'Google Cloud APIs', 'Mercado Pago SDK', 'Tailwind CSS', 'TMDB API', 'PHPMailer', 'REST APIs']
        },
        'ai-upscale': {
            title: 'AI Creator & Video Upscale Studio',
            badge: 'IA Generativa • PyTorch • Diffusers • Visão Computacional',
            desc: 'Suíte de ferramentas de Inteligência Artificial para geração e restauração de vídeo e imagens aceleradas por hardware local com PyTorch, Diffusers e FastAPI.',
            arch: [
                'Motor local de geração Text-to-Video utilizando Hugging Face Diffusers, Transformers e microserviços assíncronos com FastAPI.',
                'Upscale Studio: restauração e aumento de resolução de vídeos longos utilizando Real-ESRGAN e waifu2x-ncnn-vulkan com aceleração por GPU/Vulkan.',
                'Fallback automático inteligente para CPU em máquinas sem GPU dedicada.',
                'Interface desktop moderna construída em PySide6 (Qt para Python) e pipeline de CLI integrado.'
            ],
            techs: ['Python', 'PyTorch', 'Hugging Face Diffusers', 'FastAPI', 'OpenCV', 'FFmpeg', 'PySide6', 'Real-ESRGAN']
        },
        'whatsapp-saas': {
            title: 'WhatsApp Automation Engine & Live Inbox SaaS',
            badge: 'WebSockets • Baileys • Automação • Anti-Ban',
            desc: 'Plataforma SaaS para campanhas de mensageria em massa com controle anti-ban, caixas de entrada operacionais em tempo real e controle de permissões por nível de acesso (RBAC).',
            arch: [
                'Integração multi-sessão com engine Baileys e pareamento simplificado por QR Code em tempo real.',
                'Algoritmo inteligente de proteção anti-ban com atrasos randômicos e gerador de variação de texto Spin-tax.',
                'Caixa de entrada (Inbox) bidirecional conectada via WebSockets (Socket.io) para atendimento ao vivo.',
                'Controle de níveis de acesso RBAC (Administrador e Operador) com autenticação JWT e criptografia Bcrypt.'
            ],
            techs: ['Node.js', 'Express', 'Socket.io', 'Baileys', 'TypeScript', 'MySQL', 'JWT', 'Puppeteer Stealth']
        },
        'webtorrent': {
            title: 'P2P Torrent Engine & Client Distribuído',
            badge: 'P2P • Aria2 JSON-RPC • 2FA • LGPD Shield',
            desc: 'Sistema moderno de distribuição e gerenciamento de arquivos torrent com motor local de alta velocidade, segurança cibernética avançada e conformidade jurídica LGPD.',
            arch: [
                'Integração direta com motor local (Aria2) via protocolo JSON-RPC para downloads com velocidade máxima.',
                'Camada de proteção Elite Shield com autenticação de dois fatores (2FA), rate limiting e conformidade com LGPD.',
                'Sistema de economia interna de créditos com gamificação e catálogo descentralizado de conteúdos comunitários.'
            ],
            techs: ['PHP', 'Aria2 JSON-RPC', 'MySQL', '2FA Security', 'WebSockets', 'CSS Glassmorphism']
        },
        'tank-game': {
            title: 'Battle City Neon — PvP Multiplayer em Tempo Real',
            badge: 'Game Dev • WebSockets • HTML5 Canvas Neon FX',
            desc: 'Jogo de combate de tanques multiplayer em tempo real com física no servidor, sincronização de estado via WebSockets e renderização visual com efeitos neon em Canvas 2D.',
            arch: [
                'Loop de jogo e autoridade de física rodando no backend em Node.js para prevenção de trapaças e sincronia de estados.',
                'Comunicação ultra-rápida cliente-servidor através do protocolo WebSocket (ws).',
                'Efeitos visuais procedurais em Canvas: partículas de explosão, iluminação neon e feedback sonoro imersivo.'
            ],
            techs: ['JavaScript', 'Node.js', 'WebSockets (ws)', 'HTML5 Canvas', 'Game Loop Architecture']
        }
    };

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projKey = btn.getAttribute('data-project');
            const data = projectDetailsData[projKey];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalBadge.textContent = data.badge;
            modalDesc.textContent = data.desc;

            // Architecture list
            modalArch.innerHTML = '';
            data.arch.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-2 text-slate-300 text-sm';
                li.innerHTML = `<span class="text-indigo-400 mt-1">▹</span><span>${item}</span>`;
                modalArch.appendChild(li);
            });

            // Techs
            modalTechs.innerHTML = '';
            data.techs.forEach(t => {
                const span = document.createElement('span');
                span.className = 'px-2.5 py-1 text-xs font-mono rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-700/50';
                span.textContent = t;
                modalTechs.appendChild(span);
            });

            projectModal.classList.remove('hidden');
            setTimeout(() => {
                projectModal.classList.remove('opacity-0');
                projectModal.querySelector('.modal-content').classList.remove('scale-95');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        projectModal.classList.add('opacity-0');
        projectModal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => {
            projectModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 200);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 6. Copy Email / Contact Action
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'tharlion789@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                toast.classList.remove('translate-y-24', 'opacity-0');
                setTimeout(() => {
                    toast.classList.add('translate-y-24', 'opacity-0');
                }, 3000);
            });
        });
    }
});
