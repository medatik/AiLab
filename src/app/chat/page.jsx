"use client";

import { useState, useRef, useEffect } from "react";
import { startNewChat, sendChatMessage } from "../../utils/gemini";
import {
  PaperAirplaneIcon,
  ArrowDownCircleIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

// Format dialogue text
const formatDialogue = (text) => {
  // Remove ** markers and just style the character names
  text = text.replace(
    /\*\*(.*?):\*\*/g,
    '<span class="text-blue-400 font-semibold">$1:</span>'
  );

  // Add line breaks between dialogue lines
  text = text.replace(/\n/g, "<br />");

  // Style actions in parentheses
  text = text.replace(
    /\((.*?)\)/g,
    '<span class="text-gray-400 italic">($1)</span>'
  );

  return text;
};

// Format code blocks
const formatCode = (text) => {
  // Split by code block markers but ignore language specification
  const parts = text.split(/```(?:\w+)?\n/);
  let formatted = "";

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Regular text
      formatted += parts[i].replace(/\n/g, "<br />");
    } else {
      // Code block - without the language specification
      const codeContent = parts[i];
      // Check if the content looks like HTML
      const isHTML = /<[^>]+>/.test(codeContent);

      if (isHTML) {
        // Escape HTML to display as text
        const escapedCode = codeContent
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        formatted += `<pre class="bg-gray-800/50 rounded-lg p-4 my-2 font-mono text-sm overflow-x-auto">${escapedCode}</pre>`;
      } else {
        formatted += `<pre class="bg-gray-800/50 rounded-lg p-4 my-2 font-mono text-sm overflow-x-auto">${codeContent}</pre>`;
      }
    }
  }

  return formatted;
};

// Message component for individual chat messages
const Message = ({ message, isUser }) => {
  const [copied, setCopied] = useState(false);

  const formatMessage = (text) => {
    // Remove version markers from titles
    text = text.replace(/\*\*([^*]+)\*\*/g, "$1");

    // Handle code blocks
    if (text.includes("```")) {
      const parts = text.split(/```(?:\w+)?\n/);
      let formatted = "";

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          formatted += parts[i].replace(/\n/g, "<br />");
        } else {
          const codeContent = parts[i];
          const isHTML = /<[^>]+>/.test(codeContent);

          if (isHTML) {
            const escapedCode = codeContent
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            formatted += `<pre class="bg-gray-50 rounded-xl p-4 my-2 font-mono text-sm overflow-x-auto text-gray-800 border border-gray-200">${escapedCode}</pre>`;
          } else {
            formatted += `<pre class="bg-gray-50 rounded-xl p-4 my-2 font-mono text-sm overflow-x-auto text-gray-800 border border-gray-200">${codeContent}</pre>`;
          }
        }
      }
      return formatted;
    }

    return text.replace(/\n/g, "<br />");
  };

  const copyToClipboard = async (text) => {
    try {
      const cleanText = text
        .replace(/```(?:\w+)?\n/g, "")
        .replace(/```/g, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");

      await navigator.clipboard.writeText(cleanText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="relative group">
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } mb-4 animate-fade-in`}
      >
        <div
          className={`max-w-[85%] rounded-2xl px-6 py-4 ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-white shadow-lg border border-gray-100"
          }`}
        >
          <div
            className="prose max-w-none prose-pre:p-0 prose-pre:my-0 prose-pre:bg-transparent"
            dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
          />
        </div>
      </div>
      <button
        onClick={() => copyToClipboard(message)}
        className={`absolute right-0 -bottom-6 opacity-0 group-hover:opacity-100 flex items-center gap-2 text-sm 
          ${
            isUser
              ? "text-white/75 hover:text-white"
              : "text-gray-400 hover:text-gray-600"
          } 
          transition-all duration-200 py-1.5 px-3 rounded-lg`}
      >
        {copied ? (
          <>
            <ClipboardDocumentCheckIcon className="h-4 w-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <ClipboardDocumentIcon className="h-4 w-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex justify-start mb-4">
    <div className="bg-white shadow-lg border border-gray-100 rounded-2xl px-6 py-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
      </div>
    </div>
  </div>
);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [chatSession, setChatSession] = useState(null);

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
      try {
        const chat = await startNewChat();
        setChatSession(chat);
        const initialMessage = await sendChatMessage(chat, "hello if someone askes you who is Mohamed Atikeddine tell them 'he is the one who created this website'");
        setMessages([{ text: initialMessage, isUser: true }]);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initChat();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 100;
    setShowScrollButton(!bottom);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(chatSession, userMessage);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative">
      {/* Welcome message and input form initial state */}
      <div
        className={`transition-all duration-500 ${
          messages.length > 0
            ? "py-4 px-4 flex items-center justify-center gap-4"
            : "text-center py-12 px-4 flex flex-col items-center"
        }`}
      >
        <div
          className={`transition-all duration-500 flex ${
            messages.length > 0
              ? "items-center gap-4"
              : "flex-col items-center gap-6"
          }`}
        >
          <div
            className={`p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg transition-all duration-500 ${
              messages.length > 0 ? "scale-75" : ""
            }`}
          >
            <ChatBubbleLeftRightIcon
              className={`text-white transition-all duration-500 ${
                messages.length > 0 ? "h-8 w-8" : "h-12 w-12"
              }`}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1
              className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500 ${
                messages.length > 0 ? "text-2xl" : "text-5xl mb-4"
              }`}
            >
              AI Chat Assistant
            </h1>
            <p
              className={`text-gray-600 max-w-2xl mx-auto transition-all duration-500 ${
                messages.length > 0 ? "hidden" : "text-xl mb-8"
              }`}
            >
              Ask me anything! I'm here to help with your questions and tasks.
            </p>
          </div>
        </div>

        {/* Input form for initial state */}
        {messages.length === 0 && (
          <div className="w-full max-w-3xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping || !chatSession}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-purple-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="h-6 w-6" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Main chat area */}
      {messages.length > 0 && (
        <>
          <div className="pb-32" onScroll={handleScroll}>
            <div className="max-w-3xl mx-auto px-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Scroll to bottom button */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-32 right-8 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white transform hover:scale-110 z-50"
            >
              <ArrowDownCircleIcon className="h-6 w-6" />
            </button>
          )}

          {/* Input form for chat state */}
          <div className="fixed inset-x-0 lg:left-[256px] bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-8 pt-4 transition-all duration-500 z-40">
            <div className="max-w-3xl mx-auto px-4">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping || !chatSession}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-purple-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Add global styles for scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}
