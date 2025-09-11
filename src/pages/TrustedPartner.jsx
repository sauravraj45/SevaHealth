import { 
  Shield, 
  Award, 
  Users, 
  Star, 
  CheckCircle, 
  Lock,
  Globe,
  Heart,
  Zap
} from "lucide-react";

const certifications = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your data is protected with enterprise-grade security",
    color: "blue"
  },
  {
    icon: Award,
    title: "ISO 27001 Certified",
    description: "International security management standards",
    color: "emerald"
  },
  {
    icon: Lock,
    title: "256-bit Encryption",
    description: "Bank-level security for all communications",
    color: "purple"
  },
  {
    icon: Globe,
    title: "GDPR Compliant",
    description: "European data protection standards",
    color: "indigo"
  }
];

const stats = [
  {
    icon: Users,
    value: "500,000+",
    label: "Patients Served",
    color: "blue"
  },
  {
    icon: Heart,
    value: "1M+",
    label: "Health Assessments",
    color: "red"
  },
  {
    icon: CheckCircle,
    value: "99.9%",
    label: "Uptime Guarantee",
    color: "emerald"
  },
  {
    icon: Zap,
    value: "24/7",
    label: "Emergency Support",
    color: "orange"
  }
];

export default function TrustedPartner() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Trust Header */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-semibold rounded-full">
            <Shield className="w-4 h-4" />
            Trusted & Secure
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Your Privacy & Security <span className="gradient-text">Guaranteed</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We maintain the highest standards of data protection and medical privacy, 
            certified by leading international security organizations.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div key={cert.title} className="group">
                <div className="glass p-6 rounded-2xl text-center h-full relative overflow-hidden hover:shadow-glow transition-all duration-500">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    cert.color === 'blue' ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5' :
                    cert.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5' :
                    cert.color === 'purple' ? 'bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5' :
                    'bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/5'
                  }`} />
                  
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow relative z-10 ${
                    cert.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    cert.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                    cert.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    'bg-gradient-to-br from-indigo-500 to-indigo-600'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`font-bold text-lg mb-2 relative z-10 ${
                    cert.color === 'blue' ? 'text-slate-900 group-hover:text-blue-700' :
                    cert.color === 'emerald' ? 'text-slate-900 group-hover:text-emerald-700' :
                    cert.color === 'purple' ? 'text-slate-900 group-hover:text-purple-700' :
                    'text-slate-900 group-hover:text-indigo-700'
                  }`}>
                    {cert.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    {cert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Trusted by Healthcare Professionals Worldwide
          </h3>
          <p className="text-lg text-slate-600 mb-12">
            Our platform serves millions of patients with industry-leading reliability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center group">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  stat.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                  stat.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                  'bg-gradient-to-br from-orange-500 to-orange-600'
                }`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'emerald' ? 'text-emerald-600' :
                  'text-orange-600'
                }`}>
                  {stat.value}
                </div>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9/5 Patient Rating</span>
          </div>
          <div className="w-px h-6 bg-slate-300" />
          <div className="flex items-center gap-2 text-slate-600">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="font-semibold">FDA Approved</span>
          </div>
          <div className="w-px h-6 bg-slate-300" />
          <div className="flex items-center gap-2 text-slate-600">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Healthcare Excellence Award 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
