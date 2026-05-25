"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const navItems = [
  { label: "Why PRATI", href: "#strategy" },
  { label: "Industries", href: "#industries" },
  { label: "Platform", href: "#capabilities" },
  { label: "Deployment", href: "#flows" },
  { label: "Platform Model", href: "#architecture" },
  { label: "Get Brief", href: "#brief-builder" },
];

const heroStats = [
  ["Multi-tenant by design", "Isolated tenants with separate assets, connectors, rules, and packs"],
  ["Flexible ingestion", "MQTT, REST API, CSV, edge adapters, and Modbus-oriented bridges"],
  ["Configurable core", "Schemas, templates, plugins, industry packs, and APIs"],
];

const personas = [
  {
    persona: "Operations leaders",
    problem: "Need one clear operating picture before fragmented systems turn minor issues into downtime.",
    context: "Multi-team environments with fast decisions and high operational risk.",
    constraint: "Outcome-led reporting, live status, and fast executive-to-operator handoff.",
  },
  {
    persona: "Facility and infrastructure managers",
    problem: "Need one place to monitor assets, zones, incidents, and service conditions across distributed sites.",
    context: "Utilities, buildings, industrial infrastructure, and mixed device fleets.",
    constraint: "Cross-site visibility, responsive layouts, and dependable alerting.",
  },
  {
    persona: "Industrial innovation teams",
    problem: "Need a platform they can configure for new environments without rebuilding the product each time.",
    context: "Pilot programs, digital transformation initiatives, and new operational rollouts.",
    constraint: "Plugin-first architecture, flexible schemas, and pilot-ready scope.",
  },
  {
    persona: "Drone and remote operations teams",
    problem: "Need mission, fleet, payload, and telemetry visibility in one system before response timing slips.",
    context: "Remote operations, streaming events, and high-tempo field coordination.",
    constraint: "Live updates, dense telemetry handling, and low-friction review flows.",
  },
];

const coreProblems = [
  "Teams are still stitching together telemetry, PLC signals, APIs, CSV exports, and edge systems across disconnected tools.",
  "Critical issues are discovered too late because there is no single live operating picture.",
  "Every new environment becomes a custom project instead of a configurable deployment.",
  "Teams lack a normalized model for assets, telemetry, rules, and alerts across tenants and sites.",
  "Leadership, engineering, and frontline operations struggle to work from the same source of truth.",
];

const nonGoals = [
  "Enterprise billing and subscription workflows",
  "Production-grade auth, SSO, and deep role administration",
  "3D digital twin rendering for MVP",
  "Formal incident management and autonomous agent actions",
];

const trustSignals = [
  {
    title: "Tenant-ready onboarding",
    copy: "Stand up a tenant, activate an industry pack, install starter assets, and apply default rules without changing the product core.",
  },
  {
    title: "Modular by default",
    copy: "Use schemas, templates, plugins, and APIs to adapt the platform without rewriting the core product for every customer.",
  },
  {
    title: "AI and ML ready",
    copy: "Expose telemetry and alert context to anomaly detection, health scoring, forecasting, model inference, and AI copilot query workflows.",
  },
] as const;

const industryProfiles = [
  {
    name: "Manufacturing plants",
    summary:
      "Model production sites through sites, zones, assets, telemetry, rules, and active alerts without rebuilding the platform for each plant.",
    telemetry: ["Machine telemetry", "PLC signals", "MQTT streams", "CSV and REST inputs"],
    pack: ["Manufacturing industry pack", "Starter assets", "Default rules", "Command-center dashboard"],
    outcomes: ["Faster site onboarding", "Clearer live status", "Consistent plant visibility"],
  },
  {
    name: "Habitats and lab operations",
    summary:
      "Represent controlled environments through tenant-specific sites, zones, assets, telemetry, and rules with one reusable platform core.",
    telemetry: ["Environmental telemetry", "Access events", "Equipment status", "Edge adapter feeds"],
    pack: ["Habitat or lab pack", "Starter zones", "Default alerts", "Operational dashboard"],
    outcomes: ["Unified environment visibility", "Reusable onboarding", "Better alert context"],
  },
  {
    name: "Drone operations",
    summary:
      "Support mission-critical monitoring with configurable assets, telemetry ingestion, rules, and alert views for operational teams.",
    telemetry: ["Flight telemetry", "Payload state", "REST inputs", "Edge bridge registration"],
    pack: ["Drone operations pack", "Starter assets", "Default rules", "Active alert dashboard"],
    outcomes: ["Live mission visibility", "Operational consistency", "Faster pilot deployment"],
  },
  {
    name: "Infrastructure campuses",
    summary:
      "Connect distributed operational contexts across sites, zones, and assets with reusable packs and plugin-based connectors.",
    telemetry: ["Site telemetry", "Alarm state", "Edge adapters", "Recent telemetry retrieval"],
    pack: ["Infrastructure pack", "Starter site model", "Default rules", "Connector management UI"],
    outcomes: ["Cross-site visibility", "Consistent alerting", "Reusable operational model"],
  },
  {
    name: "Energy systems",
    summary:
      "Monitor live system conditions through a normalized platform model that supports rules, alerts, plugins, and ML services.",
    telemetry: ["Sensor telemetry", "Modbus-oriented bridge registration", "REST API inputs", "Active alert retrieval"],
    pack: ["Energy pack", "Starter assets", "Rule installation", "Live telemetry dashboard"],
    outcomes: ["Operational clarity", "Faster onboarding", "AI-ready signal context"],
  },
  {
    name: "Logistics, healthcare, mining, and aerospace",
    summary:
      "Reuse the same product core across complex physical environments by activating tenant-specific packs, starter assets, and operational rules.",
    telemetry: ["MQTT feeds", "CSV imports", "Software system events", "Connector plugins"],
    pack: ["Industry pack activation", "Starter asset install", "Default rules", "Alert and telemetry views"],
    outcomes: ["Reusable product core", "Lower custom engineering", "Broader industry fit"],
  },
] as const;

const capabilityGroups = [
  {
    id: "twin",
    title: "Unified twin model",
    summary: "Represent tenants, sites, zones, assets, telemetry, alerts, rules, models, and plugins in one operational system.",
    includes: ["Tenant context", "Sites, zones, and assets", "Normalized telemetry", "Shared domain entities"],
    unlocks: "A reusable platform model instead of one-off monitoring projects.",
  },
  {
    id: "data",
    title: "Realtime data layer",
    summary: "Ingest telemetry through the connector styles defined in the MVP and normalize it into one platform model.",
    includes: ["MQTT ingestion", "REST API ingestion", "CSV import", "Edge and Modbus bridge registration"],
    unlocks: "A practical path from raw operational signals to live platform visibility.",
  },
  {
    id: "dashboard",
    title: "Command-center dashboards",
    summary: "Surface recent telemetry and active alerts in a command-center style UI built for operational visibility.",
    includes: ["Live telemetry retrieval", "Active alert retrieval", "Connector management UI", "Command-center layout"],
    unlocks: "Clearer system health visibility without overpromising deep workflow automation.",
  },
  {
    id: "ai",
    title: "AI and ML services",
    summary: "Expose telemetry and alert context to model runtimes, ML inference endpoints, and an AI copilot query surface.",
    includes: ["Anomaly detection", "Health scoring", "Forecasting", "AI copilot query interface"],
    unlocks: "A clear path from monitoring to prediction to AI-assisted operations.",
  },
  {
    id: "plugins",
    title: "Plugin-first expansion",
    summary: "Add connectors, widgets, rules, and model capabilities through plugins and registries.",
    includes: ["Connector plugins", "Widget plugins", "Rule plugins", "ML capability plugins"],
    unlocks: "Extensibility without changing the core product.",
  },
  {
    id: "packs",
    title: "Industry packs",
    summary: "Activate tenant-specific packs that install starter assets and default rules for a new environment.",
    includes: ["Pack catalog", "Pack activation", "Starter asset installation", "Default rule installation"],
    unlocks: "Configurable industry onboarding instead of custom application code.",
  },
] as const;

const journeySteps = [
  {
    title: "1. Configure",
    summary: "Create the tenant, select the right industry pack, and prepare the starter model for sites, zones, and assets.",
    happyPath: ["Create tenant", "Select industry pack", "Install starter assets", "Install default rules"],
    edgeCases: ["Wrong pack selection", "Incomplete asset structure", "Scope expands before telemetry is connected"],
  },
  {
    title: "2. Connect",
    summary: "Connect live operational data through the ingestion paths defined for the MVP and normalize it into one platform model.",
    happyPath: ["Register MQTT, REST API, CSV, edge, or Modbus bridge", "Map source fields", "Validate ingestion", "Confirm recent telemetry"],
    edgeCases: ["Connector registration fails", "Telemetry is not normalized", "Source feed is partial or delayed"],
  },
  {
    title: "3. Monitor",
    summary: "Use live telemetry and active alert dashboards to monitor operational status from a command-center style UI.",
    happyPath: ["Open command-center dashboard", "Track sites, zones, and assets", "Review active alerts", "Inspect recent telemetry"],
    edgeCases: ["Too many alerts", "Missing connector context", "Telemetry arrives with inconsistent structure"],
  },
  {
    title: "4. Respond",
    summary: "Use normalized telemetry, rules, and AI/ML context to investigate risk and hand operational findings to the right team.",
    happyPath: ["Open alert context", "Review telemetry and rule conditions", "Use ML or copilot insight", "Hand off to operations workflow"],
    edgeCases: ["Rule thresholds are noisy", "Operational ownership is outside the platform", "Investigation needs connector changes"],
  },
] as const;

const architectureLayers = [
  {
    id: "schemas",
    title: "Schemas",
    summary: "Define how assets, zones, environments, and telemetry entities are modeled.",
    details: ["Asset definitions", "Zone and environment modeling", "Telemetry field mapping", "Relationship graph"],
  },
  {
    id: "templates",
    title: "Templates",
    summary: "Package repeatable layouts, views, workflows, and onboarding conventions.",
    details: ["Industry templates", "Dashboard presets", "Workflow templates", "Role-based defaults"],
  },
  {
    id: "plugins",
    title: "Plugins",
    summary: "Extend the platform with connectors, widgets, AI modules, and rules.",
    details: ["Data connectors", "Visualization widgets", "AI/ML modules", "Rules and alert packs"],
  },
  {
    id: "apis",
    title: "APIs",
    summary: "Keep the platform open for ingestion, integration, and extension into client ecosystems.",
    details: ["Telemetry APIs", "Configuration APIs", "External integrations", "Automation hooks"],
  },
] as const;

const faqItems = [
  {
    question: "What is an industrial digital twin platform?",
    answer:
      "An industrial digital twin platform gives teams one live operating picture of tenants, sites, zones, assets, telemetry, alerts, and rules so they can monitor conditions and respond faster.",
  },
  {
    question: "Which environments can PRATI AI support?",
    answer:
      "PRATI AI is designed for manufacturing units, underground labs, analog habitats, drone operations, industrial infrastructure, and smart facilities through configurable schemas, templates, plugins, and APIs.",
  },
  {
    question: "Can Prati AI connect to MQTT, REST API, CSV, edge, and Modbus sources?",
    answer:
      "Yes. The MVP scope includes telemetry ingestion through MQTT, REST API, CSV import, edge adapter registration, and Modbus-oriented bridge registration.",
  },
  {
    question: "Do we need a complex 3D model to start?",
    answer:
      "No. PRATI AI is focused on operational visibility first, so teams can start with configurable schemas, dashboards, and live data before investing in heavyweight 3D experiences.",
  },
  {
    question: "What does the private pilot program include?",
    answer:
      "The private pilot program is built to create a tenant, activate an industry pack, install starter assets and default rules, connect telemetry, and prove value through live telemetry, alerts, plugins, and AI-ready operational context.",
  },
] as const;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PRATI AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "An AI-native, multi-tenant digital twin and operational intelligence platform for manufacturing, drone operations, habitats, infrastructure, energy, logistics, healthcare, mining, and aerospace environments.",
  featureList: [
    "Multi-tenant operations model",
    "Industry pack activation",
    "Starter asset and rule installation",
    "Telemetry ingestion via MQTT, REST API, CSV, edge, and Modbus bridges",
    "Live telemetry and active alerts",
    "Plugin management",
    "ML inference endpoints and AI copilot query surface",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

type FormState = {
  name: string;
  email: string;
  company: string;
  environment: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function ButtonLink({
  href,
  children,
  intent = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  intent?: "primary" | "secondary";
  className?: string;
}) {
  const isPrimary = intent === "primary";

  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-semibold tracking-[0.01em] transition",
        isPrimary
          ? "border border-slate-950 bg-slate-950 shadow-[0_14px_34px_rgba(2,8,23,0.22)] hover:bg-slate-900"
          : "border border-[var(--color-border-soft)] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:border-[var(--color-border-strong)] hover:bg-slate-50",
        className,
      )}
      style={
        isPrimary
          ? { color: "#ffffff", WebkitTextFillColor: "#ffffff" }
          : { color: "#0f172a", WebkitTextFillColor: "#0f172a" }
      }
    >
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  dark?: boolean;
}) {
  return (
    <motion.div {...fadeUp} className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
      <div>
        <div className={cx("text-[11px] uppercase tracking-[0.28em]", dark ? "text-cyan-200/68" : "text-black/38")}>
          {eyebrow}
        </div>
        <h2
          className={cx(
            "mt-4 max-w-[760px] text-[2.35rem] font-medium leading-[0.96] tracking-[var(--tracking-heading)] sm:text-[3.65rem] lg:text-[4.7rem]",
            dark ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-inverse)]",
          )}
        >
          {title}
        </h2>
      </div>
      <p
        className={cx(
          "max-w-[560px] justify-self-end text-[15px] leading-7",
          dark ? "text-[var(--color-text-secondary)]" : "text-black/62",
        )}
      >
        {copy}
      </p>
    </motion.div>
  );
}

function SectionShell({
  id,
  dark = false,
  children,
}: {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx(
        "scroll-mt-24 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20",
        dark ? "bg-[var(--color-surface-base)] text-[var(--color-text-primary)]" : "bg-transparent text-[var(--color-text-inverse)]",
      )}
    >
      <div className="mx-auto max-w-[var(--layout-max-app)]">{children}</div>
    </section>
  );
}

function HeroOrb() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative h-[400px] overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-[linear-gradient(135deg,#07122f_0%,#0c204e_42%,#081229_100%)] p-6 shadow-[var(--shadow-panel)] sm:h-[500px] lg:h-[600px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(84,131,255,0.28),transparent_22%),radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.1),transparent_12%),radial-gradient(circle_at_84%_72%,rgba(34,211,238,0.12),transparent_16%)]" />
      <div className="absolute inset-8 rounded-[var(--radius-xl)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#b4d5ff_0%,#3f72ff_32%,#152c6f_70%,#07122f_100%)] shadow-[0_0_90px_rgba(71,117,255,0.38)] sm:h-56 sm:w-56 lg:h-72 lg:w-72" />

      {[0, 1, 2, 3, 4, 5].map((item) => (
        <motion.div
          key={item}
          className="absolute left-1/2 top-1/2 h-[16%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(205,213,226,0.88))] shadow-[0_14px_40px_rgba(3,9,25,0.32)]"
          style={{ transform: `translate(-50%, -50%) rotate(${item * 30}deg) scale(${1 - item * 0.05})` }}
          animate={shouldReduceMotion ? undefined : { rotate: item * 30 + 360 }}
          transition={shouldReduceMotion ? undefined : { duration: 30 + item * 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-[18%] rounded-[999px] border border-[#afbbd8] bg-[radial-gradient(circle_at_38%_50%,#0f172f_0%,#0f172f_18%,transparent_19%),radial-gradient(circle_at_72%_52%,#0f172f_0%,#0f172f_10%,transparent_11%)] opacity-80" />
        </motion.div>
      ))}

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
        {heroStats.map(([title, text]) => (
          <div key={title} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-100/55">{title}</div>
            <div className="mt-2 text-sm text-white/82">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PratiLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string>(industryProfiles[0].name);
  const [activeCapability, setActiveCapability] = useState<string>(capabilityGroups[0].id);
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
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const selectedIndustry = useMemo(
    () => industryProfiles.find((item) => item.name === activeIndustry) ?? industryProfiles[0],
    [activeIndustry],
  );

  const selectedCapability = useMemo(
    () => capabilityGroups.find((item) => item.id === activeCapability) ?? capabilityGroups[0],
    [activeCapability],
  );

  const selectedArchitecture = useMemo(
    () => architectureLayers.find((item) => item.id === activeArchitecture) ?? architectureLayers[0],
    [activeArchitecture],
  );

  const recommendation = useMemo(() => {
    const environment = industryProfiles.find((item) => item.name === formState.environment) ?? industryProfiles[0];
    return {
      stack: [environment.pack[0], "Realtime ingestion", selectedCapability.title, selectedArchitecture.title],
      note:
        environment.name === "Drone operations"
          ? "Start with mission telemetry, connector setup, active alerts, and a focused operational model."
          : environment.name === "Habitats and lab operations"
            ? "Start with environmental telemetry, alert rules, and one command-center monitoring view."
            : "Start with schemas, live telemetry mapping, active alerts, and one command-center monitoring view.",
    };
  }, [formState.environment, selectedCapability.title, selectedArchitecture.title]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`PRATI AI pilot brief - ${formState.company || "New inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\nEnvironment: ${formState.environment}\n\nRecommended stack:\n- ${recommendation.stack.join("\n- ")}\n\nNotes:\n${formState.notes || "No extra notes"}`,
    );

    return `mailto:hello@prati.ai?subject=${subject}&body=${body}`;
  }, [formState, recommendation.stack]);

  const briefDraftText = useMemo(
    () =>
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company}\nEnvironment: ${formState.environment}\n\nRecommended stack:\n- ${recommendation.stack.join(
        "\n- ",
      )}\n\nNotes:\n${formState.notes || "No extra notes"}`,
    [formState, recommendation.stack],
  );

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

  function handleFieldChange(field: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
    setCopyStatus("idle");
  }

  async function handleCopyBrief() {
    try {
      await navigator.clipboard.writeText(briefDraftText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-inverse)]">
      <a href="#top-content" className="skip-link">
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="sticky top-0 z-30 border-b border-black/6 bg-[rgba(245,245,241,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[var(--layout-max-app)] items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label="PRATI AI"
          >
            <Image
              src="/prati-logo.png"
              alt="PRATI AI"
              width={420}
              height={132}
              priority
              className="h-14 w-auto object-contain sm:h-16 lg:h-[4.5rem] xl:h-20"
            />
          </a>

          <nav className="hidden items-center gap-6 text-[12px] text-black/64 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-black">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href="#brief-builder" className="hidden xl:inline-flex">
              Request Pilot Brief
            </ButtonLink>
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="inline-flex rounded-full border border-[var(--color-border-soft)] bg-white px-4 py-2 text-[12px] font-medium text-[var(--color-text-inverse)] lg:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div id="mobile-nav" className="border-t border-black/6 bg-white px-5 py-4 lg:hidden">
            <div className="mx-auto flex max-w-[var(--layout-max-app)] flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] px-4 py-3 text-sm text-black/76"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section id="top" className="px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[var(--layout-max-app)] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
          <div id="top-content" className="flex flex-col justify-between">
            <motion.div {...fadeUp}>
              <div className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-black/62 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                Private pilot program for launch partners
              </div>
              <h1 className="mt-5 max-w-[700px] text-[3rem] font-medium leading-[0.92] tracking-[var(--tracking-hero)] text-[var(--color-text-inverse)] sm:text-[4.5rem] lg:text-[6rem] xl:text-[6.6rem]">
                AI-native multi-tenant digital twin platform for operational intelligence.
              </h1>
              <p className="mt-6 max-w-[620px] text-[16px] leading-7 text-black/66 sm:text-[17px]">
                PRATI AI helps organizations connect live operational data, model sites, zones, and assets, monitor telemetry
                and alerts in real time, activate industry packs, extend the platform through plugins, and expose AI and ML
                services without changing the product core for every tenant.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.06 }} className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="#brief-builder">Book Demo</ButtonLink>
              <ButtonLink href="#brief-builder" intent="secondary">
                Get Pilot Brief
              </ButtonLink>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                "Create isolated tenants with separate assets, connectors, rules, and pack selections.",
                "Ingest telemetry through MQTT, REST API, CSV, edge adapters, and Modbus-oriented bridges.",
                "Move from live monitoring to ML inference and AI copilot queries on one product core.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[var(--radius-xl)] border border-[var(--color-border-soft)] bg-white p-5 text-[14px] leading-6 text-black/68 shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.08 }}>
            <HeroOrb />
          </motion.div>
        </div>
      </section>

      <SectionShell id="strategy">
        <SectionIntro
          eyebrow="Why This Digital Twin Platform"
          title="Most operations teams still react from fragmented tools instead of one live operational model."
          copy="Prati AI is built for teams that need faster visibility, clearer alert context, and a configurable digital twin platform that can onboard new tenants and industries without custom application code."
        />

        <div className="mt-12 grid gap-5 xl:grid-cols-4">
          {personas.map((item, index) => (
            <motion.article
              key={item.persona}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Best-fit buyer</div>
              <h3 className="mt-4 text-[1.7rem] font-medium leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {item.persona}
              </h3>
              <div className="mt-5 space-y-4 text-[14px] leading-6 text-black/66">
                <p><strong className="text-black/86">Main pain:</strong> {item.problem}</p>
                <p><strong className="text-black/86">Context:</strong> {item.context}</p>
                <p><strong className="text-black/86">Needs from rollout:</strong> {item.constraint}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
          <motion.div
            {...fadeUp}
            className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-[var(--color-surface-base)] p-7 text-[var(--color-text-primary)] shadow-[var(--shadow-panel)]"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Operational pain</div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {coreProblems.map((item) => (
                <li key={item} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-4 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Pilot scope</div>
            <ul className="mt-5 space-y-3 text-[14px] leading-6 text-black/66">
              {nonGoals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </SectionShell>

      <SectionShell id="industries">
        <SectionIntro
          eyebrow="Industrial Digital Twin Use Cases"
          title="The platform stays consistent, but the rollout story should match the environment you operate."
          copy="Explore how Prati AI adapts across industries while preserving one product core. Each view shows the operational context, pack activation pattern, and onboarding path the BRD supports."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          <motion.div {...fadeUp} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Industry profiles">
            {industryProfiles.map((industry) => (
              <button
                key={industry.name}
                type="button"
                id={`industry-tab-${industry.name.replace(/\s+/g, "-").toLowerCase()}`}
                role="tab"
                aria-selected={activeIndustry === industry.name}
                aria-controls={`industry-panel-${industry.name.replace(/\s+/g, "-").toLowerCase()}`}
                tabIndex={activeIndustry === industry.name ? 0 : -1}
                onClick={() => setActiveIndustry(industry.name)}
                className={cx(
                  "rounded-[var(--radius-xl)] border p-5 text-left transition",
                  activeIndustry === industry.name
                    ? "border-black bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-[var(--shadow-panel)]"
                    : "border-[var(--color-border-soft)] bg-white text-[var(--color-text-inverse)] hover:border-[var(--color-border-strong)]",
                )}
              >
                <div className="text-[12px] uppercase tracking-[0.2em] opacity-70">Industry</div>
                <div className="mt-3 text-[1.45rem] font-medium leading-[1.03] tracking-[var(--tracking-heading)]">
                  {industry.name}
                </div>
              </button>
            ))}
          </motion.div>

          <motion.article
            key={selectedIndustry.name}
            {...fadeUp}
            transition={{ duration: 0.4 }}
            id={`industry-panel-${selectedIndustry.name.replace(/\s+/g, "-").toLowerCase()}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${selectedIndustry.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8"
          >
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Pilot scenario</div>
                <h3 className="mt-4 text-[2.15rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                  {selectedIndustry.name}
                </h3>
                <p className="mt-5 text-[15px] leading-7 text-black/64">{selectedIndustry.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[var(--radius-xl)] bg-[#eff1ed] p-5">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Primary telemetry</div>
                  <ul className="mt-4 space-y-2 text-[14px] leading-6 text-black/68">
                    {selectedIndustry.telemetry.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-xl)] bg-[#eff1ed] p-5">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Launch pack</div>
                  <ul className="mt-4 space-y-2 text-[14px] leading-6 text-black/68">
                    {selectedIndustry.pack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface-base)] p-5 text-[var(--color-text-primary)] sm:col-span-2">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Expected outcomes</div>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                    {selectedIndustry.outcomes.map((item) => (
                      <li key={item} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-4 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </SectionShell>

      <SectionShell id="capabilities" dark>
        <SectionIntro
          eyebrow="Platform Capabilities"
          title="A modular industrial digital twin platform should help buyers see value quickly, not force them to decode architecture first."
          copy="These are the platform capabilities the BRD points to for MVP: tenant setup, normalized telemetry, live alerts, plugin extensibility, industry packs, and AI-ready operational context."
          dark
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div {...fadeUp} className="grid gap-3" role="tablist" aria-label="Platform capabilities">
            {capabilityGroups.map((item) => (
              <button
                key={item.id}
                type="button"
                id={`capability-tab-${item.id}`}
                role="tab"
                aria-selected={activeCapability === item.id}
                aria-controls={`capability-panel-${item.id}`}
                tabIndex={activeCapability === item.id ? 0 : -1}
                onClick={() => setActiveCapability(item.id)}
                className={cx(
                  "rounded-[var(--radius-xl)] border p-5 text-left transition",
                  activeCapability === item.id
                    ? "border-cyan-300/40 bg-white/12 text-[var(--color-text-primary)]"
                    : "border-white/10 bg-white/5 text-white/82 hover:bg-white/8",
                )}
              >
                <div className="text-[1.32rem] font-medium tracking-[var(--tracking-heading)]">{item.title}</div>
                <div className="mt-3 text-[14px] leading-6 text-white/72">{item.summary}</div>
              </button>
            ))}
          </motion.div>

          <motion.article
            key={selectedCapability.id}
            {...fadeUp}
            transition={{ duration: 0.4 }}
            id={`capability-panel-${selectedCapability.id}`}
            role="tabpanel"
            aria-labelledby={`capability-tab-${selectedCapability.id}`}
            className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/8 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Selected benefit</div>
            <h3 className="mt-4 text-[2.3rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] text-[var(--color-text-primary)]">
              {selectedCapability.title}
            </h3>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-[var(--color-text-secondary)]">
              {selectedCapability.summary}
            </p>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_1fr]">
              <div className="rounded-[var(--radius-xl)] border border-white/10 bg-[#0a142d] p-5">
                <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-100/78">Includes</div>
                <ul className="mt-4 space-y-3 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                  {selectedCapability.includes.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[var(--radius-xl)] border border-white/10 bg-[#0a142d] p-5">
                <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-100/78">Unlocks</div>
                <p className="mt-4 text-[14px] leading-6 text-[var(--color-text-secondary)]">{selectedCapability.unlocks}</p>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div
          {...fadeUp}
          className="mt-8 rounded-[var(--radius-2xl)] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[var(--shadow-panel)] sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Mid-page action</div>
              <h3 className="mt-3 text-[1.9rem] font-medium leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--color-text-primary)]">
                Planning a tenant rollout for your environment?
              </h3>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-[var(--color-text-secondary)]">
                Request a pilot brief to map your pack activation, starter assets, telemetry connectors, rules, and AI-ready starting scope.
              </p>
            </div>
            <ButtonLink href="#brief-builder" intent="secondary" className="self-start !bg-white !shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
              Request Solution Brief
            </ButtonLink>
          </div>
        </motion.div>
      </SectionShell>

      <SectionShell id="flows">
        <SectionIntro
          eyebrow="Deployment Path"
          title="From tenant setup to live operations, the rollout should feel clear, practical, and fast."
          copy="Prati AI is positioned for focused early deployments. Teams create the tenant, activate the pack, connect telemetry, monitor alerts, and expose AI and ML services from one shared control layer."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {journeySteps.map((step, index) => (
            <motion.article
              key={step.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[1.8rem] font-medium leading-[1] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {step.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-black/64">{step.summary}</p>

              <div className="mt-6 rounded-[var(--radius-lg)] bg-[#eff1ed] p-4">
                <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Happy path</div>
                <ul className="mt-3 space-y-2 text-[14px] leading-6 text-black/68">
                  {step.happyPath.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <details className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-base)] p-4 text-[var(--color-text-primary)]">
                <summary className="cursor-pointer list-none text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">
                  Show edge cases
                </summary>
                <ul className="mt-3 space-y-2 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                  {step.edgeCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="architecture">
        <SectionIntro
          eyebrow="Configurable Platform Foundation"
          title="The private pilot is built to fit your environment now and scale with you later."
          copy="Schemas, templates, plugins, APIs, tenants, sites, zones, assets, telemetry, rules, models, and packs are the layers that keep Prati AI configurable instead of hardcoded."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.div {...fadeUp} className="flex flex-col gap-3" role="tablist" aria-label="Configuration layers">
            {architectureLayers.map((item) => (
              <button
                key={item.id}
                type="button"
                id={`architecture-tab-${item.id}`}
                role="tab"
                aria-selected={activeArchitecture === item.id}
                aria-controls={`architecture-panel-${item.id}`}
                tabIndex={activeArchitecture === item.id ? 0 : -1}
                onClick={() => setActiveArchitecture(item.id)}
                className={cx(
                  "rounded-[var(--radius-xl)] border p-5 text-left transition",
                  activeArchitecture === item.id
                    ? "border-black bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-[var(--shadow-panel)]"
                    : "border-[var(--color-border-soft)] bg-white text-[var(--color-text-inverse)] hover:border-[var(--color-border-strong)]",
                )}
              >
                <div className="text-[1.32rem] font-medium tracking-[var(--tracking-heading)]">{item.title}</div>
                <div className={cx("mt-3 text-[14px] leading-6", activeArchitecture === item.id ? "text-white/66" : "text-black/58")}>
                  {item.summary}
                </div>
              </button>
            ))}
          </motion.div>

          <motion.article
            key={selectedArchitecture.id}
            {...fadeUp}
            transition={{ duration: 0.4 }}
            id={`architecture-panel-${selectedArchitecture.id}`}
            role="tabpanel"
            aria-labelledby={`architecture-tab-${selectedArchitecture.id}`}
            className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Selected launch layer</div>
            <h3 className="mt-4 text-[2.25rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
              {selectedArchitecture.title}
            </h3>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-black/64">{selectedArchitecture.summary}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selectedArchitecture.details.map((item) => (
                <div
                  key={item}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] bg-[#f1f2ef] p-5 text-[14px] font-medium leading-6 text-[var(--color-text-inverse)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {trustSignals.map((item, index) => (
            <motion.article
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Launch signal</div>
              <h3 className="mt-4 text-[1.7rem] font-medium leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-black/64">{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="faq">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions buyers ask before choosing an operational intelligence platform."
          copy="These are the practical questions teams ask when evaluating platform scope, telemetry onboarding, tenant setup, and AI readiness."
        />

        <div className="mt-12 grid gap-4">
          {faqItems.map((item, index) => (
            <motion.details
              key={item.question}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <summary className="cursor-pointer list-none pr-8 text-[1.2rem] font-medium leading-7 tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {item.question}
              </summary>
              <p className="mt-4 max-w-[860px] text-[15px] leading-7 text-black/64">{item.answer}</p>
            </motion.details>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="brief-builder" dark>
        <SectionIntro
          eyebrow="Private Pilot Program"
          title="Request a pilot brief for your environment and we will shape the right starting scope with you."
          copy="This pilot brief captures your tenant context, industry fit, telemetry connectors, starter assets, and rule needs so the Prati AI team can prepare a realistic MVP handoff."
          dark
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <motion.form
            {...fadeUp}
            onSubmit={handleSubmit}
            className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/8 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[12px] font-medium text-[var(--color-text-secondary)]" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={formState.name}
                  onChange={(event) => handleFieldChange("name", event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/8 px-4 py-3 text-[var(--color-text-primary)] outline-none transition placeholder:text-white/28 focus:border-[var(--color-border-focus)]"
                  placeholder="Your name"
                />
                {formErrors.name ? <div className="mt-2 text-sm text-[var(--color-error)]">{formErrors.name}</div> : null}
              </div>

              <div>
                <label className="text-[12px] font-medium text-[var(--color-text-secondary)]" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/8 px-4 py-3 text-[var(--color-text-primary)] outline-none transition placeholder:text-white/28 focus:border-[var(--color-border-focus)]"
                  placeholder="name@company.com"
                />
                {formErrors.email ? <div className="mt-2 text-sm text-[var(--color-error)]">{formErrors.email}</div> : null}
              </div>

              <div>
                <label className="text-[12px] font-medium text-[var(--color-text-secondary)]" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  value={formState.company}
                  onChange={(event) => handleFieldChange("company", event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/8 px-4 py-3 text-[var(--color-text-primary)] outline-none transition placeholder:text-white/28 focus:border-[var(--color-border-focus)]"
                  placeholder="Company"
                />
                {formErrors.company ? <div className="mt-2 text-sm text-[var(--color-error)]">{formErrors.company}</div> : null}
              </div>

              <div>
                <label className="text-[12px] font-medium text-[var(--color-text-secondary)]" htmlFor="environment">
                  Environment
                </label>
                <select
                  id="environment"
                  value={formState.environment}
                  onChange={(event) => handleFieldChange("environment", event.target.value)}
                  className="mt-2 w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/8 px-4 py-3 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-border-focus)]"
                >
                  {industryProfiles.map((item) => (
                    <option key={item.name} value={item.name} className="text-black">
                      {item.name}
                    </option>
                  ))}
                </select>
                {formErrors.environment ? <div className="mt-2 text-sm text-[var(--color-error)]">{formErrors.environment}</div> : null}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)]" htmlFor="notes">
                Use case notes
              </label>
              <textarea
                id="notes"
                value={formState.notes}
                onChange={(event) => handleFieldChange("notes", event.target.value)}
                className="mt-2 min-h-[140px] w-full rounded-[var(--radius-lg)] border border-white/12 bg-white/8 px-4 py-3 text-[var(--color-text-primary)] outline-none transition placeholder:text-white/28 focus:border-[var(--color-border-focus)]"
                placeholder="Describe your environment, telemetry sources, current challenges, and what success looks like."
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-full border border-white/10 bg-white px-6 py-3 text-[13px] font-medium text-[var(--color-text-inverse)] transition hover:bg-slate-100"
                style={{ color: "#0f172a", WebkitTextFillColor: "#0f172a" }}
              >
                Request pilot brief
              </button>
                {submitted ? (
                  <>
                    <a
                      href={mailtoHref}
                      className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-[13px] font-medium text-white transition hover:bg-white/15"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      Open pilot email
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-[13px] font-medium text-white transition hover:bg-white/8"
                      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                    >
                      Copy brief
                    </button>
                  </>
                ) : null}
              </div>
            </motion.form>

            <motion.aside
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-[var(--radius-2xl)] border border-white/10 bg-[#0a142d] p-6 sm:p-8"
            >
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Recommended pilot starter</div>
            <h3 className="mt-4 text-[2rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] text-[var(--color-text-primary)]">
              {formState.environment}
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-[var(--color-text-secondary)]">{recommendation.note}</p>

            <ul className="mt-6 space-y-3">
              {recommendation.stack.map((item) => (
                <li key={item} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 px-4 py-3 text-[14px] text-[var(--color-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5">
              <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-100/78">Pilot status</div>
              <div className="mt-3 text-[15px] leading-7 text-[var(--color-text-secondary)]" aria-live="polite">
                {submitted
                  ? "Your pilot brief is ready. Open the generated email to continue the handoff."
                  : "Complete the form to unlock a pilot-ready handoff email and starter recommendation."}
              </div>
              {submitted && copyStatus === "copied" ? (
                <div className="mt-3 text-sm text-[var(--color-success)]" aria-live="polite">
                  Pilot brief copied to clipboard.
                </div>
              ) : null}
              {submitted && copyStatus === "error" ? (
                <div className="mt-3 text-sm text-[var(--color-error)]" aria-live="polite">
                  Could not copy automatically. Use the pilot email option instead.
                </div>
              ) : null}
            </div>
          </motion.aside>
        </div>
      </SectionShell>

      <footer className="bg-[#060a14] px-5 py-12 text-[var(--color-text-primary)] sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[var(--layout-max-app)] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex">
              <Image
                src="/prati-logo-white.png"
                alt="PRATI AI"
                width={420}
                height={132}
                className="h-14 w-auto object-contain sm:h-16 lg:h-20"
              />
            </div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.26em] text-cyan-200/70">Private pilot program</div>
            <div className="mt-4 max-w-[760px] text-[2rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] sm:text-[3rem] lg:text-[4rem]">
              A modular, AI-native digital twin platform for teams ready to unify operational visibility, prove value fast, and scale from one pilot into broader deployment.
            </div>
          </div>

          <div className="grid gap-3 text-[13px] text-[var(--color-text-tertiary)] lg:pb-3">
            <div>Digital twin engine</div>
            <div>Realtime data system</div>
            <div>Role-based dashboards</div>
            <div>Plugin-first architecture</div>
            <div>Reusable industry packs</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
