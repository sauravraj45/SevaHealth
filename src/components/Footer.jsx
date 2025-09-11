import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Symptom Checker", href: "#symptom-checker" },
    { label: "Health Remedies", href: "#remedies" },
    { label: "Emergency Contacts", href: "#emergency-contacts" },
    { label: "SOS Emergency", href: "#sos" },
    { label: "Second Opinion", href: "#second-opinion" },
    { label: "Charity Programs", href: "#charity" }
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Accessibility", href: "#" }
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Mission", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Partners", href: "#" }
  ]
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
];

const contactInfo = [
  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: Mail, text: "support@sevahealth.com", href: "mailto:support@sevahealth.com" },
  { icon: MapPin, text: "123 Healthcare Ave, Medical City, MC 12345", href: "#" }
];

export default function Footer() {
  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12 text-center max-w-4xl">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated with Health Tips</h3>
          <p className="text-slate-400 mb-8">
            Subscribe to our newsletter for the latest health insights, tips, and updates from SevaHealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">SevaHealth</h2>
                <p className="text-sm text-slate-400">Healthcare Platform</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              SevaHealth is dedicated to making healthcare accessible, trustworthy, and comprehensive. 
              We provide expert medical guidance, emergency services, and charitable healthcare initiatives 
              to serve communities worldwide.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <a 
                      href={contact.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {contact.text}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Links Sections */}
          <div>
            <h3 className="font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm mb-2">
                For medical emergencies, call 
                <a href="tel:911" className="text-red-400 font-semibold ml-1 hover:text-red-300">
                  911
                </a>
              </p>
              <p className="text-xs text-slate-500">
                This platform is for informational purposes only and does not replace professional medical advice.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-400 text-sm">
              © 2024 SevaHealth. All rights reserved. | Designed with ❤️ for better healthcare access.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
