import React, { useState } from "react";
import {
  UserCheck,
  Star,
  MessageSquare,
  Upload,
  CheckCircle,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    experience: "15+ years",
    rating: 4.9,
    consultations: 1250,
    availability: "Available now",
    price: "$75",
    image: "https://via.placeholder.com/100",
    qualifications: ["MD - Harvard Medical School", "Board Certified Internal Medicine"],
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    experience: "12+ years",
    rating: 4.8,
    consultations: 980,
    availability: "Available in 30 mins",
    price: "$95",
    image: "https://via.placeholder.com/100",
    qualifications: ["MD - Johns Hopkins", "Fellowship in Cardiology"],
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    experience: "10+ years",
    rating: 4.9,
    consultations: 1100,
    availability: "Available tomorrow",
    price: "$85",
    image: "https://via.placeholder.com/100",
    qualifications: ["MD - Stanford Medical", "Board Certified Dermatology"],
    languages: ["English", "Spanish", "Portuguese"],
  },
];

const specialties = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Psychiatry",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Oncology",
  "Endocrinology",
];

export default function SecondOpinion() {
  const [consultationData, setConsultationData] = useState({
    specialty: "",
    symptoms: "",
    duration: "",
    previousDiagnosis: "",
    currentMedications: "",
    additionalNotes: "",
    urgency: "routine",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setConsultationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map((file) => file.name);
    setUploadedFiles((prev) => [...prev, ...fileNames]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!consultationData.specialty || !consultationData.symptoms) {
      alert("Please fill in required fields.");
      return;
    }
    setStep(2);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };

  const handleBooking = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert(`Consultation booked with ${selectedDoctor.name}!`);
    setStep(1);
    setConsultationData({
      specialty: "",
      symptoms: "",
      duration: "",
      previousDiagnosis: "",
      currentMedications: "",
      additionalNotes: "",
      urgency: "routine",
    });
    setSelectedDoctor(null);
    setUploadedFiles([]);
  };

  // Step 1: Form
  const renderStep1 = () => (
    <div className="border rounded-2xl shadow-lg p-6 bg-white">
      <h2 className="flex items-center gap-2 text-2xl font-semibold mb-2">
        <MessageSquare className="w-7 h-7 text-blue-600" />
        Consultation Request
      </h2>
      <p className="text-gray-600 mb-6">Tell us about your condition to find the right specialist</p>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Medical Specialty *</label>
          <select
            value={consultationData.specialty}
            onChange={(e) => handleInputChange("specialty", e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-3"
          >
            <option value="">Select medical specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Current Symptoms *</label>
          <input
            value={consultationData.symptoms}
            onChange={(e) => handleInputChange("symptoms", e.target.value)}
            placeholder="Describe your symptoms in detail..."
            className="w-full bg-gray-100 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Duration of Symptoms</label>
          <select
            value={consultationData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-3"
          >
            <option value="">How long have you had these symptoms?</option>
            <option value="1-3 days">1-3 days</option>
            <option value="1 week">1 week</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3+ months">3+ months</option>
            <option value="chronic">Chronic condition</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Previous Diagnosis</label>
          <input
            value={consultationData.previousDiagnosis}
            onChange={(e) => handleInputChange("previousDiagnosis", e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-3"
            placeholder="Any previous diagnosis from other doctors..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Current Medications</label>
          <input
            value={consultationData.currentMedications}
            onChange={(e) => handleInputChange("currentMedications", e.target.value)}
            className="w-full bg-gray-100 rounded-xl p-3"
            placeholder="List all medications you're currently taking..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Medical Reports (Optional)</label>
          <div className="border-2 border-dashed p-6 rounded-xl text-center">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Drag & drop files here, or click to browse.</p>
            <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer bg-white text-blue-600 px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-100">Choose Files</label>
            {uploadedFiles.length > 0 && (
              <ul className="mt-2 text-left">
                {uploadedFiles.map((file, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Urgency Level</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "routine", label: "Routine", desc: "Non-urgent consultation" },
              { id: "urgent", label: "Urgent", desc: "Need consultation today" },
              { id: "emergency", label: "Emergency", desc: "Immediate attention needed" },
            ].map(option => (
              <div key={option.id} onClick={() => handleInputChange("urgency", option.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer text-center ${
                  consultationData.urgency === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-gray-600">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-2xl text-lg">Find Specialists</button>
      </form>
    </div>
  );

  // Step 2: Select Doctor
  const renderStep2 = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">
        Available Specialists
      </h3>
      <p className="text-gray-600">
        Choose a doctor for your {consultationData.specialty} consultation
      </p>
    </div>
    <div className="flex flex-col gap-6">
      {doctors
        .filter(
          (doc) =>
            consultationData.specialty === "General Medicine" ||
            doc.specialty
              .toLowerCase()
              .includes(consultationData.specialty.toLowerCase())
        )
        .map((doctor, idx) => (
          <div
            key={doctor.id}
            className={
              "bg-white shadow-xl rounded-2xl p-6 flex flex-row gap-6 hover:scale-105 transition cursor-pointer"
            }
            onClick={() => handleDoctorSelect(doctor)}
            style={{ animation: `fadeInUp 0.3s ${idx * 0.1}s both` }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full border-4 border-blue-100 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {doctor.name}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {doctor.specialty}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doctor.experience} experience
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {doctor.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    per consultation
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full"></span>
                  <span className="font-medium">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-600">
                    {doctor.consultations} consults
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doctor.availability.includes("now")
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {doctor.availability}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-500">
                    {doctor.qualifications[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-500">
                    {doctor.qualifications[1]}
                  </span>
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-1 mt-2">
                {doctor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="border border-blue-200 bg-blue-50 px-2 py-1 rounded-full text-xs text-blue-900"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
    <button
      onClick={() => setStep(1)}
      className="w-full border py-3 rounded-2xl mt-4 hover:bg-gray-50 transition font-semibold text-gray-700"
    >
      Back to Form
    </button>
  </div>
);


  // Step 3: Booking Confirmation

  const renderStep3 = () => (
  <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto">
    <div className="flex items-center gap-2 mb-4 text-2xl font-semibold">
     <CheckCircle className="w-8 h-8 text-green-600" />
      Confirm Booking
    </div>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedDoctor?.image}
          alt={selectedDoctor?.name}
          className="w-16 h-16 rounded-full border-4 border-blue-100 object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            {selectedDoctor?.name}
          </h4>
          <p className="text-blue-600 font-medium">
            {selectedDoctor?.specialty}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full"></span>
            <span className="text-sm font-medium">{selectedDoctor?.rating}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Consultation Fee</div>
          <div className="font-semibold">{selectedDoctor?.price}</div>
        </div>
        <div>
          <div className="text-gray-600">Availability</div>
          <div className="font-semibold">{selectedDoctor?.availability}</div>
        </div>
      </div>
    </div>
    <div className="space-y-3 mb-4">
      <div className="font-semibold text-gray-900 mb-2">Consultation Summary</div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Specialty:</span>
        <span className="font-medium">{consultationData.specialty}</span>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Urgency:</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            consultationData.urgency === "emergency"
              ? "bg-red-100 text-red-700"
              : consultationData.urgency === "urgent"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {consultationData.urgency}
        </span>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Documents:</span>
          <span className="font-medium">{uploadedFiles.length} files uploaded</span>
        </div>
      )}
    </div>
    <div className="flex gap-5">
      <button
        onClick={() => setStep(2)}
        className="flex-1 border py-2 rounded-2xl hover:bg-gray-50 transition font-semibold text-gray-700"
      >
        Back
      </button>
      <button
        onClick={handleBooking}
        disabled={isSubmitting}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-2xl transition font-semibold"
      >
        {isSubmitting ? (
          <span className="inline-block w-4 h-4 bg-green-400 rounded-full mr-2 animate-spin"></span>
        ) : (
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
        )}
        {isSubmitting ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  </div>
);

  return (
    <section id="second-opinion" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
            <UserCheck className="w-4 h-4" />
            Expert Consultation
          </div>
          <h2 className="text-3xl font-bold mb-2">Get Second Opinion</h2>
          <p className="text-lg text-gray-600">
            Connect with certified specialists for expert medical consultation and second opinions
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </section>
  );
}


























