/* ========= Helpers ========= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ========= Mobile nav ========= */
const navToggle = $('[data-nav-toggle]');
const navList = $('[data-nav-list]');
const navLinks = $$('[data-nav-link]');

function setNav(open) {
  if (!navList || !navToggle) return;
  navList.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setNav(!isOpen);
});

navLinks.forEach((a) => {
  a.addEventListener('click', () => setNav(false));
});

document.addEventListener('click', (e) => {
  if (!navList || !navToggle) return;
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (!isOpen) return;

  const clickedInside = navList.contains(e.target) || navToggle.contains(e.target);
  if (!clickedInside) setNav(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNav(false);
});

/* ========= Active section highlight ========= */
const sections = $$('main section[id]');
const navByHash = new Map(navLinks.map((a) => [a.getAttribute('href'), a]));

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((x) => x.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((a) => a.removeAttribute('aria-current'));
    const active = navByHash.get(`#${visible.target.id}`);
    if (active) active.setAttribute('aria-current', 'page');
  },
  { root: null, threshold: [0.2, 0.4, 0.6] }
);

sections.forEach((s) => observer.observe(s));

/* ========= i18n (EN/PT) ========= */
const langToggle = $('[data-lang-toggle]');
const i18nNodes = $$('[data-i18n]');
const placeholderNodes = $$('[data-i18n-placeholder]');

const translations = {
  en: {
    a11y: { menu: 'Open menu', language: 'Switch language' },
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    cta: { viewProjects: 'View Projects', contact: 'Contact', letTalk: "Let's talk", moreOnGithub: 'More on GitHub' },
    hero: {
      kicker: 'Software Engineer',
      role: 'Software Engineer',
      subtitle: 'I build fast, accessible web & mobile products with a pragmatic engineering mindset.',
      note: 'Based on modern JavaScript, React, React Native, Flutter, and Python APIs.',
      highlight1Label: 'Focus',
      highlight1Value: 'Web + Mobile',
      highlight2Label: 'Strengths',
      highlight2Value: 'UX, performance, accessibility',
      highlight3Label: 'Backend',
      highlight3Value: 'Django, Flask, FastAPI',
      calloutTitle: 'Open to opportunities',
      calloutBody: 'If you have a product to ship or a system to modernize, let’s talk.',
    },
    about: {
      title: 'About Me',
      desc: 'Short, credible overview—easy to replace with your exact bio.',
      avatarHint: 'Add your avatar image here.',
      p1: 'I’m a Software Engineer focused on building reliable web and mobile experiences. I care about clean UI, accessible components, and performance that holds up on real devices.',
      p2: 'I’ve worked across product surfaces—from marketplace flows to operational dashboards—shipping features end-to-end with thoughtful UX and maintainable code.',
      b1: 'Mobile-first UI with real-world constraints',
      b2: 'APIs and integrations with Python backends',
      b3: 'Design systems: consistent, reusable components',
      b4: 'Accessibility: keyboard + screen reader friendly',
    },
    skills: {
      title: 'Skills',
      desc: 'Web + mobile development with practical backend experience.',
      webTitle: 'Web',
      mobileTitle: 'Mobile',
      backendTitle: 'Backend',
      focusTitle: 'What I optimize for',
      f1: 'Accessibility',
      f2: 'Performance',
      f3: 'Maintainability',
      f4: 'Clear UX',
    },
    projects: {
      title: 'Projects',
      desc: 'Here are some of the projects I have developed, showcasing my skills in web and mobile development, as well as my ability to create effective and innovative solutions.',
      p1: {
        title: 'Gym & Trainer App',
        subtitle: 'Mobile experience for workouts, plans, and coaching.',
        desc: 'App focused on training routines, scheduling, and trainer-client communication with a clean, fast UI.',
        point1: 'Workout plans, progress tracking, and session scheduling',
        point2: 'Offline-friendly screens and optimized list rendering',
        point3: 'API-ready architecture for scalable features',
      },
      p2: {
        title: 'Marketplace Web Platform',
        subtitle: 'Modern storefront + admin tools.',
        desc: 'Web marketplace with product discovery, cart flow, and admin management designed for clarity and speed.',
        point1: 'Search/filter UX with responsive product cards',
        point2: 'Accessible forms and error states across checkout',
        point3: 'Role-based admin pages for inventory and orders',
      },
      p3: {
        title: 'Hospital Management System',
        subtitle: 'Operational workflows with secure access.',
        desc: 'System for scheduling, patient records, and internal operations with a focus on clarity and reliability.',
        point1: 'Dashboards for appointments, triage, and staff workflows',
        point2: 'Permission-aware UI patterns for safer operations',
        point3: 'API-driven data flow designed for auditability',
      },
    },
    contact: {
      title: 'Contact',
      desc: 'Send a message—this form validates on the front end and is ready to wire to a backend.',
      quickTitle: 'Quick links',
      emailLabel: 'Email',
      note: 'Tip: replace the placeholders above with your real links.',
    },
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      namePh: 'Your name',
      emailPh: 'you@domain.com',
      messagePh: 'Tell me what you’re building (or what you need help with).',
    },
    footer: {
      built: 'Built with semantic HTML, CSS, and vanilla JavaScript.',
      top: 'Back to top',
    },
  },

  pt: {
    a11y: { menu: 'Abrir menu', language: 'Trocar idioma' },
    nav: { about: 'Sobre', skills: 'Skills', projects: 'Projetos', contact: 'Contato' },
    cta: { viewProjects: 'Ver Projetos', contact: 'Contato', letTalk: 'Vamos conversar', moreOnGithub: 'Mais no GitHub' },
    hero: {
      kicker: 'Engenheiro de Software',
      role: 'Engenheiro de Software',
      subtitle: 'Eu construo produtos web e mobile rápidos e acessíveis, com foco em entrega e qualidade.',
      note: 'Trabalho com JavaScript moderno, React, React Native, Flutter e APIs em Python.',
      highlight1Label: 'Foco',
      highlight1Value: 'Web + Mobile',
      highlight2Label: 'Pontos fortes',
      highlight2Value: 'UX, performance, acessibilidade',
      highlight3Label: 'Backend',
      highlight3Value: 'Django, Flask, FastAPI',
      calloutTitle: 'Aberto a oportunidades',
      calloutBody: 'Se você precisa lançar um produto ou modernizar um sistema, vamos conversar.',
    },
    about: {
      title: 'Sobre mim',
      desc: 'Visão geral curta e objetiva — fácil de substituir pela sua bio real.',
      avatarHint: 'Adicione aqui o seu avatar.',
      p1: 'Sou Engenheiro de Software focado em construir experiências web e mobile confiáveis. Eu me importo com UI limpa, componentes acessíveis e performance real em dispositivos reais.',
      p2: 'Atuei em diferentes superfícies de produto — de fluxos de marketplace a dashboards operacionais — entregando ponta a ponta com UX consistente e código sustentável.',
      b1: 'UI mobile-first com restrições do mundo real',
      b2: 'APIs e integrações com backends em Python',
      b3: 'Design systems: componentes consistentes e reutilizáveis',
      b4: 'Acessibilidade: teclado + leitor de tela',
    },
    skills: {
      title: 'Skills',
      desc: 'Desenvolvimento web e mobile com experiência prática em backend.',
      webTitle: 'Web',
      mobileTitle: 'Mobile',
      backendTitle: 'Backend',
      focusTitle: 'O que eu otimizo',
      f1: 'Acessibilidade',
      f2: 'Performance',
      f3: 'Manutenibilidade',
      f4: 'UX claro',
    },
    projects: {
      title: 'Projetos',
      desc: 'Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas habilidades em desenvolvimento web e mobile, bem como minha capacidade de criar soluções eficazes e inovadoras.',
      p1: {
        title: 'App de Academia & Treinador',
        subtitle: 'Experiência mobile para treinos, planos e acompanhamento.',
        desc: 'App focado em rotinas, agendamento e comunicação treinador-aluno com UI limpa e rápida.',
        point1: 'Planos de treino, progresso e agendamento de sessões',
        point2: 'Telas amigáveis offline e listas otimizadas',
        point3: 'Arquitetura pronta para evoluir com APIs',
      },
      p2: {
        title: 'Marketplace Web',
        subtitle: 'Loja moderna + ferramentas de admin.',
        desc: 'Marketplace com descoberta de produtos, carrinho e administração, desenhado para clareza e velocidade.',
        point1: 'Busca/filtros com cards responsivos',
        point2: 'Formulários acessíveis e estados de erro no checkout',
        point3: 'Admin com perfis e gestão de pedidos/estoque',
      },
      p3: {
        title: 'Gestão Hospitalar',
        subtitle: 'Workflows operacionais com acesso seguro.',
        desc: 'Sistema para agenda, prontuários e operações internas com foco em confiabilidade e clareza.',
        point1: 'Dashboards de agenda, triagem e fluxos da equipe',
        point2: 'UI com permissões para operações mais seguras',
        point3: 'Fluxo de dados via API com rastreabilidade',
      },
    },
    contact: {
      title: 'Contato',
      desc: 'Envie uma mensagem — o formulário valida no front-end e está pronto para integrar com backend.',
      quickTitle: 'Links rápidos',
      emailLabel: 'Email',
      note: 'Dica: substitua os placeholders pelos seus links reais.',
    },
    form: {
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar',
      namePh: 'Seu nome',
      emailPh: 'voce@dominio.com',
      messagePh: 'Conte o que você está construindo (ou no que precisa de ajuda).',
    },
    footer: {
      built: 'Feito com HTML semântico, CSS e JavaScript puro.',
      top: 'Voltar ao topo',
    },
  },
};

function getStoredLang() {
  const stored = localStorage.getItem('lang');
  return stored === 'pt' || stored === 'en' ? stored : 'en';
}

function setLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  langToggle?.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);

  i18nNodes.forEach((node) => {
    const key = node.getAttribute('data-i18n');
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') node.textContent = value;
  });

  placeholderNodes.forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') node.setAttribute('placeholder', value);
  });

  const next = lang === 'en' ? 'pt' : 'en';
  langToggle?.setAttribute('aria-label', next === 'pt' ? 'Switch to Portuguese' : 'Trocar para inglês');
}

setLang(getStoredLang());

langToggle?.addEventListener('click', () => {
  const current = document.documentElement.lang === 'pt' ? 'pt' : 'en';
  setLang(current === 'en' ? 'pt' : 'en');
});

/* ========= Contact form validation ========= */
const form = $('[data-contact-form]');
const statusEl = $('[data-form-status]');
const nameEl = $('#name');
const emailEl = $('#email');
const messageEl = $('#message');

const nameErr = $('#nameError');
const emailErr = $('#emailError');
const messageErr = $('#messageError');

function setError(el, errEl, msg) {
  if (!el || !errEl) return;
  errEl.textContent = msg || '';
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = String(nameEl?.value || '').trim();
  const email = String(emailEl?.value || '').trim();
  const message = String(messageEl?.value || '').trim();

  let ok = true;

  if (name.length < 2) {
    setError(
      nameEl,
      nameErr,
      document.documentElement.lang === 'pt'
        ? 'Informe seu nome (mín. 2 caracteres).'
        : 'Please enter your name (min 2 characters).'
    );
    ok = false;
  } else {
    setError(nameEl, nameErr, '');
  }

  if (!isValidEmail(email)) {
    setError(emailEl, emailErr, document.documentElement.lang === 'pt' ? 'Informe um email válido.' : 'Please enter a valid email.');
    ok = false;
  } else {
    setError(emailEl, emailErr, '');
  }

  if (message.length < 10) {
    setError(
      messageEl,
      messageErr,
      document.documentElement.lang === 'pt'
        ? 'Escreva uma mensagem (mín. 10 caracteres).'
        : 'Please write a message (min 10 characters).'
    );
    ok = false;
  } else {
    setError(messageEl, messageErr, '');
  }

  if (!ok) {
    statusEl.textContent = document.documentElement.lang === 'pt' ? 'Confira os campos destacados.' : 'Please review the highlighted fields.';
    return;
  }

  statusEl.textContent =
    document.documentElement.lang === 'pt'
      ? 'Mensagem pronta para envio. Integre um endpoint para enviar.'
      : 'Message ready to send. Wire a backend endpoint to deliver it.';
  form.reset();

  // Example wiring (do NOT ship keys in the browser):
  // await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, email, message }),
  // });
});
