"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  Clipboard,
  Code2,
  Copy,
  CreditCard,
  ExternalLink,
  Globe2,
  GraduationCap,
  Grid2X2,
  KeyRound,
  LayoutTemplate,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PackageCheck,
  PanelTop,
  Phone,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      callMethod?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

type ProjectCategory =
  | "Laravel Script"
  | "Laravel Website"
  | "Landing Page"
  | "Management"
  | "Android App";

type Project = {
  title: string;
  url: string;
  category: ProjectCategory;
  domain: string;
};

const demoPanels = [
  {
    title: "Admin Panel",
    subtitle: "সম্পূর্ণ ওয়েবসাইট ও অর্ডার ম্যানেজমেন্ট",
    url: "https://ecommerce1.dizitalproducts.shop/admin",
    usernameLabel: "Email",
    username: "info@creativedesign.com.bd",
    password: "12345678",
    preview: "https://image.thum.io/get/width/1000/crop/600/maxAge/168/https://ecommerce1.dizitalproducts.shop/",
    icon: ShieldCheck,
    accent: "panel-blue",
  },
  {
    title: "Reseller Panel",
    subtitle: "রিসেলার ড্যাশবোর্ড ও কাস্টমার ম্যানেজমেন্ট",
    url: "https://ecommerce1.dizitalproducts.shop/customer/login",
    usernameLabel: "Mobile",
    username: "01631843149",
    password: "12345678",
    preview: "https://image.thum.io/get/width/1000/crop/600/maxAge/168/https://ecommerce1.dizitalproducts.shop/",
    icon: Users,
    accent: "panel-violet",
  },
  {
    title: "Vendor Panel",
    subtitle: "ভেন্ডর প্রোডাক্ট ও সেলস ম্যানেজমেন্ট",
    url: "https://ecommerce1.dizitalproducts.shop/customer/login",
    usernameLabel: "Mobile",
    username: "01870829343",
    password: "12345678",
    preview: "https://image.thum.io/get/width/1000/crop/600/maxAge/168/https://ecommerce1.dizitalproducts.shop/",
    icon: Store,
    accent: "panel-cyan",
  },
] as const;

const projects: Project[] = [
  {
    title: "Landing Page Demo Collection",
    url: "https://drive.google.com/drive/folders/1KE3l2JHdM7zE3Uls1MJc7qY0fthRA8Qy",
    category: "Landing Page",
    domain: "Google Drive Collection",
  },
  {
    title: "E-commerce Script Demo 01",
    url: "http://ecommerce3.dizitalproducts.shop/",
    category: "Laravel Script",
    domain: "ecommerce3.dizitalproducts.shop",
  },
  {
    title: "E-commerce Script Demo 02",
    url: "https://ecommerce4.creativedesign.com.bd",
    category: "Laravel Script",
    domain: "ecommerce4.creativedesign.com.bd",
  },
  {
    title: "E-commerce Script Demo 03",
    url: "https://e5.aibizbd.com/",
    category: "Laravel Script",
    domain: "e5.aibizbd.com",
  },
  {
    title: "E-commerce Script Demo 04",
    url: "https://ecommerce6.dizitalproducts.shop/",
    category: "Laravel Script",
    domain: "ecommerce6.dizitalproducts.shop",
  },
  {
    title: "E-commerce Script Demo 05",
    url: "https://e7.aibizbd.com/",
    category: "Laravel Script",
    domain: "e7.aibizbd.com",
  },
  {
    title: "E-commerce Script Demo 06",
    url: "https://ecommerce2.aibizbd.com/",
    category: "Laravel Script",
    domain: "ecommerce2.aibizbd.com",
  },
  {
    title: "E-commerce Script Demo 07",
    url: "https://ecommerce3.aibizbd.com/",
    category: "Laravel Script",
    domain: "ecommerce3.aibizbd.com",
  },
  {
    title: "E-commerce Script Demo 08",
    url: "https://ecommerce4.aibizbd.com/",
    category: "Laravel Script",
    domain: "ecommerce4.aibizbd.com",
  },
  {
    title: "School Management System",
    url: "https://school1.aibizbd.com/",
    category: "Management",
    domain: "school1.aibizbd.com",
  },
  {
    title: "Lab Management System",
    url: "https://lab.aibizbd.com/",
    category: "Management",
    domain: "lab.aibizbd.com",
  },
  {
    title: "Landing Page Demo 01",
    url: "https://land1.creativedesign.com.bd",
    category: "Landing Page",
    domain: "land1.creativedesign.com.bd",
  },
  {
    title: "Landing Page Demo 02",
    url: "https://land2.creativedesign.com.bd",
    category: "Landing Page",
    domain: "land2.creativedesign.com.bd",
  },
  {
    title: "Android App Demo",
    url: "https://ecommerce1.creativedesign.com.bd/",
    category: "Android App",
    domain: "ecommerce1.creativedesign.com.bd",
  },
  ...[
    ["Style Bangla", "https://stylebangla.borbila.net/"],
    ["Poshakh Art", "https://poshakhart.borbila.net/"],
    ["Beauty Mart", "https://beautymart.borbila.net/"],
    ["Bijli Mart", "https://bijlimart.borbila.net/"],
    ["Fabric", "https://fabric.borbila.net/"],
    ["Taza Mart", "https://tazamart.borbila.net/"],
    ["Natural Dokan", "https://naturaldokan.borbila.net/"],
    ["Nijer Bazar", "https://nijerbazar.borbila.net/"],
    ["Look BD", "https://lookbd.borbila.net/"],
    ["Quick Shop", "https://quickshop.borbila.net/"],
    ["Amar Shop", "https://amarshop.borbila.net/"],
    ["Shop Vila", "https://shopvila.borbila.net/"],
    ["Barir Bazar", "https://barirbazar.borbila.net/"],
    ["Khati Bhai", "https://khatibhai.borbila.net/"],
  ].map(([title, url]) => ({
    title,
    url,
    category: "Laravel Website" as const,
    domain: new URL(url).hostname,
  })),
];

const categories = [
  "All",
  "Laravel Script",
  "Laravel Website",
  "Landing Page",
  "Management",
  "Android App",
] as const;

const categoryMeta: Record<
  ProjectCategory,
  { icon: typeof Code2; label: string; className: string }
> = {
  "Laravel Script": { icon: ServerCog, label: "Laravel Script", className: "preview-laravel" },
  "Laravel Website": { icon: ShoppingBag, label: "Laravel Website", className: "preview-shop" },
  "Landing Page": { icon: LayoutTemplate, label: "Landing Page", className: "preview-landing" },
  Management: { icon: GraduationCap, label: "Management System", className: "preview-management" },
  "Android App": { icon: Smartphone, label: "Android App", className: "preview-app" },
};

const packageOptions = [
  "Laravel Source Code Bundle — ৳999",
  "Landing Page Collection",
  "E-commerce Website",
  "School Management System",
  "Lab Management System",
  "Custom Software Development",
];

const normalizePhone = (value: string) => value.replace(/\D/g, "");

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const item = document.cookie.split("; ").find((entry) => entry.startsWith(`${name}=`));
  return item?.split("=").slice(1).join("=");
}

function trackPixel(eventName: string, data?: Record<string, unknown>, eventId?: string) {
  if (!window.fbq) return;
  if (eventId) window.fbq("track", eventName, data ?? {}, { eventID: eventId });
  else window.fbq("track", eventName, data ?? {});
}

function MetaPixel() {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || window.fbq) return;

    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    }) as NonNullable<Window["fbq"]>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    return () => script.remove();
  }, []);
  return null;
}

function scrollToOrder() {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  trackPixel("InitiateCheckout", { content_name: "Source Code Order", currency: "BDT", value: 999 });
}

function copyValue(value: string, label: string) {
  navigator.clipboard.writeText(value).then(() => toast.success(`${label} কপি হয়েছে`));
}

function DashboardArtwork() {
  return (
    <div className="hero-art" aria-label="Software dashboard preview">
      <div className="code-orbit code-orbit-one" />
      <div className="code-orbit code-orbit-two" />
      <div className="browser-shell">
        <div className="browser-topbar">
          <span /><span /><span />
          <div className="browser-address">sourcecodepoint.dev/dashboard</div>
        </div>
        <div className="dashboard-body">
          <aside className="dashboard-nav">
            <div className="nav-logo"><Code2 /></div>
            {[1, 2, 3, 4, 5].map((item) => <span key={item} className={item === 1 ? "active" : ""} />)}
          </aside>
          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div><small>Analytics</small><strong>Business Overview</strong></div>
              <span className="status-pill">Live</span>
            </div>
            <div className="metric-row">
              {["Orders", "Revenue", "Laravel Sites"].map((item, index) => (
                <div className="metric" key={item}>
                  <small>{item}</small>
                  <strong>{["1,284", "৳94K", "55+"][index]}</strong>
                  <span>+{[18, 24, 12][index]}%</span>
                </div>
              ))}
            </div>
            <div className="chart-card">
              <div className="chart-bars">
                {[42, 64, 54, 78, 68, 92, 84, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
              <div className="chart-donut" />
            </div>
          </div>
        </div>
      </div>
      <div className="floating-card floating-card-one"><PanelTop /><div><strong>300+</strong><span>WordPress Landing Page</span></div></div>
      <div className="floating-card floating-card-two"><PackageCheck /><div><strong>55+</strong><span>Laravel Website</span></div></div>
    </div>
  );
}

function CredentialCard({ panel }: { panel: (typeof demoPanels)[number] }) {
  const Icon = panel.icon;
  return (
    <article className={`credential-card ${panel.accent}`}>
      <div className="credential-head">
        <div className="credential-icon"><Icon /></div>
        <div><span>Live Demo Access</span><h3>{panel.title}</h3></div>
      </div>
      <p>{panel.subtitle}</p>
      <div className="panel-preview-image">
        <img src={panel.preview} alt="E-commerce project live UI preview" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        <span><MonitorSmartphone /> E-Commerce Project UI</span>
      </div>
      <div className="credential-list">
        <div>
          <small>{panel.usernameLabel}</small><strong>{panel.username}</strong>
          <button type="button" aria-label={`Copy ${panel.usernameLabel}`} onClick={() => copyValue(panel.username, panel.usernameLabel)}><Copy /></button>
        </div>
        <div>
          <small>Password</small><strong>{panel.password}</strong>
          <button type="button" aria-label="Copy password" onClick={() => copyValue(panel.password, "Password")}><Copy /></button>
        </div>
      </div>
      <div className="credential-actions">
        <Button asChild className="credential-button">
          <a href={panel.url} target="_blank" rel="noreferrer" onClick={() => trackPixel("ViewContent", { content_name: panel.title })}>
            Panel খুলুন <ExternalLink />
          </a>
        </Button>
        <Button asChild variant="outline" className="website-view-button">
          <a href="https://ecommerce1.dizitalproducts.shop/" target="_blank" rel="noreferrer" onClick={() => trackPixel("ViewContent", { content_name: `${panel.title} Website View` })}>
            Website View <Globe2 />
          </a>
        </Button>
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const thumbnailUrl = `https://image.thum.io/get/width/800/crop/675/maxAge/168/${project.url}`;

  return (
    <div className={`project-preview project-live-preview${previewFailed ? " preview-failed" : ""}`}>
      <div className="preview-browser-bar"><span /><span /><span /><i>{project.domain}</i></div>
      {!previewFailed ? (
        <img
          src={thumbnailUrl}
          alt={`${project.title} live website UI preview`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setPreviewFailed(true)}
        />
      ) : (
        <div className="preview-unavailable">
          <MonitorSmartphone />
          <strong>{project.title}</strong>
          <span>Live preview সাময়িকভাবে পাওয়া যাচ্ছে না</span>
        </div>
      )}
      <span className="preview-live-label"><span /> Actual Live UI</span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const meta = categoryMeta[project.category];
  return (
    <article className="project-card">
      <ProjectPreview project={project} />
      <div className="project-content">
        <span className="category-chip">{meta.label}</span>
        <h3>{project.title}</h3>
        <p>{project.domain}</p>
        <div className="project-tags"><span>Ready Demo</span><span>Live Website</span></div>
        <Button asChild className="project-button">
          <a href={project.url} target="_blank" rel="noreferrer" onClick={() => trackPixel("ViewContent", { content_name: project.title, content_category: project.category })}>
            প্রজেক্ট দেখুন <ArrowRight />
          </a>
        </Button>
      </div>
    </article>
  );
}

function OrderSection() {
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [packageName, setPackageName] = useState(packageOptions[0]);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "source-code-order");
    formData.set("paymentMethod", paymentMethod);
    formData.set("package", packageName);
    const eventId = `scp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    formData.set("eventId", eventId);
    setSubmitting(true);

    try {
      const encoded = new URLSearchParams();
      formData.forEach((value, key) => encoded.append(key, String(value)));
      await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encoded.toString() });

      const email = String(formData.get("email") ?? "");
      const phone = normalizePhone(String(formData.get("phone") ?? ""));
      const metaPayload = {
        eventName: "Purchase",
        eventId,
        email,
        phone,
        value: 999,
        currency: "BDT",
        contentName: packageName,
        sourceUrl: window.location.href,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      };

      trackPixel("Purchase", { value: 999, currency: "BDT", content_name: packageName }, eventId);
      fetch("/api/meta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(metaPayload) }).catch(() => undefined);

      setOrderId(eventId.toUpperCase());
      form.reset();
      setPaymentMethod("bKash");
      setPackageName(packageOptions[0]);
      toast.success("আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে");
    } catch {
      toast.error("অর্ডার পাঠানো যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="order-section section-shell" id="order">
      <div className="order-intro">
        <span className="eyebrow"><CreditCard /> পেমেন্ট ও অর্ডার</span>
        <h2>পেমেন্ট সম্পন্ন করে<br /><em>অর্ডার কনফার্ম করুন</em></h2>
        <p>পেমেন্ট সম্পন্ন করার পর অর্ডারের প্রয়োজনীয় তথ্য ও Transaction ID দিয়ে ফর্মটি পূরণ করুন। অল্প সময়ের মধ্যেই আপনার Email-এ সব project link পাঠানো হবে।</p>
        <div className="payment-number-card">
          <div className="payment-brand"><WalletCards /><div><small>bKash & Rocket</small><strong>01317768213</strong></div></div>
          <button type="button" onClick={() => copyValue("01317768213", "Payment number")}><Clipboard /> কপি করুন</button>
        </div>
        <div className="payment-steps">
          {[
            ["01", "পেমেন্ট করুন", "bKash বা Rocket নম্বরে Send Money করুন"],
            ["02", "তথ্য দিন", "নাম, Email, Payment Number ও Txn ID লিখুন"],
            ["03", "Project Link নিন", "Order verify হলে Email-এ সব link পাবেন"],
          ].map(([number, title, copy]) => (
            <div key={number}><span>{number}</span><div><strong>{title}</strong><small>{copy}</small></div></div>
          ))}
        </div>
      </div>

      <div className="order-form-card">
        {orderId ? (
          <div className="order-success">
            <div><Check /></div><span>Order Received</span><h3>ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।</h3>
            <p>Payment যাচাইয়ের পর অল্প সময়ের মধ্যে আমাদের সব project link আপনার দেওয়া Email Address-এ পাঠানো হবে।</p><code>{orderId}</code>
            <Button type="button" onClick={() => setOrderId(null)}>আরেকটি অর্ডার করুন</Button>
          </div>
        ) : (
          <>
            <div className="form-heading">
              <span><PackageCheck /> Secure Order Form</span>
              <h3>পেমেন্ট সম্পন্ন করে অর্ডারের তথ্য দিন</h3>
              <p>তথ্য জমা দেওয়ার পর অল্প সময়ের মধ্যে অর্ডার complete হবে এবং আমাদের সব project link আপনার Email Address-এ পাঠানো হবে।</p>
            </div>
            <form name="source-code-order" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="source-code-order" />
              <p className="hidden-field"><Label htmlFor="bot-field">Do not fill this out</Label><Input id="bot-field" name="bot-field" /></p>
              <div className="form-grid">
                <div className="field-group"><Label htmlFor="name">আপনার নাম *</Label><Input id="name" name="name" placeholder="সম্পূর্ণ নাম" required /></div>
                <div className="field-group"><Label htmlFor="email">Email Address *</Label><Input id="email" name="email" type="email" placeholder="you@email.com" required /></div>
                <div className="field-group"><Label htmlFor="phone">মোবাইল নম্বর *</Label><Input id="phone" name="phone" inputMode="tel" placeholder="01XXXXXXXXX" required /></div>
                <div className="field-group">
                  <Label>Payment Method *</Label>
                  <Select name="paymentMethod" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="form-select"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="bKash">bKash</SelectItem><SelectItem value="Rocket">Rocket</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="field-group">
                <Label>Package / Project *</Label>
                <Select name="package" value={packageName} onValueChange={setPackageName}>
                  <SelectTrigger className="form-select"><SelectValue /></SelectTrigger>
                  <SelectContent>{packageOptions.map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="form-grid">
                <div className="field-group"><Label htmlFor="paymentNumber">যে নম্বর থেকে পেমেন্ট করেছেন *</Label><Input id="paymentNumber" name="paymentNumber" inputMode="tel" placeholder="01XXXXXXXXX" required /></div>
                <div className="field-group"><Label htmlFor="transactionId">Transaction ID *</Label><Input id="transactionId" name="transactionId" placeholder="যেমন: 9AB12CDEF" required /></div>
              </div>
              <div className="field-group"><Label htmlFor="note">অতিরিক্ত নির্দেশনা (ঐচ্ছিক)</Label><Textarea id="note" name="note" placeholder="কোন demo বা project প্রয়োজন লিখুন..." /></div>
              <div className="order-summary"><span>Laravel Source Code Bundle</span><strong>৳999</strong></div>
              <Button type="submit" className="submit-order" disabled={submitting}>{submitting ? "অর্ডার পাঠানো হচ্ছে..." : "Order Complete করুন"}{!submitting && <ArrowRight />}</Button>
              <p className="privacy-note"><ShieldCheck /> আপনার তথ্য শুধুমাত্র order verification-এর জন্য ব্যবহার করা হবে।</p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const searchMatch = `${project.title} ${project.domain} ${project.category}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, query]);
  const navItems = [["ডেমো প্যানেল", "#panels"], ["প্রজেক্টসমূহ", "#projects"], ["অর্ডার", "#order"]];

  return (
    <main>
      <MetaPixel />
      <Toaster position="top-center" theme="light" richColors />
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Source Code Point home">
            <Image src="/source-code-point-logo.png" alt="Source Code Point" width={430} height={148} priority />
          </a>
          <nav className={mobileOpen ? "nav-links open" : "nav-links"}>
            {navItems.map(([label, href]) => <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
            <Button type="button" className="nav-order" onClick={scrollToOrder}>Order Now <ArrowRight /></Button>
          </nav>
          <button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid section-shell">
          <div className="hero-copy">
            <span className="hero-badge"><Zap /> Ready Source Code Marketplace</span>
            <h1>আপনার ব্যবসার জন্য<br /><em>রেডি সোর্স কোড</em></h1>
            <p>Live demo দেখে Laravel website, landing page, management software ও Android app-এর source code বেছে নিন।</p>
            <div className="hero-offer">
              <div><small>STARTING FROM</small><strong>মাত্র ৳999</strong></div><span />
              <div><b>300+</b><small>WordPress Landing Page</small></div><div><b>55+</b><small>Laravel Website</small></div>
            </div>
            <div className="hero-actions">
              <Button type="button" className="primary-cta" onClick={scrollToOrder}>এখনই অর্ডার করুন <ArrowRight /></Button>
              <Button asChild variant="outline" className="secondary-cta"><a href="#projects">Live Demo দেখুন <Globe2 /></a></Button>
            </div>
            <div className="trust-row"><span><BadgeCheck /> Live Demo</span><span><Code2 /> Ready Source Code</span><span><MessageCircle /> Direct Support</span></div>
          </div>
          <DashboardArtwork />
        </div>
      </section>

      <section className="stats-strip">
        <div className="section-shell stats-inner">
          {[
            [Grid2X2, `${projects.length}+`, "Live Demo Links"],
            [LayoutTemplate, "300+", "WordPress Landing Page"],
            [Boxes, "55+", "Laravel Website"],
            [MonitorSmartphone, "100%", "Responsive UI"],
          ].map(([Icon, value, label]) => {
            const StatIcon = Icon as typeof Grid2X2;
            return <div key={String(label)}><StatIcon /><span><strong>{String(value)}</strong><small>{String(label)}</small></span></div>;
          })}
        </div>
      </section>

      <section className="panels-section section-shell" id="panels">
        <div className="section-heading centered">
          <span className="eyebrow"><KeyRound /> Demo Credentials</span>
          <h2>সব প্যানেল নিজে<br /><em>লগইন করে দেখুন</em></h2>
          <p>নিচের demo credentials ব্যবহার করে Admin, Reseller ও Vendor panel-এর feature যাচাই করুন।</p>
        </div>
        <div className="credentials-grid">{demoPanels.map((panel) => <CredentialCard panel={panel} key={panel.title} />)}</div>
        <p className="demo-note"><ShieldCheck /> এগুলো শুধু demo login credentials—নিজের তথ্য ব্যবহার করার প্রয়োজন নেই।</p>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-shell">
          <div className="projects-heading-row">
            <div className="section-heading">
              <span className="eyebrow"><Rocket /> আমাদের প্রজেক্টসমূহ</span>
              <h2>বিভিন্ন ধরনের<br /><em>কাজ ও লাইভ ডেমো</em></h2>
              <p>প্রতিটি category আলাদা রাখা হয়েছে—Live Demo খুলে দেখে পছন্দের project নির্বাচন করুন।</p>
            </div>
            <div className="project-count"><strong>{filteredProjects.length}</strong><span>টি প্রজেক্ট</span></div>
          </div>
          <div className="project-toolbar">
            <div className="category-filter" role="tablist" aria-label="Project categories">
              {categories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}
            </div>
            <Label className="search-box"><Search /><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Project search করুন..." aria-label="Search projects" /></Label>
          </div>
          {filteredProjects.length ? (
            <div className="projects-grid">{filteredProjects.map((project) => <ProjectCard project={project} key={project.url} />)}</div>
          ) : (
            <div className="empty-projects"><Search /><h3>কোনো project পাওয়া যায়নি</h3><p>অন্য keyword দিয়ে আবার search করুন।</p></div>
          )}
        </div>
      </section>

      <OrderSection />

      <footer>
        <div className="section-shell footer-inner">
          <div className="footer-brand"><Image src="/source-code-point-logo.png" alt="Source Code Point" width={330} height={114} /><p>Ready source code, live demo এবং custom software solutions।</p></div>
          <div className="footer-links"><strong>Quick Links</strong><a href="#panels">Demo Panels</a><a href="#projects">Live Projects</a><a href="#order">Order Now</a></div>
          <div className="footer-payment"><strong>Payment</strong><span><Phone /> 01317768213</span><small>bKash & Rocket</small></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Source Code Point</span><span>Built for digital products</span></div>
      </footer>
    </main>
  );
}
