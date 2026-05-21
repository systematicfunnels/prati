"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Industries", href: "#industries" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#architecture" },
  { label: "Brief Builder", href: "#brief-builder" },
];

const industryProfiles = [
  {
    name: "Manufacturing units",
    summary:
      "Digital twins for production lines, machine cells, utilities, and quality workflows with strong predictive maintenance coverage.",
    starterPack: ["Asset schema pack", "MQTT connector", "Downtime anomaly pack", "Role-based operator dashboard"],
    telemetry: ["Machine telemetry", "PLC events", "Energy consumption", "Quality logs"],
    outcomes: ["Reduce unplanned downtime", "Surface maintenance risk", "Align operations and engineering"],
  },
  {
    name: "Underground labs",
    summary:
      "Environment models for controlled research spaces where air quality, access events, compliance trails, and equipment state need one live view.",
    starterPack: ["Zone schema pack", "Air-quality rules", "Lab safety dashboard", "Incident alert workflows"],
    telemetry: ["Air quality sensors", "Access control events", "Environmental alarms", "Experiment equipment logs"],
    outcomes: ["Continuous lab safety visibility", "Faster compliance response", "Unified incident context"],
  },
  {
    name: "Analog habitats",
    summary:
      "A generalized monitoring layer for remote habitats and experimental facilities with modular environment schemas and low-bandwidth updates.",
    starterPack: ["Habitat schema pack", "Offline sync profile", "Crew dashboard", "Life-support alert rules"],
    telemetry: ["Life-support telemetry", "Power state", "Habitat logs", "Environmental drift signals"],
    outcomes: ["Shared situational awareness", "Better crew response timing", "Configurable habitat modeling"],
  },
  {
    name: "Drone operations",
    summary:
      "Operational twins for fleets, payload health, mission states, telemetry streams, and ground-control views across autonomous programs.",
    starterPack: ["Fleet schema pack", "Mission widget pack", "Battery health model", "Flight event pipeline"],
    telemetry: ["Flight telemetry", "Battery health", "Mission status", "Video and event streams"],
    outcomes: ["Fleet-wide mission visibility", "Early battery risk detection", "Cleaner operator handoffs"],
  },
  {
    name: "Industrial infrastructure",
    summary:
      "Twin models for distributed sites, utility systems, maintenance events, and sitewide risk visibility across complex infrastructure networks.",
    starterPack: ["Site template pack", "Infrastructure widgets", "Failure forecasting", "Alert escalation rules"],
    telemetry: ["Distributed site sensors", "Inspection logs", "Alarm states", "Operational events"],
    outcomes: ["Cross-site operational visibility", "Improved forecasting", "Better escalation control"],
  },
  {
    name: "Smart facilities",
    summary:
      "Digital twin layers for buildings, occupancy, HVAC, energy, access, and service operations without forcing one hardcoded operating model.",
    starterPack: ["Facility schema pack", "Energy dashboard", "Occupancy rules", "Service request alerts"],
    telemetry: ["HVAC telemetry", "Occupancy data", "Access logs", "Energy systems"],
    outcomes: ["Lower operational waste", "Live facility awareness", "Clearer service prioritization"],
  },
] as const;

const coreCapabilities = [
  {
    id: "twin",
    title: "Digital Twin Engine",
    summary: "Represents assets, zones, and environments with real-time synchronization to telemetry.",
    points: ["Represents assets, zones, and environments", "Real-time synchronization with telemetry"],
    stack: ["Configurable asset schemas", "Zone templates", "Environment relationships", "Twin state graph"],
  },
  {
    id: "data",
    title: "Real-Time Data System",
    summary: "MQTT-based ingestion for telemetry, logs, and operational events across distributed sites.",
    points: ["MQTT-based ingestion", "Handles telemetry, logs, and events"],
    stack: ["Topic mapping", "Ingestion APIs", "Event normalization", "Stream processing hooks"],
  },
  {
    id: "dashboard",
    title: "Dashboard System",
    summary: "Dark, glassmorphism-inspired interfaces with modular widgets and role-based views.",
    points: ["Modern UI (dark, glassmorphism-inspired)", "Modular widgets", "Role-based views"],
    stack: ["Operator views", "Executive views", "Widget library", "Alert-focused layouts"],
  },
  {
    id: "ai",
    title: "AI/ML Layer",
    summary: "Predictive models, anomaly detection, forecasting, CV support, and a path toward LLM copilots.",
    points: [
      "Predictive models",
      "Anomaly detection",
      "Forecasting",
      "CV model support (OpenCV, CNN)",
      "Future: LLM copilots and agents",
    ],
    stack: ["Model runtime system", "Anomaly pipelines", "Forecast services", "Computer vision adapters"],
  },
  {
    id: "plugins",
    title: "Plugin Architecture",
    summary: "A plugin-first runtime that supports connectors, widgets, AI models, CV pipelines, and alert packs.",
    points: [
      "Supports data connectors",
      "Supports visualization widgets",
      "Supports AI/ML models",
      "Supports CV pipelines",
      "Supports rules/alert packs",
      "Supports industry packs",
    ],
    stack: ["Connector plugins", "Visualization widgets", "Model plugins", "Rules and alert packs"],
  },
  {
    id: "packs",
    title: "Industry Packs",
    summary: "Reusable packs that help the same platform fit very different industries without changing the core.",
    points: ["Reusable templates for industries"],
    stack: ["Schema presets", "Dashboard defaults", "Rules bundles", "Operational templates"],
  },
] as const;

const architectureLayers = [
  {
    id: "schemas",
    title: "Schemas",
    description:
      "Schemas define how assets, zones, environments, telemetry entities, and relationships are modeled for each deployment.",
    items: ["Asset definitions", "Zone and environment modeling", "Telemetry field mapping", "Relationship graph"],
  },
  {
    id: "templates",
    title: "Templates",
    description:
      "Templates package repeatable layouts, role views, workflows, and operational conventions for faster onboarding.",
    items: ["Industry onboarding templates", "Dashboard presets", "Alert workflows", "Role-specific default views"],
  },
  {
    id: "plugins",
    title: "Plugins",
    description:
      "Plugins extend the platform with connectors, visualization widgets, AI models, CV pipelines, and alert packs.",
    items: ["Data connectors", "Visualization widgets", "AI/ML model modules", "Rules and alert packs"],
  },
  {
    id: "apis",
    title: "APIs",
    description:
      "APIs keep the product open to external systems, enabling data ingestion, integration, and controlled extension.",
    items: ["Telemetry ingestion APIs", "Configuration APIs", "External system integration", "Operational automations"],
  },
] as const;

const targetUsers = [
  "Industrial operators",
  "Lab engineers",
  "Facility managers",
  "Robotics/drone operators",
  "R&D environments",
];

const differentiation = [
  "Plugin-first architecture",
  "Multimodal data (sensor + video + logs)",
  "Model runtime system",
  "Configurable across industries",
  "Future-ready for agentic AI",
];

const nonGoals = [
  "No full enterprise billing",
  "No complex 3D engines",
  "No overbuilt LLM features",
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PRATI AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A modular, AI-native digital twin SaaS platform for manufacturing units, underground labs, analog habitats, drone operations, industrial infrastructure, and smart facilities.",
  audience: targetUsers.map((user) => ({
    "@type": "Audience",
    audienceType: user,
  })),
  featureList: [
    "Digital twin engine",
    "Real-time MQTT-based telemetry ingestion",
    "Modular dashboard widgets",
    "Role-based views",
    "Predictive models",
    "Anomaly detection",
    "Forecasting",
    "Plugin architecture",
    "Industry packs",
  ],
};

type FormState = {
  name: string;
  email: string;
  company: string;
  environment: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function SectionShell({
  id,
  eyebrow,
  title,
  copy,
  children,
  dark = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 w-full px-5 py-16 sm:px-8 lg:px-12 lg:py-24 ${dark ? "bg-[#0b1020] text-white" : "bg-transparent text-[#141414]"}`}
    >
      <div className="mx-auto max-w-[1520px]">
        <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className={`text-[11px] uppercase tracking-[0.28em] ${dark ? "text-cyan-200/70" : "text-black/40"}`}>
              {eyebrow}
            </div>
            <h2
              className={`mt-4 max-w-[760px] text-[2.45rem] font-medium leading-[0.96] tracking-[-0.06em] sm:text-[3.8rem] lg:text-[4.8rem] ${dark ? "text-white" : "text-[#171717]"}`}
            >
              {title}
            </h2>
          </div>
          <p
            className={`max-w-[560px] justify-self-end text-[15px] leading-7 ${dark ? "text-white/68" : "text-black/60"}`}
          >
            {copy}
          </p>
        </motion.div>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function HeroOrb() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,#07122f_0%,#0c204e_42%,#081229_100%)] p-6 shadow-[0_30px_120px_rgba(4,12,32,0.35)] sm:h-[520px] lg:h-[640px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(84,131,255,0.28),transparent_22%),radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.1),transparent_12%),radial-gradient(circle_at_84%_72%,rgba(34,211,238,0.12),transparent_16%)]" />
      <div className="absolute inset-8 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#b4d5ff_0%,#3f72ff_32%,#152c6f_70%,#07122f_100%)] shadow-[0_0_90px_rgba(71,117,255,0.38)] sm:h-56 sm:w-56 lg:h-72 lg:w-72" />

      {[0, 1, 2, 3, 4, 5].map((item) => (
        <motion.div
          key={item}
          className="absolute left-1/2 top-1/2 h-[16%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(205,213,226,0.88))] shadow-[0_14px_40px_rgba(3,9,25,0.32)]"
          style={{ transform: `translate(-50%, -50%) rotate(${item * 30}deg) scale(${1 - item * 0.05})` }}
          animate={{ rotate: item * 30 + 360 }}
          transition={{ duration: 30 + item * 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-[18%] rounded-[999px] border border-[#afbbd8] bg-[radial-gradient(circle_at_38%_50%,#0f172f_0%,#0f172f_18%,transparent_19%),radial-gradient(circle_at_72%_52%,#0f172f_0%,#0f172f_10%,transparent_11%)] opacity-80" />
        </motion.div>
      ))}

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Generalized platform", "Core system remains unchanged"],
          ["Multimodal input", "Sensor + video + logs"],
          ["Future-ready AI", "LLM copilots and agents"],
        ].map(([title, text]) => (
          <div key={title} className="rounded-[18px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-100/55">{title}</div>
            <div className="mt-2 text-sm text-white/82">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PratiLandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string>(industryProfiles[0].name);
  const [activeCapability, setActiveCapability] = useState<string>(coreCapabilities[0].id);
  const [activeArchitecture, setActiveArchitecture] = useState<string>(architectureLayers[0].id);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    environment: industryProfiles[0].name,
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedIndustry = useMemo(
    () => industryProfiles.find((industry) => industry.name === activeIndustry) ?? industryProfiles[0],
    [activeIndustry],
  );

  const selectedCapability = useMemo(
    () => coreCapabilities.find((capability) => capability.id === activeCapability) ?? coreCapabilities[0],
    [activeCapability],
  );

  const selectedArchitecture = useMemo(
    () => architectureLayers.find((layer) => layer.id === activeArchitecture) ?? architectureLayers[0],
    [activeArchitecture],
  );

  const recommendation = useMemo(() => {
    const environment = industryProfiles.find((industry) => industry.name === formState.environment) ?? industryProfiles[0];
    return {
      stack: [
        environment.starterPack[0],
        "Real-time telemetry ingestion",
        selectedCapability.title,
        selectedArchitecture.title,
      ],
      note:
        environment.name === "Drone operations"
          ? "Prioritize mission telemetry, event streams, and battery risk alerts."
          : environment.name === "Underground labs"
            ? "Prioritize environmental safety, access events, and compliance visibility."
            : "Prioritize configurable schemas, telemetry flows, and role-based operational views.",
    };
  }, [formState.environment, selectedCapability.title, selectedArchitecture.title]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`PRATI AI demo request - ${formState.company || "New inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\nEnvironment: ${formState.environment}\n\nRequested stack:\n- ${recommendation.stack.join("\n- ")}\n\nNotes:\n${formState.notes || "No extra notes"}`,
    );
    return `mailto:hello@prati.ai?subject=${subject}&body=${body}`;
  }, [formState, recommendation.stack]);

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) nextErrors.name = "Name is required.";
    if (!formState.company.trim()) nextErrors.company = "Company is required.";
    if (!formState.environment.trim()) nextErrors.environment = "Environment is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) nextErrors.email = "Enter a valid email.";

    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm();
    setFormErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  function handleChange(field: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#141414]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className="sticky top-0 z-30 border-b border-black/6 bg-[#f5f5f2]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="text-[1.22rem] font-medium tracking-[-0.05em] text-[#121212]">
            PRATI AI
          </a>

          <nav className="hidden items-center gap-8 text-[12px] text-black/65 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-black">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#brief-builder"
              className="hidden rounded-full border border-black/70 bg-[#171717] px-5 py-2 text-[12px] font-medium text-white transition hover:bg-black sm:inline-flex"
            >
              Build Brief
            </a>

            <button
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              className="inline-flex rounded-full border border-black/12 bg-white px-4 py-2 text-[12px] font-medium text-black md:hidden"
              onClick={() => setMobileNavOpen((current) => !current)}
            >
              {mobileNavOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <div id="mobile-nav" className="border-t border-black/6 bg-white px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-[1520px] flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl border border-black/8 px-4 py-3 text-sm text-black/75"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section id="top" className="w-full px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-14">
        <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="flex flex-col justify-between">
            <motion.div {...fadeUp}>
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/42">
                Modular, AI-native digital twin SaaS platform
              </div>
              <h1 className="mt-6 max-w-[760px] text-[3rem] font-medium leading-[0.92] tracking-[-0.08em] text-[#141414] sm:text-[4.9rem] lg:text-[7.25rem]">
                AI-native digital twins for complex physical environments.
              </h1>
              <p className="mt-8 max-w-[620px] text-[16px] leading-7 text-black/66 sm:text-[17px]">
                PRATI AI is a modular digital twin platform built for manufacturing units, underground labs, analog
                habitats, drone operations, industrial infrastructure, and smart facilities.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.06 }} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#overview"
                className="inline-flex items-center rounded-full border border-black/80 bg-[#1b1b1b] px-6 py-3 text-[13px] font-medium text-white transition hover:bg-black"
              >
                Read Product Brief
              </a>
              <a
                href="#brief-builder"
                className="inline-flex items-center rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-medium text-black transition hover:border-black/30"
              >
                Build Demo Brief
              </a>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                "Configurable through schemas, templates, plugins, and APIs",
                "Built for real-time telemetry, logs, events, and future AI agents",
                "Designed as a generalized product, not a single-use system",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-black/8 bg-white p-5 text-[14px] leading-6 text-black/68 shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.08 }}>
            <HeroOrb />
          </motion.div>
        </div>
      </section>

      <SectionShell
        id="overview"
        eyebrow="Vision"
        title="A generalized platform where each client configures the environment while the core system remains unchanged."
        copy="This is not a single-use system. The product brief is centered on configurability, modularity, and cross-industry reuse rather than hardcoded workflows."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Vision",
              copy:
                "We are building a modular, AI-native digital twin SaaS platform for complex physical environments.",
              dark: false,
            },
            {
              title: "Core Idea",
              copy:
                "Each client configures their environment using templates, plugins, and schemas while the core system remains unchanged.",
              dark: false,
            },
            {
              title: "Key Principle",
              copy:
                "The product must be configurable for new industries primarily through schemas, templates, plugins, and APIs, not through hardcoded logic.",
              dark: true,
            },
          ].map((card, index) => (
            <motion.article
              key={card.title}
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className={`rounded-[28px] border p-7 shadow-[0_18px_60px_rgba(0,0,0,0.04)] ${card.dark ? "border-black/8 bg-[#11131c] text-white shadow-[0_18px_60px_rgba(0,0,0,0.12)]" : "border-black/8 bg-white text-[#181818]"}`}
            >
              <h3 className="text-[1.7rem] font-medium tracking-[-0.05em]">{card.title}</h3>
              <p className={`mt-4 text-[15px] leading-7 ${card.dark ? "text-white/72" : "text-black/64"}`}>{card.copy}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="industries"
        eyebrow="Industries"
        title="Interactive industry packs make the same platform useful across very different environments."
        copy="This section now behaves like a lightweight configurator. Pick an industry to inspect the twin scope, primary telemetry, recommended starter pack, and outcomes."
      >
        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div {...fadeUp} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {industryProfiles.map((industry) => (
              <button
                key={industry.name}
                type="button"
                aria-pressed={activeIndustry === industry.name}
                onClick={() => setActiveIndustry(industry.name)}
                className={`rounded-[24px] border p-5 text-left transition ${
                  activeIndustry === industry.name
                    ? "border-black bg-[#141414] text-white shadow-[0_20px_70px_rgba(0,0,0,0.12)]"
                    : "border-black/8 bg-white text-[#171717] hover:border-black/20"
                }`}
              >
                <div className="text-[11px] uppercase tracking-[0.22em] opacity-55">Environment</div>
                <div className="mt-3 text-[1.5rem] font-medium leading-[1.02] tracking-[-0.05em]">{industry.name}</div>
              </button>
            ))}
          </motion.div>

          <motion.div
            key={selectedIndustry.name}
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8"
          >
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-black/38">Selected industry</div>
                <h3 className="mt-4 text-[2.2rem] font-medium leading-[0.98] tracking-[-0.05em] text-[#171717]">
                  {selectedIndustry.name}
                </h3>
                <p className="mt-5 text-[15px] leading-7 text-black/64">{selectedIndustry.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-[#f0f2ee] p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/40">Primary telemetry</div>
                  <ul className="mt-4 space-y-2 text-[14px] leading-6 text-black/68">
                    {selectedIndustry.telemetry.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] bg-[#f0f2ee] p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-black/40">Starter pack</div>
                  <ul className="mt-4 space-y-2 text-[14px] leading-6 text-black/68">
                    {selectedIndustry.starterPack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] bg-[#11131c] p-5 text-white sm:col-span-2">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">Operational outcomes</div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                    {selectedIndustry.outcomes.map((item) => (
                      <li key={item} className="rounded-[18px] border border-white/10 bg-white/6 p-4 text-[14px] leading-6 text-white/76">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>

      <SectionShell
        id="capabilities"
        eyebrow="Core Capabilities"
        title="The page now lets visitors inspect the platform layer by layer instead of reading one long static block."
        copy="Select a capability to see the summary, required building blocks, and the kind of system surface it unlocks."
        dark
      >
        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div {...fadeUp} className="grid gap-3">
            {coreCapabilities.map((capability) => (
              <button
                key={capability.id}
                type="button"
                aria-pressed={activeCapability === capability.id}
                onClick={() => setActiveCapability(capability.id)}
                className={`rounded-[24px] border p-5 text-left transition ${
                  activeCapability === capability.id
                    ? "border-cyan-300/40 bg-white/12 text-white"
                    : "border-white/10 bg-white/5 text-white/82 hover:bg-white/8"
                }`}
              >
                <div className="text-[1.35rem] font-medium tracking-[-0.04em]">{capability.title}</div>
                <div className="mt-3 text-[14px] leading-6 text-white/60">{capability.summary}</div>
              </button>
            ))}
          </motion.div>

          <motion.article
            key={selectedCapability.id}
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-white/10 bg-white/8 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">Selected capability</div>
            <h3 className="mt-4 text-[2.35rem] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              {selectedCapability.title}
            </h3>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-white/68">{selectedCapability.summary}</p>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_1fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#0a142d] p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/60">What it includes</div>
                <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/72">
                  {selectedCapability.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0a142d] p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/60">Platform stack</div>
                <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/72">
                  {selectedCapability.stack.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        </div>
      </SectionShell>

      <SectionShell
        id="architecture"
        eyebrow="Architecture"
        title="Schemas, templates, plugins, and APIs are now explained through an interactive architecture explorer."
        copy="This closes a major gap in the page: the product brief talked about configurability, but the UI did not previously help a visitor understand what each extension layer actually does."
      >
        <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.div {...fadeUp} className="flex flex-col gap-3">
            {architectureLayers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                aria-pressed={activeArchitecture === layer.id}
                onClick={() => setActiveArchitecture(layer.id)}
                className={`rounded-[24px] border p-5 text-left transition ${
                  activeArchitecture === layer.id
                    ? "border-black bg-[#131313] text-white shadow-[0_20px_70px_rgba(0,0,0,0.12)]"
                    : "border-black/8 bg-white text-[#171717] hover:border-black/20"
                }`}
              >
                <div className="text-[1.35rem] font-medium tracking-[-0.04em]">{layer.title}</div>
                <div className={`mt-3 text-[14px] leading-6 ${activeArchitecture === layer.id ? "text-white/65" : "text-black/58"}`}>
                  {layer.description}
                </div>
              </button>
            ))}
          </motion.div>

          <motion.article
            key={selectedArchitecture.id}
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="rounded-[30px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-[0.24em] text-black/38">Selected architecture layer</div>
            <h3 className="mt-4 text-[2.3rem] font-medium leading-[0.98] tracking-[-0.05em] text-[#171717]">
              {selectedArchitecture.title}
            </h3>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-black/64">{selectedArchitecture.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedArchitecture.items.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-black/8 bg-[#f1f2ef] p-5 text-[14px] font-medium leading-6 text-[#1b1b1b]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </SectionShell>

      <section id="brief-builder" className="scroll-mt-24 w-full bg-[#eef0eb] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1520px]">
          <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-black/40">Interactive brief builder</div>
              <h2 className="mt-4 max-w-[760px] text-[2.45rem] font-medium leading-[0.96] tracking-[-0.06em] text-[#171717] sm:text-[3.8rem] lg:text-[4.8rem]">
                A functional demo request flow instead of dead CTA buttons.
              </h2>
            </div>
            <p className="max-w-[560px] justify-self-end text-[15px] leading-7 text-black/60">
              Fill this out and the page will validate the input, generate a recommended starter stack, and prepare an
              email draft for the PRATI AI team.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
            <motion.form
              {...fadeUp}
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[12px] font-medium text-black/60" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    value={formState.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    className="mt-2 w-full rounded-[18px] border border-black/10 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-black/35"
                    placeholder="Your name"
                  />
                  {formErrors.name ? <div className="mt-2 text-sm text-red-600">{formErrors.name}</div> : null}
                </div>

                <div>
                  <label className="text-[12px] font-medium text-black/60" htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className="mt-2 w-full rounded-[18px] border border-black/10 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-black/35"
                    placeholder="name@company.com"
                  />
                  {formErrors.email ? <div className="mt-2 text-sm text-red-600">{formErrors.email}</div> : null}
                </div>

                <div>
                  <label className="text-[12px] font-medium text-black/60" htmlFor="company">
                    Company
                  </label>
                  <input
                    id="company"
                    value={formState.company}
                    onChange={(event) => handleChange("company", event.target.value)}
                    className="mt-2 w-full rounded-[18px] border border-black/10 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-black/35"
                    placeholder="Company"
                  />
                  {formErrors.company ? <div className="mt-2 text-sm text-red-600">{formErrors.company}</div> : null}
                </div>

                <div>
                  <label className="text-[12px] font-medium text-black/60" htmlFor="environment">
                    Environment
                  </label>
                  <select
                    id="environment"
                    value={formState.environment}
                    onChange={(event) => handleChange("environment", event.target.value)}
                    className="mt-2 w-full rounded-[18px] border border-black/10 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-black/35"
                  >
                    {industryProfiles.map((industry) => (
                      <option key={industry.name} value={industry.name}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.environment ? <div className="mt-2 text-sm text-red-600">{formErrors.environment}</div> : null}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-[12px] font-medium text-black/60" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={formState.notes}
                  onChange={(event) => handleChange("notes", event.target.value)}
                  className="mt-2 min-h-[140px] w-full rounded-[18px] border border-black/10 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-black/35"
                  placeholder="Describe your environment, telemetry sources, and what you want from the platform."
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full border border-black/80 bg-[#171717] px-6 py-3 text-[13px] font-medium text-white transition hover:bg-black"
                >
                  Generate brief
                </button>
                {submitted ? (
                  <a
                    href={mailtoHref}
                    className="rounded-full border border-black/12 bg-white px-6 py-3 text-[13px] font-medium text-black transition hover:border-black/30"
                  >
                    Open email draft
                  </a>
                ) : null}
              </div>
            </motion.form>

            <motion.aside
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="rounded-[30px] border border-black/8 bg-[#10131d] p-6 text-white shadow-[0_18px_60px_rgba(0,0,0,0.12)] sm:p-8"
            >
              <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">Recommended stack</div>
              <h3 className="mt-4 text-[2rem] font-medium leading-[0.98] tracking-[-0.05em]">
                {formState.environment}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-white/68">{recommendation.note}</p>

              <ul className="mt-6 space-y-3">
                {recommendation.stack.map((item) => (
                  <li key={item} className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-[14px] text-white/78">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[22px] border border-white/10 bg-white/6 p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/60">Status</div>
                <div className="mt-3 text-[15px] leading-7 text-white/74">
                  {submitted
                    ? "Brief is valid. You can now open a prefilled email draft to continue the conversation."
                    : "Complete the form to validate the request and unlock the email draft."}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f5f5f2] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1520px]">
          <motion.div {...fadeUp} className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[30px] border border-black/8 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/36">Target Users</div>
              <h2 className="mt-4 text-[2.2rem] font-medium tracking-[-0.05em] text-[#171717]">Who this platform is for</h2>
              <ul className="mt-6 space-y-3 text-[15px] leading-7 text-black/66">
                {targetUsers.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[30px] border border-black/8 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
              <div className="text-[11px] uppercase tracking-[0.24em] text-black/36">Differentiation</div>
              <h2 className="mt-4 text-[2.2rem] font-medium tracking-[-0.05em] text-[#171717]">Why PRATI AI stands out</h2>
              <ul className="mt-6 space-y-3 text-[15px] leading-7 text-black/66">
                {differentiation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article id="mvp" className="scroll-mt-24 rounded-[30px] border border-black/8 bg-[#11131c] p-8 text-white shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
              <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">Non-Goals (for MVP)</div>
              <h2 className="mt-4 text-[2.2rem] font-medium tracking-[-0.05em]">What we are deliberately not building yet</h2>
              <ul className="mt-6 space-y-3 text-[15px] leading-7 text-white/72">
                {nonGoals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </motion.div>
        </div>
      </section>

      <footer className="w-full bg-[#0a0d16] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.26em] text-cyan-200/70">PRATI AI</div>
            <div className="mt-4 max-w-[760px] text-[2.25rem] font-medium leading-[0.98] tracking-[-0.06em] sm:text-[3.4rem] lg:text-[4.8rem]">
              A modular, AI-native digital twin SaaS platform for complex physical environments.
            </div>
          </div>

          <div className="grid gap-3 text-[13px] text-white/66">
            <div>Digital twin engine</div>
            <div>MQTT-based ingestion</div>
            <div>Dashboard system</div>
            <div>Plugin architecture</div>
            <div>Industry packs</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
