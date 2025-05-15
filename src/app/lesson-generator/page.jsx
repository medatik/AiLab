"use client";

import { useState } from "react";
import { generateStory } from "../../utils/gemini";
import {
  AcademicCapIcon,
  LightBulbIcon,
  ChartBarIcon,
  BeakerIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const difficultyLevels = [
  {
    id: "beginner",
    name: "Beginner",
    icon: LightBulbIcon,
    color: "text-green-600",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    icon: ChartBarIcon,
    color: "text-blue-600",
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: BeakerIcon,
    color: "text-purple-600",
  },
];

const STYLE_GUIDE = `
Style Guide for HTML Components:

1. Main Title (h1):
   class="text-4xl font-bold text-gray-800 mb-8"

2. Section Titles (h2):
   class="text-3xl font-bold text-gray-800 mb-6 mt-12"

3. Subsection Titles (h3):
   class="text-2xl font-semibold text-gray-700 mb-4 mt-8"

4. Section Container:
   class="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-md"

5. Regular Paragraphs:
   class="text-gray-700 mb-4 leading-relaxed"

6. Lists:
   - Unordered List (ul): class="space-y-2 my-4 ml-6 list-disc"
   - Ordered List (ol): class="space-y-2 my-4 ml-6 list-decimal"
   - List Items (li): class="text-gray-700 pl-2"

7. Code Examples:
   - Inline Code: class="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded"
   - Code Block Container: class="bg-gray-50 p-4 rounded-lg my-4"
   - Code Block: class="font-mono text-blue-700 whitespace-pre-wrap"

8. Important Notes:
   class="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 my-4 rounded-r-lg text-gray-700 italic"

9. Warnings:
   class="bg-yellow-50 border-l-4 border-yellow-500 pl-4 py-3 my-4 rounded-r-lg text-gray-700 italic"

10. Tips:
    class="bg-green-50 border-l-4 border-green-500 pl-4 py-3 my-4 rounded-r-lg text-gray-700 italic"

11. Important Terms:
    class="text-blue-700 font-semibold"

12. Emphasis:
    class="text-blue-600 italic"

13. Practice Exercises:
    - Container: class="bg-gray-50 rounded-xl p-6 my-8 border border-gray-200"
    - Title: class="text-2xl font-semibold text-gray-800 mb-4"
    - Exercise Item: class="mb-6 last:mb-0"

14. Examples:
    - Container: class="bg-gray-50 rounded-lg p-4 my-4 border border-gray-200"
    - Title: class="text-lg font-semibold text-gray-800 mb-2"

15. Tables:
    - Table: class="w-full my-4 border-collapse"
    - Table Header: class="bg-gray-100 text-gray-800 text-left"
    - Table Header Cell: class="p-3 border border-gray-300"
    - Table Row: class="even:bg-gray-50"
    - Table Cell: class="p-3 border border-gray-300 text-gray-700"

16. Quotes:
    class="border-l-4 border-gray-400 pl-4 py-2 my-4 text-gray-600 italic"

17. Interactive Elements:
    - Button: class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    - Link: class="text-blue-600 hover:text-blue-700 underline transition-colors"

18. Summary Boxes:
    class="bg-gray-50 p-4 rounded-lg border border-gray-200 my-6"
`;

export default function LessonGenerator() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [lesson, setLesson] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const levelPrompt = level
        ? `Create a detailed ${level} level lesson`
        : "Create a comprehensive and detailed lesson";

      const prompt = `
        ${levelPrompt} about the following topic: ${topic}. 

        Requirements for the lesson:
        1. Create an extensive, in-depth lesson that thoroughly covers the topic
        2. Include at least 4-5 main sections with multiple subsections
        3. Provide numerous examples and real-world applications
        4. Include detailed explanations and comprehensive coverage
        5. Add practice exercises with varying difficulty levels
        6. Include tips, warnings, and important notes where relevant
        7. Use tables, code examples, and other visual elements when appropriate
        8. End with a summary and additional resources section

        Technical Requirements:
        1. Return pure HTML without any markdown code blocks or backticks
        2. Use the following HTML structure with exact Tailwind CSS classes:
        
        ${STYLE_GUIDE}

        Important Guidelines:
        - Create a thorough, university-level depth of content
        - Break complex concepts into digestible sections
        - Use all available styling components where appropriate
        - Include interactive elements and varied content types
        - Make the content engaging and comprehensive
        - Aim for at least 2000 words of content
        - Use proper HTML semantic structure
        - Include only the HTML content, no additional formatting

        Return ONLY the pure HTML content with the styling classes applied.
      `;

      const response = await generateStory(prompt);
      const cleanResponse = response.replace(/^```html\n|\n```$/g, "");
      setLesson(cleanResponse);
    } catch (error) {
      console.error("Error generating lesson:", error);
      setError(
        "Sorry, there was an error generating your lesson. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <AcademicCapIcon className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="page-title">AI Lesson Generator</h1>
          <p className="page-subtitle">
            Transform any topic into an engaging lesson tailored to your needs
          </p>
        </div>

        <div className="card mt-8">
          <form onSubmit={handleGenerateLesson} className="space-y-8">
            <div className="space-y-4">
              <label
                htmlFor="topic"
                className="block text-lg font-medium text-gray-700 flex items-center gap-2"
              >
                <BookOpenIcon className="h-5 w-5 text-blue-600" />
                What would you like to learn about?
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input-field"
                placeholder="Enter a topic (e.g., 'Teach me about multiplication and addition' or 'Explain photosynthesis')"
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">
                Difficulty Level (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {difficultyLevels.map((difficulty) => (
                  <label
                    key={difficulty.id}
                    className={`relative flex items-center p-4 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
                      level === difficulty.id ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      value={difficulty.id}
                      checked={level === difficulty.id}
                      onChange={(e) => setLevel(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <difficulty.icon
                        className={`h-5 w-5 ${difficulty.color}`}
                      />
                      <span className="text-gray-800 font-medium">
                        {difficulty.name}
                      </span>
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
                  Generating Lesson...
                </span>
              ) : (
                <>
                  <AcademicCapIcon className="w-6 h-6" />
                  Generate Lesson
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-red-700 mt-8">
            {error}
          </div>
        )}

        {lesson && !error && (
          <div className="animate-fade-in mt-8">
            <div
              className="lesson-content"
              dangerouslySetInnerHTML={{ __html: lesson }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
