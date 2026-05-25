"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import type { ArchitectureLayer, CapabilityGroup, IndustryProfile } from "./landing-data";

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

export function LandingHeader({ navItems }: { navItems: Array<{ label: string; href: string }> }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-black/6 bg-[rgba(245,245,241,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[var(--layout-max-app)] items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
        <a href="#top" className="inline-flex items-center" aria-label="PRATI AI">
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
  );
}

export function IndustryExplorer({ industryProfiles }: { industryProfiles: IndustryProfile[] }) {
  const [activeIndustry, setActiveIndustry] = useState(industryProfiles[0]?.name ?? "");
  const selectedIndustry = industryProfiles.find((item) => item.name === activeIndustry) ?? industryProfiles[0];

  if (!selectedIndustry) return null;

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Industry profiles">
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
            <div className="mt-3 text-[1.45rem] font-medium leading-[1.03] tracking-[var(--tracking-heading)]">{industry.name}</div>
          </button>
        ))}
      </div>

      <article
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
      </article>
    </div>
  );
}

export function CapabilityExplorer({ capabilityGroups }: { capabilityGroups: CapabilityGroup[] }) {
  const [activeCapability, setActiveCapability] = useState(capabilityGroups[0]?.id ?? "");
  const selectedCapability = capabilityGroups.find((item) => item.id === activeCapability) ?? capabilityGroups[0];

  if (!selectedCapability) return null;

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="grid gap-3" role="tablist" aria-label="Platform capabilities">
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
        </div>

        <article
          id={`capability-panel-${selectedCapability.id}`}
          role="tabpanel"
          aria-labelledby={`capability-tab-${selectedCapability.id}`}
          className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/8 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="text-[12px] uppercase tracking-[0.2em] text-cyan-200/82">Selected benefit</div>
          <h3 className="mt-4 text-[2.3rem] font-medium leading-[0.98] tracking-[var(--tracking-heading)] text-[var(--color-text-primary)]">
            {selectedCapability.title}
          </h3>
          <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-[var(--color-text-secondary)]">{selectedCapability.summary}</p>

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
        </article>
      </div>

      <div className="mt-8 rounded-[var(--radius-2xl)] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[var(--shadow-panel)] sm:p-8">
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
      </div>
    </>
  );
}

export function ArchitectureExplorer({
  architectureLayers,
  trustSignals,
}: {
  architectureLayers: ArchitectureLayer[];
  trustSignals: Array<{ title: string; copy: string }>;
}) {
  const [activeArchitecture, setActiveArchitecture] = useState(architectureLayers[0]?.id ?? "");
  const selectedArchitecture = architectureLayers.find((item) => item.id === activeArchitecture) ?? architectureLayers[0];

  if (!selectedArchitecture) return null;

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
        <div className="flex flex-col gap-3" role="tablist" aria-label="Configuration layers">
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
        </div>

        <article
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
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {trustSignals.map((item) => (
          <article
            key={item.title}
            className="rounded-[var(--radius-2xl)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.04)]"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-black/56">Launch signal</div>
            <h3 className="mt-4 text-[1.7rem] font-medium leading-[1.02] tracking-[var(--tracking-heading)] text-[var(--color-text-inverse)]">
              {item.title}
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-black/64">{item.copy}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function BriefBuilder({
  industryProfiles,
  capabilityGroups,
  architectureLayers,
}: {
  industryProfiles: IndustryProfile[];
  capabilityGroups: CapabilityGroup[];
  architectureLayers: ArchitectureLayer[];
}) {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    environment: industryProfiles[0]?.name ?? "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const recommendation = useMemo(() => {
    const environment = industryProfiles.find((item) => item.name === formState.environment) ?? industryProfiles[0];
    const capabilityTitle = capabilityGroups[0]?.title ?? "Platform capabilities";
    const architectureTitle = architectureLayers[0]?.title ?? "Platform model";

    return {
      stack: [environment?.pack[0] ?? "Industry pack", "Realtime ingestion", capabilityTitle, architectureTitle],
      note:
        environment?.name === "Drone operations"
          ? "Start with mission telemetry, connector setup, active alerts, and a focused operational model."
          : environment?.name === "Habitats and lab operations"
            ? "Start with environmental telemetry, alert rules, and one command-center monitoring view."
            : "Start with schemas, live telemetry mapping, active alerts, and one command-center monitoring view.",
    };
  }, [architectureLayers, capabilityGroups, formState.environment, industryProfiles]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <div className="mt-12 grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
      <form onSubmit={handleSubmit} className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/8 p-6 backdrop-blur-sm sm:p-8">
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
      </form>

      <aside className="rounded-[var(--radius-2xl)] border border-white/10 bg-[#0a142d] p-6 sm:p-8">
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
      </aside>
    </div>
  );
}
