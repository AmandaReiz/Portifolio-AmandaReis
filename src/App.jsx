import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projetos", href: "#projetos" },
  { label: "Minhas Habilidades", href: "#habilidades" },
  { label: "Soft Skills", href: "#soft-skills" },
  { label: "Formação Acadêmica", href: "#formacao" },
  { label: "Contato", href: "#contato" },
];

const skillGroups = [
  {
    title: "Front-end",
    description: "Interfaces modernas, acessíveis e conectadas a serviços reais.",
    accent: "from-[#ff7a00] to-[#7c3aed]",
    items: [
      { label: "React", level: 90 },
      { label: "TypeScript", level: 80 },
      { label: "Next.js", level: 30 },
      { label: "JavaScript", level: 88 },
      { label: "HTML", level: 95 },
      { label: "CSS", level: 92 },
    ],
  },
  {
    title: "Back-end",
    description: "Base para APIs, autenticação, regras de negócio e integração entre sistemas.",
    accent: "from-[#ff5a00] to-[#ff9a3d]",
    items: [
      { label: "Node.js", level: 100 },
      { label: "Express", level: 85 },
      { label: "Java", level: 90 },
      { label: "Spring Boot", level: 80 },
      { label: "JWT", level: 82 },
      { label: "WebSockets", level: 76 },
    ],
  },
  {
    title: "Dados & Infra",
    description: "Persistência, versionamento, containers e noções de cloud.",
    accent: "from-[#ff7a00] to-[#ff5a00]",
    items: [
      { label: "PostgreSQL", level: 80 },
      { label: "MySQL", level: 84 },
      { label: "Docker", level: 20 },
      { label: "CI/CD", level: 90 },
      { label: "Git", level: 90 },
      { label: "Cloud (AWS/Azure)", level: 10 },
    ],
  },
  {
    title: "Qualidade de Código",
    description: "Práticas que deixam a entrega mais confiável, legível e sustentável.",
    accent: "from-[#7c3aed] to-[#ff5a00]",
    items: [
      { label: "APIs REST", level: 90 },
      { label: "JUnit + Mockito", level: 20 },
      { label: "SOLID", level: 74 },
      { label: "Clean Code", level: 82 },
      { label: "ORM", level: 68 },
      { label: "GitHub Copilot / Claude Code", level: 84 },
    ],
  },
];

const projects = [
  {
    title: "Conversor de Moedas",
    category: "Front-end",
    emoji: "💱",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "Aplicação web para conversão de moedas com interface responsiva, foco em experiência de uso e integração de lógica JavaScript para cálculos e exibição dinâmica dos valores convertidos.",
    previewUrl: "https://conversor-de-moedas-internacional.vercel.app",
    previewLabel: "Frontend",
    repositoryUrl: "https://github.com/AmandaReiz/conversor-de-moedas.git",
    imageUrl: "/prints/conversor-de-moedas.png",
  },
  {
    title: "Chamados de TI (HelpDeskCloud)",
    category: "Full Stack",
    emoji: "🛠️",
    stack: ["Java", "Spring Boot", "Next.js", "JWT", "PostgreSQL", "Flyway", "Swagger", "JUnit", "Mockito", "GitHub Actions", "Docker"],
    description:
      "Sistema de chamados de TI full stack com backend em Java e Spring Boot, autenticação JWT, CRUD completo de tickets, documentação com Swagger, PostgreSQL com versionamento via Flyway, testes de integração e pipeline CI/CD no GitHub Actions.",
    videoUrl: "https://youtu.be/91B6W1OSDTA",
    repositoryUrl: "https://github.com/AmandaReiz/HelpdeskCloud-AWS",
    imageUrl: "/prints/print-helpdesk.png",
  },
  {
    title: "PulseNotify",
    category: "Real-time",
    emoji: "🔔",
    stack: ["Java", "Spring Boot", "React", "WebSockets", "Redis", "Docker"],
    description:
      "Sistema de notificações em tempo real com backend em Java e Spring Boot, comunicação instantânea via WebSocket, cache de notificações recentes com Redis e frontend em React simulando um painel operacional para envio e recebimento de eventos.",
    frontendUrl: "https://frontend-pi-seven-55.vercel.app",
    frontendLabel: "Frontend",
    backendUrl: "https://pulsenotify-sistema-de-notifica-es-em-843h.onrender.com/api/notifications/status",
    backendLabel: "Backend/API",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7455054272032985088/",
    repositoryUrl: "https://github.com/AmandaReiz/PulseNotify-Sistema-de-notifica-es-em-tempo-real",
    imageUrl: "/prints/PulseNotify.png",
  },
  {
    title: "Gerador de Dietas",
    category: "Spring Boot",
    emoji: "🥗",
    stack: ["Java", "Spring Boot", "Spring Web", "OpenFeign", "HTML", "CSS", "JavaScript"],
    description:
      "Aplicação web em Spring Boot com interface em HTML, CSS e JS para gerar dietas personalizadas com base em informações corporais e planos diários.",
    previewUrl: "https://youtu.be/Xviru4PEUqU",
    previewLabel: "Vídeo",
    repositoryUrl: "https://github.com/AmandaReiz/Gerador-de-dietas-SpringBoot",
    imageUrl: "/prints/gerador-de-dietas-print.png",
  },
  {
    title: "API de Controle de Estoque",
    category: "Node.js",
    emoji: "📦",
    stack: ["Node.js", "Express", "MySQL", "Swagger", "JWT", "Render"],
    description:
      "API de gerenciamento de estoque com autenticação JWT, documentação Swagger, persistência em MySQL e deploy no Render para testes em tempo real.",
    previewUrl: "https://lnkd.in/dfyStsiZ",
    previewLabel: "Backend/API",
    repositoryUrl: "https://github.com/AmandaReiz/api-estoque",
    imageUrl: "/prints/API-controle-de-estoque.png",
  },
];

const filters = [
  "Todos",
  "Java",
  "Spring Boot",
  "Node.js",
  "React",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "JWT",
  "WebSockets",
  "Redis",
  "Swagger",
];

const softSkills = [
  {
    title: "Organização",
    score: "96,5%",
    value: 96.5,
    detail:
      "Sou extremamente disciplinada com meus prazos e estudo. Mantenho meus projetos e códigos sempre bem estruturados e limpos.",
  },
  {
    title: "Comunicação e sociabilidade",
    score: "89,1%",
    value: 89.1,
    detail:
      "Tenho facilidade em explicar ideias técnicas de forma clara e me relacionar bem com as pessoas ao meu redor.",
  },
  {
    title: "Ambição",
    score: "84,6%",
    value: 84.6,
    detail:
      "Sou focada em resultados. Estudo além do currículo da faculdade porque quero crescer rápido na carreira de tecnologia.",
  },
  {
    title: "Resiliência com erros - Estabilidade emocional",
    score: "82,3%",
    value: 82.3,
    detail:
      "Mantenho a calma para resolver problemas e erros de código, sem me deixar abater quando algo não funciona de primeira.",
  },
];

const formationItems = [
  {
    title: "Informática",
    subtitle: "Escola Técnica do Rio de Janeiro",
    period: "fev de 2016 - dez de 2019",
    status: "Técnico",
    badge: "Concluído",
    detail: "Formação técnica com base sólida em informática, ferramentas computacionais, organização e suporte técnico.",
  },
  {
    title: "Inglês avançado",
    subtitle: "CNA",
    period: "Concluído em 2018 • nível C1",
    status: "Idioma",
    badge: "Concluído",
    detail: "Leitura técnica, comunicação profissional e apoio à documentação em inglês.",
  },
  {
    title: "Lógica de Programação",
    subtitle: "Curso em Vídeo",
    period: "mai de 2025",
    status: "Curso",
    badge: "Concluído",
    detail: "Base em raciocínio lógico, estruturas fundamentais e pensamento computacional para desenvolvimento.",
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    subtitle: "UNISUAM",
    period: "jul de 2025 - fev de 2028",
    status: "Graduação",
    badge: "Em andamento",
    detail: "Graduação focada em lógica, desenvolvimento de software, estrutura de sistemas e evolução prática para o mercado.",
  },
  {
    title: "Formação JavaScript Developer",
    subtitle: "DIO",
    period: "dez de 2025",
    status: "Curso",
    badge: "Concluído",
    detail: "Formação voltada a JavaScript moderno, fundamentos da linguagem e construção de aplicações web.",
  },
  {
    title: "Curso Node.js",
    subtitle: "DIO",
    period: "mar de 2026",
    status: "Curso",
    badge: "Concluído",
    detail: "Estudos práticos em backend com Node.js, estrutura de aplicações e integração com serviços.",
  },
  {
    title: "Santander Bootcamp 2026 - 1º semestre",
    subtitle: "Santander Open Academy",
    period: "25 de mai de 2026 - 25 de ago de 2026",
    status: "Bootcamp",
    badge: "Selecionada",
    detail: "Programa voltado ao aprofundamento técnico, aprendizado contínuo e aceleração de carreira em tecnologia.",
  },
];

const heroCards = [
  { label: "Stack principal", value: "Node + React", x: "-14%", y: "14%" },
  { label: "Integrações", value: "APIs REST", x: "88%", y: "10%" },
  { label: "Dados", value: "PostgreSQL + MySQL", x: "82%", y: "80%" },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff8a3d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-6 text-lg leading-8 text-white/68">{description}</p> : null}
    </div>
  );
}

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x - 18,
        y: position.y - 18,
        scale: pressed ? 0.84 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.25 }}
    >
      <span className="custom-cursor__core" />
    </motion.div>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeSection, setActiveSection] = useState("home");
  const [activeSkillGroup, setActiveSkillGroup] = useState(skillGroups[0].title);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHovered, setHeaderHovered] = useState(false);
  const formacaoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress, scrollY } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  const heroTextY = useTransform(scrollY, [0, 380], [0, reduceMotion ? 0 : 28]);
  const heroTextOpacity = useTransform(scrollY, [0, 360], [1, 0.72]);
  const heroPhotoY = useTransform(scrollY, [0, 380], [0, reduceMotion ? 0 : 42]);
  const heroGlowY = useTransform(scrollY, [0, 380], [0, reduceMotion ? 0 : 18]);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: formacaoRef,
    offset: ["start 0.85", "end 0.2"],
  });
  const timelineScale = useSpring(timelineProgress, { stiffness: 120, damping: 26, mass: 0.28 });

  const activeSkillData = useMemo(
    () => skillGroups.find((group) => group.title === activeSkillGroup) ?? skillGroups[0],
    [activeSkillGroup],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") return projects;
    return projects.filter((project) => project.stack.includes(activeFilter));
  }, [activeFilter]);

  const starField = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        size: 1 + ((index * 7) % 4),
        top: `${(index * 17) % 92}%`,
        left: `${(index * 29) % 96}%`,
        delay: `${(index % 10) * 0.32}s`,
        duration: `${3.4 + (index % 5) * 0.55}s`,
      })),
    [],
  );

  useEffect(() => {
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.09,
      duration: 1.15,
      syncTouch: false,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target?.id) {
          setActiveSection(current.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.18, 0.4, 0.65] },
    );

    navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean)
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nearTop = currentScrollY < 26;
      const scrollingUp = currentScrollY < lastScrollY;

      setHeaderVisible(nearTop || headerHovered || mobileMenuOpen || scrollingUp);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHovered, mobileMenuOpen]);

  return (
    <div className="overflow-x-clip bg-[#050505] text-white">
      <CustomCursor />

      <motion.div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-white/5" style={{ scaleX: progressScale }}>
        <div className="h-full w-full bg-[linear-gradient(90deg,#ff5a00_0%,#ff7a00_55%,#7c3aed_100%)] shadow-[0_0_22px_rgba(255,90,0,0.5)]" />
      </motion.div>

      <div className="fixed inset-x-0 top-0 z-40 hidden h-8 md:block" onMouseEnter={() => setHeaderHovered(true)} />

      <header
        className={`sticky top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out sm:px-5 sm:pt-4 lg:px-10 ${
          headerVisible ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"
        }`}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(14,14,14,0.86),rgba(5,5,5,0.78))] px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.44),0_0_0_1px_rgba(124,58,237,0.16),0_0_34px_rgba(124,58,237,0.24),0_0_74px_rgba(124,58,237,0.12)] backdrop-blur-2xl sm:gap-4 sm:rounded-full sm:px-6 sm:py-4 lg:px-8">
          <a href="#home" className="whitespace-nowrap text-xl font-black tracking-wide text-white sm:text-2xl">
            <span className="text-[#ff5a00]">A</span>manda Reis
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/85 md:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          <nav className="hidden flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-white/78 md:flex md:max-w-[calc(100%-180px)] md:justify-end lg:gap-x-5 xl:gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-[#ff8a3d] ${
                    isActive ? "text-[#ff8a3d]" : ""
                  }`}
                >
                  {item.label}
                  {isActive ? <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-[#ff5a00]" /> : null}
                </a>
              );
            })}
          </nav>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24 }}
              className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-black/90 px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl md:hidden"
            >
              <nav id="mobile-navigation" className="mx-auto flex max-w-7xl flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ delay: index * 0.04, duration: 0.22 }}
                      onClick={() => {
                        setActiveSection(item.href.slice(1));
                        setMobileMenuOpen(false);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "border-[#ff5a00] bg-[#ff5a00]/10 text-[#ff8a3d]"
                          : "border-white/8 bg-white/5 text-white/80 hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="-mt-20 sm:-mt-24">
        <section
          id="home"
          className="relative isolate overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_80%_18%,rgba(255,90,0,0.24),transparent_16%),radial-gradient(circle_at_68%_18%,rgba(124,58,237,0.14),transparent_14%),linear-gradient(180deg,#0a0611_0%,#080808_42%,#050505_100%)] pt-20 sm:pt-24"
        >
          <div className="hero-grid absolute inset-0 opacity-[0.18]" />
          <div className="hero-noise absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,90,0,0.16),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(124,58,237,0.14),transparent_20%)]" />

          {starField.map((star) => (
            <span
              key={star.id}
              className="hero-star"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}

          <div className="floating-orb orb-one" />
          <div className="floating-orb orb-two" />
          <div className="floating-orb orb-three" />
          <div className="floating-orb orb-four" />

          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl gap-12 px-4 py-14 sm:min-h-[calc(100vh-81px)] sm:px-6 sm:py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10 lg:py-20">
            <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.6 }}
                className="mb-4 text-xs font-extrabold uppercase tracking-[0.32em] text-white/80 sm:mb-5 sm:text-sm sm:tracking-[0.38em]"
              >
                Olá!
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.72 }}
                className="text-[clamp(2.8rem,10vw,5.15rem)] font-black leading-[0.94] tracking-tight text-white"
              >
                Sou <span className="inline-block whitespace-nowrap text-[#ff5a00]">Amanda Reis</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.62 }}
                className="mt-4 text-lg font-bold text-[#ff7a00] sm:text-xl md:text-2xl"
              >
                Desenvolvedora <span className="text-white">Fullstack</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.68 }}
                className="mt-6 max-w-2xl text-sm leading-7 text-white/72 sm:mt-8 sm:text-base sm:leading-8 md:text-lg"
              >
                Desenvolvedora fullstack com experiência prática em aplicações web, APIs REST e integração entre
                front-end e back-end. Estou no segundo período da faculdade de Análise e Desenvolvimento de Sistemas
                e tenho conhecimento em Node.js, Express, React, TypeScript, Next.js, HTML, CSS e JavaScript, além
                de atuação com PostgreSQL, MySQL e controle de versão com Git. Busco meu primeiro estágio em
                desenvolvimento para aplicar essa base técnica, evoluir em projetos reais e contribuir com soluções
                bem estruturadas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.62 }}
                className="mt-8 flex flex-col gap-5 sm:mt-10"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a
                    href="#projetos"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 text-sm font-bold tracking-wide text-white shadow-[0_16px_50px_rgba(124,58,237,0.28)] transition hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#8b5cf6] hover:shadow-[0_0_0_1px_rgba(167,139,250,0.36),0_18px_52px_rgba(124,58,237,0.34),0_0_48px_rgba(124,58,237,0.42)] sm:w-auto sm:px-8"
                  >
                    Ver projetos
                  </a>
                  <a
                    href="/curriculo-amanda-reis-v10.pdf"
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7c3aed]/70 bg-[#7c3aed]/12 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-[0_14px_40px_rgba(124,58,237,0.16)] backdrop-blur transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#8b5cf6] hover:bg-[#7c3aed]/26 sm:w-auto sm:px-8"
                  >
                    Baixar currículo
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/amandar4is/" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/amanda-reis-dev/" },
                    { label: "GitHub", href: "https://github.com/AmandaReiz" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-pill inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: heroPhotoY }} className="relative flex items-center justify-center lg:justify-end">
              <motion.div style={{ y: heroGlowY }} className="absolute inset-0 mx-auto h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,90,0,0.38),transparent_58%)] blur-[72px] lg:mx-0 lg:ml-auto" />

              {heroCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.92, y: 26 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { delay: 0.48 + index * 0.08, duration: 0.4 },
                    scale: { delay: 0.48 + index * 0.08, duration: 0.4 },
                    y: {
                      delay: 0.8 + index * 0.08,
                      duration: 4.8 + index * 0.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    },
                  }}
                  className="pointer-events-none absolute hidden min-w-[168px] max-w-[190px] rounded-[1.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(20,20,20,0.88),rgba(10,10,10,0.66))] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:block"
                  style={{ left: card.x, top: card.y }}
                >
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/52">{card.label}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-white">{card.value}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute -inset-6 rounded-full border border-[#ff5a00]/30" />
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,90,0,0.42),rgba(124,58,237,0.1),rgba(255,90,0,0.42))] blur-[28px] opacity-90 transition duration-500 group-hover:opacity-100" />
                <div className="hero-ring hero-ring--one" />
                <div className="hero-ring hero-ring--two" />
                <div className="relative flex size-[min(78vw,320px)] items-center justify-center overflow-hidden rounded-full border-[2.4mm] border-[#ff5a00] bg-[radial-gradient(circle_at_50%_30%,#2a2a2a_0%,#111_46%,#050505_100%)] shadow-[0_0_45px_rgba(255,90,0,0.72),0_0_130px_rgba(255,90,0,0.26)] sm:size-[360px] lg:size-[min(38vw,470px)]">
                  <div className="absolute inset-[1px] overflow-hidden rounded-full bg-[#111]">
                    <img
                      src="/foto1.jpeg"
                      alt="Foto de Amanda Reis"
                      className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <a
              href="#projetos"
              className="scroll-hint absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-white/70 backdrop-blur transition hover:border-[#ff5a00] hover:text-[#ff8a3d] sm:inline-flex"
            >
              <span className="inline-flex items-center gap-2">
                <span className="scroll-arrow" aria-hidden="true">↓</span>
                scroll
              </span>
            </a>
          </div>
        </section>

        <motion.section
          id="projetos"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="border-b border-white/8 bg-[#080808]"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <SectionHeading
              eyebrow="Projetos"
              title="Projetos que construí recentemente"
            />

            <div className="mt-10">
              <div className="mb-8 flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                        isActive
                          ? "border-[#ff5a00] bg-[#ff5a00] text-white shadow-[0_10px_24px_rgba(255,90,0,0.18)]"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    variants={{
                      hidden: { opacity: 0, y: 36, scale: 0.98 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.46, ease: "easeOut", delay: index * 0.02 }}
                    className="project-card group relative overflow-hidden rounded-[2rem] border border-[#ff5a00]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_22px_70px_rgba(255,90,0,0.08),0_20px_60px_rgba(0,0,0,0.32)] sm:p-7"
                  >
                    <span className="project-card__glow" />
                    <span className="project-card__spark project-card__spark--one" />
                    <span className="project-card__spark project-card__spark--two" />

                    <div className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 text-lg backdrop-blur-md">
                        {project.emoji}
                      </span>
                      <img
                        src={project.imageUrl}
                        alt={`Preview do projeto ${project.title}`}
                        className="h-52 w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.08] sm:h-56"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(0,0,0,0.55)_100%)] opacity-70 transition duration-500 group-hover:opacity-90" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff8a3d]">{project.category}</p>
                    <h3 className="mt-4 text-xl font-black text-white sm:text-2xl">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">{project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/65"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/6 pt-5">
                      {project.previewUrl ? (
                        <a
                          href={project.previewUrl}
                          target={project.previewUrl.startsWith("http") ? "_blank" : undefined}
                          rel={project.previewUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#ff5a00_0%,#ff7a00_58%,#7c3aed_100%)] px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(255,90,0,0.24)]"
                        >
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>{project.previewLabel ?? "Demo"}</a>
                      ) : null}
                      {project.frontendUrl ? (
                        <a
                          href={project.frontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#ff5a00_0%,#ff7a00_58%,#7c3aed_100%)] px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(255,90,0,0.24)]"
                        >
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>{project.backendLabel ?? "Backend/API"}</a>
                      ) : null}
                      {project.backendUrl ? (
                        <a
                          href={project.backendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#ff5a00_0%,#ff7a00_58%,#7c3aed_100%)] px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(255,90,0,0.24)]"
                        >
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17 17 7" />
                            <path d="M7 7h10v10" />
                          </svg>{project.frontendLabel ?? "Frontend"}</a>
                      ) : null}
                      {project.videoUrl ? (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#ff5a00]/40 hover:bg-[#ff5a00]/10"
                        >
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Vídeo
                        </a>
                      ) : null}
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-[#ff5a00]/40 hover:bg-[#ff5a00]/10"
                      >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section id="habilidades" className="border-b border-white/8 bg-[#060606]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <SectionHeading
              eyebrow="Minhas habilidades"
              title="As stacks que mais utilizo"
            />

            <div className="mt-12 grid gap-8 xl:grid-cols-[280px_1fr]">
              <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/52">Áreas</p>
                <div className="mt-5 flex flex-wrap gap-3 xl:flex-col">
                  {skillGroups.map((group) => {
                    const isActive = activeSkillGroup === group.title;
                    return (
                      <button
                        key={group.title}
                        type="button"
                        onClick={() => setActiveSkillGroup(group.title)}
                        className={`rounded-full border px-4 py-3 text-left text-sm font-semibold transition ${
                          isActive
                            ? "border-[#ff5a00] bg-[#ff5a00] text-white shadow-[0_14px_40px_rgba(255,90,0,0.24)]"
                            : "border-white/10 bg-white/[0.03] text-white/75 hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                        }`}
                      >
                        {group.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkillData.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.26 }}
                  className="glass-panel rounded-[2rem] p-5 sm:p-7"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff8a3d]">{activeSkillData.title}</p>
                      <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">{activeSkillData.description}</h3>
                    </div>
                    <div className={`h-2 w-40 rounded-full bg-gradient-to-r ${activeSkillData.accent} shadow-[0_0_25px_rgba(255,90,0,0.22)]`} />
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {activeSkillData.items.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="rounded-[1.5rem] border border-white/10 bg-black/18 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-white">{item.label}</span>
                          <span className="text-xs font-semibold text-white/48">{item.level}%</span>
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-white/8">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${activeSkillData.accent}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ delay: 0.12 + index * 0.04, duration: 0.55 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="soft-skills" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <SectionHeading
              eyebrow="Soft skills"
              title="Competências comportamentais com leitura mais executiva"
              description="Transformei essa parte em algo mais visual, com barras e cards mais sólidos para o seu perfil."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {softSkills.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: 0.44, delay: index * 0.05 }}
                  className="glass-panel rounded-[2rem] p-5 sm:p-7"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-black text-white sm:text-2xl">{item.title}</h3>
                    <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-bold text-[#ff8a3d]">{item.score}</span>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#ff5a00_0%,#ff8a3d_56%,#7c3aed_100%)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.08 }}
                    />
                  </div>
                  <p className="mt-5 text-base leading-7 text-white/68">{item.detail}</p>
                </motion.article>
              ))}
            </div>

            <a
              href="/ProfileFeedback.pdf"
              download
              className="mt-10 inline-flex rounded-full bg-[#ff5a00] px-8 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#ff6a00]"
            >
              Baixar Relatório de Perfil Comportamental Completo (PDF)
            </a>
          </div>
        </section>

        <section id="curriculo" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-[#7c3aed]/30 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_40%),linear-gradient(180deg,#0f0f0f,#070707)] p-6 shadow-[0_30px_90px_rgba(124,58,237,0.12)] sm:p-8 lg:p-10"
            >
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#b399ff]">Currículo</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Currículo pronto para download</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                PDF focado em estágio de desenvolvimento, com projetos pessoais, formação, competências técnicas e links profissionais.
              </p>
              <a
                href="/curriculo-amanda-reis-v10.pdf"
                download
                className="mt-8 inline-flex rounded-full bg-[#7c3aed] px-8 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#8b5cf6]"
              >
                Baixar currículo
              </a>
            </motion.div>
          </div>
        </section>

        <section id="formacao" ref={formacaoRef} className="border-b border-white/8 bg-[#070707]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <SectionHeading
              eyebrow="Formação acadêmica"
              title="Minha trajetória de formação e evolução em tecnologia"
              description="Da base técnica em informática aos cursos e programas mais recentes, aqui está o caminho que vem estruturando meu perfil profissional."
            />

            <div className="relative mt-14 pl-8 sm:pl-12">
              <div className="absolute bottom-0 left-3 top-1 w-px bg-white/10 sm:left-5" />
              <motion.div className="absolute left-3 top-1 w-px origin-top bg-[linear-gradient(180deg,#ff5a00_0%,#ff8a3d_55%,#7c3aed_100%)] sm:left-5" style={{ height: "100%", scaleY: timelineScale }} />

              <div className="space-y-8">
                {formationItems.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: 26 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.24 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="relative rounded-[2rem] border border-[#ff5a00]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.32)] sm:p-7"
                  >
                    <span className="absolute left-[-2.25rem] top-8 size-4 rounded-full border-4 border-[#050505] bg-[#ff5a00] shadow-[0_0_20px_rgba(255,90,0,0.44)] sm:left-[-2.85rem]" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff8a3d]">{item.status}</p>
                        <h3 className="mt-3 text-xl font-black text-white sm:text-2xl">{item.title}</h3>
                        <p className="mt-2 text-sm font-semibold text-white/55">{item.subtitle}</p>
                        <p className="mt-2 text-sm text-white/42">{item.period}</p>
                      </div>
                      <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-bold text-[#ff8a3d]">{item.badge}</span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-white/68">{item.detail}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="bg-[#050505]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-[#ff5a00]/30 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.2),transparent_40%),linear-gradient(180deg,#0f0f0f,#070707)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10"
            >
              <SectionHeading
                eyebrow="Contato"
                title="Vamos conversar?"
                description="Estou disponível para oportunidades de estágio, projetos e conversas sobre desenvolvimento de software."
              />

              <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(2,minmax(0,1fr))_minmax(0,1.3fr)]">
                <a
                  href="https://github.com/AmandaReiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/amanda-reis-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff8a3d]"
                >
                  LinkedIn
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard?.writeText("amandareis401@gmail.com");
                    setEmailCopied(true);
                    window.setTimeout(() => setEmailCopied(false), 1600);
                  }}
                  className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-left text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff8a3d] sm:col-span-2 lg:col-span-1"
                >
                  <span>Email</span>
                  <span className="mt-2 block select-all text-sm font-medium text-white/45 group-hover:text-white/70">
                    {emailCopied ? "Copiado!" : "amandareis401@gmail.com"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-white/8 bg-[#050505] px-6 py-8 text-center text-sm text-white/45">© 2026 Amanda Reis</footer>
      </main>

      <a
        href="#home"
        className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#ff5a00] text-white shadow-[0_14px_40px_rgba(255,90,0,0.25)] transition hover:scale-105 hover:bg-[#ff6a00] sm:bottom-6 sm:right-6"
        aria-label="Voltar ao topo"
      >
        <span aria-hidden="true">↑</span>
      </a>
    </div>
  );
}



