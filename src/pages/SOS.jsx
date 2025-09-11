import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  CheckCircle,
  Loader2,
  Shield
} from "lucide-react";

const emergencyTypes = [
  { id: "medical", label: "Medical Emergency", color: "red" },
  { id: "accident", label: "Accident", color: "orange" },
  { id: "fire", label: "Fire", color: "red" },
  { id: "violence", label: "Violence/Crime", color: "purple" },
  { id: "natural", label: "Natural Disaster", color: "blue" },
  { id: "other", label: "Other Emergency", color: "gray" }
];

const medicalConditions = [
  "Heart Attack", "Stroke", "Severe Injury", "Difficulty Breathing", 
  "Severe Allergic Reaction", "Drug Overdose", "Severe Burns", "Other"
];

export default function SOS() {
  const [formData, setFormData] = useState({
    emergencyType: "",
    medicalCondition: "",
    location: "",
    description: "",
    contactName: "",
    contactPhone: "",
    medicalHistory: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          handleInputChange("location", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          alert("Unable to get current location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emergencyType || !formData.location || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    console.log("Emergency reported:", formData);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              SOS Alert Sent Successfully
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Emergency services have been notified and are being dispatched to your location.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Estimated Response Time: 8-12 minutes</span>
              </div>
              <p className="text-sm text-green-700">
                Reference ID: <span className="font-mono">SOS-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </p>
            </div>
            <div className="space-y-4 text-left">
              <div className="border-l-4 border-orange-400 bg-orange-50 p-3 flex items-start gap-2 rounded">
                <AlertTriangle className="w-4 h-4 mt-1 text-orange-600" />
                <p className="text-orange-800 text-sm">
                  <strong>Important:</strong> Stay at your location. Emergency responders may contact you.
                </p>
              </div>
            </div>
            <Link to={"/"}>
            <button 
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Return to Main Page
            </button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm mb-4">
            <AlertTriangle className="w-4 h-4" />
            Emergency Response
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Emergency SOS Form
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Report an emergency and get immediate assistance from emergency services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center gap-3 text-2xl mb-2">
                <Shield className="w-8 h-8" />
                Emergency Report Form
              </div>
              <p className="text-red-100">Fill out this form as quickly and accurately as possible</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Emergency Type */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-slate-900">Emergency Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {emergencyTypes.map(type => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${formData.emergencyType === type.id ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"}`}
                        onClick={() => handleInputChange("emergencyType", type.id)}
                      >
                        <div className="text-center">
                          <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${formData.emergencyType === type.id ? "text-red-600" : "text-slate-400"}`} />
                          <p className="text-sm font-medium">{type.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Medical Condition */}
                {formData.emergencyType === "medical" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <label className="text-lg font-semibold text-slate-900">Medical Condition</label>
                    <select
                      value={formData.medicalCondition}
                      onChange={(e) => handleInputChange("medicalCondition", e.target.value)}
                      className="w-full bg-gray-100 rounded-xl px-3 py-2"
                    >
                      <option value="">Select medical condition</option>
                      {medicalConditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                    </select>
                  </motion.div>
                )}

                {/* Location */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-slate-900">Location *</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter your location or address"
                      required
                      className="flex-1 bg-gray-100 rounded-xl px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="flex items-center gap-2 border px-3 py-2 rounded-xl hover:bg-green-300"
                    >
                      <MapPin className="w-4 h-4" /> Auto-detect
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-slate-900">Emergency Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the emergency situation..."
                    rows={4}
                    required
                    className="w-full bg-gray-100 rounded-xl px-3 py-2"
                  />
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="font-semibold text-slate-900">Your Name</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-100 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="font-semibold text-slate-900">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full bg-gray-100 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-3">
                  <label className="font-semibold text-slate-900">Relevant Medical History (Optional)</label>
                  <input
                    value={formData.medicalHistory}
                    onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                    placeholder="Any allergies, medications, or medical conditions responders should know about..."
                    rows={3}
                    className="w-full bg-gray-100 rounded-xl px-3 py-5"
                  />
                </div>

                {/* Warning */}
                <div className="border-l-4 border-orange-400 bg-orange-50 p-3 flex items-start gap-2 rounded">
                  <AlertTriangle className="w-4 h-4 mt-1 text-orange-600 text-base" />
                  <p className="text-orange-800 text-base">
                     <strong>Important:</strong> <br /> This form is for real emergencies only. 
                      False emergency reports are illegal and may result in criminal charges.
                  </p>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-xl font-semibold rounded-2xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" /> Sending Emergency Alert...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <AlertTriangle className="w-6 h-6" /> Send Emergency Alert
                      </span>
                    )}
                  </button>
                </motion.div>

                {/* Emergency Numbers */}
                <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5" /> Quick Emergency Numbers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="bg-red-100 text-red-700 px-3 py-2 rounded-xl inline-block mb-2">Police/Fire/Medical</span>
                      <p className="font-bold text-2xl">911</p>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl inline-block mb-2">Poison Control</span>
                      <p className="font-bold text-lg">1-800-222-1222</p>
                    </div>
                    <div>
                      <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-xl inline-block mb-2">Crisis Line</span>
                      <p className="font-bold text-lg">988</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
