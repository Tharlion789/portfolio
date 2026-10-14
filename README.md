# 🚀 Portfólio Profissional — Tharlion Rodrigues de França

Portfólio moderno, responsivo e ultra veloz desenvolvido para apresentar seu ecossistema completo de projetos, arquiteturas e competências no mercado de tecnologia.

---

## 💻 Visualização Local (XAMPP)

O projeto já está criado dentro do seu htdocs e pronto para rodar. Basta abrir no seu navegador:

👉 **[http://localhost/portfolio/](http://localhost/portfolio/)**

---

## 🌟 Seções e Recursos Implementados

1. **Background Interativo 60 FPS (Canvas 2D):**
   - Efeito de teia/partículas procedurais reativo ao cursor do mouse via `requestAnimationFrame`.
2. **Hero com Efeito de Digitação Dinâmica:**
   - Alternância automática entre seus papéis técnicos (*Full Stack, WebRTC, IA Generativa, Software Engineer*).
3. **Métricas de Impacto:**
   - Contadores animados automáticos (60+ Projetos, <300ms Latência, 1080p60, 300+ Usuários).
4. **Matriz de Competências Dividida por Domínios:**
   - 📡 *Streaming & WebRTC*
   - 🤖 *Inteligência Artificial & Visão Computacional*
   - ⚙️ *Backend & Engenharia de APIs*
   - 🎨 *Frontend & Computação Gráfica*
   - 💾 *Bancos de Dados & Cloud*
   - 🔒 *Automação, Bots & SaaS*
5. **Vitrine de Projetos com Filtros Dinâmicos & Modal de Arquitetura:**
   - Filtros instantâneos por categoria (Streaming, IA, SaaS, Jogos).
   - Modal com quebra detalhada da arquitetura técnica ao clicar em *"Ver Arquitetura Completa"*.
6. **Pilares de Engenharia:**
   - Cards explicativos sobre suas maiores inovações (*WebRTC SDP Tuning*, *Google Drive Pool Failover*, *Kuma FX Engine*).
7. **Integração de Contatos:**
   - Links diretos para seu LinkedIn atualizado (`linkedin.com/in/tharlion-frança`), GitHub e botão com cópia rápida de e-mail com notificação Toast.

---

## 🌐 Como Hospedar na sua VPS (Linux / Nginx ou Apache)

Como o portfólio foi construído com arquitetura web pura de altíssima performance, ele **não requer build pesado de Node.js no servidor**, funcionando instantaneamente em qualquer VPS Linux:

### 1. Via SFTP / FileZilla / SCP:
- Basta enviar todos os arquivos da pasta `c:\xampp\htdocs\portfolio\` para a pasta pública do seu Nginx ou Apache na VPS (geralmente `/var/www/html/` ou na pasta do seu domínio).

### 2. Configuração Básica do Nginx (Exemplo):
```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    root /var/www/html/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Pronto!
