import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page404() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 pt-12">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 pb-20 pt-32 flex flex-col items-center text-center">
        <div
          className="bg-white/5 backdrop-blur-md p-10 md:p-14 rounded-2xl 
                     border border-white/10 shadow-lg w-full"
        >
          {/* Large 404 Text */}
          <h1 className="text-7xl md:text-9xl font-extrabold text-primary mb-4">
            404
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
            The page you are looking for does not exist or may have been moved.
          </p>

          {/* Button */}
          <a
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg 
                       text-lg font-medium hover:bg-primary/80 
                       transition-all duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
