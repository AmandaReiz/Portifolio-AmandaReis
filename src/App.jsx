import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Minhas Habilidades", href: "#habilidades" },
  { label: "Formação Acadêmica", href: "#formacao" },
  { label: "Contato", href: "#contato" },
];

const skillGroups = [
  {
    title: "Front-end",
    description: "Tecnologias para criar interfaces responsivas, modernas e bem estruturadas.",
    items: ["HTML", "CSS", "JavaScript", "React", "Angular", "Tailwind"],
  },
  {
    title: "Back-end",
    description: "Base para APIs, serviços e regras de negócio com foco em Java.",
    items: ["Java", "Spring Boot", "Spring Cloud", "Node.js", "GraphQL", "PHP", "Laravel"],
  },
  {
    title: "Frameworks & Bibliotecas",
    description: "Ferramentas que apoiam comunicação, dados, containers e persistência.",
    items: ["Kafka", "WebSockets", "Redis", "Docker", "AWS", "MySQL", "ORM"],
  },
  {
    title: "Arquitetura",
    description: "Práticas para construir sistemas escaláveis, resilientes e bem integrados.",
    items: ["Microserviços", "Sistemas orientados a eventos", "CI/CD", "Kubernetes"],
  },
  {
    title: "Conhecimentos técnicos",
    description: "Pontos que resumem minha base de desenvolvimento e arquitetura.",
    items: [
      "APIs REST",
      "Microsserviços",
      "Testes unitários",
      "Docker",
      "Design Patterns",
      "SOLID",
      "Clean Code",
      "Arquitetura de Software",
      "CI/CD",
    ],
  },
];

const projects = [
  {
    title: "HelpdeskCloud-AWS",
    category: "Full Stack",
    stack: [
      "Java",
      "Spring Boot",
      "Next.js",
      "JWT",
      "PostgreSQL",
      "Flyway",
      "Swagger",
      "JUnit",
      "Mockito",
      "GitHub Actions",
      "Docker",
    ],
    description:
      "Sistema de chamados de TI full stack com backend em Java e Spring Boot, autenticação JWT, CRUD completo de tickets, documentação com Swagger, PostgreSQL com versionamento via Flyway, testes de integração e pipeline CI/CD no GitHub Actions.",
    frontendUrl: "https://frontend-pi-seven-55.vercel.app",
    backendUrl: "https://helpdeskcloud-aws.onrender.com/swagger-ui/index.html",
    repositoryUrl: "https://github.com/AmandaReiz/HelpdeskCloud-AWS",
    imageUrl: null,
  },
  {
    title: "PulseNotify",
    category: "Spring Boot",
    stack: ["Java", "Spring Boot", "React", "WebSockets", "Redis", "Docker"],
    description:
      "Sistema de notificações em tempo real com backend em Java e Spring Boot, comunicação instantânea via WebSocket, cache de notificações recentes com Redis e frontend em React simulando um painel operacional para envio e recebimento de eventos.",
    frontendUrl: "https://frontend-pi-seven-55.vercel.app",
    backendUrl: "https://pulsenotify-sistema-de-notifica-es-em-843h.onrender.com/api/notifications/status",
    videoUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7455054272032985088/",
    repositoryUrl: "https://github.com/AmandaReiz/PulseNotify-Sistema-de-notifica-es-em-tempo-real",
    imageUrl: "/prints/PulseNotify.png",
  },
  {
    title: "Gerador de Dietas",
    category: "Spring Boot",
    stack: ["Java", "Spring Boot", "Spring Web", "OpenFeign", "HTML", "CSS", "JavaScript"],
    description:
      "Aplicação web em Spring Boot com interface em HTML, CSS e JS para gerar dietas personalizadas com base em informações corporais e planos diários.",
    previewUrl: "https://youtu.be/Xviru4PEUqU",
    repositoryUrl: "https://github.com/AmandaReiz/Gerador-de-dietas-SpringBoot",
    imageUrl: "/prints/gerador-de-dietas-print.png",
  },
  {
    title: "API de Controle de Estoque",
    category: "Node.js",
    stack: ["Node.js", "Express", "MySQL", "Swagger", "JWT", "Render"],
    description:
      "API de gerenciamento de estoque com autenticação JWT, documentação Swagger, persistência em MySQL e deploy no Render para testes em tempo real.",
    previewUrl: "https://lnkd.in/dfyStsiZ",
    repositoryUrl: "https://github.com/AmandaReiz/api-estoque",
    imageUrl: "/prints/API-controle-de-estoque.png",
  },
];

const filters = [
  "Todos",
  "Java",
  "Spring Boot",
  "Next.js",
  "PostgreSQL",
  "Flyway",
  "Spring Web",
  "OpenFeign",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "WebSockets",
  "Redis",
  "Docker",
  "Node.js",
  "Express",
  "MySQL",
  "Swagger",
  "JWT",
  "JUnit",
  "Mockito",
  "GitHub Actions",
  "Render",
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [typedRole, setTypedRole] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const roles = ["full-stack", "backend", "front end"];
    let roleIndex = 0;
    let roleText = "";
    let deleting = false;
    let timeoutId;

    const step = () => {
      const currentRole = roles[roleIndex];
      const typingDelay = deleting ? 38 : 58;

      if (!deleting) {
        if (roleText.length < currentRole.length) {
          roleText = currentRole.slice(0, roleText.length + 1);
          setTypedRole(roleText);
        } else {
          timeoutId = window.setTimeout(() => {
            deleting = true;
            step();
          }, 1000);
          return;
        }
      } else {
        if (roleText.length > 0) {
          roleText = roleText.slice(0, -1);
          setTypedRole(roleText);
        } else {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timeoutId = window.setTimeout(step, typingDelay);
    };

    step();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean)
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") return projects;
    return projects.filter((project) => project.stack.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="bg-[#050505] text-white">
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-black/75 px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-6 lg:px-8">
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

          <nav className="hidden flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-white/80 md:flex md:justify-end md:gap-7">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                const isCurriculo = item.label === "Currículo";
                return (
                  <a
                    key={item.label}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.slice(1))}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-[#ff5a00] ${
                      isCurriculo
                        ? "rounded-full bg-[#7c3aed] px-4 py-2 text-white hover:bg-[#8b5cf6] hover:text-white"
                        : isActive
                          ? "text-[#ff5a00]"
                          : ""
                    }`}
                  >
                    {isCurriculo ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 3v12" />
                          <path d="m7 10 5 5 5-5" />
                          <path d="M5 21h14" />
                        </svg>
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                    {isActive && !isCurriculo ? (
                      <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-[#ff5a00]" />
                    ) : null}
                  </a>
                );
              })}
          </nav>
        </div>

        {mobileMenuOpen ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-black/90 px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl md:hidden">
            <nav id="mobile-navigation" className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                const isCurriculo = item.label === "Currículo";
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.href.slice(1));
                      setMobileMenuOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      isCurriculo
                        ? "border-[#7c3aed] bg-[#7c3aed] text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]"
                        : isActive
                          ? "border-[#ff5a00] bg-[#ff5a00]/10 text-[#ff5a00]"
                          : "border-white/8 bg-white/5 text-white/80 hover:border-[#ff5a00] hover:text-[#ff5a00]"
                    }`}
                  >
                    {isCurriculo ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 3v12" />
                          <path d="m7 10 5 5 5-5" />
                          <path d="M5 21h14" />
                        </svg>
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="-mt-24">
        <section
          id="home"
          className="relative overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_78%_22%,rgba(255,90,0,0.34),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(255,90,0,0.95),transparent_12%),linear-gradient(180deg,#080808_0%,#050505_100%)] pt-24"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
          <div className="floating-orb orb-one" />
          <div className="floating-orb orb-two" />
          <div className="floating-orb orb-three" />
          <div className="floating-orb orb-four" />
          <div className="floating-orb orb-five" />
          <div className="floating-orb orb-six" />

          <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.38em] text-white/80">Olá!</p>
              <h1 className="text-[clamp(2.5rem,10vw,4.75rem)] font-black leading-[0.95] tracking-tight text-white">
                Sou <span className="inline-block whitespace-nowrap text-[#ff5a00]">Amanda Reis</span>
              </h1>
              <p className="mt-4 min-h-[2.6rem] text-xl font-bold text-[#ff5a00] sm:text-2xl">
                Desenvolvedora{" "}
                <span className="inline-flex min-w-[12ch] items-center text-white/90">
                  {typedRole}
                  <span className="type-caret" />
                </span>
              </p>
              <p className="mt-8 max-w-2xl text-base leading-8 text-justify text-white/72 sm:text-lg">
                Sou desenvolvedora backend Java com domínio fullstack, movida por desafios reais e pela resolução de problemas.
                Gosto de transformar necessidades complexas em soluções claras, funcionais e bem estruturadas,
                unindo lógica, criatividade e atenção aos detalhes. Tenho experiência em desenvolver APIs REST,
                estruturar backends com Java e Spring Boot, integrar sistemas em tempo real com WebSocket,
                trabalhar com Redis, Docker e bancos de dados, além de construir interfaces React conectadas a serviços robustos.
              </p>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#projetos"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-8 py-3 text-sm font-bold tracking-wide text-white shadow-[0_14px_40px_rgba(124,58,237,0.22)] transition hover:-translate-y-1 hover:scale-105 hover:bg-[#8b5cf6] hover:shadow-[0_18px_50px_rgba(124,58,237,0.34)]"
                  >
                    Ver projetos
                  </a>
                  <a
                    href="/curriculo-amanda-reis-v7.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/70 bg-[#7c3aed]/12 px-8 py-3 text-sm font-bold tracking-wide text-white shadow-[0_14px_40px_rgba(124,58,237,0.14)] backdrop-blur transition hover:-translate-y-1 hover:scale-105 hover:border-[#8b5cf6] hover:bg-[#7c3aed]/28 hover:shadow-[0_18px_50px_rgba(124,58,237,0.28)]"
                  >
                    <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                    Baixar currículo
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/amandar4is/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-12 rounded-full bg-[#ff5a00] text-white transition hover:bg-[#ff6a00] hover:scale-110"
                    title="Instagram"
                    aria-label="Abrir Instagram de Amanda Reis"
                  >
                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/amanda-reis-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-12 rounded-full bg-[#ff5a00] text-white transition hover:bg-[#ff6a00] hover:scale-110"
                    title="LinkedIn"
                    aria-label="Abrir LinkedIn de Amanda Reis"
                  >
                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.721-2.004 1.413-.103.25-.129.599-.129.948v5.444h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.646 1.199-1.566 2.922-1.566 2.135 0 3.733 1.395 3.733 4.403v5.445zM5.337 5.433c-1.144 0-1.915-.759-1.915-1.71 0-.955.771-1.71 1.958-1.71 1.187 0 1.916.754 1.94 1.71 0 .951-.753 1.71-1.983 1.71zm1.946 15.019H3.39V8.806h3.893v11.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/AmandaReiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-12 rounded-full bg-[#ff5a00] text-white transition hover:bg-[#ff6a00] hover:scale-110"
                    title="GitHub"
                    aria-label="Abrir GitHub de Amanda Reis"
                  >
                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 rounded-full bg-[#ff5a00] blur-[95px] opacity-75 transition duration-500 group-hover:opacity-95" />
                <div className="absolute -inset-4 rounded-full border border-[#ff5a00]/45" />
                <div className="relative flex size-[min(82vw,320px)] items-center justify-center overflow-hidden rounded-full border-[2mm] border-[#ff5a00] bg-[radial-gradient(circle_at_50%_30%,#2a2a2a_0%,#111_45%,#050505_100%)] shadow-[0_0_40px_rgba(255,90,0,0.95),0_0_130px_rgba(255,90,0,0.34)] sm:size-[400px] lg:size-[470px]">
                  <div className="absolute inset-[1px] overflow-hidden rounded-full bg-[#111]">
                    <img
                      src="/foto1.jpeg"
                      alt="Foto de Amanda Reis"
                      className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#sobre"
              className="scroll-hint absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-white/70 transition hover:border-[#ff5a00] hover:text-[#ff5a00] sm:bottom-8"
            >
              <span className="inline-flex items-center gap-2">
                <span className="scroll-arrow" aria-hidden="true">
                  ↓
                </span>
                scroll
              </span>
            </a>
          </div>
        </section>

        <section id="sobre" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="group rounded-[2rem] border border-[#ff5a00]/18 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_22px_70px_rgba(255,90,0,0.08),0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-[#ff5a00]/50 hover:shadow-[0_28px_90px_rgba(255,90,0,0.22),0_20px_60px_rgba(0,0,0,0.4)] lg:p-8">
              <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div className="flex justify-center lg:justify-start">
                  <div className="relative flex size-[280px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#ff5a00]/35 bg-[linear-gradient(145deg,#111,#050505)] shadow-[0_25px_80px_rgba(255,90,0,0.18)] transition group-hover:shadow-[0_25px_100px_rgba(255,90,0,0.38)] sm:size-[320px]">
                    <div className="pointer-events-none absolute inset-4 rounded-[1.6rem] border border-white/8" />
                    <div className="absolute inset-4 overflow-hidden rounded-[1.6rem]">
                      <img
                        src="/foto2.jpg"
                        alt="Retrato de Amanda Reis"
                        className="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff5a00]">Sobre mim</p>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-justify text-white/70">
                    Estou no segundo período da faculdade de Análise e Desenvolvimento de Sistemas e já tenho
                    experiência com informática, o que me deu base para lidar com ferramentas, lógica e resolução de
                    problemas no dia a dia. Busco minha primeira oportunidade de estágio para continuar aprendendo,
                    crescer na área e contribuir com solução, responsabilidade e vontade de evoluir. Nas horas vagas,
                    componho músicas no violão e adoro resolver cubos mágicos.
                  </p>
              <a
                href="#contato"
                className="mt-8 inline-flex rounded-full bg-[#ff5a00] px-8 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#ff6a00]"
              >
                Contato
              </a>
            </div>
          </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff5a00]">Projetos</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Trabalhos filtrados por tecnologia com visual limpo e sofisticado
              </h2>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
              <aside className="rounded-[2rem] border border-white/8 bg-[#0a0a0a] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/55">Filtrar stacks</p>
                <div className="mt-6 flex flex-wrap gap-3 lg:flex-col">
                  {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        aria-pressed={isActive}
                        className={`rounded-full border px-4 py-2 text-left text-sm font-semibold transition ${
                          isActive
                            ? "border-[#ff5a00] bg-[#ff5a00] text-white"
                            : "border-white/10 bg-white/2 text-white/72 hover:border-[#ff5a00] hover:text-[#ff5a00]"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project) => (
                  <article
                    key={project.title}
                    className="rounded-[2rem] border border-[#ff5a00]/18 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-7 shadow-[0_22px_70px_rgba(255,90,0,0.1),0_20px_60px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-[#ff5a00]/50 hover:shadow-[0_25px_70px_rgba(255,90,0,0.16)]"
                  >
                    <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={`Preview do projeto ${project.title}`}
                          className="h-56 w-full object-cover object-center transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-56 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,90,0,0.16),transparent_55%),linear-gradient(180deg,#101010,#070707)] text-sm font-semibold tracking-[0.25em] text-white/30">
                          PREVIEW
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff5a00]">
                      {project.category}
                    </p>
                    <h3 className="mt-4 text-2xl font-black text-white">{project.title}</h3>
                    <p className="mt-4 text-base leading-7 text-white/68">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/65"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.previewUrl ? (
                        <a
                          href={project.previewUrl}
                          target={project.previewUrl.startsWith("http") ? "_blank" : undefined}
                          rel={project.previewUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                          aria-label={`Abrir preview do projeto ${project.title}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#ff5a00] px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#ff6a00]"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1.5 12s3.75-7 10.5-7 10.5 7 10.5 7-3.75 7-10.5 7-10.5-7-10.5-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Preview
                        </a>
                      ) : null}
                      {project.frontendUrl ? (
                        <a
                          href={project.frontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir frontend do projeto ${project.title}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#ff5a00] px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#ff6a00]"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 5h16v10H4z" />
                            <path d="M8 21h8" />
                            <path d="M12 15v6" />
                          </svg>
                          Frontend
                        </a>
                      ) : null}
                      {project.backendUrl ? (
                        <a
                          href={project.backendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir API do projeto ${project.title}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#ff5a00] px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#ff6a00]"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16" />
                            <path d="M4 12h16" />
                            <path d="M4 18h16" />
                            <circle cx="8" cy="6" r="1" />
                            <circle cx="8" cy="12" r="1" />
                            <circle cx="8" cy="18" r="1" />
                          </svg>
                          Backend/API
                        </a>
                      ) : null}
                      {project.videoUrl ? (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir vídeo do projeto ${project.title}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#ff5a00] px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#ff6a00]"
                        >
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 5h16v14H4z" />
                            <path d="m10 9 5 3-5 3V9z" />
                          </svg>
                          Vídeo
                        </a>
                      ) : null}
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir repositório do projeto ${project.title}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#ff5a00] px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#ff6a00]"
                      >
                        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="habilidades" className="border-b border-white/8 bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff5a00]">Minhas habilidades</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Tecnologias que uso para criar experiências completas
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/68">
                Minhas habilidades organizadas por áreas.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="flex min-h-[280px] flex-col rounded-[2rem] border border-[#ff5a00]/18 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-[0_22px_70px_rgba(255,90,0,0.1),0_20px_60px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-[#ff5a00]/50 hover:shadow-[0_25px_70px_rgba(255,90,0,0.16)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff5a00]">{group.title}</p>
                  <p className="mt-4 text-sm leading-7 text-white/68">{group.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#ff5a00]/35 bg-[#0d0d0d] px-4 py-2 text-sm font-semibold text-white/86 transition hover:border-[#ff5a00] hover:text-[#ff5a00]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculo" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="rounded-[2rem] border border-[#7c3aed]/30 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_40%),linear-gradient(180deg,#0f0f0f,#070707)] p-10 shadow-[0_30px_90px_rgba(124,58,237,0.12)]">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#a78bfa]">
                Currículo
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Currículo pronto para download
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                PDF focado em estágio de desenvolvimento backend Java, com projetos pessoais, formação,
                competências técnicas e links profissionais.
              </p>
              <a
                href="/curriculo-amanda-reis-v7.pdf"
                download
                className="mt-8 inline-flex rounded-full bg-[#7c3aed] px-8 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#8b5cf6]"
              >
                Baixar currículo
              </a>
            </div>
          </div>
        </section>

        <section id="formacao" className="border-b border-white/8 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff5a00]">Formação acadêmica</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Minha base acadêmica e aprendizado contínuo
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Inglês avançado",
                  subtitle: "CNA",
                  status: "Idioma",
                  detail:
                    "Leitura técnica, comunicação profissional e suporte a documentação em inglês.",
                  badge: "Concluído",
                },
                {
                  title: "Análise e Desenvolvimento de Sistemas",
                  subtitle: "UNISUAM",
                  status: "2º período",
                  detail:
                    "Curso EAD focado em lógica, desenvolvimento de software e visão de sistemas.",
                  badge: "Em andamento",
                },
                {
                  title: "Informática",
                  subtitle: "Escola Técnica do Rio de Janeiro",
                  status: "Ensino médio + técnico",
                  detail:
                    "Formação técnica integrada ao ensino médio com base sólida em informática.",
                  badge: "Concluído",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-[#ff5a00]/18 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-[0_22px_70px_rgba(255,90,0,0.1),0_20px_60px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-[#ff5a00]/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff5a00]">
                        {item.status}
                      </p>
                      <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                      <p className="mt-3 text-sm font-semibold text-white/55">{item.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-bold text-[#ff5a00]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="mt-8 h-px w-full bg-white/8" />
                  <p className="mt-6 text-base leading-7 text-white/68">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="rounded-[2rem] border border-[#ff5a00]/30 bg-[radial-gradient(circle_at_top,rgba(255,90,0,0.2),transparent_40%),linear-gradient(180deg,#0f0f0f,#070707)] p-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#ff5a00]">Contato</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Vamos conversar?
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                Estou disponível para novos projetos e oportunidades. Entre em contato!
              </p>
              <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <a
                  href="https://github.com/AmandaReiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir GitHub de Amanda Reis"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff5a00]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/amanda-reis-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir LinkedIn de Amanda Reis"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff5a00]"
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
                  aria-label="Copiar email amandareis401@gmail.com"
                  className="group rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-left text-sm font-bold text-white transition hover:border-[#ff5a00] hover:text-[#ff5a00] sm:col-span-2 xl:col-span-2"
                >
                  <span>Email</span>
                  <span className="mt-2 block select-all text-sm font-medium text-white/45 group-hover:text-white/70">
                    {emailCopied ? "Copiado!" : "amandareis401@gmail.com"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/8 bg-[#050505] px-6 py-8 text-center text-sm text-white/45">
          © 2026 Amanda Reis
        </footer>
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
