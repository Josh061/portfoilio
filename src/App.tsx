import { useState, useEffect } from 'react';
import { 
  Code, Smartphone, Globe, Briefcase, Map, Shield, 
  Menu, X, Phone, Mail, User, Github, Linkedin, Twitter, MessageSquare, ArrowUp, Download, Award, ChevronRight
} from 'lucide-react';

import ThemeToggle from './components/ThemeToggle';
import TypingEffect from './components/TypingEffect';
import StatCounter from './components/StatCounter';
import ContactForm from './components/ContactForm';
import ProjectModal from './components/ProjectModal';

// --- Types & Interfaces ---
export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  icon: React.ReactNode;
  color: string;
  screenshots?: string[];
  longDescription?: string;
  features?: string[];
  links?: {
    live?: string;
    github?: string;
    playstore?: string;
  };
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cvUrl = new URL('./cv/JOSHUA_CV.pdf', import.meta.url).href;

  // Monitor scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 400);

      // Detect current active section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'services', 'education', 'contact'];
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset for navbar height
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: 'Frontend & Web Development',
      skills: [
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'React.js / Tailwind CSS', level: 80 },
      ]
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'C# Programming', level: 88 },
        { name: '.NET Core / Web APIs', level: 85 },
      ]
    },
    {
      category: 'Mobile Development',
      skills: [
        { name: 'Flutter (Dart)', level: 87 },
      ]
    },
    {
      category: 'CMS & Hosting Systems',
      skills: [
        { name: 'WordPress Development', level: 90 },
      ]
    },
    {
      category: 'Professional & Geospatial Expertise',
      skills: [
        { name: 'Project Management', level: 90 },
        { name: 'IT Support & Systems Maintenance', level: 92 },
        { name: 'GIS Mapping & Field Surveying', level: 85 },
        { name: 'Data Collection & Verification', level: 87 },
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: 'Orange CRM',
      description: 'Comprehensive business management platform integrating contacts database, task workflows, dynamic document tracking, automated SMS updates, and custom management reporting into a unified mobile dashboard.',
      longDescription: 'Orange CRM (OBS CRM) is a production-grade enterprise client relationship management mobile application custom-tailored for Orange Business Solutions. Designed to automate and streamline core business workflows, it serves as a central hub for field agents and administrators to manage accounts, tasks, documents, and real-time alerts. It integrates a secure, local-first database, automatic SMS broadcast APIs for instant notifications, and interactive reporting widgets.',
      features: [
        'Real-time contacts and lead management database',
        'Structured workflow checklists and task assignment grids',
        'Automated SMS integration for client updates and service alerts',
        'Dynamic document tracking with secure storage attachments',
        'Interactive business metrics dashboard with custom reporting'
      ],
      tags: ['CRM', 'Flutter', 'Dart', 'SMS API', 'Database'],
      category: 'Mobile & Business Software',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/25',
      icon: <Smartphone className="w-10 h-10 text-emerald-500" />,
      screenshots: [
        new URL('./app created/obs crm/screenshot .jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 2.jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 3.jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 4.jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 5.jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 6.jpeg', import.meta.url).href,
        new URL('./app created/obs crm/screenshot 7.jpeg', import.meta.url).href
      ],
      links: {
        github: 'https://github.com/DamiJTech'
      }
    },
    {
      title: 'Election Campaign Candidate App',
      description: 'A comprehensive digital campaigning app designed for candidates to manage electorates, volunteer task routing, live event schedules, and polling station communications during elections.',
      longDescription: 'This civic engagement mobile application provides a central coordinate for political campaign teams and candidate staff. It integrates electorate databases with geolocation tagging, allowing volunteers to map voter trends in real-time, route logistics, handle polling station reports, and distribute campaign updates securely. Built with native performance and offline capabilities to ensure reliability in the field.',
      features: [
        'Electorate contacts directory with geo-mapping',
        'Volunteer task assignment and progress reporting',
        'Offline-first storage support for remote area canvassing',
        'Real-time announcements and event schedules broadcast',
        'Polling station checklist and ballot reporting logs'
      ],
      tags: ['Election App', 'Flutter', 'Dart', 'Electorate CRM', 'Realtime API'],
      category: 'Mobile & Civic Tech',
      color: 'from-rose-500/20 to-orange-500/20 border-rose-500/25',
      icon: <Smartphone className="w-10 h-10 text-rose-500" />,
      screenshots: [
        new URL('./app created/Election campaign candidate app/Election campaign candidate app ss1.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 1.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 2.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 3.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 4.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 5.jpeg', import.meta.url).href,
        new URL('./app created/Election campaign candidate app/screenshot 6.jpeg', import.meta.url).href
      ],
      links: {
        github: 'https://github.com/DamiJTech'
      }
    },
    {
      title: 'EnerPulse Data Engine',
      description: 'A high-performance energy data analytics engine and telemetry platform designed for tracking utility feeds, load distribution, real-time power analytics, and system status alerts.',
      longDescription: 'EnerPulse is an advanced telemetry data visualizer and utility feed engine. Built to ingest and process massive amounts of electrical grid measurements and load distribution details, it features high-precision graphs, interactive metrics grids, and warning threshold alerts. The application enables supervisors to identify load patterns, prevent outages, and monitor system health remotely.',
      features: [
        'High-throughput sensor telemetry ingestion',
        'Real-time utility feed status charts & analytics grids',
        'Automatic warning threshold alerts for system anomalies',
        'Load distribution optimization mapping',
        'Historical energy profiles comparison reports'
      ],
      tags: ['Energy Analytics', 'React', 'TypeScript', 'Data Visualisation', 'API Systems'],
      category: 'Web & Enterprise Systems',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/25',
      icon: <Globe className="w-10 h-10 text-cyan-500" />,
      screenshots: [
        new URL('./app created/enerpulse/WhatsApp Image 2026-06-26 at 8.15.25 AM.jpeg', import.meta.url).href,
        new URL('./app created/enerpulse/screenshot2.jpeg', import.meta.url).href,
        new URL('./app created/enerpulse/screenshot3.jpeg', import.meta.url).href,
        new URL('./app created/enerpulse/screenshot4.jpeg', import.meta.url).href,
        new URL('./app created/enerpulse/screenshot5.jpeg', import.meta.url).href,
        new URL('./app created/enerpulse/screenshot6.jpeg', import.meta.url).href
      ],
      links: {
        github: 'https://github.com/DamiJTech'
      }
    },
    {
      title: 'One Lifestyle NG Property App',
      description: 'A mobile real-estate and rental booking application featuring real-time room reservations, secure payment portal integrations (Paystack & Flutterwave), and NFC-enabled smart door key access automation.',
      longDescription: 'One Lifestyle NG is a modern property, hotel, and rental booking mobile application. It features automated room bookings, secure online payment portal integrations (Paystack and Flutterwave), and NFC-enabled door lock integrations for smart keyless entry.',
      features: [
        'Secure room reservations and lease booking panel',
        'Payment integration with Paystack & Flutterwave APIs',
        'NFC-based smart door key provisioning',
        'Interactive listings directory with photo sliders'
      ],
      tags: ['Flutter', 'Dart', 'API Payments', 'NFC Integration'],
      category: 'Mobile Platform',
      color: 'from-sky-500/20 to-indigo-500/20 border-sky-500/25',
      icon: <Smartphone className="w-10 h-10 text-sky-500" />,
      links: {
        github: 'https://github.com/DamiJTech'
      }
    },
    {
      title: 'Anchor Borrowers Programme Mapping',
      description: 'Large-scale agricultural land boundary mapping and farmer identity verification program. Captured precise GPS survey boundaries, calculated farm sizes, and processed records to manage inputs distribution.',
      longDescription: 'An agricultural GIS surveying and voter-level land boundary verification program. Conducted GPS coordinate collection, spatial database design, and field-based agricultural census to manage inputs distribution and ensure transparent logistics mapping.',
      features: [
        'GPS coordinates capture with high-precision mobile tools',
        'Geospatial mapping and boundary size calculation',
        'Farmer verification database integration',
        'Logistics distribution scheduling systems'
      ],
      tags: ['GIS Mapping', 'GPS Coordinates', 'Data Field Survey', 'Enumeration'],
      category: 'Geospatial Project',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/25',
      icon: <Map className="w-10 h-10 text-amber-500" />
    },
    {
      title: 'Enterprise Business Portals',
      description: 'Designed and deployed beautiful, highly-responsive corporate websites optimized for search engines, including orangebusinessng.com, complete with service integrations and automated user contact routing.',
      longDescription: 'A collection of search-engine optimized, high-performance web portals built for corporate clients. A prominent live example is orangebusinessng.com, a professional WordPress portal designed for Orange Business Solutions. These platforms feature automated contact routing, custom lead capture forms, service showcase dashboards, and accessible navigation.',
      features: [
        'SEO-optimized structure with data cache systems',
        'Integrated contact capture and lead routing systems',
        'Responsive layouts tailored for mobile, tablet, and desktop',
        'Clean CMS theme customization with visual builders'
      ],
      tags: ['WordPress', 'HTML5', 'CSS3', 'SEO Optimization'],
      category: 'Corporate Web',
      color: 'from-violet-500/20 to-purple-500/20 border-violet-500/25',
      icon: <Globe className="w-10 h-10 text-violet-500" />,
      links: {
        live: 'https://orangebusinessng.com'
      }
    }
  ];

  const services = [
    {
      title: 'Software Development',
      description: 'Tailored desktop, database and robust API solutions designed around specific commercial requirements.',
      icon: <Code className="w-6 h-6 text-emerald-500" />
    },
    {
      title: 'Mobile App Development',
      description: 'Engaging, natively-compiled cross-platform mobile apps for Android and iOS devices built using Flutter.',
      icon: <Smartphone className="w-6 h-6 text-sky-500" />
    },
    {
      title: 'Website Engineering',
      description: 'Stunning corporate sites and web applications designed using cutting-edge responsive styling structures.',
      icon: <Globe className="w-6 h-6 text-violet-500" />
    },
    {
      title: 'ICT Consulting',
      description: 'Strategic consulting on network architectures, security assessments, database hosting, and hardware tooling.',
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Project Management',
      description: 'Technical guidance, sprint modeling, scope formulation, and milestones supervision for technology delivery.',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />
    },
    {
      title: 'GIS Land Enumeration',
      description: 'Mapping, GPS coordinate collection, spatial database configurations, and agricultural project data surveying.',
      icon: <Map className="w-6 h-6 text-teal-500" />
    },
    {
      title: 'Technical Enterprise Support',
      description: 'Rapid diagnostic troubleshooting, local hardware/network setups, database restores, and ongoing IT support.',
      icon: <Shield className="w-6 h-6 text-rose-500" />
    }
  ];

  const education = [
    {
      degree: 'National Diploma in Computer Software Engineering',
      institution: 'Nspire School of Management and Technology',
      badge: 'ND Degree',
      color: 'border-emerald-500/20 dark:border-emerald-500/10'
    },
    {
      degree: 'ACCP — Aptech Certified Computer Professional',
      institution: 'Aptech Computer Education',
      badge: 'In View',
      color: 'border-sky-500/20 dark:border-sky-500/10'
    },
    {
      degree: 'Flutter & Dart Specialist Certification',
      institution: 'Mobile App Development Track',
      badge: 'Certified',
      color: 'border-purple-500/20 dark:border-purple-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative transition-colors duration-300">
      
      {/* Background radial orbs */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-sky-500/10 dark:bg-sky-500/5 blur-3xl animate-float-medium" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl animate-float-fast" style={{ animationDelay: '-8s' }}></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      </div>

      {/* HEADER / NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-white/80 dark:bg-slate-950/70 border-b border-slate-200/55 dark:border-slate-800/40 backdrop-blur-md shadow-sm shadow-slate-100/10' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-sky-500 text-slate-950 flex items-center justify-center font-black group-hover:scale-105 transition-transform duration-300 shadow-md shadow-emerald-500/20">
              D
            </span>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-350 bg-clip-text text-transparent">
              DamiJTech
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`font-display text-[14px] font-medium tracking-wide transition-colors relative py-1 hover:text-slate-900 dark:hover:text-slate-100 ${
                  activeSection === link.id 
                    ? 'text-slate-900 dark:text-emerald-400 font-semibold' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-[fadeIn_0.2s_ease]"></span>
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full md:hidden border border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-250 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/65 transition-colors"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease] md:hidden">
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-slate-900 border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-6 flex flex-col justify-between z-50">
            <div className="flex flex-col gap-8 mt-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-base font-semibold tracking-wide py-1 border-l-2 pl-3 transition-colors ${
                      activeSection === link.id 
                        ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/10' 
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-6">
              <p className="text-xs text-slate-400 text-center font-medium">© {new Date().getFullYear()} DamiJTech Portfolio</p>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center pt-24 pb-16 md:pb-24 relative overflow-hidden bg-mesh-gradient-light dark:bg-mesh-gradient">
          <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 gap-12 text-center relative">
            <div className="flex flex-col items-center">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 mb-6 animate-[bounce_3s_infinite]">
                Available For Projects
              </span>
              
              <h1 className="font-display font-extrabold text-[2.5rem] sm:text-[3.8rem] md:text-[5rem] leading-[1.08] tracking-tight max-w-4xl mb-4 text-slate-900 dark:text-white">
                AFOLAYAN <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">DAMI JOSHUA</span>
              </h1>
              
              <div className="font-display text-lg sm:text-2xl md:text-3xl font-medium text-slate-500 dark:text-slate-350 min-h-[3rem] mb-6 flex items-center justify-center">
                <span className="text-slate-400 mr-2">I am a</span>
                <TypingEffect words={['Software Developer', 'ICT Specialist', 'Project Manager', 'GIS Mapping Expert']} />
              </div>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
                Crafting robust software systems, cross-platform mobile apps, dynamic websites, and geospatial data configurations to empower enterprise processes and local communities.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
                <a 
                  href="#projects" 
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-semibold text-center bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 dark:from-emerald-500 dark:to-sky-500 dark:hover:from-emerald-400 dark:hover:to-sky-400 text-slate-950 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Explore Work</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a 
                  href={cvUrl}
                  download="AFOLAYAN_DAMI_JOSHUA_CV.pdf"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-semibold text-center border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-2xl border-t border-slate-200/60 dark:border-slate-900/50 pt-10">
                <div className="flex flex-col items-center">
                  <div className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white flex items-baseline">
                    <StatCounter target={5} />
                    <span className="text-emerald-500 text-xl sm:text-2xl ml-0.5">+</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2">Years Experience</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white flex items-baseline">
                    <StatCounter target={20} />
                    <span className="text-sky-500 text-xl sm:text-2xl ml-0.5">+</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2">Projects Delivered</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white flex items-baseline">
                    <StatCounter target={10} />
                    <span className="text-purple-500 text-xl sm:text-2xl ml-0.5">+</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 mt-2">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-28 border-t border-slate-100/50 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">Introduction</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Innovating Through <span className="text-gradient font-bold">Code &amp; Maps</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Photo placeholder / SVG illustration */}
              <div className="col-span-1 lg:col-span-5 flex justify-center relative">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-purple-500 p-[2px] shadow-2xl transition-transform duration-500 group-hover:rotate-1">
                    <div className="h-full w-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 200" className="w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="50%" stopColor="#0EA5E9" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                        <circle cx="100" cy="100" r="85" fill="none" stroke="url(#g1)" strokeWidth="1" strokeDasharray="5 5" className="animate-[spin_40s_linear_infinite]" />
                        <rect x="50" y="50" width="100" height="100" rx="20" fill="url(#g1)" opacity="0.1" />
                        <text x="100" y="125" fontFamily="Space Grotesk, sans-serif" fontSize="72" fontWeight="700" textAnchor="middle" fill="url(#g1)">DJ</text>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-lg font-bold">
                    PM
                  </div>
                </div>
              </div>

              {/* Bio & Badges */}
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 leading-tight">
                  Software Developer · IT Specialist · GIS Expert
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] sm:text-base">
                  I'm an innovative Software Developer and IT Specialist with proven expertise in designing, building, and deploying custom applications for diverse business sectors. I blend software development, web engineering, enterprise IT administration, and geospatial data mapping into a powerful skill set that yields real-world solutions.
                </p>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px] sm:text-base">
                  My experience ranges from building custom internal CRM systems, implementing real-estate booking systems with payment gateways, building secure web portals, and leading teams in large-scale GPS agricultural field mapping.
                </p>

                <div className="flex flex-wrap gap-2.5 my-3">
                  {[
                    'Software Development', 'Mobile Apps', 'WordPress Development',
                    'IT Administration', 'Project Management', 'GIS Mapping', 'Data Verification'
                  ].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-200/30 transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <a href="#contact" className="px-6 py-2.5 rounded-full font-display font-semibold text-sm bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 hover:from-emerald-400 hover:to-sky-400 transition-colors shadow-md shadow-emerald-500/5">
                    Let's Connect
                  </a>
                  <a href="#projects" className="px-6 py-2.5 rounded-full font-display font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-colors">
                    View Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 md:py-28 bg-slate-100/30 dark:bg-slate-950/20 border-t border-slate-150 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">Capabilities</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Tools &amp; <span className="text-gradient font-bold">Technologies</span>
              </h2>
              <p className="text-slate-400 dark:text-slate-400 text-sm max-w-lg mt-3">
                A structured breakdown of frontend, backend, mobile framework, and geospatial mappings tools I work with daily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {skillCategories.map((cat, catIdx) => (
                <div 
                  key={cat.category}
                  className={`p-6 sm:p-8 rounded-2xl glass-card dark:glass-card bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-850 shadow-md ${
                    catIdx === skillCategories.length - 1 ? 'md:col-span-2' : ''
                  }`}
                >
                  <h3 className="font-display font-bold text-base sm:text-lg text-emerald-500 dark:text-emerald-400 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-sky-500"></span>
                    {cat.category}
                  </h3>
                  <div className={`grid gap-5 ${catIdx === skillCategories.length - 1 ? 'grid-cols-1 md:grid-cols-2 gap-x-10' : 'grid-cols-1'}`}>
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="flex flex-col">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-350 mb-1.5">
                          <span>{skill.name}</span>
                          <span className="text-xs font-bold text-slate-450">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          >
                            <span className="absolute top-0 inset-0 bg-white/30 skew-x-12 -translate-x-12 animate-[shimmer_2.5s_infinite]"></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 md:py-28 border-t border-slate-100/50 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">History</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Professional <span className="text-gradient font-bold">Journey</span>
              </h2>
            </div>

            <div className="relative max-w-3xl mx-auto pl-8 sm:pl-10 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-sky-500 before:to-purple-500">
              {/* Item 1 */}
              <div className="relative pb-12 group">
                <div className="absolute -left-[35px] sm:-left-[37px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-4 border-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="flex flex-col gap-1.5 mb-2.5">
                  <span className="text-xs font-bold text-emerald-500 dark:text-emerald-450 tracking-wider">2022 — Present</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">IT Technician / Software Developer</h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Orange Business Solutions</h4>
                </div>
                <div className="p-5 sm:p-6 rounded-2xl glass-card dark:glass-card bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-850 shadow-sm hover:translate-x-1.5">
                  <ul className="list-disc pl-4 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                    <li>Developed <span className="font-semibold text-slate-800 dark:text-slate-200">Orange CRM</span>, a complete internal business management application utilizing Flutter and Dart for cross-platform process automation.</li>
                    <li>Built the <span className="font-semibold text-slate-800 dark:text-slate-200">One Lifestyle NG Property App</span> utilizing Flutter integration with automated payment routers (Flutterwave &amp; Paystack).</li>
                    <li>Designed, deployed, and supported secure websites for private corporate clients.</li>
                    <li>Handled network infrastructure configurations, enterprise hardware troubleshooting, and data backup schemas.</li>
                  </ul>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative pb-12 group">
                <div className="absolute -left-[35px] sm:-left-[37px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-4 border-sky-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                </div>
                <div className="flex flex-col gap-1.5 mb-2.5">
                  <span className="text-xs font-bold text-sky-500 dark:text-sky-450 tracking-wider">2019 — 2020</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">Technical Officer</h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">CignaIT</h4>
                </div>
                <div className="p-5 sm:p-6 rounded-2xl glass-card dark:glass-card bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-850 shadow-sm hover:translate-x-1.5">
                  <ul className="list-disc pl-4 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                    <li>Managed files migration, database digitization, and backup documentation logs.</li>
                    <li>Identified and resolved system blockages, speeding up administrative routing by automating manual entry pipelines.</li>
                    <li>Assisted with general corporate IT system configurations and user account management.</li>
                  </ul>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group">
                <div className="absolute -left-[35px] sm:-left-[37px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-4 border-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                </div>
                <div className="flex flex-col gap-1.5 mb-2.5">
                  <span className="text-xs font-bold text-purple-500 dark:text-purple-450 tracking-wider">2017 — 2018</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">Supervisor Leader, IT Support</h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Chidoka Campaign</h4>
                </div>
                <div className="p-5 sm:p-6 rounded-2xl glass-card dark:glass-card bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-850 shadow-sm hover:translate-x-1.5">
                  <ul className="list-disc pl-4 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                    <li>Supervised the local support team and handled logistics systems across multiple administrative centers.</li>
                    <li>Accelerated onboarding loops by introducing clean web forms and data capture spreadsheets.</li>
                    <li>Designed internal dashboard tracking layouts to evaluate performance.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 md:py-28 bg-slate-100/30 dark:bg-slate-950/20 border-t border-slate-150 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">Showcase</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Featured <span className="text-gradient font-bold">Projects</span>
              </h2>
              <p className="text-slate-450 dark:text-slate-400 text-sm max-w-lg mt-3">
                A selection of digital applications, APIs, database architectures, and land survey programs I have managed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.map((proj) => (
                <article 
                  key={proj.title}
                  onClick={() => setSelectedProject(proj)}
                  className="rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white/70 dark:bg-slate-900/30 overflow-hidden shadow-md flex flex-col group hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-500/35 transition-all duration-300 cursor-pointer"
                >
                  <div className={`p-10 flex items-center justify-center border-b border-slate-200/50 dark:border-slate-900/60 bg-gradient-to-br ${proj.color} relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-white/5 dark:bg-slate-950/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20"></div>
                    <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {proj.icon}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-500 dark:text-emerald-450 uppercase tracking-widest">{proj.category}</span>
                      {proj.screenshots && proj.screenshots.length > 0 && (
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/20 border border-emerald-500/20">
                          {proj.screenshots.length} Screens
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-900/30">
                      {proj.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-28 border-t border-slate-100/50 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">What I Offer</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Technical <span className="text-gradient font-bold">Services</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((serv) => (
                <div 
                  key={serv.title}
                  className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white/70 dark:bg-slate-900/30 shadow-sm flex flex-col gap-4 hover:border-emerald-500/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200/50 dark:border-slate-800 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-sky-500 group-hover:text-slate-950 transition-all duration-300">
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      {serv.icon}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {serv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="py-20 md:py-28 bg-slate-100/30 dark:bg-slate-950/20 border-t border-slate-150 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">Qualifications</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Education &amp; <span className="text-gradient font-bold">Growth</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {education.map((edu) => (
                <div 
                  key={edu.degree}
                  className={`p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 bg-white/70 dark:bg-slate-900/30 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200/50 dark:border-slate-800">
                      <Award className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-display font-bold text-[15px] sm:text-base text-slate-900 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/55 dark:border-slate-900/30 pt-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{edu.institution}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                      {edu.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 border-t border-slate-100/50 dark:border-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">Connect</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white">
                Get In <span className="text-gradient font-bold">Touch</span>
              </h2>
              <p className="text-slate-450 dark:text-slate-400 text-sm max-w-lg mt-3">
                Have an enterprise project or application request? Send a message and let's construct a system.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Information */}
              <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">Contact Information</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Submit the secure validation form or connect directly through phone, mail, or instant chat link.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Developer</span>
                      <span className="text-sm font-semibold text-slate-850 dark:text-slate-205">AFOLAYAN DAMI JOSHUA</span>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mobile Phone</span>
                      <a href="tel:09073412791" className="text-sm font-semibold text-slate-850 dark:text-slate-205 hover:text-emerald-500 transition-colors">0907 341 2791</a>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mail Correspondence</span>
                      <a href="mailto:jdami061@yahoo.com" className="text-sm font-semibold text-slate-850 dark:text-slate-250 hover:text-emerald-500 transition-colors">jdami061@yahoo.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-200/60 dark:border-slate-900/30 pt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Social Connections</span>
                  <div className="flex items-center gap-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-350 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-slate-950 hover:scale-105 hover:border-transparent transition-all duration-300"
                      aria-label="Github link"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-350 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-slate-950 hover:scale-105 hover:border-transparent transition-all duration-300"
                      aria-label="LinkedIn link"
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-350 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-slate-950 hover:scale-105 hover:border-transparent transition-all duration-300"
                      aria-label="Twitter link"
                    >
                      <Twitter className="w-4.5 h-4.5" />
                    </a>
                    <a 
                      href="https://wa.me/2349073412791" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 text-slate-700 dark:text-slate-350 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-950 dark:hover:bg-emerald-500 dark:hover:text-slate-950 hover:scale-105 hover:border-transparent transition-all duration-300"
                      aria-label="WhatsApp link"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                    </a>
                  </div>
                  <a 
                    href="https://wa.me/2349073412791" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full mt-3 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center gap-2 font-display font-semibold transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-lg shadow-green-500/10"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Form Input */}
              <div className="col-span-1 lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-900 pt-16 pb-8 transition-colors duration-300 relative z-25">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/60 dark:border-slate-900/60">
          
          <div className="flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-sky-500 text-slate-950 flex items-center justify-center font-black group-hover:scale-105 transition-transform duration-300 shadow-md shadow-emerald-500/20">
                D
              </span>
              <span className="text-slate-900 dark:text-white">DamiJTech</span>
            </a>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Constructing robust web applications, database tools, GIS networks, and automated workflows.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wide">Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#home" className="hover:text-emerald-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-500 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-emerald-500 transition-colors">Featured Projects</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wide">Developer Stack</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">React / Vite</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Tailwind CSS v4</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">C# / .NET Core</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Flutter / Dart Mobile</span></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wide">GIS Engineering</h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">GPS Field Enumeration</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Agricultural Mapping</span></li>
              <li><span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Data Collection APIs</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>© {new Date().getFullYear()} AFOLAYAN DAMI JOSHUA. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-emerald-500 transition-colors">DamiJTech Core</span>
            <span>·</span>
            <span className="hover:text-emerald-500 transition-colors">IT Consulting Framework</span>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-[fadeIn_0.3s_ease] z-40 focus:outline-none"
          aria-label="Scroll back to top"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
}
