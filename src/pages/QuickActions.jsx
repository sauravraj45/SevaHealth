import { Heart, Stethoscope, Phone, AlertTriangle, Pill, UserCheck, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    id: "symptom-check",
    title: "Quick Symptom Check",
    description: "AI-powered analysis in 2 minutes",
    icon: Stethoscope,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    to:"/finder"
  },
  {
    id: "emergency",
    title: "Emergency SOS",
    description: "Instant emergency assistance",
    icon: AlertTriangle,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
     to:"/emergency"
  },
  {
    id: "remedies",
    title: "Natural Remedies",
    description: "Find natural healing solutions",
    icon: Pill,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
     to:"/remedies"
  },
  {
    id: "doctor",
    title: "Doctor Consultation",
    description: "Get expert medical advice",
    icon: UserCheck,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
     to:"/second-review"
  }
];

export default function QuickActions() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 relative">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
            <Zap className="w-4 h-4" /> Quick Access
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Your Health, One Click Away
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Access essential healthcare services instantly with our quick action panel
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className={` p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{action.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{action.description}</p>
                <Link to={action.to}>
                <button
                  onClick={() => scrollToSection(action.href)}
                  className={`w-full px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r ${action.color} hover:opacity-90 transition-all flex items-center justify-center`}
                >
                  Get Started <Heart className="w-4 h-4 inline-block ml-1" />
                </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Emergency CTA */}
        <div className="mt-12">
          <p className="text-slate-600 mb-4">
            Need immediate assistance? Our emergency hotline is available 24/7
          </p>
          <button
            onClick={() => scrollToSection("#emergency-contacts")}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg transition-all flex items-center justify-center mx-auto"
          >
            <Phone className="w-5 h-5 mr-2" /> Emergency Contacts <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">24/7</span>
          </button>
        </div>
      </div>
    </section>
  );
}
