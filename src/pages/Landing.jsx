import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar simple */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-blue-600">📘 LMS Platform</h1>
        <nav>
          <Link
            to="/login"
            className="px-4 py-2 text-blue-600 font-medium hover:underline"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            S’inscrire
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20">
        {/* Texte gauche */}
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-4 leading-snug">
            Apprenez, Partagez et Progressez <br />
            avec notre <span className="text-blue-600">LMS</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Une plateforme moderne pour les formateurs et apprenants afin de
            partager des cours, gérer la présence et progresser ensemble 🚀
          </p>
          <div>
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700"
            >
              Commencer gratuitement
            </Link>
            <Link
              to="/login"
              className="ml-4 px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
            >
              Déjà inscrit ?
            </Link>
          </div>
        </div>

        {/* Image droite */}
        <div className="mt-10 md:mt-0">
          <img
            src="/landing-illustration.png" 
            alt="Learning illustration"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mx-auto"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} LMS Platform - Tous droits réservés
      </footer>
    </div>
  );
}

export default Landing;
