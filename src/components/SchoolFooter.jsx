import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function SchoolFooter({
  schoolName = "MDDM",
  logo,
  aboutText = "MDDM is committed to academic excellence, character development, and community engagement.",
  address = "xyz",
  phone = "12356789",
  email = "abc@gmail.com",
  social = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },
}) {
  return (
    <footer className="bg-slate-900 text-slate-100 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Branding / About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={`${schoolName} logo`} className="h-12 w-12 rounded-md object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-md bg-linear-to-r from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-900">
                {schoolName.split(" ").map((w) => w[0]).slice(0,2).join("")}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{schoolName}</h3>
              <p className="text-sm text-slate-300">Inspiring lifelong learners since 1998</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{aboutText}</p>

          <div className="flex gap-3 mt-2" aria-label="social links">
            <a href={social.facebook} aria-label="facebook" className="p-2 rounded-md hover:bg-white/10 transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={social.twitter} aria-label="twitter" className="p-2 rounded-md hover:bg-white/10 transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href={social.instagram} aria-label="instagram" className="p-2 rounded-md hover:bg-white/10 transition">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-md font-semibold mb-4">Contact Us</h4>

          <ul className="flex flex-col gap-3 text-slate-300">
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 mt-1" />
              <div>
                <span className="block text-sm">Phone</span>
                <a className="text-sm hover:underline" href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 mt-1" />
              <div>
                <span className="block text-sm">Email</span>
                <a className="text-sm hover:underline" href={`mailto:${email}`}>{email}</a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-1" />
              <div>
                <span className="block text-sm">Address</span>
                <address className="not-italic text-sm leading-snug">{address}</address>
              </div>
            </li>
          </ul>
        </div>

        {/* Quick links / About */}
        <div>
          <h4 className="text-md font-semibold mb-4">About</h4>

          <p className="text-sm text-slate-300 mb-4">A quick glance at what we do and how we support students to reach their potential.</p>

          <nav aria-label="footer navigation">
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#about" className="text-sm hover:underline">About Us</a>
              </li>
              <li>
                <a href="#admissions" className="text-sm hover:underline">Admissions</a>
              </li>
              <li>
                <a href="#academics" className="text-sm hover:underline">Academics</a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:underline">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-8 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-0 md:px-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} {schoolName}. All rights reserved.</p>

          <div className="text-sm text-slate-300">
            <a href="#privacy" className="mr-4 hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
