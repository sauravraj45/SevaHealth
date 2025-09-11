import { useState } from "react";
import { Heart, DollarSign, Users, Target, TrendingUp, Loader2, Gift, Star } from "lucide-react";

const charityProjects = [
  {
    id: 1,
    title: "Emergency Medical Fund",
    description: "Supporting families with urgent medical expenses who cannot afford treatment",
    goal: 50000,
    raised: 32400,
    donors: 234,
    daysLeft: 45,
    category: "Emergency Care",
    urgency: "High",
    beneficiaries: "150+ families helped"
  },
  {
    id: 2,
    title: "Rural Health Clinics",
    description: "Building mobile health clinics to serve remote communities without access to healthcare",
    goal: 75000,
    raised: 45800,
    donors: 312,
    daysLeft: 62,
    category: "Infrastructure",
    urgency: "Medium",
    beneficiaries: "5 communities"
  },
  {
    id: 3,
    title: "Children's Cancer Treatment",
    description: "Providing free cancer treatment and support for children from low-income families",
    goal: 100000,
    raised: 78200,
    donors: 567,
    daysLeft: 28,
    category: "Pediatric Care",
    urgency: "High",
    beneficiaries: "25 children"
  },
  {
    id: 4,
    title: "Mental Health Support",
    description: "Free counseling and therapy services for underserved communities",
    goal: 30000,
    raised: 18900,
    donors: 156,
    daysLeft: 72,
    category: "Mental Health",
    urgency: "Medium",
    beneficiaries: "200+ individuals"
  }
];

const impactStats = [
  { label: "Lives Saved", value: "2,500+", icon: Heart },
  { label: "Funds Raised", value: "$850K", icon: DollarSign },
  { label: "Active Donors", value: "1,200+", icon: Users },
  { label: "Projects Completed", value: "45", icon: Target }
];

export default function Charity() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({ name: "", email: "", message: "", anonymous: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);

  const predefinedAmounts = ["$25", "$50", "$100", "$250", "$500"];

  const handleDonate = (project) => {
    setSelectedProject(project);
    setShowDonationForm(true);
  };

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setDonationAmount("");
  };

  const processDonation = async () => {
    if (!donationAmount && !customAmount) return alert("Please select or enter a donation amount.");
    if (!donorInfo.name || !donorInfo.email) return alert("Please fill in your contact information.");

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert("Thank you for your donation! Your contribution will make a real difference.");
    
    setShowDonationForm(false);
    setSelectedProject(null);
    setDonationAmount("");
    setCustomAmount("");
    setDonorInfo({ name: "", email: "", message: "", anonymous: false });
  };

  const getProgressPercentage = (raised, goal) => Math.min((raised / goal) * 100, 100);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section id="charity" className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm mb-4">
            <Heart className="w-4 h-4" /> Making a Difference
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">Healthcare Charity</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join us in making healthcare accessible to everyone. Your donation can save lives and bring hope to those in need.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charity Projects */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Current Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {charityProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition-all">
                <div className="relative mb-4">
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded ${getUrgencyColor(project.urgency)} text-xs font-semibold`}>
                    {project.urgency} Priority
                  </div>
                  <div className="px-4 py-12 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                    <Heart className="w-16 h-16 text-emerald-600 opacity-50" />
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h4>
                <p className="text-slate-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">Progress</span>
                    <span className="font-bold text-slate-900">${project.raised.toLocaleString()} of ${project.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className="bg-emerald-500 h-4 rounded-full" style={{ width: `${getProgressPercentage(project.raised, project.goal)}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div className="text-center p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="font-bold text-emerald-600">{getProgressPercentage(project.raised, project.goal).toFixed(0)}%</p>
                    <p className="text-emerald-700 font-medium">Funded</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-bold text-blue-600">{project.donors}</p>
                    <p className="text-blue-700 font-medium">Donors</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-bold text-orange-600">{project.daysLeft}</p>
                    <p className="text-orange-700 font-medium">Days Left</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4" />
                    {project.beneficiaries}
                  </div>
                  <button onClick={() => handleDonate(project)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <Heart className="w-4 h-4 mr-2" /> Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Form Modal */}
        {showDonationForm && selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Make a Donation</h3>
                  <p className="text-slate-600">{selectedProject.title}</p>
                </div>
                <button onClick={() => setShowDonationForm(false)} className="text-2xl font-bold">×</button>
              </div>
              {/* Amount Selection */}
              <div className="mb-4">
                <p className="font-semibold text-slate-900 mb-2">Donation Amount</p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-2">
                  {predefinedAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 ${donationAmount === amount ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              {/* Donor Info */}
              <div className="mb-4">
                <p className="font-semibold text-slate-900 mb-2">Donor Information</p>
                <input type="text" placeholder="Full Name" value={donorInfo.name} onChange={e => setDonorInfo(prev => ({...prev, name: e.target.value}))} className="w-full border p-2 rounded mb-2"/>
                <input type="email" placeholder="Email Address" value={donorInfo.email} onChange={e => setDonorInfo(prev => ({...prev, email: e.target.value}))} className="w-full border p-2 rounded mb-2"/>
                <textarea placeholder="Message (Optional)" value={donorInfo.message} onChange={e => setDonorInfo(prev => ({...prev, message: e.target.value}))} className="w-full border p-2 rounded mb-2"/>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={donorInfo.anonymous} onChange={e => setDonorInfo(prev => ({...prev, anonymous: e.target.checked}))} />
                  Make this donation anonymous
                </label>
              </div>
              {/* Summary & Actions */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-1 font-medium text-emerald-800">
                  <span>Donation Amount:</span>
                  <span className="text-xl font-bold">{donationAmount || (customAmount ? `$${customAmount}` : "$0")}</span>
                </div>
                <p className="text-sm text-emerald-700">Your donation will help: {selectedProject.beneficiaries}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowDonationForm(false)} className="flex-1 border rounded p-2">Cancel</button>
                <button onClick={processDonation} disabled={isProcessing} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded p-2">
                  {isProcessing ? "Processing..." : "Donate Now"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="border-0 shadow-lg bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-semibold mb-4">Every Donation Counts</h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Together, we can ensure that everyone has access to quality healthcare, 
            regardless of their financial situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleDonate(charityProjects[0])} // Open donation modal for first project
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-5 py-3 text-lg flex items-center justify-center gap-2 rounded-2xl"
            >
              <Heart className="w-5 h-5" /> Start Donating
            </button>
            <button className="border-white text-white hover:bg-white hover:text-emerald-600 px-5 py-3 text-lg flex items-center justify-center gap-2 rounded-2xl">
              <Star className="w-5 h-5" /> Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
