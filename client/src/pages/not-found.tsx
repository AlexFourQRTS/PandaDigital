import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Panda SVG */}
        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto animate-bounce"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Panda Body */}
            <circle cx="100" cy="120" r="50" fill="#f3f4f6" />
            
            {/* Panda Head */}
            <circle cx="100" cy="80" r="35" fill="#f3f4f6" />
            
            {/* Ears */}
            <circle cx="80" cy="55" r="15" fill="#1f2937" />
            <circle cx="120" cy="55" r="15" fill="#1f2937" />
            
            {/* Eyes (sad/confused) */}
            <ellipse cx="90" cy="75" rx="8" ry="12" fill="#1f2937" />
            <ellipse cx="110" cy="75" rx="8" ry="12" fill="#1f2937" />
            <circle cx="88" cy="70" r="2" fill="#f3f4f6" />
            <circle cx="108" cy="70" r="2" fill="#f3f4f6" />
            
            {/* Nose */}
            <ellipse cx="100" cy="85" rx="3" ry="2" fill="#1f2937" />
            
            {/* Mouth (confused/sad) */}
            <path d="M 95 90 Q 100 95 105 90" stroke="#1f2937" strokeWidth="2" fill="none" />
            
            {/* Arms */}
            <ellipse cx="70" cy="110" rx="12" ry="25" fill="#1f2937" />
            <ellipse cx="130" cy="110" rx="12" ry="25" fill="#1f2937" />
            
            {/* Legs */}
            <ellipse cx="85" cy="155" rx="12" ry="20" fill="#1f2937" />
            <ellipse cx="115" cy="155" rx="12" ry="20" fill="#1f2937" />
          </svg>
        </div>

        {/* Error Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Oops! Panda got lost 🐼
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            This page went on a bamboo hunt and never came back
          </p>
          <p className="text-gray-400">
            Don't worry, even pandas get confused sometimes!
          </p>
        </div>

        {/* Funny Quote */}
        <Card className="bg-gray-800/50 border-orange-500/20 mb-8 backdrop-blur-sm">
          <CardContent className="p-6">
            <blockquote className="text-lg text-gray-300 italic">
              "I'm not lost, I'm just exploring... very thoroughly."
            </blockquote>
            <p className="text-orange-400 mt-2">- Confused Panda</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              <Home className="mr-2 h-5 w-5" />
              Take me home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-3 text-lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back
          </Button>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            🎋 Fun fact: Pandas spend 14 hours a day eating bamboo
          </p>
          <p className="text-gray-500 text-sm mt-1">
            🔍 Maybe this page is also looking for bamboo?
          </p>
        </div>
      </div>
    </div>
  );
}