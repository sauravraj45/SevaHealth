import { useState } from "react";
import {
  Search,
  AlertCircle,
  Loader2,
  Stethoscope,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Covid-19",
  "Chest Pain",
  "Joint Pain",
];

export default function Finder() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  // ✅ only one symptom allowed
  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms([symptom]); // overwrite instead of toggle
    setCustomSymptom(""); // clear custom if common selected
  };

  // ✅ only one custom symptom allowed
  const addCustomSymptom = () => {
    if (customSymptom.trim()) {
      setSelectedSymptoms([customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  // ✅ always send one symptom
  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    setResults(null);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: selectedSymptoms[0] }), // send one only
      });

      const data = await response.json();

      // ✅ validate response format
      if (
        !data ||
        !Array.isArray(data.symptoms) ||
        !Array.isArray(data.precautions) ||
        !Array.isArray(data.medicines)
      ) {
        setError("Server down. Please try again later.");
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Please check your backend.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ✅ helper to render strings or objects safely
  const renderItem = (item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") {
      return (
        <>
          <span className="font-semibold">{item.name}</span>
          {" "+item.description }
        </>
      );
    }
    return "";
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-4">
            <Stethoscope className="w-4 h-4" /> AI-Powered Analysis
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Symptom Checker
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant insights about your symptoms with our AI-powered health
            tool.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg h-full">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" /> Select Your
                  Symptoms
                </h3>
              </div>

              <div className="p-6 pt-0 space-y-6">
                {/* Common Symptoms */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Common Symptoms
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {commonSymptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          selectedSymptoms.includes(symptom)
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom)}
                            onChange={() => handleSymptomToggle(symptom)}
                          />
                          <span
                            className={`text-sm font-medium ${
                              selectedSymptoms.includes(symptom)
                                ? "text-blue-700"
                                : "text-slate-700"
                            }`}
                          >
                            {symptom}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Symptom */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Add Custom Symptom
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSymptom}
                      onChange={(e) => setCustomSymptom(e.target.value)}
                      placeholder="Describe your symptom..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && addCustomSymptom()
                      }
                      className="flex-1 h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={addCustomSymptom}
                      className="h-10 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Selected Symptom */}
                {selectedSymptoms.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Selected Symptom
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <span
                          key={symptom}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
                          onClick={() => setSelectedSymptoms([])} // clear on click
                        >
                          {symptom} ×
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={analyzeSymptoms}
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing
                      Symptoms...
                    </div>
                  ) : (
                    <>Analyze Symptoms</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg h-full">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-600" /> Analysis
                  Results
                </h3>
              </div>
              <div className="p-6 pt-0">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    <p className="text-slate-600">
                      Analyzing your symptoms...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-red-600 mb-4">{error}</div>
                ) : results ? (
                  <div className="border p-4 rounded  space-y-4">
                    <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium text-emerald-800">
                          Analysis Complete
                        </span>
                      </div>
                      <p className="text-base text-emerald-700">
                        Based on your symptom, here are the most likely
                        conditions.
                      </p>
                    </div>

                    <div>
                      <strong>💊 Symptoms:</strong>
                      <ul className="list-disc ml-6">
                        {results.symptoms.map((s, i) => (
                          <li key={i}>{renderItem(s)}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>🛡 Precautions:</strong>
                      <ul className="list-disc ml-6">
                        {results.precautions.map((p, i) => (
                          <li key={i}>{renderItem(p)}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>💊 Medicines:</strong>
                      <ul className="list-disc ml-6">
                        {results.medicines.map((m, i) => (
                          <li key={i}>{renderItem(m)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                      <p className="text-base text-blue-900">
                        <strong>Disclaimer:</strong> This analysis is for
                        informational purposes only. Please consult with a
                        healthcare professional for proper diagnosis and
                        treatment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center text-slate-500">
                    <Stethoscope className="w-16 h-16 text-slate-300" />
                    <p>Select a symptom to get your analysis</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
