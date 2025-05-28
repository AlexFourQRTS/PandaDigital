import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-graphite-900 to-graphite-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="text-panda-orange-500">Panda</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your ultimate tech platform for blogging, media sharing, real-time chat, and staying updated with the latest news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button className="bg-panda-orange-500 hover:bg-panda-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Explore Blog
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-graphite-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Join Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-graphite-900 mb-4">Platform Features</h2>
            <p className="text-xl text-graphite-600">Everything you need for your tech journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Tech Blog</h3>
              <p className="text-graphite-600">Share code snippets, tutorials, and insights with VS Code-style syntax highlighting.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Real-time Chat</h3>
              <p className="text-graphite-600">Connect with developers worldwide through our anonymous chat system.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Media Gallery</h3>
              <p className="text-graphite-600">Share and explore photos, videos, and audio content with built-in players.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Tech News</h3>
              <p className="text-graphite-600">Stay updated with the latest technology trends and industry news.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Technologies</h3>
              <p className="text-graphite-600">Explore and manage a comprehensive list of technologies and tools.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-panda-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Real-time Updates</h3>
              <p className="text-graphite-600">Experience instant updates and live interactions across all platform features.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
