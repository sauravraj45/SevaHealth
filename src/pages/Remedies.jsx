import React, { useState } from "react";

// Fixed Lucide imports
import { 
  Pill, 
  Leaf, 
  Clock, 
  Star, 
  Search, 
  Heart, 
  Brain, 
  Activity,
  Filter
} from "lucide-react";

// Motion using Framer Motion
import { motion } from "framer-motion";

const remediesData = {
  general: [
    {
      id: 1,
      title: "Headache Relief",
      type: "Quick Relief",
      duration: "15-30 mins",
      rating: 4.8,
      ingredients: ["Peppermint oil", "Cold compress", "Hydration"],
      instructions: [
        "Apply a cold compress to your forehead",
        "Massage temples with peppermint oil",
        "Drink plenty of water",
        "Rest in a dark, quiet room"
      ],
      tags: ["Natural", "Fast Acting"]
    },
    {
      id: 2,
      title: "Cough Soother",
      type: "Natural",
      duration: "1-2 hours",
      rating: 4.6,
      ingredients: ["Honey", "Ginger", "Lemon", "Warm water"],
      instructions: [
        "Mix 2 tbsp honey with fresh ginger juice",
        "Add lemon juice and warm water",
        "Drink slowly while warm",
        "Repeat 2-3 times daily"
      ],
      tags: ["Herbal", "Soothing"]
    },
    {
      id: 3,
      title: "Digestive Aid",
      type: "Herbal",
      duration: "30-45 mins",
      rating: 4.7,
      ingredients: ["Fennel seeds", "Chamomile", "Mint leaves"],
      instructions: [
        "Steep fennel seeds in hot water for 10 minutes",
        "Add chamomile and mint leaves",
        "Strain and drink warm",
        "Take after meals"
      ],
      tags: ["Digestive", "Calming"]
    }
  ],
  emergency: [
    {
      id: 4,
      title: "Burn Treatment",
      type: "First Aid",
      duration: "Immediate",
      rating: 4.9,
      ingredients: ["Cool water", "Aloe vera", "Clean cloth"],
      instructions: [
        "Run cool water over burn for 10-15 minutes",
        "Apply aloe vera gel gently",
        "Cover with clean, non-stick bandage",
        "Seek medical attention if severe"
      ],
      tags: ["Emergency", "First Aid"]
    },
    {
      id: 5,
      title: "Allergic Reaction",
      type: "Quick Response",
      duration: "5-10 mins",
      rating: 4.8,
      ingredients: ["Antihistamine", "Cool compress", "Calamine lotion"],
      instructions: [
        "Take antihistamine as directed",
        "Apply cool compress to affected area",
        "Use calamine lotion for itching",
        "Call emergency if breathing difficulty"
      ],
      tags: ["Allergy", "Fast Acting"]
    }
  ],
  wellness: [
    {
      id: 6,
      title: "Stress Relief",
      type: "Wellness",
      duration: "20-30 mins",
      rating: 4.9,
      ingredients: ["Lavender oil", "Deep breathing", "Meditation"],
      instructions: [
        "Find a quiet, comfortable space",
        "Add lavender oil to diffuser",
        "Practice deep breathing exercises",
        "Meditate for 15-20 minutes"
      ],
      tags: ["Mental Health", "Relaxation"]
    },
    {
      id: 7,
      title: "Energy Booster",
      type: "Natural",
      duration: "15-20 mins",
      rating: 4.5,
      ingredients: ["Green tea", "Lemon", "B-vitamins", "Light exercise"],
      instructions: [
        "Brew green tea with fresh lemon",
        "Take B-vitamin supplement",
        "Do 10 minutes of light exercise",
        "Stay hydrated throughout day"
      ],
      tags: ["Energy", "Natural"]
    }
  ]
};

export default function Remedies() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRemedy, setSelectedRemedy] = useState(null);

  const filteredRemedies = remediesData[activeTab].filter(
    remedy =>
      remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getTabIcon = tab => {
    switch(tab) {
      case "general": return <Heart className="w-4 h-4 rounded-2xl" />;
      case "emergency": return <Activity className="w-4 h-4" />;
      case "wellness": return <Brain className="w-4 h-4" />;
      default: return <Pill className="w-4 h-4" />;
    }
  };

  return (
    <section id="remedies" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm mb-4">
            <Leaf className="w-4 h-4" />
            Natural & Effective
          </div>
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
            Health Remedies
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover natural remedies and treatments for common health concerns
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col  sm:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  placeholder="Search remedies..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 border rounded-2xl w-full py-3"
                  aria-label="Search remedies"
                />
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 mb-8 gap-3">
              {["general","emergency","wellness"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-xl ${
                    activeTab === tab ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {getTabIcon(tab)}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRemedies.map((remedy, index) => (
                <motion.div
                  key={remedy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                  onClick={() => setSelectedRemedy(remedy)}
                >
                  <div className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 p-4 rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="pb-4 relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25">
                            <Pill className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg group-hover:text-emerald-700 transition-colors duration-300">{remedy.title}</h3>
                            <p className="text-sm text-slate-600 group-hover:text-slate-700">{remedy.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">{remedy.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 ">
                        {remedy.tags.map(tag => (
                          <span key={tag} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mt-2">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        Duration: {remedy.duration}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Key Ingredients:</p>
                        <div className="flex flex-wrap gap-1">
                          {remedy.ingredients.slice(0,3).map(ing => (
                            <span key={ing} className="border text-xs px-2 py-1 rounded-full">{ing}</span>
                          ))}
                          {remedy.ingredients.length > 3 && (
                            <span className="border text-xs px-2 py-1 rounded-full">+{remedy.ingredients.length-3} more</span>
                          )}
                        </div>
                      </div>

                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedRemedy(remedy);
                        }}
                      >
                        View Instructions
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        {selectedRemedy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRemedy(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">{selectedRemedy.title}</h3>
                  <p className="text-slate-600">{selectedRemedy.type}</p>
                </div>
                <button onClick={() => setSelectedRemedy(null)} className="text-2xl">×</button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedRemedy.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    {selectedRemedy.duration}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Ingredients Needed:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRemedy.ingredients.map(ing => (
                      <div key={ing} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                        <Leaf className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Instructions:</h4>
                  <ol className="space-y-3">
                    {selectedRemedy.instructions.map((inst, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium">{idx+1}</span>
                        <span className="text-slate-700">{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These remedies are for general wellness and should not replace professional medical advice. Consult a healthcare provider for serious conditions.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}





























// import { useState } from "react";

// const remediesData = {
//   general: [
//     {
//       id: 1,
//       title: "Headache Relief",
//       type: "Quick Relief",
//       duration: "15-30 mins",
//       rating: 4.8,
//       ingredients: ["Peppermint oil", "Cold compress", "Hydration"],
//       instructions: [
//         "Apply a cold compress to your forehead",
//         "Massage temples with peppermint oil",
//         "Drink plenty of water",
//         "Rest in a dark, quiet room"
//       ],
//       tags: ["Natural", "Fast Acting"]
//     },
//     {
//       id: 2,
//       title: "Cough Soother",
//       type: "Natural",
//       duration: "1-2 hours",
//       rating: 4.6,
//       ingredients: ["Honey", "Ginger", "Lemon", "Warm water"],
//       instructions: [
//         "Mix 2 tbsp honey with fresh ginger juice",
//         "Add lemon juice and warm water",
//         "Drink slowly while warm",
//         "Repeat 2-3 times daily"
//       ],
//       tags: ["Herbal", "Soothing"]
//     },
//     {
//       id: 3,
//       title: "Digestive Aid",
//       type: "Herbal",
//       duration: "30-45 mins",
//       rating: 4.7,
//       ingredients: ["Fennel seeds", "Chamomile", "Mint leaves"],
//       instructions: [
//         "Steep fennel seeds in hot water for 10 minutes",
//         "Add chamomile and mint leaves",
//         "Strain and drink warm",
//         "Take after meals"
//       ],
//       tags: ["Digestive", "Calming"]
//     }
//   ],
//   emergency: [
//     {
//       id: 4,
//       title: "Burn Treatment",
//       type: "First Aid",
//       duration: "Immediate",
//       rating: 4.9,
//       ingredients: ["Cool water", "Aloe vera", "Clean cloth"],
//       instructions: [
//         "Run cool water over burn for 10-15 minutes",
//         "Apply aloe vera gel gently",
//         "Cover with clean, non-stick bandage",
//         "Seek medical attention if severe"
//       ],
//       tags: ["Emergency", "First Aid"]
//     },
//     {
//       id: 5,
//       title: "Allergic Reaction",
//       type: "Quick Response",
//       duration: "5-10 mins",
//       rating: 4.8,
//       ingredients: ["Antihistamine", "Cool compress", "Calamine lotion"],
//       instructions: [
//         "Take antihistamine as directed",
//         "Apply cool compress to affected area",
//         "Use calamine lotion for itching",
//         "Call emergency if breathing difficulty"
//       ],
//       tags: ["Allergy", "Fast Acting"]
//     }
//   ],
//   wellness: [
//     {
//       id: 6,
//       title: "Stress Relief",
//       type: "Wellness",
//       duration: "20-30 mins",
//       rating: 4.9,
//       ingredients: ["Lavender oil", "Deep breathing", "Meditation"],
//       instructions: [
//         "Find a quiet, comfortable space",
//         "Add lavender oil to diffuser",
//         "Practice deep breathing exercises",
//         "Meditate for 15-20 minutes"
//       ],
//       tags: ["Mental Health", "Relaxation"]
//     },
//     {
//       id: 7,
//       title: "Energy Booster",
//       type: "Natural",
//       duration: "15-20 mins",
//       rating: 4.5,
//       ingredients: ["Green tea", "Lemon", "B-vitamins", "Light exercise"],
//       instructions: [
//         "Brew green tea with fresh lemon",
//         "Take B-vitamin supplement",
//         "Do 10 minutes of light exercise",
//         "Stay hydrated throughout day"
//       ],
//       tags: ["Energy", "Natural"]
//     }
//   ]
// };

// // Inline SVGs for icons
// const icons = {
//   heart: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//       <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
//     </svg>
//   ),
//   activity: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3 8 4-16 3 8h3" />
//     </svg>
//   ),
//   brain: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 0110 10v0a10 10 0 01-10 10A10 10 0 012 12V12A10 10 0 0112 2z" />
//     </svg>
//   ),
//   pill: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 14l6-6m-6 0l6 6" />
//     </svg>
//   ),
//   leaf: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//       <path d="M10 0C4.477 0 0 4.477 0 10s10 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15l-1-1-1 1-2-2 1-1-1-1 2-2 1 1 1-1 2 2-1 1 1 1-2 2z" />
//     </svg>
//   ),
//   clock: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
//   star: (
//     <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
//       <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.756 4.635 1.123 6.545z" />
//     </svg>
//   ),
//   search: (
//     <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
//       <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round"></line>
//     </svg>
//   ),
//   filter: (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
//     </svg>
//   )
// };

// export  default function Remedies() {
//   const [activeTab, setActiveTab] = useState("general");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRemedy, setSelectedRemedy] = useState(null);

//   const filteredRemedies = remediesData[activeTab].filter(
//     (remedy) =>
//       remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       remedy.ingredients.some((ingredient) =>
//         ingredient.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//   );

//   const getTabIcon = (tab) => {
//     switch (tab) {
//       case "general":
//         return icons.heart;
//       case "emergency":
//         return icons.activity;
//       case "wellness":
//         return icons.brain;
//       default:
//         return icons.pill;
//     }
//   };

//   return (
//     <section id="remedies" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm mb-4">
//             {icons.leaf}
//             Natural & Effective
//           </div>
//           <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
//             Health Remedies
//           </h2>
//           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
//             Discover natural remedies and treatments for common health concerns
//           </p>
//         </div>

//         {/* Search */}
//         <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
//           <div className="relative flex-1 max-w-md">
//             {icons.search}
//             <input
//               type="text"
//               placeholder="Search remedies..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 border rounded-lg w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             />
//           </div>
//           <button className="flex items-center gap-2 border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-100">
//             {icons.filter} Filter
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-3 gap-2 mb-8">
//             {["general", "emergency", "wellness"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
//                   activeTab === tab
//                     ? "bg-emerald-600 text-white"
//                     : "bg-slate-100 text-slate-700"
//                 }`}
//               >
//                 {getTabIcon(tab)}
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Remedies Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredRemedies.map((remedy) => (
//               <div
//                 key={remedy.id}
//                 className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 p-4 rounded-xl"
//                 onClick={() => setSelectedRemedy(remedy)}
//               >
//                 {/* Card Header */}
//                 <div className="pb-4 relative z-10 flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
//                       {icons.pill}
//                     </div>
//                     <div>
//                       <h3 className="text-lg">{remedy.title}</h3>
//                       <p className="text-sm text-slate-600">{remedy.type}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
//                     {icons.star}
//                     <span className="text-sm font-medium text-yellow-700">{remedy.rating}</span>
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {remedy.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-slate-100 text-xs px-2 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Card Content */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2 text-sm text-slate-600">
//                     {icons.clock} Duration: {remedy.duration}
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-slate-700 mb-2">
//                       Key Ingredients:
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {remedy.ingredients.slice(0, 3).map((ingredient) => (
//                         <span
//                           key={ingredient}
//                           className="border text-xs px-2 py-1 rounded-full"
//                         >
//                           {ingredient}
//                         </span>
//                       ))}
//                       {remedy.ingredients.length > 3 && (
//                         <span className="border text-xs px-2 py-1 rounded-full">
//                           +{remedy.ingredients.length - 3} more
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <button
//                     className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedRemedy(remedy);
//                     }}
//                   >
//                     View Instructions
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Modal */}
//         {selectedRemedy && (
//           <div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//             onClick={() => setSelectedRemedy(null)}
//           >
//             <div
//               className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <h3 className="text-2xl font-semibold text-slate-900">{selectedRemedy.title}</h3>
//                   <p className="text-slate-600">{selectedRemedy.type}</p>
//                 </div>
//                 <button onClick={() => setSelectedRemedy(null)}>×</button>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-1">
//                     {icons.star}
//                     <span className="font-medium">{selectedRemedy.rating}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     {icons.clock}
//                     {selectedRemedy.duration}
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-slate-900 mb-3">Ingredients Needed:</h4>
//                   <div className="grid grid-cols-2 gap-2">
//                     {selectedRemedy.ingredients.map((ingredient) => (
//                       <div key={ingredient} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
//                         {icons.leaf}
//                         <span className="text-sm">{ingredient}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-slate-900 mb-3">Instructions:</h4>
//                   <ol className="space-y-3">
//                     {selectedRemedy.instructions.map((instruction, index) => (
//                       <li key={index} className="flex gap-3">
//                         <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
//                           {index + 1}
//                         </span>
//                         <span className="text-slate-700">{instruction}</span>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-sm text-blue-800">
//                     <strong>Note:</strong> These remedies are for general wellness and should not replace 
//                     professional medical advice. Consult a healthcare provider for serious conditions.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
