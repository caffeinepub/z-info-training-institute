import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Battery,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
  Droplets,
  IndianRupee,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Settings,
  Smartphone,
  Star,
  Store,
  TrendingUp,
  Users,
  Wrench,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Scroll reveal hook
// ─────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );
    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─────────────────────────────────────────────
// Stat Counter Component
// ─────────────────────────────────────────────
function StatCounter({
  value,
  suffix = "",
  label,
  icon,
}: { value: number; suffix?: string; label: string; icon: React.ReactNode }) {
  const { count, ref } = useCounter(value);
  return (
    <div className="flex flex-col items-center text-center px-6 py-4">
      <div className="text-orange-500 mb-2">{icon}</div>
      <span
        ref={ref}
        className="text-3xl md:text-4xl font-extrabold text-white"
      >
        {count}
        {suffix}
      </span>
      <p className="text-sm md:text-base text-blue-200 mt-1 font-medium">
        {label}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Course Topics Data
// ─────────────────────────────────────────────
const topics = [
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Mobile Hardware Repairing",
    hindi:
      "मोबाइल के अंदर के सभी पार्ट्स जैसे बैटरी, चार्जिंग पोर्ट, कैमरा, स्पीकर आदि की मरम्मत सीखें।",
    english:
      "Learn to repair internal components like battery, charging port, camera, speaker and more.",
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Mobile Software / Flashing",
    hindi: "मोबाइल सॉफ्टवेयर प्रॉब्लम, फ्लैशिंग, IMEI रिपेयर और फर्मवेयर अपडेट सीखें।",
    english:
      "Learn software troubleshooting, flashing, IMEI repair and firmware updates.",
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    title: "Motherboard Chip Level Repairing",
    hindi: "मदरबोर्ड के IC, कैपेसिटर, डायोड और ट्रांजिस्टर लेवल की रिपेयरिंग सीखें।",
    english:
      "Master IC, capacitor, diode and transistor level motherboard repairs.",
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Water Damage Repair",
    hindi:
      "पानी से खराब हुए मोबाइल को ठीक करना, ऑक्सीडेशन हटाना और पार्ट्स बचाना सीखें।",
    english:
      "Learn to restore water-damaged phones, remove oxidation and salvage components.",
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    title: "Display & Touch Replacement",
    hindi: "LCD, AMOLED और टच स्क्रीन को बदलना और बाइंडिंग करना सीखें।",
    english:
      "Learn to replace LCD, AMOLED and touch screens with perfect bonding.",
  },
  {
    icon: <Battery className="w-7 h-7" />,
    title: "Battery & Charging Issues",
    hindi: "बैटरी स्वेलिंग, चार्जिंग नहीं होना, फास्ट ड्रेन जैसी समस्याएं ठीक करना सीखें।",
    english:
      "Diagnose and fix battery swelling, charging failures and fast drain issues.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Tools & Equipment Usage",
    hindi:
      "SMD स्टेशन, मल्टीमीटर, हॉट एयर गन और सभी प्रोफेशनल टूल्स का सही उपयोग सीखें।",
    english:
      "Master SMD station, multimeter, hot air gun and all professional repair tools.",
  },
  {
    icon: <Store className="w-7 h-7" />,
    title: "Business & Shop Management",
    hindi:
      "अपनी खुद की मोबाइल रिपेयरिंग शॉप कैसे शुरू करें, GST, बिलिंग और कस्टमर मैनेजमेंट सीखें।",
    english:
      "Learn to start your own repair shop, GST registration, billing and customer management.",
  },
];

// ─────────────────────────────────────────────
// Students Data
// ─────────────────────────────────────────────
const students = [
  {
    name: "Sakir Bhai",
    city: "Muzaffarpur",
    salary: "₹48,000",
    quote: "Z.info में training करने के बाद मेरी खुद की shop है।",
    initials: "SB",
  },
  {
    name: "Arjun Kumar",
    city: "Patna",
    salary: "₹45,000",
    quote: "90 दिनों में expert बन गया, 100% placement मिली।",
    initials: "AK",
  },
  {
    name: "Rahul Singh",
    city: "Hajipur",
    salary: "₹42,000",
    quote: "Best institute in Bihar for mobile repairing.",
    initials: "RS",
  },
  {
    name: "Mohammad Raza",
    city: "Vaishali",
    salary: "₹50,000",
    quote: "Chip level repairing सीखकर बड़े jobs मिले।",
    initials: "MR",
  },
  {
    name: "Priya Sharma",
    city: "Samastipur",
    salary: "₹40,000",
    quote: "पहले कुछ नहीं था, आज ₹40K कमा रही हूँ।",
    initials: "PS",
  },
  {
    name: "Imran Khan",
    city: "Chapra",
    salary: "₹46,000",
    quote: "Z.info की training से career बदल गया।",
    initials: "IK",
  },
  {
    name: "Deepak Yadav",
    city: "Begusarai",
    salary: "₹44,000",
    quote: "Job guarantee सच में मिली, thankful हूँ।",
    initials: "DY",
  },
  {
    name: "Farhan Ali",
    city: "Sitamarhi",
    salary: "₹52,000",
    quote: "Chip level expert बनकर Dubai offer भी आया।",
    initials: "FA",
  },
];

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-orange-500",
];

export default function App() {
  useScrollReveal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "About Us", href: "#about" },
    { label: "Students", href: "#students" },
    { label: "Placements", href: "#students" },
    { label: "Contact", href: "#enquiry" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setFormError("Please fill in your name and mobile number.");
      return;
    }
    setFormError("");
    setSubmitted(true);
  }

  return (
    <div className="font-poppins min-h-screen bg-white">
      {/* ── TOP BAR ── */}
      <div className="bg-[#0B1F3B] text-white text-xs py-2 px-4 text-center">
        <span className="inline-flex items-center gap-4 flex-wrap justify-center">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-400" />
            Hajipur, Vaishali, Bihar
          </span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a
            href="tel:8340505173"
            className="flex items-center gap-1 hover:text-orange-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-orange-400" /> 8340505173
          </a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a
            href="tel:7970727771"
            className="flex items-center gap-1 hover:text-orange-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-orange-400" /> 7970727771
          </a>
          <span className="hidden sm:inline text-gray-500">|</span>
          <a
            href="https://youtube.com/@Z.info7771"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-orange-300 transition-colors"
          >
            <Youtube className="w-3 h-3 text-red-400" /> Z.info7771
          </a>
        </span>
      </div>

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] flex items-center justify-center">
              <span className="text-orange-400 font-extrabold text-lg">Z</span>
            </div>
            <div>
              <span className="font-extrabold text-xl text-[#0B1F3B]">
                Z.info
              </span>
              <div className="text-[10px] text-gray-500 leading-none">
                Mobile Training
              </div>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors relative group"
                  data-ocid="nav.link"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a href="#enquiry" data-ocid="nav.primary_button">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 font-semibold shadow-orange transition-all hover:shadow-lg">
                Free Demo
              </Button>
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 py-2 border-b border-gray-50"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold mt-2"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.hash = "enquiry";
              }}
              data-ocid="nav.primary_button"
            >
              Free Demo
            </Button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-[#EAF5FF] via-white to-[#F0F7FF] pt-16 pb-20"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(circle at 70% 50%, #0B1F3B 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-6 animate-float">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-600 font-semibold text-sm">
                🎉 2 Days FREE Demo Class Available!
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-[#0B1F3B]">Z.info</span>
              <br />
              <span className="text-orange-500">MOBILE</span>
              <br />
              <span className="text-[#0B1F3B]">TRAINING</span>
              <br />
              <span className="text-[#1F5E8D]">INSTITUTE</span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-[#0B1F3B] mb-2">
              बने मोबाइल इंजीनियर मात्र 90 दिनों में
            </p>
            <p className="text-lg text-orange-500 font-semibold italic mb-6">
              "हुनर है तो कदर है"
            </p>

            <p className="text-gray-600 mb-8 max-w-xl leading-relaxed">
              Join Bihar's most trusted mobile repairing institute. Get hands-on
              training, 100% job guarantee, and start earning{" "}
              <strong>₹40,000–₹50,000+</strong> per month.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="tel:8340505173" data-ocid="hero.primary_button">
                <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-base font-bold shadow-orange hover:shadow-xl transition-all hover:scale-105">
                  <Phone className="w-5 h-5" />
                  Call Now: 8340505173
                </Button>
              </a>
              <a
                href="https://youtube.com/@Z.info7771"
                target="_blank"
                rel="noreferrer"
                data-ocid="hero.secondary_button"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-2 border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white rounded-full px-8 py-6 text-base font-bold transition-all hover:scale-105"
                >
                  <Youtube className="w-5 h-5" />
                  Watch on YouTube
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                {
                  label: "90 Days Course",
                  icon: <Clock className="w-4 h-4" />,
                },
                {
                  label: "100% Job Guarantee",
                  icon: <CheckCircle className="w-4 h-4" />,
                },
                {
                  label: "1000+ Students",
                  icon: <Users className="w-4 h-4" />,
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-card border border-gray-100"
                >
                  <span className="text-orange-500">{badge.icon}</span>
                  <span className="text-xs font-semibold text-gray-700">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-gradient-to-br from-[#0B1F3B] to-[#1F5E8D] flex items-center justify-center shadow-2xl animate-float">
                <div className="text-center text-white">
                  <div className="text-7xl mb-4">📱</div>
                  <p className="text-2xl font-extrabold">Become a</p>
                  <p className="text-orange-400 text-3xl font-extrabold">
                    Mobile Expert
                  </p>
                  <p className="text-lg mt-2 opacity-80">in just 90 Days!</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card p-3 border border-orange-100">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Monthly Salary</p>
                    <p className="font-bold text-sm text-green-600">
                      ₹40K–50K+
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card p-3 border border-blue-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-500">Placement</p>
                    <p className="font-bold text-sm text-orange-600">
                      100% Guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0B1F3B] py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <StatCounter
            value={90}
            suffix=" Days"
            label="Course Duration"
            icon={<Clock className="w-8 h-8" />}
          />
          <StatCounter
            value={100}
            suffix="%"
            label="Job Guarantee"
            icon={<CheckCircle className="w-8 h-8" />}
          />
          <StatCounter
            value={50}
            suffix="K+"
            label="Monthly Salary"
            icon={<IndianRupee className="w-8 h-8" />}
          />
          <StatCounter
            value={1000}
            suffix="+"
            label="Students Trained"
            icon={<Users className="w-8 h-8" />}
          />
        </div>
      </section>

      {/* ── ABOUT / CAREER SCOPE ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Career Opportunity
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] mb-3">
              Mobile Repairing –{" "}
              <span className="text-orange-500">
                India का सबसे तेज़ Growing Career
              </span>
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 reveal">
              <p className="text-gray-700 leading-relaxed text-lg">
                India is home to{" "}
                <strong className="text-[#0B1F3B]">
                  750 million+ smartphone users
                </strong>
                , and this number grows by millions every year. With every new
                phone sold, the demand for skilled repair technicians
                skyrockets. Over{" "}
                <strong className="text-[#0B1F3B]">
                  150 million phones are repaired annually
                </strong>{" "}
                in India alone — a market worth thousands of crores of rupees.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Unlike other professions that require years of expensive
                degrees, mobile repairing offers{" "}
                <strong className="text-[#0B1F3B]">
                  financial independence in just 90 days
                </strong>
                . Skilled technicians earn ₹40,000–₹50,000+ per month, and those
                with chip-level expertise are even getting international
                opportunities in the Gulf and beyond.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                The best part? You can{" "}
                <strong className="text-[#0B1F3B]">start your own shop</strong>,
                work from home, or join a service center. Bihar's youth are now
                choosing mobile repairing as their path to a better future — and
                Z.info is leading that transformation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal">
              {[
                {
                  icon: <Smartphone className="w-8 h-8" />,
                  stat: "750M+",
                  label: "Smartphone Users in India",
                },
                {
                  icon: <Wrench className="w-8 h-8" />,
                  stat: "150M+",
                  label: "Phones Repaired Annually",
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  stat: "₹50K+",
                  label: "Monthly Earning Potential",
                },
                {
                  icon: <Store className="w-8 h-8" />,
                  stat: "5 Lac+",
                  label: "Repair Shops Across India",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#EAF5FF] rounded-2xl p-5 card-hover"
                >
                  <div className="text-orange-500 mb-2">{item.icon}</div>
                  <p className="text-2xl font-extrabold text-[#0B1F3B]">
                    {item.stat}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE TOPICS ── */}
      <section id="courses" className="py-20 bg-[#F4FBFF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] mb-3">
              Our Top <span className="text-orange-500">Courses</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Complete hands-on training covering every aspect of mobile
              repairing
            </p>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, i) => (
              <div
                key={topic.title}
                className="bg-white rounded-2xl p-6 shadow-card card-hover border border-gray-100 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B1F3B] to-[#1F5E8D] flex items-center justify-center text-white mb-4">
                  {topic.icon}
                </div>
                <h3 className="font-bold text-[#0B1F3B] mb-3 text-base leading-snug">
                  {topic.title}
                </h3>
                <p className="text-orange-600 text-sm mb-2 leading-relaxed font-medium">
                  {topic.hindi}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {topic.english}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT SUCCESS ── */}
      <section id="students" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] mb-3">
              हमारे Students की{" "}
              <span className="text-orange-500">Success Stories</span>
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((student, i) => (
              <div
                key={student.name}
                className="bg-white rounded-2xl p-5 shadow-card card-hover border border-gray-100 reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
                data-ocid={`students.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {student.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1F3B] text-sm">
                      {student.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {student.city}, Bihar
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed mb-3">
                  "{student.quote}"
                </p>
                <div className="bg-green-50 rounded-xl px-3 py-2 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Monthly Earning</p>
                    <p className="font-extrabold text-green-700 text-sm">
                      {student.salary}/month
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-[#F47C20] via-[#FF8A2A] to-[#F47C20] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center text-white reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            अभी Join करें और अपना Future Secure करें!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            2 Days FREE Demo • 90 Days Full Course • 100% Job Guarantee •
            ₹40K–50K+ Salary
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:8340505173" data-ocid="promo.primary_button">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 rounded-full px-8 py-6 text-base font-bold shadow-lg transition-all hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                Call: 8340505173
              </Button>
            </a>
            <a href="#enquiry" data-ocid="promo.secondary_button">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-full px-8 py-6 text-base font-bold transition-all hover:scale-105"
              >
                Register Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquiry" className="py-20 bg-[#F4FBFF]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#0B1F3B] rounded-3xl p-8 sm:p-10 shadow-2xl reveal">
            <div className="text-center mb-8">
              <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Free Demo
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                ENQUIRE NOW
              </h2>
              <p className="text-blue-200">Free Demo के लिए Register करें</p>
            </div>

            {submitted ? (
              <div
                className="text-center py-8"
                data-ocid="enquiry.success_state"
              >
                <div className="text-6xl mb-4">✅</div>
                <p className="text-white text-xl font-bold mb-2">
                  आपका Registration हो गया!
                </p>
                <p className="text-blue-200">हम जल्द आपसे संपर्क करेंगे।</p>
                <Button
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", mobile: "", address: "" });
                  }}
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="text-blue-200 text-sm font-medium block mb-1.5"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="enquiry-name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-orange-400 rounded-xl"
                    data-ocid="enquiry.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquiry-mobile"
                    className="text-blue-200 text-sm font-medium block mb-1.5"
                  >
                    Mobile Number *
                  </label>
                  <Input
                    id="enquiry-mobile"
                    placeholder="Enter your mobile number"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, mobile: e.target.value }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-orange-400 rounded-xl"
                    data-ocid="enquiry.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="enquiry-address"
                    className="text-blue-200 text-sm font-medium block mb-1.5"
                  >
                    Your Address
                  </label>
                  <Textarea
                    id="enquiry-address"
                    placeholder="Village/Town, District, State"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, address: e.target.value }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-orange-400 rounded-xl resize-none"
                    rows={3}
                    data-ocid="enquiry.textarea"
                  />
                </div>
                {formError && (
                  <p
                    className="text-red-300 text-sm"
                    data-ocid="enquiry.error_state"
                  >
                    {formError}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6 text-base font-bold shadow-orange transition-all hover:scale-105 hover:shadow-xl mt-2"
                  data-ocid="enquiry.submit_button"
                >
                  Register for FREE Demo
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── YOUTUBE BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-3xl mx-auto px-4 text-center text-white reveal">
          <Youtube className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            हमारे YouTube Channel को Subscribe करें
          </h2>
          <p className="text-red-200 mb-6">
            Free tutorials, tips, and tricks for mobile repairing – all in
            Hindi!
          </p>
          <a
            href="https://youtube.com/@Z.info7771"
            target="_blank"
            rel="noreferrer"
            data-ocid="youtube.primary_button"
          >
            <Button className="bg-white text-red-600 hover:bg-red-50 rounded-full px-8 py-5 text-base font-bold shadow-lg transition-all hover:scale-105">
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe @Z.info7771
            </Button>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0B1F3B] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-extrabold text-lg">Z</span>
                </div>
                <span className="font-extrabold text-xl">Z.info</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed mb-3">
                Z.info Mobile Training Institute
              </p>
              <p className="text-blue-200 text-sm italic mb-4">
                "हुनर है तो कदर है"
              </p>
              <div className="flex items-start gap-2 text-blue-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" />
                <span>Hajipur, Vaishali, Bihar</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:8340505173"
                  className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-orange-400" /> 8340505173
                </a>
                <a
                  href="tel:7970727771"
                  className="flex items-center gap-2 text-blue-200 hover:text-orange-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-orange-400" /> 7970727771
                </a>
                <a
                  href="https://youtube.com/@Z.info7771"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200 hover:text-red-400 transition-colors text-sm"
                >
                  <Youtube className="w-4 h-4 text-red-400" /> @Z.info7771
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-blue-200 hover:text-orange-400 transition-colors text-sm flex items-center gap-1.5"
                      data-ocid="footer.link"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">
                Highlights
              </h4>
              <div className="space-y-2">
                {[
                  "2 Days FREE Demo",
                  "90 Days Full Course",
                  "100% Job Guarantee",
                  "₹40K–50K+ Salary",
                  "Chip Level Training",
                  "Business Setup Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-blue-200 text-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-blue-300 text-sm">
              © {new Date().getFullYear()} Z.info Mobile Training Institute. All
              rights reserved.
            </p>
            <p className="text-blue-400 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CALL BUTTON ── */}
      <a
        href="tel:8340505173"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-orange animate-pulse-ring transition-all hover:scale-110"
        data-ocid="floating.primary_button"
        aria-label="Call 8340505173"
      >
        <Phone className="w-7 h-7" />
      </a>
    </div>
  );
}
