export const navItems = [
  { label: "Why PRATI", href: "#strategy" },
  { label: "Industries", href: "#industries" },
  { label: "Platform", href: "#capabilities" },
  { label: "Deployment", href: "#flows" },
  { label: "Platform Model", href: "#architecture" },
  { label: "Get Brief", href: "#brief-builder" },
];

export const heroStats = [
  ["Multi-tenant by design", "Isolated tenants with separate assets, connectors, rules, and packs"],
  ["Flexible ingestion", "MQTT, REST API, CSV, edge adapters, and Modbus-oriented bridges"],
  ["Configurable core", "Schemas, templates, plugins, industry packs, and APIs"],
] as const;

export const personas = [
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

export const coreProblems = [
  "Teams are still stitching together telemetry, PLC signals, APIs, CSV exports, and edge systems across disconnected tools.",
  "Critical issues are discovered too late because there is no single live operating picture.",
  "Every new environment becomes a custom project instead of a configurable deployment.",
  "Teams lack a normalized model for assets, telemetry, rules, and alerts across tenants and sites.",
  "Leadership, engineering, and frontline operations struggle to work from the same source of truth.",
];

export const nonGoals = [
  "Enterprise billing and subscription workflows",
  "Production-grade auth, SSO, and deep role administration",
  "3D digital twin rendering for MVP",
  "Formal incident management and autonomous agent actions",
];

export const trustSignals = [
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
];

export const industryProfiles = [
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
];

export const capabilityGroups = [
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
];

export const journeySteps = [
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
];

export const architectureLayers = [
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
];

export const faqItems = [
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
];

export type IndustryProfile = (typeof industryProfiles)[number];
export type CapabilityGroup = (typeof capabilityGroups)[number];
export type ArchitectureLayer = (typeof architectureLayers)[number];
