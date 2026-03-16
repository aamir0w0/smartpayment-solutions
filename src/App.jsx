import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = ["Home", "Services", "About", "Portfolio", "Contact", "Terms"];

const SERVICES = [
  { icon: "🌐", title: "Web Development", desc: "Custom, high-performance websites and web applications built with React, Next.js, Vue, and Laravel. From landing pages to full-stack enterprise portals.", tags: ["React", "Next.js", "Laravel", "Node.js"], color: "from-cyan-500 to-blue-600" },
  { icon: "📱", title: "Mobile Development", desc: "Cross-platform iOS & Android apps using React Native and Flutter. Native performance with a single codebase — shipped faster, scaled smarter.", tags: ["React Native", "Flutter", "iOS", "Android"], color: "from-violet-500 to-purple-700" },
  { icon: "🔍", title: "SEO Optimization", desc: "Data-driven SEO strategies that push your website to the top of Google. Technical SEO, on-page optimization, link building, and monthly reporting.", tags: ["On-Page SEO", "Technical SEO", "Link Building", "Analytics"], color: "from-emerald-500 to-teal-600" },
  { icon: "📣", title: "Digital Marketing", desc: "Full-funnel digital campaigns — Google Ads, Meta Ads, email automation, and social media management that convert clicks into loyal customers.", tags: ["Google Ads", "Meta Ads", "Email Marketing", "Social Media"], color: "from-orange-500 to-red-600" },
  { icon: "✍️", title: "Content Writing", desc: "SEO-optimized blogs, website copy, product descriptions, whitepapers, and social content crafted by industry-expert writers that engage and convert.", tags: ["Blog Writing", "Copywriting", "Whitepapers", "Social Content"], color: "from-pink-500 to-rose-600" },
  { icon: "☁️", title: "Cloud & DevOps", desc: "AWS, Azure, and GCP cloud architecture, CI/CD pipelines, Docker/Kubernetes deployments, and 24/7 infrastructure monitoring for zero-downtime operations.", tags: ["AWS", "Docker", "CI/CD", "Kubernetes"], color: "from-sky-500 to-indigo-600" },
  { icon: "🛡️", title: "Cybersecurity", desc: "Penetration testing, vulnerability assessments, SSL implementation, data encryption, and compliance consulting to keep your digital assets bulletproof.", tags: ["Pen Testing", "SSL", "Compliance", "Encryption"], color: "from-yellow-500 to-amber-600" },
  { icon: "🤖", title: "AI & Automation", desc: "Custom AI integrations, chatbots, process automation with RPA, and machine learning models that slash operational costs and supercharge productivity.", tags: ["ChatBots", "RPA", "ML Models", "OpenAI API"], color: "from-fuchsia-500 to-pink-700" },
  { icon: "🛒", title: "E-Commerce Solutions", desc: "Shopify, WooCommerce, and custom e-commerce platforms with payment gateways, inventory management, and conversion-optimized UX.", tags: ["Shopify", "WooCommerce", "Stripe", "UX Design"], color: "from-lime-500 to-green-600" },
];

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "80+", label: "Expert Team Members" },
];

const PORTFOLIO = [
  { title: "BrightEdge Store", category: "E-Commerce", tech: "Next.js + Shopify", color: "bg-cyan-950" },
  { title: "FinTrack Mobile App", category: "Mobile Dev", tech: "React Native", color: "bg-violet-950" },
  { title: "NovaCorp SEO Campaign", category: "SEO", tech: "+312% Organic Traffic", color: "bg-emerald-950" },
  { title: "HealthSync Cloud", category: "Cloud & DevOps", tech: "AWS + Docker", color: "bg-sky-950" },
  { title: "LegalEase Portal", category: "Web Development", tech: "Laravel + Vue.js", color: "bg-orange-950" },
  { title: "RetailBot AI", category: "AI & Automation", tech: "OpenAI + RPA", color: "bg-fuchsia-950" },
];

const TERMS_SECTIONS = [
  {
    icon: "📋",
    title: "1. Acceptance of Terms",
    content: `By accessing and using the services provided by Smart Payment Solutions ("Company", "we", "our", or "us"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and clients of Smart Payment Solutions, including but not limited to web development, mobile development, SEO, digital marketing, content writing, cloud services, cybersecurity, AI automation, and e-commerce solutions.`,
  },
  {
    icon: "🛠️",
    title: "2. Services Provided",
    content: `Smart Payment Solutions provides a range of IT and digital services including Web Development, Mobile App Development, SEO Optimization, Digital Marketing, Content Writing, Cloud & DevOps, Cybersecurity Consulting, AI & Automation, and E-Commerce Solutions. All services are subject to a separate service agreement or Statement of Work (SOW) that outlines specific deliverables, timelines, and pricing. We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.`,
  },
  {
    icon: "💰",
    title: "3. Payment Terms",
    content: `Payment schedules and amounts are defined in the individual project agreement. Standard terms require a 50% upfront deposit before project commencement, with the remaining balance due upon project completion or as defined in the SOW. We accept Visa, Mastercard, American Express, Discover, PayPal, and Stripe. All prices are in USD unless otherwise stated. Late payments beyond 15 days may incur a 1.5% monthly late fee. Smart Payment Solutions reserves the right to pause work on any project with outstanding invoices exceeding 30 days.`,
  },
  {
    icon: "🔒",
    title: "4. Confidentiality & NDA",
    content: `Both parties agree to keep confidential all proprietary information, trade secrets, business strategies, technical data, and client information shared during the course of the engagement. This obligation of confidentiality survives the termination of any service agreement. We will never share, sell, or disclose your business information to third parties without your explicit written consent, except where required by law. Clients may request a formal Non-Disclosure Agreement (NDA) at any time prior to project commencement.`,
  },
  {
    icon: "©️",
    title: "5. Intellectual Property",
    content: `Upon receipt of full and final payment, all custom work product, code, designs, and content created specifically for the client become the property of the client. Smart Payment Solutions retains the right to display completed projects in our portfolio and marketing materials unless a specific confidentiality clause is agreed upon. Any third-party libraries, frameworks, plugins, or tools incorporated in deliverables remain subject to their respective open-source or commercial licenses. Pre-existing intellectual property of Smart Payment Solutions used in projects remains our property and is licensed to the client for use in the delivered project only.`,
  },
  {
    icon: "🔄",
    title: "6. Revisions & Change Requests",
    content: `Each project agreement includes a defined number of revision rounds as specified in the SOW. Revisions are defined as minor changes that do not alter the original scope of work. Requests that constitute new features, major redesigns, or scope changes beyond the agreed deliverables will be quoted separately as change orders. All change requests must be submitted in writing and approved by both parties before work commences. Verbal change requests will not be honored without written confirmation.`,
  },
  {
    icon: "⏱️",
    title: "7. Project Timelines & Delays",
    content: `Smart Payment Solutions commits to the timelines outlined in each project agreement. Estimated timelines are based on timely receipt of client materials, feedback, and approvals. Delays caused by late content delivery, slow feedback cycles, or client-requested changes may extend project timelines without penalty to Smart Payment Solutions. We will provide advance written notice of any delays on our end and will work diligently to minimize any disruptions. Force majeure events (natural disasters, pandemics, government actions) exempt both parties from delay-related penalties.`,
  },
  {
    icon: "🚫",
    title: "8. Limitation of Liability",
    content: `Smart Payment Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our services, including but not limited to loss of revenue, loss of data, loss of business opportunities, or reputational harm. Our total cumulative liability in connection with any service shall not exceed the total fees paid by the client for that specific service in the 3 months preceding the claim. We do not guarantee specific search rankings, advertising ROI, or business outcomes as these are subject to third-party platforms and market conditions beyond our control.`,
  },
  {
    icon: "🔚",
    title: "9. Termination",
    content: `Either party may terminate a service agreement with 30 days written notice. In the event of termination by the client, all work completed up to the termination date will be invoiced at the agreed hourly or project rate, and any prepaid amounts for work not yet commenced will be refunded within 14 business days. Smart Payment Solutions reserves the right to terminate any engagement immediately and without refund in cases of client misconduct, fraudulent activity, illegal use of deliverables, or non-payment. Upon termination, all deliverables completed and paid for will be transferred to the client within 7 business days.`,
  },
  {
    icon: "🌐",
    title: "10. Governing Law & Dispute Resolution",
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Texas, United States. Any disputes arising from or relating to these terms or our services shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in accordance with the American Arbitration Association rules. Both parties waive the right to a jury trial. Nothing in this section shall prevent either party from seeking injunctive relief in a court of competent jurisdiction for urgent matters.`,
  },
  {
    icon: "🍪",
    title: "11. Privacy & Data Protection",
    content: `We are committed to protecting your privacy. Any personal data collected through our website or service engagements is used solely for the purpose of delivering our services and communicating with you. We do not sell or rent personal information to third parties. We implement industry-standard security measures to protect your data. By using our services, you consent to the collection and processing of your data as described in our Privacy Policy. You may request deletion of your personal data at any time by contacting michaelross7422@gmail.com.`,
  },
  {
    icon: "📝",
    title: "12. Modifications to Terms",
    content: `Smart Payment Solutions reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. We will notify active clients of material changes via email at least 14 days before the changes take effect. Your continued use of our services after any modifications constitutes acceptance of the updated terms. We recommend reviewing these terms periodically to stay informed of any updates. The date of last revision is displayed at the bottom of this page.`,
  },
];

/* ─────────────────────────────────────────────
   LOGO
───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path d="M20 3L5 9v11c0 9.5 6.4 18.4 15 21 8.6-2.6 15-11.5 15-21V9L20 3z" fill="url(#shieldGrad)" />
          <path d="M22 10l-6 11h5l-2 9 7-12h-5l1-8z" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-white font-black text-lg tracking-tight">Smart<span className="text-cyan-400">Payment</span></span>
        <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Solutions</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ onNavigate, page }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    if (link === "Terms") {
      onNavigate("terms");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (page === "terms") onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById(link.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, page === "terms" ? 100 : 0);
    }
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-gray-950/80 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <button onClick={() => { onNavigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <Logo />
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => handleNav(l)}
              className={`text-sm font-medium transition-colors duration-200 tracking-wide ${l === "Terms" ? "text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full hover:border-cyan-400" : "text-gray-300 hover:text-cyan-400"} ${page === "terms" && l === "Terms" ? "text-cyan-300" : ""}`}>
              {l}
            </button>
          ))}
        </nav>
        <button onClick={() => handleNav("Contact")}
          className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          Get Free Quote →
        </button>
        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => handleNav(l)} className={`text-left py-1 text-sm ${l === "Terms" ? "text-cyan-400 font-semibold" : "text-gray-300"}`}>{l}</button>
          ))}
          <button onClick={() => handleNav("Contact")} className="bg-cyan-500 text-white font-bold py-2.5 rounded-full text-sm mt-2">Get Free Quote →</button>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/25 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center pt-24">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          We Build
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Digital Futures</span>
          That Last
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From blazing-fast websites to AI-powered automation — Smart Payment Solutions delivers end-to-end IT services that transform businesses and accelerate growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services").scrollIntoView({ behavior: "smooth" }); }}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-full text-base hover:opacity-90 transition-all hover:scale-105 duration-200 shadow-lg shadow-cyan-500/25">
            Explore Our Services
          </a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" }); }}
            className="border border-gray-600 text-gray-300 font-bold px-8 py-4 rounded-full text-base hover:border-cyan-500 hover:text-white transition-all duration-200">
            View Our Work
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 border-t border-gray-800 pt-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" className="bg-gray-900 py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Full-Spectrum IT Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Every service we offer is backed by certified experts, proven methodologies, and a relentless commitment to measurable results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className="group bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => <span key={t} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const PILLARS = [
    { icon: "⚡", title: "Speed-First Delivery", desc: "Agile sprints with weekly demos. No 6-month blackouts." },
    { icon: "🔬", title: "Research-Backed Strategy", desc: "Every decision is driven by data, not guesswork." },
    { icon: "🤝", title: "Dedicated Account Manager", desc: "One point of contact. Always available, always accountable." },
    { icon: "📈", title: "ROI-Focused Mindset", desc: "We measure success in your revenue, not just deliverables." },
  ];
  return (
    <section id="about" className="bg-gray-950 py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Not Just an Agency —<br /><span className="text-cyan-400">Your Technology Partner</span></h2>
            <p className="text-gray-400 text-base leading-relaxed mb-6">Founded in 2013, Smart Payment Solutions has grown from a 3-person dev shop into an 80+ strong team of engineers, designers, marketers, and strategists serving clients across UK, USA, UAE, and Australia.</p>
            <p className="text-gray-400 text-base leading-relaxed mb-8">We don't just deliver projects — we build long-term digital partnerships. Our clients average a 3.2× ROI within 12 months of working with us, and 94% of them return for a second engagement.</p>
            <div className="flex flex-wrap gap-3">
              {["ISO 9001 Certified", "Google Partner", "Meta Business Partner", "AWS Certified"].map((b) => (
                <span key={b} className="border border-cyan-500/40 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full">✓ {b}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((p, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h4 className="text-white font-bold mb-2">{p.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO
───────────────────────────────────────────── */
function Portfolio() {
  return (
    <section id="portfolio" className="bg-gray-900 py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">A curated selection of projects that demonstrate our range, expertise, and the results we deliver.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <div key={i} className={`${p.color} rounded-2xl p-8 border border-gray-700/50 hover:scale-105 transition-transform duration-300 cursor-pointer`}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
              <h3 className="text-white text-xl font-black mt-2 mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm">{p.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAYMENT SECTION
───────────────────────────────────────────── */
function PaymentSection() {
  const cards = [
    { name: "Visa", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#1a1f71" /><text x="40" y="31" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif" letterSpacing="1">VISA</text><rect x="6" y="36" width="68" height="2" rx="1" fill="#c8a84b" opacity="0.6" /></svg> },
    { name: "Mastercard", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#1c1c1c" /><circle cx="29" cy="25" r="16" fill="#eb001b" /><circle cx="51" cy="25" r="16" fill="#f79e1b" /><path d="M40 12.8a16 16 0 0 1 0 24.4A16 16 0 0 1 40 12.8z" fill="#ff5f00" /></svg> },
    { name: "American Express", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#2e77bc" /><text x="40" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif" letterSpacing="1">AMERICAN</text><text x="40" y="31" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif" letterSpacing="1">EXPRESS</text><text x="40" y="42" textAnchor="middle" fontSize="6" fill="#a8d4f5" fontFamily="Arial, sans-serif">Charge Card</text></svg> },
    { name: "Discover", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" /><text x="12" y="22" fontSize="8" fontWeight="900" fill="#231f20" fontFamily="Arial, sans-serif" letterSpacing="0.5">DISCOVER</text><circle cx="58" cy="25" r="14" fill="#f76f20" /><text x="14" y="38" fontSize="6" fill="#555" fontFamily="Arial, sans-serif">Network</text></svg> },
    { name: "PayPal", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#003087" /><text x="40" y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#009cde" fontFamily="Arial, sans-serif">Pay</text><text x="40" y="35" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif">Pal</text></svg> },
    { name: "Stripe", svg: <svg viewBox="0 0 80 50" className="w-full h-full"><rect width="80" height="50" rx="6" fill="#635bff" /><text x="40" y="30" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif" letterSpacing="1">stripe</text></svg> },
  ];
  return (
    <section className="bg-gray-950 py-20 px-5 border-t border-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3">Secure Payments</p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">We Accept All Major Payment Methods</h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-12">Your transactions are protected with bank-grade 256-bit SSL encryption. Pay your way — safely and securely.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {cards.map((c) => (
            <div key={c.name} className="aspect-[8/5] rounded-xl overflow-hidden shadow-lg hover:scale-110 hover:shadow-cyan-500/20 transition-all duration-300" title={c.name}>{c.svg}</div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[{ icon: "🔒", label: "256-bit SSL Encryption" }, { icon: "✅", label: "PCI DSS Compliant" }, { icon: "🛡️", label: "Fraud Protection" }, { icon: "↩️", label: "Secure Refund Policy" }].map((b) => (
            <div key={b.label} className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-2">
              <span>{b.icon}</span>
              <span className="text-gray-300 text-xs font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const msg = `Hello Smart Payment Solutions! 👋%0A%0A*New Inquiry from Website*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A*Service:* ${encodeURIComponent(form.service || "Not specified")}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/16143919510?text=${msg}`, "_blank");
    setTimeout(() => {
      const subject = encodeURIComponent(`New Project Inquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service || "Not specified"}\n\nMessage:\n${form.message}`);
      window.location.href = `mailto:michaelross7422@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
    setSent(true);
  };
  return (
    <section id="contact" className="bg-gray-900 py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Let's Build Something <span className="text-cyan-400">Remarkable</span></h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10">Tell us about your project and we'll respond within 24 hours with a tailored proposal and free consultation.</p>
            <div className="space-y-5">
              {[
                { icon: "📍", label: "Office", value: "2253 84th St Brooklyn, NY 11214" },
                { icon: "📞", label: "Phone / WhatsApp", value: "+1 (917) 825-7959" },
                { icon: "✉️", label: "Email", value: "michaelross7422@gmail.com" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="text-white text-sm font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/16143919510" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-green-900/40">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-white text-2xl font-black mb-3">Message Sent!</h3>
                <p className="text-gray-400 mb-2">WhatsApp & Email have been opened with your message.</p>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-cyan-400 text-sm underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h3 className="text-white font-black text-xl mb-1">Send Us a Message</h3>
                <p className="text-gray-500 text-sm mb-4">We'll reply within 24 hours.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Your Name</label>
                    <input name="name" value={form.name} onChange={handle} required placeholder="John Smith" className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="john@company.com" className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Service Interested In</label>
                  <select name="service" value={form.service} onChange={handle} className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors">
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Your Message</label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your project, goals, and timeline…" className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-black py-4 rounded-xl text-base hover:opacity-90 transition-all hover:scale-[1.02] duration-200 shadow-lg shadow-cyan-500/20">
                  Send via WhatsApp & Email →
                </button>
                <p className="text-center text-gray-600 text-xs">Opens WhatsApp + your email client with your filled message</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TERMS & CONDITIONS PAGE
───────────────────────────────────────────── */
function TermsPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState(null);
  return (
    <div className="bg-gray-950 min-h-screen pt-24 pb-20 px-5">
      {/* Hero banner */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
          📜 Legal Document
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
          Terms &<span className="block bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Conditions</span>
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
          Please read these terms carefully before using our services. By engaging Smart Payment Solutions, you agree to the terms outlined below. Last updated: <span className="text-cyan-400 font-semibold">January 1, 2025</span>
        </p>

        {/* Quick nav pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["Acceptance", "Services", "Payment", "Confidentiality", "IP Rights", "Revisions", "Timelines", "Liability", "Termination", "Governing Law", "Privacy", "Modifications"].map((label, i) => (
            <button key={label} onClick={() => {
              setActiveSection(i);
              document.getElementById(`term-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${activeSection === i ? "bg-cyan-500 border-cyan-500 text-white" : "border-gray-700 text-gray-400 hover:border-cyan-500 hover:text-cyan-400"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-5">
        {TERMS_SECTIONS.map((section, i) => (
          <div key={i} id={`term-${i}`}
            className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-300 ${activeSection === i ? "border-cyan-500/60 shadow-lg shadow-cyan-500/10" : "border-gray-800 hover:border-gray-700"}`}>
            <button className="w-full flex items-center gap-4 p-6 text-left"
              onClick={() => setActiveSection(activeSection === i ? null : i)}>
              <span className="text-2xl flex-shrink-0">{section.icon}</span>
              <h3 className="text-white font-bold text-base md:text-lg flex-1">{section.title}</h3>
              <span className={`text-gray-400 text-xl transition-transform duration-300 ${activeSection === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {activeSection === i && (
              <div className="px-6 pb-6">
                <div className="h-px bg-gray-800 mb-5" />
                <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-white text-2xl font-black mb-3">Questions About These Terms?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">Our team is happy to clarify any section of these terms before you engage our services. Reach out anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:michaelross7422@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
              ✉️ Email Us
            </a>
            <a href="https://wa.me/16143919510" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
            <button onClick={() => { onNavigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 font-bold px-6 py-3 rounded-full hover:border-cyan-500 hover:text-white transition-all text-sm">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-gray-700 text-xs mt-10">
        © 2025 Smart Payment Solutions · 2253 84th St Brooklyn, NY 11214 · michaelross7422@gmail.com
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Logo />
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">Your trusted IT & digital solutions partner. Building digital futures since 2013.</p>

          </div>
          {[
            { title: "Services", links: ["Web Development", "Mobile Development", "SEO Optimization", "Digital Marketing", "Content Writing", "Cloud & DevOps"] },
            { title: "Company", links: ["About Us", "Our Team", "Careers", "Case Studies", "Blog", "Press"] },
            { title: "Legal & Support", links: ["Contact Us", "Get a Quote", "Privacy Policy", "Terms & Conditions", "Documentation", "Refund Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    {l === "Terms & Conditions" ? (
                      <button onClick={() => { onNavigate("terms"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-gray-500 text-sm hover:text-cyan-400 transition-colors text-left">
                        {l}
                      </button>
                    ) : (
                      <a href="#" className="text-gray-500 text-sm hover:text-cyan-400 transition-colors">{l}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2025 Smart Payment Solutions. All rights reserved. Spring, TX, USA.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => { onNavigate("terms"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-gray-600 text-xs hover:text-cyan-400 transition-colors">
              Terms & Conditions
            </button>
            <span className="text-gray-800">·</span>
            <p className="text-gray-700 text-xs">Built by SPS Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP — Simple page router
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="bg-gray-950 min-h-screen font-sans">
      <Navbar onNavigate={setPage} page={page} />
      {page === "terms" ? (
        <TermsPage onNavigate={setPage} />
      ) : (
        <>
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <PaymentSection />
          <Contact />
        </>
      )}
      <Footer onNavigate={setPage} />
    </div>
  );
}