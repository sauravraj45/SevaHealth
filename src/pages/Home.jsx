import { Heart, Shield, Clock, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import QuickActions from "./QuickActions";
import TrustedPartner from "./TrustedPartner";


export default function Home() {
  const benefits = [
    { icon: Zap, text: "AI-Powered Diagnosis", color: "text-blue-600" },
    { icon: Clock, text: "24/7 Support", color: "text-emerald-600" },
    { icon: Shield, text: "Secure & Private", color: "text-purple-600" },
    { icon: Heart, text: "Expert Care", color: "text-red-500" }
  ];

  return (
    <>
    <section className="relative  bg-gradient-to-br from-blue-50 to-purple-50 flex  justify-center  p-10 overflow-hidden text-center">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-emerald-400/30 animate-spin-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 rounded-full blur-3xl opacity-15 bg-gradient-radial from-emerald-400/30 via-blue-300/20 to-transparent animate-pulse-slow" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-3xl space-y-10">

        {/* Headline */}
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-snug">
          Your Health,
          <br />
          <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Our Priority
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-light">
          Experience next-generation healthcare with <span className="font-semibold text-blue-600">AI-powered diagnostics</span>, world-class medical experts, and instant emergency support.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4 justify-center max-w-lg mx-auto">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center justify-start gap-3 px-3 py-3 bg-white rounded-2xl">
                <Icon className={`w-5 h-5 ${b.color}`} />
                <span className="text-base font-medium text-slate-700">{b.text}</span>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link to={"/finder"}>
          <button className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-lg flex items-center gap-3 justify-center">
            <Heart className="w-6 h-6" /> Start Health Checkup <Sparkles className="w-5 h-5 animate-pulse" />
          </button>
          </Link>

          <Link to={"/emergency"}>
          <button className="relative border-2 border-emerald-500 text-emerald-700 px-10 py-5 text-lg font-semibold rounded-2xl flex items-center gap-3 justify-center hover:shadow-lg">
            <Shield className="w-6 h-6 animate-pulse" /> Emergency SOS <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          </Link>
        </div>
      </div>
    </section>
    < QuickActions />
    <TrustedPartner />

    </>

   
  );
}
