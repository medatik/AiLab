"use client";

import { useState } from "react";
import { generateStory } from "../../utils/gemini";
import {
  SparklesIcon,
  BookOpenIcon,
  DocumentTextIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/solid";

const storyLengthOptions = [
  {
    id: "short",
    name: "Short Story",
    description: "100-150 words",
    icon: BookmarkIcon,
    color: "text-green-600",
  },
  {
    id: "long",
    name: "Long Story",
    description: "20-30 lines",
    icon: BookmarkSquareIcon,
    color: "text-blue-600",
  },
];

export default function StoryGenerator() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [storyLength, setStoryLength] = useState("short");

  const handleGenerateStory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lengthPrompt =
        storyLength === "short"
          ? "Create a short, engaging story (about 100-150 words)"
          : "Create a detailed, engaging story (between 400-500 words, approximately 20-30 lines)";

      const generatedStory = await generateStory(
        `${lengthPrompt} based on this prompt: ${prompt}. 
         Make it creative and entertaining.`
      );
      setStory(generatedStory);
    } catch (error) {
      console.error("Error generating story:", error);
      setStory(
        "Sorry, there was an error generating your story. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <BookOpenIcon className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="page-title">AI Story Generator</h1>
          <p className="page-subtitle">
            Transform your ideas into captivating stories with the power of AI
          </p>
        </div>

        <div className="card mt-8">
          <form onSubmit={handleGenerateStory} className="space-y-8">
            <div className="space-y-4">
              <label
                htmlFor="prompt"
                className="block text-lg font-medium text-gray-700 flex items-center gap-2"
              >
                <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                Your Story Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-field"
                placeholder="Enter a prompt like 'A magical library that comes alive at night...'"
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-600" />
                Story Length
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {storyLengthOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`relative flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
                      storyLength === option.id ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="storyLength"
                      value={option.id}
                      checked={storyLength === option.id}
                      onChange={(e) => setStoryLength(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <option.icon className={`h-5 w-5 ${option.color}`} />
                      <div>
                        <span className="block text-gray-800 font-medium">
                          {option.name}
                        </span>
                        <span className="block text-sm text-gray-500">
                          {option.description}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="button-primary">
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6" />
                  Generate Story
                </>
              )}
            </button>
          </form>
        </div>

        {story && (
          <div className="card mt-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-blue-600" />
              Your Generated Story
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {story}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
