import { useState } from "react";
import { Phone, MapPin, Star, Search, AlertTriangle, Heart, Building2, Navigation, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function Emergency() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("emergency");

  const emergencyServices = [
    { id: 1, name: "Emergency Medical Services", phone: "911", available: "24/7", description: "Immediate medical emergency response" },
    { id: 2, name: "Poison Control Center", phone: "1-800-222-1222", available: "24/7", description: "Poison emergency and information" },
    { id: 3, name: "Crisis Text Line", phone: "Text HOME to 741741", available: "24/7", description: "Mental health crisis support" }
  ];

  const hospitals = [
    { id: 1, name: "City General Hospital", address: "123 Medical Center Dr", phone: "(555) 123-4567", distance: "0.8 miles", rating: 4.8, specialties: ["Emergency", "Cardiology", "Neurology"], available: "24/7" },
    { id: 2, name: "St. Mary's Medical Center", address: "456 Healthcare Ave", phone: "(555) 234-5678", distance: "1.2 miles", rating: 4.6, specialties: ["Emergency", "Pediatrics", "Surgery"], available: "24/7" },
    { id: 3, name: "Regional Health Clinic", address: "789 Wellness Blvd", phone: "(555) 345-6789", distance: "2.1 miles", rating: 4.4, specialties: ["Family Medicine", "Urgent Care"], available: "7 AM - 10 PM" }
  ];

  const pharmacies = [
    { id: 1, name: "24/7 Pharmacy Plus", address: "321 Main Street", phone: "(555) 456-7890", distance: "0.5 miles", rating: 4.7, available: "24/7", services: ["Prescriptions", "Emergency Refills", "Consultations"] },
    { id: 2, name: "HealthCare Pharmacy", address: "654 Oak Avenue", phone: "(555) 567-8901", distance: "0.9 miles", rating: 4.5, available: "6 AM - 11 PM", services: ["Prescriptions", "Vaccinations", "Health Screenings"] }
  ];

  const tabs = [
    { id: "emergency", label: "Emergency", icon: AlertTriangle },
    { id: "hospitals", label: "Hospitals", icon: Building2 },
    { id: "pharmacies", label: "Pharmacies", icon: Heart }
  ];

  const handleCall = (phone, name) => {
    alert(`Calling ${name} at ${phone}`);
  };

  const handleDirections = (name) => {
    alert(`Getting directions to ${name}`);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm mb-4">
            <AlertTriangle className="w-4 h-4" /> Emergency Ready
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">Emergency Contacts</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Quick access to emergency services, hospitals, and pharmacies in your area</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border rounded-2xl w-full py-3"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                      selectedTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div key={selectedTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {selectedTab === "emergency" && (
            <div className="space-y-4">
              {emergencyServices.map((service) => (
                <div key={service.id} className="border shadow-lg rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{service.name}</h3>
                        <p className="text-sm text-slate-600">{service.description}</p>
                      </div>
                    </div>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{service.available}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" /> {service.phone}
                    </div>
                    <button onClick={() => handleCall(service.phone, service.name)} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
                      <PhoneCall className="w-4 h-4" /> Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === "hospitals" && (
            <div className="grid md:grid-cols-2 gap-6">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="border shadow-lg rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{hospital.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" /> {hospital.rating}
                        </div>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{hospital.available}</span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex gap-2 items-center"><MapPin className="w-4 h-4" /> {hospital.address}</div>
                    <div className="flex gap-2 items-center"><Navigation className="w-4 h-4" /> {hospital.distance}</div>
                    <div className="flex gap-2 items-center"><Phone className="w-4 h-4" /> {hospital.phone}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((s) => <span key={s} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{s}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleCall(hospital.phone, hospital.name)} className="flex-1 border px-4 py-2 rounded flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call
                    </button>
                    <button onClick={() => handleDirections(hospital.name)} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                      <Navigation className="w-4 h-4" /> Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === "pharmacies" && (
            <div className="grid md:grid-cols-2 gap-6">
              {pharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="border shadow-lg rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{pharmacy.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" /> {pharmacy.rating}
                        </div>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{pharmacy.available}</span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex gap-2 items-center"><MapPin className="w-4 h-4" /> {pharmacy.address}</div>
                    <div className="flex gap-2 items-center"><Navigation className="w-4 h-4" /> {pharmacy.distance}</div>
                    <div className="flex gap-2 items-center"><Phone className="w-4 h-4" /> {pharmacy.phone}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pharmacy.services.map((s) => <span key={s} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{s}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleCall(pharmacy.phone, pharmacy.name)} className="flex-1 border px-4 py-2 rounded flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call
                    </button>
                    <button onClick={() => handleDirections(pharmacy.name)} className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2">
                      <Navigation className="w-4 h-4" /> Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
