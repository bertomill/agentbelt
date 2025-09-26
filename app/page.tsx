export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
          AgentBelt
        </h1>
        <p className="text-xl text-blue-600 dark:text-blue-400 mb-8 font-semibold">
          AI That Actually Ships
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          We bridge the gap between AI&apos;s transformative potential and practical business implementation.
          Get pragmatic AI solutions focused on rapid prototyping, measurable outcomes, and transparent pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg">
            Get Started Today
          </button>
          <button className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-4 px-8 rounded-lg transition-colors">
            View Case Studies
          </button>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="bg-white dark:bg-slate-900/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Why Choose AgentBelt?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Interactive AI Demo
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Experience real AI capabilities through our interactive chat demonstrations
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Quantified Results
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Proven case studies with measurable metrics and transparent outcomes
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Performance Optimized
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Lighthouse score &gt;90, mobile-first design, and conversion-optimized
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join leading companies who&apos;ve already implemented practical AI solutions with measurable results
          </p>
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg">
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            AgentBelt
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            AI That Actually Ships 🚀
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Services
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Case Studies
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
