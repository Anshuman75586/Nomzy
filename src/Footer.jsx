const Footer = () => {
  return (
    <footer className="bg-[#1f1f2e] text-white px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-orange-500">Nomzy</h2>
          <p className="mt-3 text-sm text-gray-300">
            Delivering your cravings at lightning speed. Fresh, hot, and always
            on time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Browse
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Cart
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              Email:{" "}
              <a
                href="mailto:anshulgourkhede7558@gmail.com"
                className="text-orange-400 hover:underline"
              >
                anshulgourkhede7558@gmail.com
              </a>
            </li>
            <li>Phone: +91 1111111111</li>
            <li>Location: Nagpur, India</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Nomzy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
