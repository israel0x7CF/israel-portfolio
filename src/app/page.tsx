"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  ArrowUpRight,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";
import { BackendOwnershipDiagram } from "../components/diagrams/BackendOwnershipDiagram";
import { BusinessWorkflowDiagram } from "../components/diagrams/BusinessWorkflowDiagram";
import { CreditLedgerDiagram } from "../components/diagrams/CreditLedgerDiagram";
import { EarlyEngineeringDiagram } from "../components/diagrams/EarlyEngineeringDiagram";
import { EngineeringLoopDiagram } from "../components/diagrams/EngineeringLoopDiagram";
import { OdooControlPlaneDiagram } from "../components/diagrams/OdooControlPlaneDiagram";
import { ThreadlineEvidenceDiagram } from "../components/diagrams/ThreadlineEvidenceDiagram";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const HeroSystemVisual = dynamic(
  () => import("../components/hero/HeroSystemVisual"),
  {
    ssr: false,
    loading: () => (
      <div className="hero-system-visual">
        <div className="hero-system-fallback" aria-hidden="true">
          <div className="fallback-route" />
          <div className="fallback-node fallback-node-api">
            <span>API Boundary</span>
            <small>requests enter</small>
          </div>
          <div className="fallback-node fallback-node-ingestion">
            <span>Ingestion</span>
            <small>events normalized</small>
          </div>
          <div className="fallback-node fallback-node-events">
            <span>Runtime Events</span>
            <small>behavior recorded</small>
          </div>
          <div className="fallback-node fallback-node-store">
            <span>Evidence Store</span>
            <small>state preserved</small>
          </div>
          <div className="fallback-node fallback-node-flow">
            <span>Flow Reconstruction</span>
            <small>case file rebuilt</small>
          </div>
        </div>
      </div>
    ),
  },
);

const navItems = [
  ["Work", "#work"],
  ["Approach", "#working-style"],
  ["Experience", "#experience"],
  ["Role fit", "#role-fit"],
];

const skillGroups = [
  {
    title: "Backend applications and APIs",
    body: "Java, Spring Boot, Python, FastAPI, Node.js, REST APIs, authentication, authorization, and service boundaries.",
  },
  {
    title: "Data, state, and business rules",
    body: "PostgreSQL, SQL, Hibernate/JPA, MySQL, MongoDB, relational modeling, transactions, ledgers, and operational history.",
  },
  {
    title: "Integrations and distributed workflows",
    body: "External APIs, webhooks, SMS services, biometric devices, Kafka, asynchronous workflows, Stripe, Mastercard, wallets, and legacy migration.",
  },
  {
    title: "Platform, infrastructure, and runtime",
    body: "Docker, SSH, remote provisioning, deployment support, unit and integration testing, production debugging, and runtime diagnostics.",
  },
];

const roleFits = [
  {
    title: "Backend application engineering",
    proof: "Product APIs, service boundaries, business rules, and data models.",
  },
  {
    title: "Java and Spring systems",
    proof: "Spring Boot services, control planes, ledgers, and operational workflows.",
  },
  {
    title: "Python, FastAPI, and developer tooling",
    proof: "Runtime ingestion, reconstruction, provisioning, and diagnostic tools.",
  },
  {
    title: "Integrations and workflows",
    proof: "External services, webhooks, devices, approvals, retries, and migrations.",
  },
  {
    title: "Platform and infrastructure automation",
    proof: "Remote hosts, Docker services, encrypted SSH, and lifecycle operations.",
  },
  {
    title: "Runtime diagnostics",
    proof: "Event capture, database activity, errors, and source-linked case files.",
  },
];

const projects = [
  {
    index: "01",
    name: "Credit Ledger",
    metadata: "NITESHIFT SYSTEMS · SPRING BOOT · STRIPE",
    diagram: "credit",
    title: "I stopped the browser from deciding how much credit a user had.",
    summary: "The old flow trusted browser state, so balances and access logic could drift.",
    evidence: [
      {
        label: "Owned",
        value: "The Spring Boot ledger, mutation rules, balance checks, and Stripe-linked service flows.",
      },
      {
        label: "Decision",
        value: "Put credit authority in one backend model across purchases, subscriptions, and content ownership.",
      },
      {
        label: "Result",
        value: "One system of record and fewer ambiguous failure paths.",
      },
    ],
    details: [
      "CREDIT LEDGER",
      "STRIPE CHECKOUT",
      "WEBHOOKS",
      "BALANCE RULES",
      "CONTENT OWNERSHIP",
      "POSTGRESQL",
    ],
    outcome: "Credit-related support tickets dropped to zero after release.",
  },
  {
    index: "02",
    name: "Threadline",
    metadata: "RUNTIME DIAGNOSTICS · FASTAPI · POSTGRESQL",
    diagram: "threadline",
    title: "Threadline reconstructs what a backend request actually did.",
    summary: "Scattered logs make it hard to explain a failure as one causal flow.",
    evidence: [
      {
        label: "Owned",
        value: "FastAPI ingestion, raw event storage, reconstruction, authentication, and source intelligence.",
      },
      {
        label: "Decision",
        value: "Build deterministic operation trees and case files from ordered runtime events.",
      },
      {
        label: "Result",
        value: "An inspectable request flow linked to database activity, errors, and source context.",
      },
    ],
    details: [
      "EVENT INGESTION",
      "FLOW RECONSTRUCTION",
      "DB EVIDENCE",
      "SOURCE INTELLIGENCE",
      "CASE FILES",
      "FASTAPI",
    ],
  },
  {
    index: "03",
    name: "Odoo Control Plane",
    metadata: "INFRASTRUCTURE AUTOMATION · SPRING BOOT · PYTHON",
    diagram: "odoo",
    title: "One control plane for Odoo instances spread across remote servers.",
    summary: "Loose scripts and terminal history did not provide a durable operational record.",
    evidence: [
      {
        label: "Owned",
        value: "Host registration, provisioning, encrypted SSH, Docker services, and instance lifecycle operations.",
      },
      {
        label: "Decision",
        value: "Keep system state in Spring Boot and execute remote work through a Python provisioner.",
      },
      {
        label: "Result",
        value: "One stateful path for provisioning, starting, stopping, and updating Odoo instances.",
      },
    ],
    details: [
      "REMOTE HOSTS",
      "ENCRYPTED SSH",
      "DOCKER",
      "DEPLOYMENT STATE",
      "SPRING BOOT",
      "PYTHON",
    ],
  },
  {
    index: "04",
    name: "Business Systems",
    metadata: "ETTA SOLUTIONS · PAYMENTS · OPERATIONS",
    diagram: "business",
    title: "Business workflows with rules, history, and external dependencies.",
    summary: "Manual and fragmented processes had to become software used in active operations.",
    evidence: [
      {
        label: "Owned",
        value: "Tender, transfer, payment, verification, SMS, and CNET migration workflows.",
      },
      {
        label: "Decision",
        value: "Model approvals, status, retries, records, and hash-based tamper checks inside the backend flow.",
      },
      {
        label: "Result",
        value: "Operational processes with explicit history and integration boundaries.",
      },
    ],
    details: [
      "MASTERCARD",
      "WALLET FLOWS",
      "APPROVALS",
      "DOCUMENT VERIFICATION",
      "SMS",
      "DATA MIGRATION",
    ],
  },
  {
    index: "05",
    name: "Early Engineering",
    metadata: "AHAZ SOFTWARE SOLUTIONS · HRMS · INTEGRATIONS",
    diagram: "early",
    title: "Backend workflows that connected people, devices, and payroll.",
    summary: "The useful system had to work beyond isolated endpoints and across a daily operational process.",
    evidence: [
      {
        label: "Owned",
        value: "HRMS and payroll APIs, attendance ingestion, normalization, deployment, and debugging.",
      },
      {
        label: "Decision",
        value: "Automate ZKTeco device data into the wider attendance and payroll workflow.",
      },
      {
        label: "Result",
        value: "End-to-end support for attendance, payroll, site allocation, and field operations.",
      },
    ],
    details: [
      "HRMS",
      "PAYROLL",
      "ATTENDANCE",
      "BIOMETRIC INGESTION",
      "NODE.JS",
      "PRODUCTION DEBUGGING",
    ],
  },
];

const experience = [
  {
    company: "NiteShift Systems",
    role: "JAVA BACKEND ENGINEER",
    period: "FEB 2024 — PRESENT",
    location: "REMOTE",
    text: [
      "Owned backend workflows across credits, payments, subscriptions, purchases, content access, authentication, admin operations, and production support.",
      "The largest change was replacing frontend-authoritative credit logic with a backend-controlled ledger and synchronization model.",
    ],
  },
  {
    company: "ETTA Solutions",
    role: "SOFTWARE ENGINEER · CONTRACT CONSULTANT",
    period: "JUN 2023 — SEP 2024",
    location: "ADDIS ABABA",
    text: [
      "Built systems for procurement, transfers, document verification, payments, messaging, and internal operations.",
      "Integrated Mastercard, wallets, SMS, and PostgreSQL workflows, and migrated legacy CNET data while supporting active operations.",
    ],
  },
  {
    company: "Ahaz Software Solutions",
    role: "SOFTWARE ENGINEER",
    period: "FEB 2021 — DEC 2022",
    location: "ADDIS ABABA",
    text: [
      "Built HRMS, payroll, attendance, and field-operation APIs and normalized operational data.",
      "Automated ZKTeco biometric ingestion and supported client systems through deployment, debugging, and production use.",
    ],
  },
];

type ProjectDiagramKind = "credit" | "threadline" | "odoo" | "business" | "early";

function ProjectVisual({ kind }: { kind: ProjectDiagramKind }) {
  switch (kind) {
    case "credit":
      return <CreditLedgerDiagram />;
    case "threadline":
      return <ThreadlineEvidenceDiagram />;
    case "odoo":
      return <OdooControlPlaneDiagram />;
    case "business":
      return <BusinessWorkflowDiagram />;
    case "early":
      return <EarlyEngineeringDiagram />;
  }
}

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".hero-title, .hero-illustration, .system-layer, .system-code, .timeline-item", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(".project-card, .project-visual-frame, .project-content, .project-detail-labels li, .proof-project-scene, .proof-visual-frame, .proof-project-content, .proof-detail-labels li, .proof-map, .proof-marker, .proof-summary", {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(".viewport-panel, .section-content", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(".site-nav", { opacity: 1, y: 0 });
        return;
      }

      const proofMatchMedia = gsap.matchMedia();

      gsap.fromTo(
        ".site-nav",
        {
          autoAlpha: 0,
          y: -22,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      gsap.to(".site-nav", {
        "--nav-fill": "rgba(255, 254, 251, 0.9)",
        "--nav-border": "rgba(27, 36, 48, 0.18)",
        boxShadow: "0 18px 70px rgba(27, 36, 48, 0.13)",
        scrollTrigger: {
          trigger: ".portfolio-page",
          start: "clamp(80px top)",
          end: "clamp(bottom bottom)",
          toggleActions: "play none none reverse",
        },
      });

      navItems.forEach(([, href]) => {
        const section = document.querySelector(href);
        const link = document.querySelector(`[data-nav-target="${href}"]`);

        if (!section || !link) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "clamp(top 48%)",
          end: "clamp(bottom 48%)",
          onEnter: () => {
            document
              .querySelectorAll(".nav-link.is-active")
              .forEach((activeLink) => activeLink.classList.remove("is-active"));
            link.classList.add("is-active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".nav-link.is-active")
              .forEach((activeLink) => activeLink.classList.remove("is-active"));
            link.classList.add("is-active");
          },
        });
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#fff1f6",
        ease: "none",
        scrollTrigger: {
          trigger: ".portfolio-page",
          start: "clamp(top top)",
          end: "clamp(20% top)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#eaf7ff",
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "clamp(top 72%)",
          end: "clamp(bottom 28%)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#fff4cf",
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "clamp(top 72%)",
          end: "clamp(bottom 28%)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#fff0f6",
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "clamp(top 72%)",
          end: "clamp(bottom 28%)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#f5ecff",
        ease: "none",
        scrollTrigger: {
          trigger: "#skills",
          start: "clamp(top 72%)",
          end: "clamp(bottom 28%)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#fff4cf",
        ease: "none",
        scrollTrigger: {
          trigger: "#role-fit",
          start: "clamp(top 72%)",
          end: "clamp(bottom 28%)",
          scrub: true,
        },
      });

      gsap.to(document.documentElement, {
        "--page-wash": "#edf8ff",
        ease: "none",
        scrollTrigger: {
          trigger: "#contact",
          start: "clamp(top 76%)",
          end: "clamp(bottom bottom)",
          scrub: true,
        },
      });

      gsap.to(".experience-section", {
        "--experience-wash": "#fff1f6",
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "clamp(top 75%)",
          end: "clamp(bottom 25%)",
          scrub: true,
        },
      });

      const pointerCleanups: Array<() => void> = [];
      const heroPanel = root.current?.querySelector<HTMLElement>(".hero-panel");
      const heroDepthLayers = heroPanel
        ? Array.from(heroPanel.querySelectorAll<HTMLElement>(".hero-depth-layer"))
        : [];

      if (
        heroPanel &&
        heroDepthLayers.length > 0 &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        gsap.set(heroDepthLayers, { x: 0, y: 0 });

        const depthSetters = heroDepthLayers.map((layer) => {
          const depthX = Number(layer.dataset.depthX ?? 8);
          const depthY = Number(layer.dataset.depthY ?? 8);

          return {
            depthX,
            depthY,
            xTo: gsap.quickTo(layer, "x", {
              duration: 0.85,
              ease: "power3.out",
            }),
            yTo: gsap.quickTo(layer, "y", {
              duration: 0.85,
              ease: "power3.out",
            }),
          };
        });

        const moveHeroLayers = (event: PointerEvent) => {
          const rect = heroPanel.getBoundingClientRect();
          const normalizedX = gsap.utils.clamp(
            -1,
            1,
            ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          );
          const normalizedY = gsap.utils.clamp(
            -1,
            1,
            ((event.clientY - rect.top) / rect.height - 0.5) * 2,
          );

          depthSetters.forEach(({ depthX, depthY, xTo, yTo }) => {
            xTo(normalizedX * depthX);
            yTo(normalizedY * depthY);
          });
        };

        const resetHeroLayers = () => {
          depthSetters.forEach(({ xTo, yTo }) => {
            xTo(0);
            yTo(0);
          });
        };

        heroPanel.addEventListener("pointermove", moveHeroLayers);
        heroPanel.addEventListener("pointerleave", resetHeroLayers);

        pointerCleanups.push(() => {
          heroPanel.removeEventListener("pointermove", moveHeroLayers);
          heroPanel.removeEventListener("pointerleave", resetHeroLayers);
          resetHeroLayers();
          gsap.killTweensOf(heroDepthLayers);
        });
      }

      const split = new SplitText(".scroll-reveal-copy", {
        type: "words",
        wordsClass: "reveal-word",
      });

      gsap.set(split.words, { opacity: 0.18, y: 8 });
      gsap.set(".hero-title", {
        autoAlpha: 0,
        y: 8,
        scale: 0.995,
        transformOrigin: "0% 50%",
      });
      gsap.set(".hero-illustration", { autoAlpha: 0, y: -10, scale: 0.96 });
      gsap.set(".system-layer, .system-code", { autoAlpha: 0, y: 18, scale: 0.97 });
      gsap.set(".hero-actions a", { autoAlpha: 0, y: 8, scale: 0.99 });
      gsap
        .timeline({
          defaults: { ease: "power2.out" },
        })
        .to(
          ".hero-illustration",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
          },
          0,
        )
        .to(
          ".hero-title",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
          },
          0.16,
        )
        .to(split.words, {
          opacity: 1,
          y: 0,
          stagger: 0.018,
          duration: 0.65,
        }, 0.38)
        .to(
          ".hero-actions a",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.56,
        )
        .to(
          ".system-layer, .system-code",
          { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, ease: "power2.out" },
          0.34,
        );

      const proofSection = root.current?.querySelector<HTMLElement>(".proof-journey-section");

      if (proofSection) {
        const proofStage = proofSection.querySelector<HTMLElement>(".proof-stage");
        const proofHeading = proofSection.querySelector<HTMLElement>(".proof-heading");
        const proofMap = proofSection.querySelector<HTMLElement>(".proof-map");
        const proofSummary = proofSection.querySelector<HTMLElement>(".proof-summary");
        const proofScenes = Array.from(
          proofSection.querySelectorAll<HTMLElement>(".proof-project-scene"),
        );
        const proofMarkers = Array.from(
          proofSection.querySelectorAll<HTMLElement>(".proof-marker"),
        );

        const sceneColors = [
          { from: "#FFC7DA", to: "#AEDDF7", orb: "#FFE29E" },
          { from: "#AEDDF7", to: "#FFE29E", orb: "#FFC7DA" },
          { from: "#FFE29E", to: "#FFC7DA", orb: "#AEDDF7" },
          { from: "#FFC7DA", to: "#FFE29E", orb: "#AEDDF7" },
          { from: "#AEDDF7", to: "#FFC7DA", orb: "#FFE29E" },
        ];

        proofMatchMedia.add("(min-width: 900px)", () => {
          if (!proofStage || !proofHeading || !proofMap || !proofSummary) {
            return;
          }

          gsap.set(proofSection, {
            "--section-from": "#FFC7DA",
            "--section-to": "#AEDDF7",
            "--section-orb": "#FFE29E",
          });
          gsap.set(proofHeading, { autoAlpha: 1, y: 0, scale: 1 });
          gsap.set(proofMap, { autoAlpha: 0, y: 36, scale: 0.96 });
          gsap.set(proofMarkers, { autoAlpha: 0, y: 24, scale: 0.86 });
          gsap.set(proofScenes, { autoAlpha: 0, y: 86, scale: 0.9 });
          gsap.set(proofSummary, { autoAlpha: 0, y: 72, scale: 0.95 });

          proofScenes.forEach((scene) => {
            gsap.set(scene.querySelector(".proof-visual-frame"), {
              autoAlpha: 0,
              y: 28,
              scale: 0.9,
            });
            gsap.set(scene.querySelector(".proof-project-content"), {
              autoAlpha: 0,
              y: 24,
              scale: 0.97,
            });
            gsap.set(scene.querySelectorAll(".proof-detail-labels li"), {
              autoAlpha: 0,
              y: 16,
              scale: 0.9,
            });
          });

          const sceneStartTime = 1.6;
          const sceneStep = 1.45;
          const scrollScreens = proofScenes.length * 1.65 + 2.25;

          const proofTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "proof-journey",
              trigger: proofSection,
              start: "top top",
              end: () => `+=${window.innerHeight * scrollScreens}`,
              pin: true,
              pinSpacing: true,
              scrub: 1.35,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          proofTimeline
            .to(
              proofHeading,
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
              0,
            )
            .to(
              proofHeading,
              {
                y: -40,
                scale: 0.74,
                transformOrigin: "0% 0%",
                duration: 0.72,
                ease: "power1.inOut",
              },
              0.72,
            )
            .to(
              proofMap,
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: "power2.out" },
              0.58,
            )
            .to(
              proofMarkers,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.48,
                stagger: 0.07,
                ease: "back.out(1.4)",
              },
              0.78,
            );

          proofScenes.forEach((scene, index) => {
            const sceneStart = sceneStartTime + index * sceneStep;
            const visual = scene.querySelector<HTMLElement>(".proof-visual-frame");
            const content = scene.querySelector<HTMLElement>(".proof-project-content");
            const labels = scene.querySelectorAll<HTMLElement>(".proof-detail-labels li");
            const marker = proofMarkers[index];
            const previousScene = proofScenes[index - 1];
            const color = sceneColors[index % sceneColors.length];
            const diagram = scene.querySelector<HTMLElement>(".diagram-shell");
            const isEven = index % 2 === 1;

            if (previousScene) {
              proofTimeline.to(
                previousScene,
                {
                  autoAlpha: 0,
                  y: -76,
                  scale: 0.9,
                  duration: 0.46,
                  ease: "power1.in",
                },
                sceneStart - 0.22,
              );
            }

            proofTimeline
              .to(
                proofSection,
                {
                  "--section-from": color.from,
                  "--section-to": color.to,
                  "--section-orb": color.orb,
                  duration: 0.78,
                },
                sceneStart - 0.18,
              )
              .to(
                proofMarkers,
                { autoAlpha: 0.42, scale: 0.92, duration: 0.34, ease: "power1.out" },
                sceneStart - 0.12,
              )
              .to(
                marker,
                { autoAlpha: 1, scale: 1.12, duration: 0.34, ease: "back.out(1.5)" },
                sceneStart - 0.12,
              )
              .to(
                scene,
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: "power2.out" },
                sceneStart,
              );

            if (visual) {
              proofTimeline.fromTo(
                visual,
                {
                  autoAlpha: 0,
                  x: isEven ? 90 : -90,
                  y: 34,
                  scale: 0.88,
                  rotate: isEven ? 3 : -3,
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  duration: 0.66,
                  ease: "power2.out",
                },
                sceneStart + 0.05,
              );
            }

            if (content) {
              proofTimeline.fromTo(
                content,
                { autoAlpha: 0, x: isEven ? -68 : 68, y: 22, scale: 0.97 },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.58,
                  ease: "power2.out",
                },
                sceneStart + 0.12,
              );
            }

            if (labels.length > 0) {
              proofTimeline.to(
                labels,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.32,
                  stagger: 0.025,
                  ease: "back.out(1.6)",
                },
                sceneStart + 0.3,
              );
            }

            if (diagram) {
              proofTimeline.to(
                diagram,
                {
                  yPercent: isEven ? -3.5 : 3.5,
                  scale: 1.025,
                  duration: 0.74,
                },
                sceneStart + 0.38,
              );
            }
          });

          const summaryStart = sceneStartTime + proofScenes.length * sceneStep;
          const finalColor = sceneColors[0];

          proofTimeline
            .to(
              proofScenes[proofScenes.length - 1],
              { autoAlpha: 0, y: -72, scale: 0.9, duration: 0.5, ease: "power1.in" },
              summaryStart - 0.2,
            )
            .to(
              proofSection,
              {
                "--section-from": finalColor.from,
                "--section-to": finalColor.to,
                "--section-orb": finalColor.orb,
                duration: 0.7,
              },
              summaryStart - 0.1,
            )
            .to(
              proofMarkers,
              {
                autoAlpha: 0,
                y: -18,
                scale: 0.94,
                duration: 0.4,
                stagger: 0.025,
                ease: "power1.in",
              },
              summaryStart - 0.58,
            )
            .to(
              proofMap,
              { autoAlpha: 0, y: -24, scale: 1.02, duration: 0.38, ease: "power1.in" },
              summaryStart - 0.46,
            )
            .to(
              proofHeading,
              { autoAlpha: 0, y: -82, scale: 0.62, duration: 0.38, ease: "power1.in" },
              summaryStart - 0.46,
            )
            .to(
              proofSummary,
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.66, ease: "power2.out" },
              summaryStart + 0.08,
            )
            .to(
              proofSummary,
              { y: -18, scale: 0.985, duration: 0.55, ease: "power1.inOut" },
              summaryStart + 0.82,
            );
        });

        proofMatchMedia.add("(max-width: 899px)", () => {
          gsap.set([proofMap, proofSummary, ...proofScenes, ...proofMarkers], {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          });

          proofScenes.forEach((scene) => {
            gsap.fromTo(
              scene,
              { autoAlpha: 0, y: 34, scale: 0.98 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.58,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: scene,
                  start: "clamp(top 84%)",
                  end: "clamp(top 54%)",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        });
      }

      // Create downstream reveal triggers after the pinned proof journey. The
      // pin adds several viewport-heights of spacing, so triggers created
      // before it can cache positions that are too early.
      const headingSplits = gsap.utils
        .toArray<HTMLElement>(".pop-heading")
        .map((heading) => {
          const split = new SplitText(heading, {
            type: "words",
            wordsClass: "pop-word",
          });

          gsap.set(split.words, {
            autoAlpha: 0,
            yPercent: 105,
            scale: 0.94,
            rotateX: -16,
            transformOrigin: "50% 100%",
          });

          gsap.to(split.words, {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.72,
            ease: "back.out(1.8)",
            stagger: { each: 0.045, from: "start" },
            scrollTrigger: {
              trigger: heading,
              start: "clamp(top 82%)",
              once: true,
            },
          });

          return split;
        });

      gsap.utils.toArray<HTMLElement>(".pop-copy").forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 28,
          scale: 0.97,
          duration: 0.58,
          ease: "back.out(1.45)",
          immediateRender: false,
          scrollTrigger: {
            trigger: item,
            start: "clamp(top 86%)",
            once: true,
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".timeline-content, .capability-card, .role-fit-card")
        .forEach((card) => {
          const isTimeline = card.classList.contains("timeline-content");

          gsap.to(card, {
            "--card-from": isTimeline ? "#AEDDF7" : "#FFC7DA",
            "--card-to": isTimeline ? "#FFE29E" : "#AEDDF7",
            "--card-orb": isTimeline ? "#FF9DC0" : "#FFCB5C",
            "--card-wash": "#fff8df",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "clamp(top 86%)",
              end: "clamp(bottom 24%)",
              scrub: 1,
            },
          });
        });

      gsap.utils.toArray<HTMLElement>(".viewport-panel").forEach((panel) => {
        if (panel.classList.contains("proof-journey-section")) {
          return;
        }

        const panelContent = panel.querySelector(".section-content");

        if (panelContent) {
          gsap.from(
            panelContent,
            {
              y: 48,
              scale: 0.985,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: panel,
                start: "clamp(top 72%)",
                end: "clamp(top 35%)",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: 42,
            scale: 0.98,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "clamp(top 82%)",
              once: true,
            },
          },
        );
      });

      let isActive = true;
      const refresh = () => {
        if (isActive) {
          ScrollTrigger.refresh();
        }
      };
      window.addEventListener("load", refresh, { once: true });
      document.fonts?.ready.then(refresh);
      const refreshFrame = window.requestAnimationFrame(refresh);

      return () => {
        isActive = false;
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);
        proofMatchMedia.revert();
        pointerCleanups.forEach((cleanup) => cleanup());
        split.revert();
        headingSplits.forEach((headingSplit) => headingSplit.revert());
      };
    },
    { scope: root },
  );

  return (
    <main ref={root} className="portfolio-page">
      <section id="top" className="hero snap-section">
        <div className="hero-panel">
          <nav className="site-nav" aria-label="Primary navigation">
            <a className="brand" href="#top" aria-label="Israel Asefa home">
              <span>IA</span>
              <strong>
                Israel Asefa
                <small>Backend systems</small>
              </strong>
            </a>

            <div className="nav-links">
              {navItems.map(([label, href]) => (
                <a
                  className={`nav-link${href === "#top" ? " is-active" : ""}`}
                  data-nav-target={href}
                  key={label}
                  href={href}
                >
                  {label}
                </a>
              ))}
              <a className="nav-link" href="/resume.pdf" download="Israel-Asefa-Resume.pdf">
                Resume
              </a>
            </div>

            <a className="nav-action" href="#contact">
              Discuss a role <ArrowUpRight size={15} />
            </a>
          </nav>

          <div className="hero-stage">
            <div className="hero-illustration">
              <HeroSystemVisual />
            </div>

            <div className="hero-support">
              <div className="hero-support-copy">
                <p className="eyebrow">BACKEND ENGINEER · ADDIS ABABA · REMOTE</p>
                <h1 className="hero-title">
                  I build backend systems that hold together as products get complicated.
                </h1>
                <p className="scroll-reveal-copy">
                  APIs, data models, workflows, integrations, infrastructure operations,
                  and runtime evidence—from development through production.
                </p>
              </div>
              <div className="hero-actions">
                <a className="primary-link" href="#work">
                  View selected work <ArrowUpRight size={18} />
                </a>
                <a className="secondary-link" href="#contact">
                  Discuss a backend role <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="section viewport-panel snap-section value-section text-section">
        <div className="bubble bubble-about" />
        <div className="section-content why-showcase">
          <div className="section-heading compact why-heading">
            <span className="section-index">01</span>
            <div>
              <p className="eyebrow">WHY ISRAEL</p>
              <h2 className="pop-heading">Backend ownership when the system crosses boundaries.</h2>
            </div>
          </div>

          <div className="why-board pop-copy">
            <div className="diagram-feature why-diagram">
              <BackendOwnershipDiagram />
            </div>
            <aside className="compact-copy-panel why-copy-panel">
              <span className="panel-label">WHERE I HELP</span>
              <p>
                I am useful when one backend flow crosses APIs, rules, data,
                external services, infrastructure, and production support.
              </p>
              <ul className="value-list compact-value-list">
                <li>Turn product rules into service and data boundaries.</li>
                <li>Connect external systems without losing workflow context.</li>
                <li>Make infrastructure operations part of a controlled system.</li>
                <li>Follow failures from runtime behavior back to code and data.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="work" className="section viewport-panel snap-section work-section proof-journey-section">
        <div className="bubble bubble-work" />
        <div className="section-content proof-journey">
          <div className="proof-stage">
            <div className="proof-orbit" aria-hidden="true" />
            <div className="proof-grid" aria-hidden="true" />

            <div className="section-heading proof-heading">
              <span className="section-index">02</span>
              <div>
                <p className="eyebrow">PROOF</p>
                <h2>Systems that had to hold up after release.</h2>
                <p className="section-intro">
                  Product backends, developer tooling, infrastructure control,
                  operational workflows, and a payment ledger with measurable impact.
                </p>
              </div>
            </div>

            <div className="proof-map" aria-hidden="true">
              <div className="proof-route" />
              {projects.map((project, projectIndex) => (
                <div
                  className="proof-marker"
                  data-proof-marker={projectIndex}
                  key={project.name}
                >
                  <span>{project.index}</span>
                  <strong>{project.name}</strong>
                </div>
              ))}
            </div>

            <div className="proof-scenes">
              {projects.map((project, projectIndex) => (
                <article
                  className="proof-project-scene"
                  data-proof-scene={projectIndex}
                  key={project.name}
                >
                  <div className="proof-visual-frame">
                    <ProjectVisual kind={project.diagram as ProjectDiagramKind} />
                  </div>
                  <div className="proof-project-content">
                    <span className="project-index">{project.index}</span>
                    <div className="proof-copy-main">
                      <p className="project-meta">{project.metadata}</p>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <dl className="proof-evidence-list">
                      {project.evidence.map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="proof-detail-labels">
                      {project.details.slice(0, 3).map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    {project.outcome ? (
                      <p className="project-outcome meta-line">{project.outcome}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="proof-summary">
              <div className="proof-summary-copy">
                <span className="section-index">02</span>
                <p className="eyebrow">PROOF</p>
                <h3>Five systems. One end-to-end view.</h3>
                <p>
                  Different stacks and domains, with the same responsibility for
                  understanding behavior across boundaries.
                </p>
              </div>
              <div className="proof-summary-grid">
                {projects.map((project) => (
                  <article className="proof-summary-card" key={project.name}>
                    <span>{project.index}</span>
                    <strong>{project.name}</strong>
                    <p>{project.metadata}</p>
                    <div>
                      {project.details.slice(0, 3).map((detail) => (
                        <small key={detail}>{detail}</small>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section viewport-panel snap-section about-section text-section">
        <div className="bubble bubble-about" />
        <div className="section-content text-section-content">
          <div className="section-heading compact">
              <span className="section-index">03</span>
              <div>
                <p className="eyebrow">ABOUT ISRAEL</p>
              <h2 className="pop-heading">I work best where backend decisions shape the whole product.</h2>
              </div>
          </div>

          <div className="body-copy pop-copy">
            <p>I’m a backend engineer based in Addis Ababa, Ethiopia.</p>
            <p>
              My work has covered product backends, internal business systems,
              payments, infrastructure automation, external integrations,
              developer tooling, and production support.
            </p>
            <p>
              The common thread is not one industry or framework. It is taking
              systems with real rules and operational consequences and making
              their boundaries, behavior, and responsibilities understandable.
            </p>
            <p>
              I contribute most strongly beneath the interface: service design,
              APIs, data models, workflow logic, integrations, and the operational
              paths that carry a change into production.
            </p>
            <p className="meta-line">BSC COMPUTER SCIENCE · HILCOE · 2022</p>
          </div>
        </div>
      </section>

      <section id="working-style" className="section viewport-panel snap-section style-section text-section">
        <div className="bubble bubble-style" />
        <div className="section-content text-section-content">
          <div className="section-heading compact">
              <span className="section-index">04</span>
              <div>
                <p className="eyebrow">HOW I WORK</p>
              <h2 className="pop-heading">A practical method for complex backend work.</h2>
              </div>
          </div>

          <div className="body-copy diagram-led-copy pop-copy">
            <div className="diagram-feature">
              <EngineeringLoopDiagram />
            </div>
            <ol className="method-list compact-copy-panel">
              <li>
                <span>01</span>
                <p><strong>Trace the full flow.</strong> Start at the request and follow rules, data, dependencies, and operational actions.</p>
              </li>
              <li>
                <span>02</span>
                <p><strong>Assign authority.</strong> Decide which boundary can make each decision and which records are durable.</p>
              </li>
              <li>
                <span>03</span>
                <p><strong>Model transitions and failures.</strong> Make retries, invalid actions, and recovery paths part of the design.</p>
              </li>
              <li>
                <span>04</span>
                <p><strong>Integrate deliberately.</strong> Keep external services and infrastructure actions behind clear contracts.</p>
              </li>
              <li>
                <span>05</span>
                <p><strong>Leave a runtime trail.</strong> Capture enough context to explain what happened after release.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section viewport-panel snap-section">
        <div className="experience-inner section-content">
          <div className="section-heading compact">
              <span className="section-index">05</span>
              <div>
                <p className="eyebrow">EXPERIENCE</p>
              <h2 className="pop-heading">Backend work across products, operations, and production support.</h2>
            </div>
          </div>

          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="timeline-item" key={item.company}>
                <div className="timeline-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-topline">
                    <span className="experience-date">{item.period}</span>
                    <strong>{item.location}</strong>
                  </div>
                  <h3>{item.company}</h3>
                  <p className="timeline-role">{item.role}</p>
                  {item.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section viewport-panel snap-section skills-section">
        <div className="bubble bubble-skills" />
        <div className="section-content">
          <div className="section-heading compact">
              <span className="section-index">06</span>
              <div>
              <p className="eyebrow">BACKEND RANGE</p>
              <h2 className="pop-heading">A broad backend range, organized around complete systems.</h2>
              <p className="section-intro pop-copy">
                The stack changes by problem. The work still has to connect
                application behavior, data, integrations, infrastructure, and runtime support.
              </p>
            </div>
          </div>

          <div className="capability-grid">
            {skillGroups.map((capability) => (
              <article className="capability-card pop-copy" key={capability.title}>
                <Sparkles size={20} />
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            ))}
          </div>
          <p className="skill-note pop-copy">
            Frameworks are tools. The deeper value is being able to follow a
            backend change through every layer it affects.
          </p>
        </div>
      </section>

      <section id="role-fit" className="section viewport-panel snap-section role-fit-section">
        <div className="bubble bubble-style" />
        <div className="section-content">
          <div className="section-heading compact">
            <span className="section-index">07</span>
            <div>
              <p className="eyebrow">ROLE FIT</p>
              <h2 className="pop-heading">Where this experience maps to backend roles.</h2>
              <p className="section-intro pop-copy">
                These are the backend paths most directly supported by the work above.
              </p>
            </div>
          </div>

          <div className="role-fit-grid">
            {roleFits.map((role) => (
              <article className="role-fit-card pop-copy" key={role.title}>
                <ArrowUpRight size={18} />
                <h3>{role.title}</h3>
                <p>{role.proof}</p>
              </article>
            ))}
          </div>
          <a className="role-fit-link pop-copy" href="#work">
            See the supporting systems <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <section id="contact" className="section viewport-panel snap-section contact-section">
        <div className="bubble bubble-contact" />
        <div className="section-content">
          <p className="eyebrow">WORK WITH ISRAEL</p>
          <h2 className="pop-heading">Need someone who can own the backend flow, not just close isolated tickets?</h2>
          <p className="contact-copy pop-copy">
            I’m open to remote backend roles and selected contract work.
          </p>
          <p className="contact-copy pop-copy">
            The strongest fit is a team dealing with complex product behavior,
            integrations, internal workflows, developer tooling, infrastructure
            operations, or production reliability.
          </p>
          <p className="availability">AVAILABLE FOR REMOTE BACKEND WORK</p>
          <div className="contact-actions">
            <a className="primary-link" href="mailto:israel.asefawm.mi1055@gmail.com">
              <Mail size={18} /> Discuss a backend role
            </a>
            <a
              className="secondary-link"
              href="https://www.linkedin.com/in/israel-asefa-978529202/"
              target="_blank"
              rel="noreferrer"
            >
              View LinkedIn <ArrowUpRight size={18} />
            </a>
            <a
              className="secondary-link"
              href="/resume.pdf"
              download="Israel-Asefa-Resume.pdf"
            >
              <Download size={18} /> Download resume
            </a>
          </div>
          <p className="email-line">israel.asefawm.mi1055@gmail.com</p>
        </div>
      </section>

      <footer className="site-footer snap-section">
        <div>
          <strong>Israel Asefa</strong>
          <span>BACKEND ENGINEER · ADDIS ABABA</span>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="/resume.pdf" download="Israel-Asefa-Resume.pdf">Resume</a>
          <a href="https://www.linkedin.com/in/israel-asefa-978529202/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:israel.asefawm.mi1055@gmail.com">Email</a>
        </nav>
        <p>Backend systems across product, data, integrations, and operations.</p>
      </footer>
    </main>
  );
}
