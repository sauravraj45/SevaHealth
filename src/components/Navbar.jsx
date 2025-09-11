import { useState } from "react";
import {
  Heart,
  Menu,
  X,
  Stethoscope,
  Pill,
  Phone,
  AlertTriangle,
  UserCheck,
  Gift,
  Home,
  Plus,
  Video
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Home", icon: Home },
  { to:"/finder", label: "Symptom Checker", icon: Stethoscope },
  { to: "/videoCall", label: "Consultation", icon: Video },
  { to: "/remedies", label: "Remedies", icon: Pill },
  { to: "/emergency", label: "Emergency", icon: Phone },
  { to: "/sos", label: "SOS", icon: AlertTriangle },
  { to: "/second-review", label: "Second Opinion", icon: UserCheck },
  { to: "/charity", label: "Charity", icon: Gift }

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
        </button>

        {/* Logo Centered */}
        <div className="flex items-center gap-2 mx-auto lg:mx-0 cursor-pointer">
          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
            <Heart className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1
            className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)" }}
          >
            SevaHealth
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 font-medium shadow-md"
                      : "text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : ""}`} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-200">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <Heart className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Plus className="w-5 h-5 text-white" />
              </div>
            </div>
            <h1
              className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)" }}
            >
              SevaHealth
            </h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="px-4 py-6 flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
