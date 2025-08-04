
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import type { AspectRatio } from '../types';
import { Spinner } from './Spinner';
import { AspectRatioSelector } from './AspectRatioSelector';

const samplePrompts = [
  "A majestic lion wearing a crown, photorealistic, cinematic lighting",
  "An enchanted forest at twilight with glowing mushrooms and fireflies, digital art",
  "A futuristic cityscape with flying cars and holographic billboards, cyberpunk style",
  "A serene Japanese garden with a koi pond and cherry blossoms, watercolor painting",
  "A robot holding a red skateboard, 3D render"
];

export function ImageGenerator(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleGenerateClick = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  const handleSamplePrompt = () => {
    const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(randomPrompt);
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700/50">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Controls */}
        <div className="flex-1 space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe your vision
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A photo of an astronaut riding a horse on Mars"
              className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 resize-none"
              disabled={isLoading}
            />
            <button
                type="button"
                onClick={handleSamplePrompt}
                disabled={isLoading}
                className="text-xs text-purple-400 hover:text-purple-300 mt-2 transition-colors disabled:opacity-50"
            >
                Try a sample prompt
            </button>
          </div>

          <AspectRatioSelector
            selectedRatio={aspectRatio}
            onSelectRatio={setAspectRatio}
            disabled={isLoading}
          />
          
          <button
            onClick={handleGenerateClick}
            disabled={!prompt || isLoading}
            className="w-full flex items-center justify-center text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading && <Spinner />}
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {/* Right Side: Image Display */}
        <div className="flex-1 flex items-center justify-center bg-gray-900/50 rounded-lg p-4 border border-gray-700 aspect-square">
          {isLoading && (
            <div className="text-center text-gray-400">
              <p>Brewing up your masterpiece...</p>
              <p className="text-sm">This can take a moment.</p>
            </div>
          )}
          {error && <div className="text-center text-red-400 p-4">{error}</div>}
          {!isLoading && !error && generatedImage && (
            <img 
              src={generatedImage} 
              alt={prompt} 
              className="max-w-full max-h-full object-contain rounded-md shadow-lg" 
            />
          )}
          {!isLoading && !error && !generatedImage && (
            <div className="text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
