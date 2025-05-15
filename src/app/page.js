"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    title: "AI Chat Assistant",
    description:
      "Engage in natural conversations with our advanced AI assistant. Get help, answers, and insights on any topic.",
    icon: ChatBubbleLeftRightIcon,
    color: "from-blue-600 to-cyan-500",
    link: "/chat",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "Story Generator",
    description:
      "Transform your ideas into captivating stories. Choose between short tales or detailed narratives.",
    icon: BookOpenIcon,
    color: "from-purple-600 to-pink-500",
    link: "/story-generator",
    gradient: "from-purple-50 to-pink-50",
  },
  {
    title: "Lesson Generator",
    description:
      "Create comprehensive educational content tailored to any topic and difficulty level.",
    icon: AcademicCapIcon,
    color: "from-emerald-600 to-teal-500",
    link: "/lesson-generator",
    gradient: "from-emerald-50 to-teal-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative z-10">
            <h1 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 tracking-tight">
              Welcome to AI Lab
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the power of artificial intelligence through our suite
              of creative and educational tools.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Chatting
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-60`}
              ></div>
              <div className="relative p-8 h-full flex flex-col">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} w-fit mb-6`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 flex-grow">
                  {feature.description}
                </p>
                <div className="flex items-center text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                  Try it now
                  <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative overflow-hidden py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Start exploring our AI-powered tools and discover new
                possibilities in learning, creating, and problem-solving.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
                <SparklesIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 -z-10"></div>
      </div>
    </div>
  );
}
