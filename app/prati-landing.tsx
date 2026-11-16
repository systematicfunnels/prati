"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const navigation = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Enterprise IT", href: "#enterprise" },
  { label: "FAQ", href: "#faq" },
];

const industries = [
  {
    name: "Manufacturing",
    icon: "factory",
    title: "Keep every production line moving.",
    description:
      "Prevent assembly line bottlenecks and predict CNC and motor wear before they interrupt a shift.",
    metrics: [
      { value: "Fewer stops", label: "Catch wear before a breakdown" },
      { value: "Smoother shifts", label: "Spot bottlenecks in real time" },
      { value: "Faster response", label: "Give teams clear next steps" },
    ],
    chartLabel: "Production line health",
  },
  {
    name: "Energy & Utilities",
    icon: "bolt",
    title: "Make every unit of energy count.",
    description:
      "Monitor grid loads in real time, find energy leaks, and act on unusual consumption before costs climb.",
    metrics: [
      { value: "Live load view", label: "See demand across sites" },
      { value: "Less waste", label: "Find abnormal energy use" },
      { value: "Faster action", label: "Route alerts to the right team" },
    ],
    chartLabel: "Energy system health",
  },
  {
    name: "Cold Storage & Logistics",
    icon: "snow",
    title: "Protect every temperature-sensitive shipment.",
    description:
      "Automate temperature compliance checks and get instant compressor failure alerts to protect your inventory.",
    metrics: [
      { value: "Always in range", label: "Monitor temperatures around the clock" },
      { value: "Fewer surprises", label: "Catch compressor issues early" },
      { value: "Clear records", label: "Keep compliance data together" },
    ],
    chartLabel: "Cold chain health",
  },
];

const faqs = [
  {
    question: "Do we need to replace our existing machines or sensors?",
    answer:
      "No. Prati AI connects to your existing factory equipment and data sources, so you can get started without an expensive hardware rip-and-replace.",
  },
  {
    question: "How quickly can we see our operations in one place?",
    answer:
      "The setup is designed to connect existing machines, organize your sites and zones, and bring live operational status into one clean dashboard.",
  },
  {
    question: "How does the AI make recommendations?",
    answer:
      "Prati AI uses your live, verified machine data to flag unusual conditions and provide plain-English context your team can use to decide what to do next.",
  },
];

const enterpriseFeatures = [
  {
    icon: "network",
    title: "Plug-and-Play Ingestion",
    copy: "Native support for MQTT, Modbus bridges, REST APIs, and bulk CSVs.",
  },
  {
    icon: "layers",
    title: "Multi-Tenant Isolation",
    copy: "Complete data separation across sites, clients, and departments.",
  },
  {
    icon: "sliders",
    title: "No-Code Rule Engine",
    copy: "Set custom thresholds and automated alerts without writing scripts.",
  },
  {
    icon: "sparkles",
    title: "Verified AI Context",
    copy: "Zero hallucinations—the AI only answers using your live, verified machine data.",
  },
];

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, string> = {
    arrow: "M5 12h14m-6-6 6 6-6 6",
    check: "m5 12 4 4L19 6",
    play: "m9 6 10 6-10 6z",
    close: "M18 6 6 18M6 6l12 12",
    activity: "M3 12h4l3-8 4 16 3-8h4",
    factory: "M3 21V9l6 3V9l6 3V5h6v16H3zm5 0v-4h3v4m4 0v-4h3v4",
    bolt: "m13 2-3 9h7l-6 11 2-9H6z",
    snow: "M12 2v20M4.93 6l14.14 12M4.93 18 19.07 6M8 3l4 3 4-3m-8 18 4-3 4 3M3 8l2-2-1-4m17 14-2 2 1 4M3 16l2 2-1 4m17-14-2-2 1-4",
    network: "M12 8V4m0 16v-4m4-4h4M4 12h4m1.17-2.83 2.83-2.83m0 11.32-2.83-2.83m5.66-5.66 2.83-2.83m-2.83 8.49 2.83 2.83M12 12h.01",
    layers: "m12 3 9 5-9 5-9-5 9-5zm-9 9 9 5 9-5m-18 5 9 5 9-5",
    sliders: "M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4",
    sparkles:
      "m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zm7 11 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14z",
    shield: "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11zm-4-11 3 3 5-6",
    menu: "M4 7h16M4 12h16M4 17h16",
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name] ?? paths.activity} />
    </svg>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="Prati AI home">
      <Image
        src={footer ? "/prati-logo-white.png" : "/prati-logo.png"}
        alt="PRATI AI"
        width={420}
        height={132}
        priority={!footer}
        className="brand-image"
      />
      {!footer && <span className="brand-status" aria-label="Systems operational" />}
    </a>
  );
}

export default function PratiLanding() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [fixScheduled, setFixScheduled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const industry = industries[activeIndustry];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main id="top">
      <header className="site-header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="login-link" href="#footer">Login</a>
            <a className="button button-blue nav-cta" href="#demo">
              Book a Demo <Icon name="arrow" size={16} />
            </a>
          </div>
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}<Icon name="arrow" size={16} />
              </a>
            ))}
            <a href="#demo" onClick={() => setMobileMenuOpen(false)}>
              Book a Demo<Icon name="arrow" size={16} />
            </a>
          </nav>
        )}
      </header>

      <section className="hero-section section-wrap">
        <div className="hero-copy">
          <div className="eyebrow-pill"><span className="eyebrow-sparkle">✦</span> AI-Powered Operations Intelligence</div>
          <h1>Stop Guessing. Start Predicting. Run a <span>Downtime-Free</span> Facility.</h1>
          <p className="hero-description">
            Connect your existing factory floor to one simple dashboard. Spot machine failures before they happen, cut wasted energy, and ask plain-English questions about your plant.
          </p>
          <div className="hero-actions">
            <a className="button button-blue button-large" href="#demo">
              Book a Free Demo <Icon name="arrow" size={17} />
            </a>
            <button className="button button-quiet button-large" type="button" onClick={() => setTourOpen(true)}>
              <span className="play-icon"><Icon name="play" size={13} /></span> Watch 2-Min Tour
            </button>
          </div>
          <div className="hero-footnote">
            <span className="avatar-stack" aria-hidden="true"><i>O</i><i>F</i><i>+</i></span>
            <span>Built for the people who keep production moving.</span>
          </div>
        </div>

        <div className="dashboard-wrap" aria-label="Preview of the Prati AI operations dashboard">
          <div className="dashboard-glow" />
          <div className="dashboard">
            <div className="dashboard-topbar">
              <div className="dashboard-brand"><span className="mini-logo"><Icon name="activity" size={13} /></span> PRATI <span>OPERATIONS</span></div>
              <div className="dashboard-live"><span /> LIVE SYSTEM</div>
              <div className="dashboard-avatar">JD</div>
            </div>
            <div className="dashboard-body">
              <aside className="dashboard-sidebar" aria-hidden="true">
                <span className="sidebar-icon selected"><Icon name="layers" size={16} /></span>
                <span className="sidebar-icon"><Icon name="activity" size={16} /></span>
                <span className="sidebar-icon"><Icon name="network" size={16} /></span>
                <span className="sidebar-icon"><Icon name="sliders" size={16} /></span>
              </aside>
              <div className="dashboard-main">
                <div className="dashboard-heading">
                  <div><span className="dashboard-kicker">FACILITY OVERVIEW</span><h2>Plant A <span className="plant-select">⌄</span></h2></div>
                  <span className="today-label">Today, 9:41 AM</span>
                </div>
                <div className="efficiency-card">
                  <div className="efficiency-copy">
                    <span className="efficiency-label"><span className="health-dot" /> FACILITY HEALTH</span>
                    <strong>98.4<span>%</span></strong>
                    <span className="efficiency-sub">Operational efficiency <em>↑ 2.1%</em></span>
                  </div>
                  <div className="efficiency-chart" aria-hidden="true">
                    <div className="chart-grid"><i /><i /><i /></div>
                    <svg viewBox="0 0 260 90" preserveAspectRatio="none">
                      <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity=".25" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient></defs>
                      <path className="chart-area" d="M0 68 C16 62 20 57 34 61 S57 74 72 55 S92 54 106 48 S124 60 139 43 S161 46 174 36 S196 47 209 30 S231 35 244 21 L260 18 V90 H0Z" />
                      <path className="chart-line" d="M0 68 C16 62 20 57 34 61 S57 74 72 55 S92 54 106 48 S124 60 139 43 S161 46 174 36 S196 47 209 30 S231 35 244 21 L260 18" />
                    </svg>
                    <div className="chart-times"><span>8:00</span><span>9:00</span><span>10:00</span><span>11:00</span></div>
                  </div>
                </div>
                <div className="dashboard-stats">
                  <div><span>ACTIVE MACHINES</span><strong>142 <i>of 146</i></strong><div className="stat-progress"><i style={{ width: "97%" }} /></div></div>
                  <div><span>ENERGY TODAY</span><strong>2,840 <i>kWh</i></strong><small className="stat-positive">↓ 8% vs. last week</small></div>
                  <div><span>OPEN ALERTS</span><strong>03 <i>need attention</i></strong><small className="stat-warning">1 high priority</small></div>
                </div>
                <div className="copilot-card">
                  <div className="copilot-heading">
                    <span className="copilot-icon"><Icon name="sparkles" size={15} /></span>
                    <div><strong>Prati AI Copilot</strong><span>INSIGHT · JUST NOW</span></div>
                    <span className="alert-count">01</span>
                  </div>
                  <p><b>Warning:</b> CNC Line 2 spindle temperature rising 14% above baseline. Maintenance recommended within 4 hours to prevent unplanned stop.</p>
                  <button className={fixScheduled ? "schedule-button scheduled" : "schedule-button"} type="button" onClick={() => setFixScheduled((scheduled) => !scheduled)}>
                    {fixScheduled ? <><Icon name="check" size={14} /> Fix scheduled</> : <>Schedule Fix <Icon name="arrow" size={14} /></>}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-float"><span className="float-icon"><Icon name="activity" size={18} /></span><span><b>All systems healthy</b><small>Last checked just now</small></span><i /></div>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Business impact">
        <div className="metrics-inner">
          <div className="metric-item"><strong>30% <span>Less</span></strong><small>Unplanned Downtime</small></div>
          <div className="metric-divider" />
          <div className="metric-item"><strong>15 <span>Min</span></strong><small>Average Setup Time</small></div>
          <div className="metric-divider" />
          <div className="metric-item"><strong>24/7</strong><small>Automated AI Monitoring</small></div>
          <div className="metric-divider" />
          <div className="metric-item"><strong>Zero</strong><small>Hardware Rip-and-Replace</small></div>
        </div>
      </section>

      <section className="section-wrap why-section" id="solutions">
        <div className="section-heading centered">
          <span className="section-label"><span className="label-dot" /> THE COST OF GUESSING</span>
          <h2>Your Machines Are Talking.<br className="desktop-break" /> Are You Listening?</h2>
          <p>Move from reactive firefighting to a team that sees trouble coming and knows what to do next.</p>
        </div>
        <div className="comparison-grid">
          <article className="comparison-card old-way">
            <div className="comparison-icon"><Icon name="activity" size={21} /></div>
            <span className="card-overline">THE OLD WAY</span>
            <h3>Blind Operations</h3>
            <p>Relying on manual spreadsheets, disconnected screens, and only finding out a machine broke <em>after</em> production stops.</p>
            <div className="old-way-footer"><span className="offline-mark">×</span> Problems found too late</div>
          </article>
          <article className="comparison-card prati-way">
            <div className="comparison-icon"><Icon name="sparkles" size={21} /></div>
            <span className="card-overline">THE PRATI AI WAY</span>
            <h3>Predictive Control</h3>
            <p>Every site, zone, and machine unified in one live view, with an AI assistant flagging issues hours before failure.</p>
            <div className="prati-way-footer"><span><Icon name="check" size={13} /></span> Your team acts before downtime</div>
          </article>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-wrap">
          <div className="section-heading centered">
            <span className="section-label"><span className="label-dot" /> UP AND RUNNING, WITHOUT THE HEADACHE</span>
            <h2>From Raw Data to Smarter<br className="desktop-break" /> Decisions in 3 Steps</h2>
            <p>Make the most of the equipment and data you already have.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-top"><span className="step-number">01</span><span className="step-icon"><Icon name="network" size={21} /></span></div>
              <h3>Connect Everything.</h3>
              <p>Link your existing machines, sensors, and legacy equipment in minutes—no expensive hardware upgrades required.</p>
              <div className="step-visual connect-visual" aria-hidden="true"><span className="connect-node"><Icon name="factory" size={17} /></span><i /><i /><i /><span className="connect-node central"><Icon name="activity" size={17} /></span></div>
            </article>
            <article className="step-card">
              <div className="step-top"><span className="step-number">02</span><span className="step-icon"><Icon name="layers" size={21} /></span></div>
              <h3>See Your Whole Floor.</h3>
              <p>Organize multiple factories, zones, and individual machines into one clean, real-time digital map.</p>
              <div className="step-visual map-visual" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            </article>
            <article className="step-card">
              <div className="step-top"><span className="step-number">03</span><span className="step-icon"><Icon name="sparkles" size={21} /></span></div>
              <h3>Let AI Guide Your Team.</h3>
              <p>Get instant root-cause answers and plain-English fix recommendations the moment an anomaly appears.</p>
              <div className="step-visual ai-visual" aria-hidden="true"><span className="ai-orb"><Icon name="sparkles" size={20} /></span><i /><i /><i /></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-wrap industries-section" id="industry-use-cases">
        <div className="section-heading centered">
          <span className="section-label"><span className="label-dot" /> ONE PLATFORM. YOUR REALITY.</span>
          <h2>Built for Real-World Operations</h2>
          <p>See how Prati AI helps teams solve the challenges that matter on their floor.</p>
        </div>
        <div className="industry-panel">
          <div className="industry-tabs" role="tablist" aria-label="Choose your industry">
            {industries.map((item, index) => (
              <button
                key={item.name}
                id={`industry-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndustry === index}
                aria-controls="industry-content"
                tabIndex={activeIndustry === index ? 0 : -1}
                onClick={() => setActiveIndustry(index)}
              >
                <Icon name={item.icon} size={19} /><span>{item.name}</span><Icon name="arrow" size={16} />
              </button>
            ))}
          </div>
          <article className="industry-content" id="industry-content" role="tabpanel" aria-labelledby={`industry-tab-${activeIndustry}`}>
            <div className="industry-copy">
              <div className="industry-heading"><span className="industry-icon"><Icon name={industry.icon} size={20} /></span><span>{industry.name.toUpperCase()}</span></div>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
              <a className="text-link" href="#demo">Explore what Prati AI can do <Icon name="arrow" size={15} /></a>
            </div>
            <div className="industry-preview">
              <div className="preview-topline"><span>{industry.chartLabel}</span><span><i /> HEALTHY</span></div>
              <div className="preview-big-number">98.4% <small>+2.1%</small></div>
              <div className="preview-chart" aria-hidden="true">
                {[38, 48, 42, 57, 48, 68, 61, 77, 65, 81, 74, 92, 83, 100, 91, 112, 101, 125].map((height, index) => (
                  <i key={index} style={{ height: `${height}px` }} />
                ))}
              </div>
              <div className="preview-bottomline"><span>8:00 AM</span><span>NOW</span></div>
              <div className="industry-metrics">
                {industry.metrics.map((metric) => (
                  <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="enterprise-section" id="enterprise">
        <div className="section-wrap enterprise-inner">
          <div className="enterprise-copy">
            <span className="section-label"><span className="label-dot" /> CONFIDENCE FOR YOUR IT TEAM</span>
            <h2>Simple for Operators.<br />Built for Enterprise IT.</h2>
            <p>Keep your engineering team happy with plug-and-play connectivity and strict data isolation.</p>
            <div className="protocol-row"><span>MQTT</span><i /><span>MODBUS</span><i /><span>REST API</span><i /><span>CSV</span></div>
          </div>
          <div className="enterprise-grid">
            {enterpriseFeatures.map((feature, index) => (
              <article className="enterprise-card" key={feature.title}>
                <span className={`enterprise-icon enterprise-icon-${index}`}><Icon name={feature.icon} size={19} /></span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap faq-section" id="faq">
        <div className="faq-intro">
          <span className="section-label"><span className="label-dot" /> GOOD QUESTIONS</span>
          <h2>Clear answers.<br />Confident decisions.</h2>
          <p>Still wondering if Prati AI is right for your operation? Let’s make it simple.</p>
          <a className="text-link" href="#demo">Talk to our team <Icon name="arrow" size={15} /></a>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article className={`faq-item ${openFaq === index ? "faq-open" : ""}`} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq((current) => current === index ? null : index)}
                >
                  {item.question}<span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
                </button>
              </h3>
              {openFaq === index && <p id={`faq-answer-${index}`}>{item.answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap demo-section" id="demo">
        <div className="demo-card">
          <div className="demo-orb demo-orb-one" /><div className="demo-orb demo-orb-two" />
          <div className="demo-copy">
            <span className="demo-eyebrow"><span /> YOUR NEXT SHIFT STARTS HERE</span>
            <h2>Ready to eliminate<br />unplanned downtime?</h2>
            <p>See how Prati AI connects to your existing equipment in a personalized 15-minute walkthrough.</p>
          </div>
          <form className="demo-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success" role="status">
                <span className="success-check"><Icon name="check" size={19} /></span>
                <span><strong>You’re on the list.</strong><small>We’ll be in touch at {email} to set up your walkthrough.</small></span>
              </div>
            ) : (
              <>
                <label className="visually-hidden" htmlFor="demo-email">Work email address</label>
                <div className="demo-input-row">
                  <input
                    id="demo-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSubmitted(false);
                    }}
                    required
                  />
                  <button className="button button-white" type="submit">Get My Demo <Icon name="arrow" size={16} /></button>
                </div>
                <span className="form-note"><Icon name="shield" size={13} /> No spam. Just a smarter way to run your plant.</span>
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer" id="footer">
        <div className="section-wrap footer-main">
          <div className="footer-brand-area">
            <Brand footer />
            <p>Less downtime. Better decisions.<br />A smarter way to run your operations.</p>
          </div>
          <div className="footer-links">
            <div><strong>Explore</strong><a href="#how-it-works">How It Works</a><a href="#solutions">Solutions</a></div>
            <div><strong>Resources</strong><a href="#enterprise">Enterprise IT</a><a href="#faq">FAQ</a></div>
            <div><strong>Get started</strong><a href="#demo">Book a Demo</a><a href="#footer">Login</a></div>
          </div>
        </div>
        <div className="section-wrap footer-bottom">
          <span>© 2026 Prati AI</span>
          <div className="security-badges"><span><Icon name="shield" size={14} /> SOC2 Ready</span><span><Icon name="shield" size={14} /> End-to-End Encrypted</span></div>
          <a href="#top" className="back-top">Back to top ↑</a>
        </div>
      </footer>

      {tourOpen && (
        <div className="tour-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setTourOpen(false);
        }}>
          <section className="tour-dialog" role="dialog" aria-modal="true" aria-labelledby="tour-title">
            <button className="tour-close" type="button" aria-label="Close tour" onClick={() => setTourOpen(false)}><Icon name="close" /></button>
            <span className="section-label"><span className="label-dot" /> THE 2-MINUTE TOUR</span>
            <div className="tour-icon"><Icon name="play" size={25} /></div>
            <h2 id="tour-title">Your whole operation.<br />One clear picture.</h2>
            <p>Connect your equipment, see live machine health, and get practical recommendations before small issues become costly downtime.</p>
            <div className="tour-points"><span><Icon name="check" size={15} /> Spot issues earlier</span><span><Icon name="check" size={15} /> Make data simple</span><span><Icon name="check" size={15} /> Keep existing equipment</span></div>
            <a className="button button-blue button-large" href="#demo" onClick={() => setTourOpen(false)}>Book a Free Demo <Icon name="arrow" size={16} /></a>
          </section>
        </div>
      )}
    </main>
  );
}
