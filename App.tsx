
import React from 'react';
import { ImageGenerator } from './components/ImageGenerator';

function App(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AI Image Generator
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Bring your imagination to life. Describe anything you can think of and watch our AI create a unique image for you.
          </p>
        </header>
        <ImageGenerator />
      </main>
      <footer className="text-center py-6 mt-12 text-gray-500 text-sm">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
}

export default App;
