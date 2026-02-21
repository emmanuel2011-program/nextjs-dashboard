'use client';

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaFacebook } from "react-icons/fa"; // Using react-icons for social media

export default function ContactPage() {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold">Contact Page</h1>

      {/* Email */}
      <p className="flex items-center gap-2">
        <EnvelopeIcon className="w-5 h-5 text-blue-500" />
        <a
          href="mailto:shhcoop@yahoo.com"
          className="text-blue-600 underline"
        >
          sfortefinance@yahoo.com
        </a>
      </p>

      {/* Phone */}
      <p className="flex items-center gap-2">
        <PhoneIcon className="w-5 h-5 text-green-500" />
        <a
          href="tel:08050900409"
          className="text-blue-600 underline"
        >
          +2348050900409
        </a>
      </p>

      {/* Social Media */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Follow us on:</h2>
        <ul className="flex gap-4">
          <li>
            <a
              href="https://www.instagram.com/shhmcop/" // Replace with real IG link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-500 hover:underline"
            >
              <FaInstagram className="w-5 h-5" /> Instagram
            </a>
          </li>
          <li>
            <a
              href="https://web.facebook.com/profile.php?id=61588282931723" // Replace with real FB link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-700 hover:underline"
            >
              <FaFacebook className="w-5 h-5" /> Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}