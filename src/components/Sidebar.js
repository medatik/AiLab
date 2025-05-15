"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const menuItems = [
  { href: "/", icon: HomeIcon, text: "Home" },
  { href: "/chat", icon: ChatBubbleLeftRightIcon, text: "AI Chat" },
  { href: "/story-generator", icon: BookOpenIcon, text: "Story Generator" },
  {
    href: "/lesson-generator",
    icon: AcademicCapIcon,
    text: "Lesson Generator",
  },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-200"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:w-64 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/50">
            <Link href="/" className="flex items-center gap-3">
              <BeakerIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Lab
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50/80 hover:text-blue-600 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200/50">
            <p className="text-sm text-gray-500 text-center">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </aside>

      {/* Main content padding for desktop */}
      <div className="lg:pl-64" />
    </>
  );
}
