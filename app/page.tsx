
"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  name: string;
  price: string;
};

type ServiceGroup = {
  title: string;
  services: Service[];
};

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  symbol: string;
  image?: string;
  groups: ServiceGroup[];
};

const WHATSAPP_NUMBER = "5531992273315";

const categories: ServiceCategory[] = [
  {
    id: "cabelos",
    name: "Cabelos",
    description: "Escovas, cortes, hidratação e coloração.",
    symbol: "✳",
    image: "/images/cabelo.jpeg",
    groups: [
      {
        title: "Escovaria",
        services: [
          { name: "Escova P", price: "R$ 50,00" },
          { name: "Escova M", price: "R$ 60,00" },
          { name: "Escova G", price: "R$ 70,00" },
          { name: "Escova GG", price: "R$ 80,00" },
          { name: "Escova XXL", price: "R$ 90,00" },
          { name: "Escova Mega Hair", price: "A partir de R$ 90,00" },
          { name: "Modelagem", price: "R$ 10,00" },
          { name: "Finalização prancha / babyliss", price: "R$ 15,00" },
          { name: "Finalização e cachos (sem escova)", price: "R$ 40,00" },
          { name: "Corte", price: "R$ 90,00" },
          { name: "Escova progressiva", price: "A partir de R$ 200,00" },
          { name: "Botox capilar", price: "A partir de R$ 200,00" },
          { name: "Lavagem com secagem", price: "R$ 40,00" },
        ],
      },
      {
        title: "Hidratação e tratamentos",
        services: [
          { name: "Tratamento com laserterapia (ozônio)", price: "R$ 150,00" },
          {
            name: "Cronograma: hidratação, nutrição e reconstrução",
            price: "R$ 40,00",
          },
          {
            name: "Cronograma: hidratação, nutrição, reconstrução e cauterização",
            price: "R$ 55,00",
          },
          { name: "Cauterização", price: "R$ 150,00" },
          { name: "Hidratação sem finalização", price: "R$ 100,00" },
        ],
      },
      {
        title: "Coloração",
        services: [
          { name: "Aplicação de tintura", price: "R$ 60,00" },
          {
            name: "Aplicação de tintura no salão",
            price: "A partir de R$ 120,00",
          },
        ],
      },
    ],
  },
  {
    id: "unhas",
    name: "Unhas",
    description: "Alongamentos, esmaltação e cuidados.",
    symbol: "✧",
    image: "/images/unha.jpg",
    groups: [
      {
        title: "Esmalteria em gel",
        services: [
          { name: "Alongamento de unhas", price: "R$ 170,00" },
          { name: "Alongamento encapsulado", price: "R$ 198,00" },
          { name: "Alongamento de unha individual (cliente)", price: "R$ 15,00" },
          {
            name: "Alongamento de unha individual (outro profissional)",
            price: "R$ 20,00",
          },
          { name: "Manutenção de alongamento", price: "R$ 120,00" },
          { name: "Manutenção encapsulada", price: "R$ 150,00" },
          { name: "Unha individual decorada", price: "R$ 4,00" },
          { name: "Banho de gel", price: "R$ 120,00" },
          { name: "Remoção de unha de gel", price: "R$ 40,00" },
          { name: "Esmaltação em gel", price: "R$ 55,00" },
          {
            name: "Esmaltação em gel com blindagem (mão)",
            price: "R$ 95,00",
          },
          { name: "Lixamento de unhas (gel ou fibra)", price: "R$ 15,00" },
          {
            name: "Esmaltação em gel com blindagem (pés)",
            price: "R$ 80,00",
          },
        ],
      },
      {
        title: "Esmalteria tradicional",
        services: [
          { name: "Unha infantil", price: "R$ 18,00" },
          { name: "Unha express (esmaltação)", price: "R$ 24,00" },
          { name: "Unha tradicional — mão", price: "R$ 38,00" },
          { name: "Unha tradicional — pé", price: "R$ 38,00" },
          { name: "Unha tradicional — pé e mão", price: "R$ 65,00" },
          { name: "Francesinha (acréscimo por par)", price: "R$ 3,00" },
          { name: "Plástica dos pés", price: "R$ 100,00" },
          { name: "SPA dos pés", price: "R$ 100,00" },
          { name: "Troca de esmalte", price: "R$ 12,00" },
          { name: "Lixamento dos pés", price: "R$ 15,00" },
        ],
      },
    ],
  },
  {
    id: "estetica",
    name: "Estética e massagens",
    description: "Tratamentos faciais e massagens.",
    symbol: "❋",
    image: "/images/massagem.jpg",
    groups: [
      {
        title: "Estética facial",
        services: [
          { name: "Limpeza de pele", price: "R$ 120,00" },
          { name: "Peeling de diamante", price: "R$ 135,00" },
        ],
      },
      {
        title: "Massagens",
        services: [
          { name: "Massagem drenagem (individual)", price: "R$ 120,00" },
          { name: "Massagem redutora", price: "R$ 120,00" },
          { name: "Massagem relaxante", price: "R$ 120,00" },
        ],
      },
    ],
  },
  {
    id: "depilacao",
    name: "Depilação",
    description: "Depilação tradicional e egípcia com linha.",
    symbol: "❀",
    image: "/images/depilacao.jpg",
    groups: [
      {
        title: "Depilação",
        services: [
          { name: "Abdômen", price: "R$ 38,00" },
          { name: "Axila", price: "R$ 33,00" },
          { name: "Bochechas", price: "R$ 27,00" },
          { name: "Braços", price: "R$ 44,00" },
          { name: "Buço", price: "R$ 16,00" },
          { name: "Linha abdominal", price: "R$ 18,00" },
          { name: "Mãos ou pés", price: "R$ 14,00" },
          { name: "Nádegas", price: "R$ 35,00" },
          { name: "Nariz", price: "R$ 16,00" },
          { name: "Orelhas", price: "R$ 16,00" },
          { name: "Pernas completas (roll-on)", price: "R$ 62,00" },
          { name: "Pernas completas (cera elástica)", price: "R$ 76,00" },
          { name: "Pernas X (roll-on)", price: "R$ 45,00" },
          { name: "Pernas X (cera elástica)", price: "R$ 53,00" },
          { name: "Coxa", price: "R$ 50,00" },
          { name: "Pescoço", price: "R$ 16,00" },
          { name: "Queixo", price: "R$ 16,00" },
          { name: "Região dorsal", price: "R$ 40,00" },
          { name: "Região lombar", price: "R$ 38,00" },
          { name: "Faixa", price: "R$ 23,00" },
          { name: "Tórax", price: "R$ 43,00" },
          { name: "Virilha completa", price: "R$ 46,00" },
          { name: "Virilha com lateral anal", price: "R$ 69,00" },
          { name: "Face completa", price: "R$ 70,00" },
        ],
      },
      {
        title: "Depilação egípcia com linha",
        services: [
          { name: "Bochechas", price: "R$ 24,00" },
          { name: "Buço", price: "R$ 15,00" },
          { name: "Pescoço", price: "R$ 18,00" },
          { name: "Queixo", price: "R$ 16,00" },
          { name: "Testa", price: "R$ 20,00" },
          { name: "Face completa", price: "R$ 63,00" },
          { name: "Faixa", price: "R$ 15,00" },
        ],
      },
    ],
  },
  {
    id: "sobrancelhas",
    name: "Sobrancelhas",
    description: "Design e realce do olhar.",
    symbol: "♡",
    image: "/images/sobrancelha.jpg",
    groups: [
      {
        title: "Sobrancelhas",
        services: [
          { name: "Design de sobrancelhas", price: "R$ 40,00" },
          { name: "Aplicação de henna / tintura", price: "R$ 22,00" },
        ],
      },
    ],
  },
  {
    id: "bronze",
    name: "Bronze",
    description: "Conheça os serviços desta categoria.",
    symbol: "☼",
    image: "/images/bronze.jpg",
    groups: [],
  },
];

const serviceCardOrder = [
  "depilacao",
  "bronze",
  "sobrancelhas",
  "unhas",
  "cabelos",
  "estetica",
];

const spaceImages = [
  "/images/space/1.jpg",
  "/images/space/2.jpeg",
  "/images/space/3.jpeg",
  "/images/space/4.jpeg",
  "/images/space/5.jpeg",
  "/images/space/6.jpeg",
];
const repeatedSpaceImages = [...spaceImages, ...spaceImages, ...spaceImages];

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(null);
  const [currentSpaceOffset, setCurrentSpaceOffset] =
    useState(spaceImages.length);
  const [spaceStep, setSpaceStep] = useState(0);
  const [spaceTrackTransition, setSpaceTrackTransition] = useState(true);
  const spaceTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setCurrentSpaceOffset((current) => current + 1);
    }, 6800);

    return () => window.clearInterval(interval);
  }, [currentSpaceOffset]);

  useEffect(() => {
    const track = spaceTrackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    const measureStep = () => {
      const card = track.querySelector<HTMLElement>(".space-story-card");
      if (!card) return;

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      setSpaceStep(card.getBoundingClientRect().width + gap);
    };

    measureStep();
    const observer = new ResizeObserver(measureStep);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentSpaceOffset !== 5 && currentSpaceOffset !== 12) return;

    const resetOffset = currentSpaceOffset === 5 ? 11 : 6;
    const timeout = window.setTimeout(() => {
      setSpaceTrackTransition(false);
      setCurrentSpaceOffset(resetOffset);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setSpaceTrackTransition(true));
      });
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [currentSpaceOffset]);

  useEffect(() => {
    if (!selectedCategory) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCategory(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCategory]);

  return (
    <main>
      <header className={`navbar ${scrolled ? "navbar-active" : ""}`}>
        <div className="navbar-inner">
          <a href="#inicio" className="logo" aria-label="Glow Up Concept">
            <img
              src="/images/glow-up-logo.png"
              alt="Glow Up Concept"
              width={1280}
              height={1280}
              fetchPriority="high"
            />
          </a>

          <nav aria-label="Navegação principal">
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#profissionais">Profissionais</a>
            <a href="#espaco">Nosso espaço</a>
          </nav>

          <a
            href={whatsappLink(
              "Olá! Conheci o site da Glow Up Concept e gostaria de mais informações."
            )}
            target="_blank"
            rel="noreferrer"
            className="header-contact"
          >
            Fale conosco
          </a>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-copy">
          <span className="eyebrow">GLOW UP CONCEPT · CABRAL</span>

          <h1>
            Seu momento
            <br />
            de <em>cuidar.</em>
          </h1>

          <p>
            Beleza, cuidado e autoestima em um espaço pensado para você.
          </p>

          <a href="#servicos" className="hero-button">
            Conheça nossos serviços <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-image">
          <div className="image-shape">
            <img
              className="hero-photo"
              src="/images/cabelo.jpeg"
              alt="Cabelo finalizado no salão Glow Up Concept"
              fetchPriority="high"
            />
          </div>

          <div className="floating-note">
            <span>✳</span>
            <p>
              Um momento
              <br />
              só seu.
            </p>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Cabral · Contagem</span>
          <a href="#sobre" className="scroll">
            Role para descobrir <i>↓</i>
          </a>
        </div>
      </section>

      <section id="sobre" className="about section">
        <div className="section-intro">
          <span className="section-label">01 — SOBRE</span>
          <h2>
            Um lugar para
            <br />
            <em>você.</em>
          </h2>
        </div>

        <div className="about-text">
          <p className="large-text">
            Um espaço dedicado à beleza, ao cuidado e à sua autoestima.
          </p>

          <p>
            Na Glow Up Concept, você encontra diferentes serviços de beleza
            em um só lugar. Conheça nossas áreas de atendimento e descubra
            os cuidados que combinam com você.
          </p>

          <a href="#servicos" className="text-link">
            Explore nossos serviços <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section id="servicos" className="services section">
        <div className="services-header">
          <div>
            <span className="section-label">02 — SERVIÇOS</span>
            <h2>
              Cuidados para
              <br />
              <em>você.</em>
            </h2>
          </div>

          <p>
            Escolha uma categoria para conhecer os serviços disponíveis
            e consultar os valores.
          </p>
        </div>

        <div className="service-grid">
          {[...categories]
            .sort(
              (a, b) =>
                serviceCardOrder.indexOf(a.id) - serviceCardOrder.indexOf(b.id)
            )
            .map((category, index) => (
              <button
                type="button"
                className="service-card"
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Ver serviços e valores: ${category.name}`}
              >
                <span
                  className={`service-art service-art-${category.id}${
                    category.image ? " service-art-with-image" : ""
                  }`}
                >
                  {category.image && (
                    <img
                      className={`service-image service-image-${category.id}`}
                      src={category.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="service-symbol" aria-hidden="true">
                    {category.symbol}
                  </span>
                  <span className="service-art-name">{category.name}</span>
                </span>

                <span className="service-info">
                  <span className="service-title">{category.name}</span>
                  <span className="service-description">
                    {category.description}
                  </span>
                </span>

                <span className="service-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
        </div>

        <p className="image-disclaimer">
          Selecione uma categoria para visualizar a lista de serviços e valores.
        </p>
      </section>

      <section id="profissionais" className="professionals section">
        <div className="professionals-title">
          <span className="section-label">03 — NOSSA EQUIPE</span>

          <h2>
            Pessoas que
            <br />
            <em>cuidam de você.</em>
          </h2>

          <p className="professionals-intro">
            Em breve, você poderá conhecer nossa equipe e a especialidade
            de cada profissional.
          </p>
        </div>

        <div className="professional-placeholder">
          <div className="professional-photo">
            <span>FOTOS EM BREVE</span>
          </div>

          <div className="professional-content">
            <span>GLOW UP CONCEPT</span>
            <h3>Nossa equipe</h3>
            <p>
              Os nomes, as fotos e as especialidades serão adicionados
              quando tivermos as informações.
            </p>
          </div>
        </div>
      </section>

      <section id="espaco" className="space section">
        <div className="space-heading">
          <span className="section-label">04 — NOSSO ESPAÇO</span>

          <h2>
            Feito para você
            <br />
            <em>se sentir bem.</em>
          </h2>
        </div>

        <div
          className="space-image"
          role="region"
          aria-label="Fotos do espaço Glow Up Concept"
          aria-roledescription="carrossel"
        >
          <div
            ref={spaceTrackRef}
            className={`space-track${
              spaceTrackTransition ? "" : " space-track-no-transition"
            }`}
            style={{
              transform: `translate3d(-${currentSpaceOffset * spaceStep}px, 0, 0)`,
            }}
          >
            {repeatedSpaceImages.map((src, index) => {
              const photoNumber = (index % spaceImages.length) + 1;
              const isRepeatedCopy =
                index < spaceImages.length || index >= spaceImages.length * 2;

              return (
                <figure
                  key={`${src}-${index}`}
                  className="space-story-card"
                  aria-hidden={isRepeatedCopy}
                >
                  <img
                    src={src}
                    alt={
                      isRepeatedCopy
                        ? ""
                        : `Espaço Glow Up Concept — foto ${photoNumber} de ${spaceImages.length}`
                    }
                  />
                </figure>
              );
            })}
          </div>

          <button
            type="button"
            className="space-control space-control-previous"
            onClick={() => setCurrentSpaceOffset((current) => current - 1)}
            disabled={currentSpaceOffset === 5 || currentSpaceOffset === 12}
            aria-label="Foto anterior"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="space-control space-control-next"
            onClick={() => setCurrentSpaceOffset((current) => current + 1)}
            disabled={currentSpaceOffset === 5 || currentSpaceOffset === 12}
            aria-label="Próxima foto"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>

      <section id="contato" className="contact">
        <span className="section-label">GLOW UP CONCEPT</span>

        <h2>
          Seu próximo
          <br />
          momento começa <em>aqui.</em>
        </h2>

        <p>
          Estamos em Cabral, Contagem. Entre em contato para saber mais.
        </p>

        <a
          href={whatsappLink(
            "Olá! Conheci o site da Glow Up Concept e gostaria de informações sobre os serviços."
          )}
          target="_blank"
          rel="noreferrer"
          className="contact-button"
        >
          Fale com a Glow Up <span aria-hidden="true">↗</span>
        </a>

        <div className="contact-footer">
          <span>Cabral · Contagem</span>

          <a
            href={whatsappLink(
              "Olá! Gostaria de mais informações sobre a Glow Up Concept."
            )}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {selectedCategory && (
        <div
          className="service-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCategory(null);
            }
          }}
        >
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <div className="service-modal-header">
              <div>
                <span className="section-label">
                  GLOW UP CONCEPT · SERVIÇOS
                </span>
                <h2 id="service-modal-title">{selectedCategory.name}</h2>
                <p>{selectedCategory.description}</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedCategory(null)}
                aria-label="Fechar lista de serviços"
              >
                ×
              </button>
            </div>

            <div className="service-modal-content">
              {selectedCategory.groups.length > 0 ? (
                selectedCategory.groups.map((group) => (
                  <div className="price-group" key={group.title}>
                    <h3>{group.title}</h3>

                    <div className="price-list">
                      {group.services.map((service) => (
                        <div className="price-row" key={service.name}>
                          <span>{service.name}</span>
                          <span className="price-value">{service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-prices">
                  <span aria-hidden="true">✧</span>
                  <h3>Informações em breve</h3>
                  <p>
                    Os serviços e valores desta categoria ainda não constam
                    na tabela disponível. Fale com a Glow Up para consultar
                    as opções.
                  </p>
                </div>
              )}
            </div>

            <div className="service-modal-footer">
              <p>
                Confirme os valores e a disponibilidade diretamente com
                a equipe.
              </p>

              <a
                href={whatsappLink(
                  `Olá! Gostaria de informações sobre os serviços de ${selectedCategory.name} da Glow Up Concept.`
                )}
                target="_blank"
                rel="noreferrer"
                className="modal-contact"
              >
                Consultar pelo WhatsApp ↗
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
