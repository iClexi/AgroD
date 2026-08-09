import Image from 'next/image'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  BellRing,
  Building2,
  CheckCircle2,
  Cloud,
  Droplets,
  Gauge,
  Leaf,
  MapPinned,
  RadioTower,
  Route,
  ShieldCheck,
  Smartphone,
  ThermometerSun,
  Wifi,
  Wrench,
} from 'lucide-react'
import { CookieSettingsButton } from '@/components/legal/cookie-consent'
import { Logo } from '@/components/agro/logo'
import { FieldSceneLoader } from './field-scene-loader'
import { LandingMotion } from './landing-motion'
import { PlanExplorer } from './plan-explorer'
import { PlatformPreview } from './platform-preview'
import { SiteHeader } from './site-header'
import { StoryRail } from './story-rail'
import styles from './landing.module.css'

const evidence = [
  { value: '11 de 12', label: 'identificaron riesgo de pérdidas por riego, plagas o clima' },
  { value: '10 de 12', label: 'reportaron monitoreo manual o semanal' },
  { value: '9 de 12', label: 'reportaron reacción tardía ante cambios climáticos' },
]

const layers = [
  {
    icon: RadioTower,
    number: '01',
    title: 'Sensores en el terreno',
    text: 'Capturan humedad, temperatura y condiciones relevantes del cultivo.',
  },
  {
    icon: Cloud,
    number: '02',
    title: 'AgroD Cloud organiza',
    text: 'Centraliza lecturas, historial, parcelas y estado de los equipos.',
  },
  {
    icon: BellRing,
    number: '03',
    title: 'Recibes una acción clara',
    text: 'Alertas simples como “Riega hoy”, “Revisa hojas” o “Cultivo estable”.',
  },
]

const customerJourney = [
  {
    icon: MapPinned,
    step: 'Diagnóstico',
    title: 'Entendemos tu finca',
    text: 'Parcelas, cultivos, conectividad y puntos que necesitan medición.',
  },
  {
    icon: Wrench,
    step: 'Instalación',
    title: 'Conectamos el sistema',
    text: 'Sensores, configuración, calibración y capacitación práctica.',
  },
  {
    icon: Activity,
    step: 'Seguimiento',
    title: 'Medimos el valor',
    text: 'Alertas atendidas, horas ahorradas, recursos y confiabilidad.',
  },
]

const members = [
  { key: 'michael', name: 'Michael David Robles Fermín', role: 'Gestión y coordinación' },
  { key: 'sussette', name: 'Sussette Denyse Botero Morán', role: 'Diseño, branding y mercadeo' },
  { key: 'luis', name: 'Luis Miguel Araujo Reynoso', role: 'IoT y mecatrónica' },
  { key: 'dionela', name: 'Dionela Salomé Pérez Mateo', role: 'Ciberseguridad y protección de datos' },
]

const teamPhotoClasses = {
  michael: styles.teamPhotoMichael,
  sussette: styles.teamPhotoSussette,
  luis: styles.teamPhotoLuis,
  dionela: styles.teamPhotoDionela,
}

export function IndexExperience() {
  return (
    <>
      <LandingMotion />
      <SiteHeader />
      <StoryRail />

      <main id="agrod-story" className={styles.story}>
        <section id="inicio" className={styles.heroScreen} aria-labelledby="hero-title" data-story-section="Inicio">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-anime-item>
                <span className={styles.liveDot} aria-hidden="true" />
                Monitoreo inteligente para cultivos dominicanos
              </p>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span data-anime-hero>Menos recorridos a ciegas.</span>
                <span className={styles.heroAccent} data-anime-hero>Más decisiones a tiempo.</span>
              </h1>
              <p className={styles.heroLead} data-anime-item>
                AgroD está diseñado para conectar sensores de campo con una plataforma sencilla que te ayuda
                a priorizar qué revisar, dónde y por qué, antes de que el daño sea visible.
              </p>
              <div className={styles.heroActions} data-anime-item>
                <a href="#plataforma" className={styles.primaryCta}>
                  Explorar una finca de ejemplo
                  <ArrowRight aria-hidden="true" />
                </a>
                <a href="#que-es" className={styles.secondaryCta}>Qué es AgroD</a>
              </div>
              <div className={styles.heroTrust} data-anime-item>
                <span><CheckCircle2 aria-hidden="true" /> Plataforma web de demostración disponible</span>
                <span><ShieldCheck aria-hidden="true" /> Datos de ejemplo identificados</span>
              </div>
            </div>

            <div className={styles.heroProduct} data-anime-visual>
              <div className={styles.heroImageWrap}>
                <Image
                  src="/images/hero-field.webp"
                  alt="Cultivo organizado con monitoreo AgroD"
                  fill
                  priority
                  sizes="(max-width: 860px) 92vw, 48vw"
                  className={styles.heroImage}
                />
                <div className={styles.heroImageShade} aria-hidden="true" />
              </div>
              <div className={styles.heroConsole}>
                <div className={styles.consoleTopline}>
                  <span>Finca demostrativa · La Vega</span>
                  <span className={styles.onlineState}><span /> Datos ilustrativos</span>
                </div>
                <div className={styles.consoleHeadline}>
                  <div>
                    <small>Prioridad de hoy</small>
                    <strong>2 zonas necesitan atención</strong>
                  </div>
                  <span className={styles.consoleAlert}><BellRing aria-hidden="true" /></span>
                </div>
                <dl className={styles.consoleMetrics}>
                  <div><dt><Droplets aria-hidden="true" /> Humedad</dt><dd>41%</dd></div>
                  <div><dt><ThermometerSun aria-hidden="true" /> Ambiente</dt><dd>29 °C</dd></div>
                  <div><dt><Wifi aria-hidden="true" /> Equipos</dt><dd>2/2</dd></div>
                </dl>
                <div className={styles.consoleRoute}>
                  <Route aria-hidden="true" />
                  <span><small>Ruta de revisión de ejemplo</small><strong>Ají Sur → Tomate Norte → Plátano Este</strong></span>
                </div>
              </div>
            </div>
          </div>
          <a className={styles.nextCue} href="#que-es" aria-label="Ir a la sección Qué es AgroD">
            <span>01</span><i aria-hidden="true" /> Qué es AgroD
          </a>
        </section>

        <section id="que-es" className={styles.lightScreen} aria-labelledby="what-title" data-story-section="Qué es">
          <div className={styles.screenInner}>
            <header className={styles.editorialHeader} data-anime-group>
              <div>
                <p className={styles.sectionLabel} data-anime-item>Qué es AgroD</p>
                <h2 id="what-title" className={styles.sectionTitle} data-anime-item>
                  No es un sensor aislado. Es una forma más clara de saber cuándo actuar.
                </h2>
              </div>
              <p className={styles.sectionLead} data-anime-item>
                AgroTech Dominicana integra hardware, software y acompañamiento para convertir datos del
                campo en decisiones que un productor pueda entender y aplicar. Está pensado inicialmente
                para pequeños y medianos productores, encargados de fincas, técnicos y cooperativas.
              </p>
            </header>

            <ol className={styles.systemFlow} data-anime-group>
              {layers.map((layer) => (
                <li key={layer.number} className={styles.systemStep} data-anime-item>
                  <span className={styles.systemNumber}>{layer.number}</span>
                  <span className={styles.systemIcon}><layer.icon aria-hidden="true" /></span>
                  <div><h3>{layer.title}</h3><p>{layer.text}</p></div>
                </li>
              ))}
              <li className={styles.flowSignal} aria-hidden="true" />
            </ol>

            <p className={styles.brandStatement} data-anime-item>
              “Cuida tus cultivos con datos, no con adivinanzas.”
            </p>
          </div>
        </section>

        <section id="problema" className={styles.navyScreen} aria-labelledby="problem-title" data-story-section="El problema">
          <div className={styles.screenInner}>
            <div className={styles.problemGrid}>
              <div data-anime-group>
                <p className={styles.sectionLabelLight} data-anime-item>Lo que identificamos en el diagnóstico</p>
                <h2 id="problem-title" className={styles.sectionTitleLight} data-anime-item>
                  El daño empieza antes de que puedas verlo.
                </h2>
                <p className={styles.sectionLeadLight} data-anime-item>
                  En el diagnóstico académico de AgroD se repitieron tres señales: supervisión manual,
                  herramientas separadas y reacción tardía.
                </p>
                <p className={styles.researchNote} data-anime-item>
                  Diagnóstico académico exploratorio: 12 respuestas de referencia; no representa al mercado nacional.
                </p>
              </div>

              <dl className={styles.evidenceList} data-anime-group>
                {evidence.map((item) => (
                  <div key={item.value} data-anime-item>
                    <dt>{item.value}</dt>
                    <dd>{item.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={styles.problemAnswer} data-anime-item>
              <span><Gauge aria-hidden="true" /></span>
              <p><strong>La respuesta de AgroD:</strong> reunir lecturas, mapa, alertas e historial para que cada recorrido tenga una prioridad.</p>
              <a href="#plataforma">Ver la respuesta en pantalla <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="ecosistema" className={styles.ecosystemScreen} aria-labelledby="ecosystem-title" data-story-section="Ecosistema">
          <div className={styles.ecosystemGrid}>
            <div className={styles.ecosystemCopy} data-anime-group>
              <p className={styles.sectionLabelLight} data-anime-item>Hardware + software + servicio</p>
              <h2 id="ecosystem-title" className={styles.sectionTitleLight} data-anime-item>
                Del sensor a la decisión, en un solo sistema.
              </h2>
              <p className={styles.sectionLeadLight} data-anime-item>
                El sensor mide. AgroD Cloud organiza. La plataforma muestra la próxima acción. El soporte
                mantiene el sistema útil en el terreno.
              </p>
              <ul className={styles.ecosystemLegend} data-anime-group>
                <li data-anime-item><span className={styles.legendGreen} /> Humedad y condiciones del suelo</li>
                <li data-anime-item><span className={styles.legendBlue} /> Conectividad y sincronización</li>
                <li data-anime-item><span className={styles.legendGold} /> Alertas y seguimiento</li>
              </ul>
              <p className={styles.prototypeNote} data-anime-item>Visualización 3D conceptual del ecosistema AgroD.</p>
            </div>
            <div className={styles.sceneStage} data-anime-visual>
              <FieldSceneLoader />
              <div className={styles.sceneLabels} aria-hidden="true">
                <span className={styles.sceneLabelOne}>Sensor de suelo</span>
                <span className={styles.sceneLabelTwo}>AgroD Cloud</span>
                <span className={styles.sceneLabelThree}>Flujo conceptual</span>
              </div>
            </div>
          </div>
        </section>

        <section id="plataforma" className={styles.platformScreen} aria-labelledby="platform-title" data-story-section="Plataforma">
          <div className={styles.screenInner}>
            <header className={styles.platformHeader} data-anime-group>
              <div>
                <p className={styles.sectionLabel} data-anime-item>La plataforma</p>
                <h2 id="platform-title" className={styles.sectionTitle} data-anime-item>Abre AgroD. Ya sabes por dónde empezar.</h2>
              </div>
              <div className={styles.platformIntro} data-anime-item>
                <p>Prueba una finca con datos ilustrativos antes de crear tu cuenta.</p>
                <Link href="/registro">Crear mi finca <ArrowRight aria-hidden="true" /></Link>
              </div>
            </header>
            <div data-anime-visual><PlatformPreview /></div>
          </div>
        </section>

        <section id="como-funciona" className={styles.journeyScreen} aria-labelledby="journey-title" data-story-section="Cómo funciona">
          <div className={styles.screenInner}>
            <header className={styles.centerHeader} data-anime-group>
              <p className={styles.sectionLabel} data-anime-item>De la visita a la primera alerta</p>
              <h2 id="journey-title" className={styles.sectionTitle} data-anime-item>Instalamos, explicamos y damos seguimiento.</h2>
              <p className={styles.sectionLeadCentered} data-anime-item>
                AgroD se plantea como una implementación consultiva: entender, instalar y medir resultados.
              </p>
            </header>
            <ol className={styles.journeyList} data-anime-group>
              {customerJourney.map((item, index) => (
                <li key={item.step} data-anime-item>
                  <span className={styles.journeyIndex}>0{index + 1}</span>
                  <span className={styles.journeyIcon}><item.icon aria-hidden="true" /></span>
                  <div><small>{item.step}</small><h3>{item.title}</h3><p>{item.text}</p></div>
                </li>
              ))}
            </ol>
            <div className={styles.customerOutcome} data-anime-item>
              <span>Resultado esperado</span>
              <strong>Menos recorridos innecesarios. Más decisiones con contexto.</strong>
            </div>
          </div>
        </section>

        <section id="planes" className={styles.plansScreen} aria-labelledby="plans-title" data-story-section="Planes">
          <div className={styles.screenInner}>
            <header className={styles.plansHeader} data-anime-group>
              <div>
                <p className={styles.sectionLabelLight} data-anime-item>Empieza con una finca. Amplía cuando lo necesites.</p>
                <h2 id="plans-title" className={styles.sectionTitleLight} data-anime-item>Hardware al inicio. Valor continuo en la plataforma.</h2>
              </div>
              <p className={styles.sectionLeadLight} data-anime-item>
                Referencias del modelo de negocio de AgroD. El precio final depende del área, la conectividad y el alcance de instalación.
              </p>
            </header>
            <div data-anime-visual><PlanExplorer /></div>
          </div>
        </section>

        <section id="empresa" className={styles.companyScreen} aria-labelledby="company-title" data-story-section="Empresa">
          <div className={styles.screenInner}>
            <div className={styles.companyGrid}>
              <div data-anime-group>
                <p className={styles.sectionLabel} data-anime-item>Cómo vamos a crecer</p>
                <h2 id="company-title" className={styles.sectionTitle} data-anime-item>
                  Empezar en el campo. Crecer con resultados.
                </h2>
                <p className={styles.sectionLead} data-anime-item>
                  El plan de AgroD comienza con pilotos accesibles en zonas agrícolas del Cibao y el Sur,
                  seguido de resultados medibles, alianzas y adopción regional.
                </p>
              </div>
              <ol className={styles.businessRoute} data-anime-group>
                <li data-anime-item><span>01</span><div><strong>Pilotos en finca</strong><small>Constanza, Jarabacoa, La Vega, Moca, San Juan, Azua, Baní y San Cristóbal.</small></div></li>
                <li data-anime-item><span>02</span><div><strong>Resultados visibles</strong><small>Uso, alertas, ahorro observado, soporte y confiabilidad.</small></div></li>
                <li data-anime-item><span>03</span><div><strong>Alianzas y expansión</strong><small>Cooperativas, técnicos de campo, ferias y referidos.</small></div></li>
              </ol>
            </div>
            <div className={styles.companyAudience} data-anime-item>
              <Building2 aria-hidden="true" />
              <span><small>A quién servimos</small><strong>Productores, encargados de fincas, técnicos y cooperativas.</strong></span>
            </div>
          </div>
        </section>

        <section id="nosotros" className={styles.teamScreen} aria-labelledby="team-title" data-story-section="Nosotros">
          <div className={styles.screenInner}>
            <header className={styles.teamHeader} data-anime-group>
              <div>
                <p className={styles.sectionLabel} data-anime-item>Quiénes somos</p>
                <h2 id="team-title" className={styles.sectionTitle} data-anime-item>Cuatro especialidades. Un propósito compartido.</h2>
              </div>
              <p className={styles.sectionLead} data-anime-item>
                Somos AgroTech Dominicana: un equipo multidisciplinario de ITLA que combina gestión, diseño, IoT y ciberseguridad
                para acercar la agricultura inteligente al productor dominicano.
              </p>
            </header>
            <ul className={styles.teamList} data-anime-group>
              {members.map((member) => (
                <li key={member.name} data-anime-item>
                  <div
                    className={styles.teamPhoto + ' ' + teamPhotoClasses[member.key as keyof typeof teamPhotoClasses]}
                    role="img"
                    aria-label={'Fotografía de ' + member.name}
                  />
                  <div><h3>{member.name}</h3><p>{member.role}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="empezar" className={styles.finalScreen} aria-labelledby="final-title" data-story-section="Empezar">
          <div className={styles.finalBackdrop} aria-hidden="true" />
          <div className={styles.finalContent} data-anime-group>
            <p className={styles.sectionLabelLight} data-anime-item>Explora AgroD con datos de ejemplo</p>
            <h2 id="final-title" data-anime-item>Monitorea con datos. Decide a tiempo.</h2>
            <p data-anime-item>
              Explora la plataforma con datos de ejemplo o crea una cuenta para organizar tus cultivos,
              dispositivos y fincas desde móvil o computadora.
            </p>
            <div className={styles.finalActions} data-anime-item>
              <Link href="/registro" className={styles.primaryCta}>Crear cuenta <ArrowRight aria-hidden="true" /></Link>
              <Link href="/iniciar-sesion" className={styles.darkSecondaryCta}>Iniciar sesión</Link>
            </div>
            <div className={styles.availability} data-anime-group>
              <div data-anime-item><Smartphone aria-hidden="true" /><span><small>Disponible ahora</small><strong>Web móvil y PC</strong></span></div>
              <div data-anime-item><Leaf aria-hidden="true" /><span><small>Próxima etapa</small><strong>Aplicaciones iOS y Android</strong></span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div><Logo /><p>Datos claros para decidir a tiempo y proteger la inversión agrícola.</p></div>
          <nav aria-label="Enlaces del pie de página">
            <div><strong>Producto</strong><a href="#que-es">Qué es AgroD</a><a href="#plataforma">Plataforma</a><a href="#planes">Planes</a></div>
            <div><strong>Empresa</strong><a href="#empresa">Nuestra ruta</a><a href="#nosotros">Quiénes somos</a><Link href="/iniciar-sesion">Iniciar sesión</Link></div>
            <div><strong>Confianza</strong><Link href="/privacidad">Privacidad</Link><Link href="/terminos">Términos</Link><CookieSettingsButton /></div>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} AgroD · AgroTech Dominicana.</span>
          <span>Proyecto del Grupo 4 · Desarrollo de Emprendedores.</span>
        </div>
      </footer>
    </>
  )
}
