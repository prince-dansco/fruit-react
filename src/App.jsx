import { Link } from "react-router-dom";
import video1 from './assets/video/goal.mp4'
function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      >
        <source
          src={video1}
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white ">
        <h1 className="text-2xl md:text-6xl font-bold mb-6 animate-fadeIn">
          Welcome to EasyMart Fruit Paradise
        </h1>

        <p className="text-base md:text-2xl max-w-2xl mb-8 leading-relaxed">
          Discover farm-fresh fruits delivered straight to your door. Our
          AI-powered selection ensures you get the ripest, most nutritious
          produce every time.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:mb-12 mb-8">
          {[
            "🍎 Crispy Apples",
            "🍌 Creamy Bananas",
            "🥭 Tropical Mangoes",
            "🍓 Juicy Berries",
          ].map((fruit) => (
            <div
              key={fruit}
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg md:p-4 p-2 border border-white border-opacity-30 text-sm md:text-lg"
            >
              {fruit}
            </div>
          ))}
        </div>

        <Link
          to="/firstpage"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Your Fruit Journey →
        </Link>

        <div className="hidden md:block absolute bottom-8 text-sm opacity-80">
          <p>Powered by our Freshness AI • 100% Organic Guarantee</p>
        </div>
      </div>
    </div>
  );
}

export default App;
