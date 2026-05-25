import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  architectureLayers,
  capabilityGroups,
  coreProblems,
  faqItems,
  heroStats,
  industryProfiles,
  journeySteps,
  navItems,
  nonGoals,
  personas,
  trustSignals,
} from "./landing-data";
import { ArchitectureExplorer, BriefBuilder, CapabilityExplorer, IndustryExplorer, LandingHeader } from "./landing-interactive";

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

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ButtonLink({
  href,
  children,
  intent = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
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
      style={isPrimary ? { color: "#ffffff", WebkitTextFillColor: "#ffffff" } : { color: "#0f172a", WebkitTextFillColor: "#0f172a" }}
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
    <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
      <div>
        <div className={cx("text-[11px] uppercase tracking-[0.28em]", dark ? "text-cyan-200/68" : "text-black/38")}>{eyebrow}</div>
        <h2
          className={cx(
            "mt-4 max-w-[760px] text-[2.35rem] font-medium leading-[0.96] tracking-[var(--tracking-heading)] sm:text-[3.65rem] lg:text-[4.7rem]",
            dark ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-inverse)]",
          )}
        >
          {title}
        </h2>
      </div>
      <p className={cx("max-w-[560px] justify-self-end text-[15px] leading-7", dark ? "text-[var(--color-text-secondary)]" : "text-black/62")}>
        {copy}
      </p>
    </div>
  );
}

function SectionShell({ id, dark = false, children }: { id?: string; dark?: boolean; children: ReactNode }) {
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
  return (
    <div className="relative h-[400px] overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-[linear-gradient(135deg,#07122f_0%,#0c204e_42%,#081229_100%)] p-6 shadow-[var(--shadow-panel)] sm:h-[500px] lg:h-[600px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(84,131,255,0.28),transparent_22%),radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.1),transparent_12%),radial-gradient(circle_at_84%_72%,rgba(34,211,238,0.12),transparent_16%)]" />
      <div className="absolute inset-8 rounded-[var(--radius-xl)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#b4d5ff_0%,#3f72ff_32%,#152c6f_70%,#07122f_100%)] shadow-[0_0_90px_rgba(71,117,255,0.38)] sm:h-56 sm:w-56 lg:h-72 lg:w-72" />

      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="hero-orb-ring absolute left-1/2 top-1/2 h-[16%] w-[58%] rounded-[999px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(205,213,226,0.88))] shadow-[0_14px_40px_rgba(3,9,25,0.32)]"
          style={{ "--orbit-start": `${item * 30}deg`, "--orbit-scale": `${1 - item * 0.05}`, "--orbit-duration": `${30 + item * 2}s` } as CSSProperties}
        >
          <div className="absolute inset-[18%] rounded-[999px] border border-[#afbbd8] bg-[radial-gradient(circle_at_38%_50%,#0f172f_0%,#0f172f_18%,transparent_19%),radial-gradient(circle_at_72%_52%,#0f172f_0%,#0f172f_10%,transparent_11%)] opacity-80" />
        </div>
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
  return (
    <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-inverse)]">
      <a href="#top-content" className="skip-link">
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <LandingHeader navItems={navItems} />

      <section id="top" className="px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-[var(--layout-max-app)] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
          <div id="top-content" className="flex flex-col justify-between">
            <div>
              <div className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-black/62 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                Private pilot program for launch partners
              </div>
              <h1 className="mt-5 max-w-[700px] text-[3rem] font-medium leading-[0.92] tracking-[var(--tracking-hero)] text-[var(--color-text-inverse)] sm:text-[4.5rem] lg:text-[6rem] xl:text-[6.6rem]">
                AI-native multi-tenant digital twin platform for operational intelligence.
              </h1>
              <p className="mt-6 max-w-[620px] text-[16px] leading-7 text-black/66 sm:text-[17px]">
                PRATI AI helps organizations connect live operational data, model sites, zones, and assets, monitor telemetry and alerts in real time,
                activate industry packs, extend the platform through plugins, and expose AI and ML services without changing the product core for every tenant.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="#brief-builder">Book Demo</ButtonLink>
              <ButtonLink href="#brief-builder" intent="secondary">
                Get Pilot Brief
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
            </div>
          </div>

          <HeroOrb />
        </div>
      </section>

      <SectionShell id="strategy">
        <SectionIntro
          eyebrow="Why This Digital Twin Platform"
          title="Most operations teams still react from fragmented tools instead of one live operational model."
          copy="Prati AI is built for teams that need faster visibility, clearer alert context, and a configurable digital twin platform that can onboard new tenants and industries without custom application code."
        />

        <div className="mt-12 grid gap-5 xl:grid-cols-4">
          {personas.map((item) => (
            <article
              key={item.persona}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Best-fit buyer</div>
              <h3 className="mt-4 text-[1.7rem] font-medium leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {item.persona}
              </h3>
              <div className="mt-5 space-y-4 text-[14px] leading-6 text-black/66">
                <p>
                  <strong className="text-black/86">Main pain:</strong> {item.problem}
                </p>
                <p>
                  <strong className="text-black/86">Context:</strong> {item.context}
                </p>
                <p>
                  <strong className="text-black/86">Needs from rollout:</strong> {item.constraint}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-[var(--color-surface-base)] p-7 text-[var(--color-text-primary)] shadow-[var(--shadow-panel)]">
            <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Operational pain</div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {coreProblems.map((item) => (
                <li key={item} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-4 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Pilot scope</div>
            <ul className="mt-5 space-y-3 text-[14px] leading-6 text-black/66">
              {nonGoals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="industries">
        <SectionIntro
          eyebrow="Industrial Digital Twin Use Cases"
          title="The platform stays consistent, but the rollout story should match the environment you operate."
          copy="Explore how Prati AI adapts across industries while preserving one product core. Each view shows the operational context, pack activation pattern, and onboarding path the BRD supports."
        />
        <IndustryExplorer industryProfiles={industryProfiles} />
      </SectionShell>

      <SectionShell id="capabilities" dark>
        <SectionIntro
          eyebrow="Platform Capabilities"
          title="A modular industrial digital twin platform should help buyers see value quickly, not force them to decode architecture first."
          copy="These are the platform capabilities the BRD points to for MVP: tenant setup, normalized telemetry, live alerts, plugin extensibility, industry packs, and AI-ready operational context."
          dark
        />
        <CapabilityExplorer capabilityGroups={capabilityGroups} />
      </SectionShell>

      <SectionShell id="flows">
        <SectionIntro
          eyebrow="Deployment Path"
          title="From tenant setup to live operations, the rollout should feel clear, practical, and fast."
          copy="Prati AI is positioned for focused early deployments. Teams create the tenant, activate the pack, connect telemetry, monitor alerts, and expose AI and ML services from one shared control layer."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {journeySteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[1.8rem] font-medium leading-[1] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">{step.title}</h3>
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
                <summary className="cursor-pointer list-none text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Show edge cases</summary>
                <ul className="mt-3 space-y-2 text-[14px] leading-6 text-[var(--color-text-secondary)]">
                  {step.edgeCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="architecture">
        <SectionIntro
          eyebrow="Configurable Platform Foundation"
          title="The private pilot is built to fit your environment now and scale with you later."
          copy="Schemas, templates, plugins, APIs, tenants, sites, zones, assets, telemetry, rules, models, and packs are the layers that keep Prati AI configurable instead of hardcoded."
        />
        <ArchitectureExplorer architectureLayers={architectureLayers} trustSignals={trustSignals} />
      </SectionShell>

      <SectionShell id="faq">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions buyers ask before choosing an operational intelligence platform."
          copy="These are the practical questions teams ask when evaluating platform scope, telemetry onboarding, tenant setup, and AI readiness."
        />

        <div className="mt-12 grid gap-4">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
              <summary className="cursor-pointer list-none pr-8 text-[1.2rem] font-medium leading-7 tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
                {item.question}
              </summary>
              <p className="mt-4 max-w-[860px] text-[15px] leading-7 text-black/64">{item.answer}</p>
            </details>
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
        <BriefBuilder industryProfiles={industryProfiles} capabilityGroups={capabilityGroups} architectureLayers={architectureLayers} />
      </SectionShell>

      <footer className="bg-[#060a14] px-5 py-12 text-[var(--color-text-primary)] sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-[var(--layout-max-app)] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex">
              <Image src="/prati-logo-white.png" alt="PRATI AI" width={420} height={132} className="h-14 w-auto object-contain sm:h-16 lg:h-20" />
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
