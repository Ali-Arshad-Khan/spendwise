export default function Footer() {
    return (
        <>
        <div className="footer pb-10 px-5 lg:px-30 pt-10 shadow-[inset_0_2px_1px_-1px_rgba(255,255,255,0.5)] text-white flex flex-col lg:flex-row gap-5 justify-between items-center ">
          {/* Left side */}
          <span className="text-sm">
            © 2025 Spendwise. All rights reserved.
          </span>

          {/* Right side - Credit + Social Links */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-sm">
            <span>Designed & Developed by Ali Arshad Khan</span>

            {/* GitHub */}
            <a
              href="https://github.com/Ali-Arshad-Khan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.76.08-.75.08-.75a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95a4.65 4.65 0 0 1 1.24-3.23 4.32 4.32 0 0 1 .12-3.18s1-.32 3.3 1.23a11.3 11.3 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23a4.32 4.32 0 0 1 .12 3.18 4.65 4.65 0 0 1 1.24 3.23c0 4.62-2.8 5.64-5.48 5.93a2.87 2.87 0 0 1 .82 2.22v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/its_arshad01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.492 11.24H16.26l-5.214-6.817-5.97 6.817H1.77l7.73-8.82L1.254 2.25h7.14l4.713 6.231 5.137-6.231Z" />
              </svg>
              Twitter
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ali-arshad-khan/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM2.4 8.8h5.16v12.72H2.4V8.8Zm7.68 0h4.95v1.74h.07c.69-1.23 2.38-2.52 4.9-2.52 5.24 0 6.2 3.45 6.2 7.94v9.55h-5.16v-8.48c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.21-3.26 4.49v8.63H10.08V8.8Z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        </>
    )
}