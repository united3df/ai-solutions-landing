import React, { useRef, useState } from "react";
import { Star, ExternalLink, Award, Users, Briefcase } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const reviews = [
  {
    quote: "AI4B2B has created a good development team.",
    author: "Founder, NFT Marketplace",
    project: "Web & Mobile App Development",
    rating: 4.5,
  },
  {
    quote: "They understood our project and contributed their own ideas.",
    author: "Thomas Faulhaber, CEO",
    project: "IT Consulting & SI",
    rating: 5.0,
  },
  {
    quote: "They were very professional and easy to work with.",
    author: "Owner, SaaS Company",
    project: "Staff Augmentation",
    rating: 4.5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-slate-300 text-slate-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Credentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Verified reviews and ratings from real clients on leading platforms
          </p>
        </div>

        {/* Platform Badges */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Clutch Card */}
          <div 
            className={`platform-card bg-white rounded-lg p-6 shadow-sm hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center transition-transform duration-500" style={{ transform: hoveredCard === 0 ? 'scale(1.1) rotate(5deg)' : '' }}>
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">Clutch.co</h3>
                  <p className="text-sm text-slate-600">B2B Ratings & Reviews</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold text-slate-900">4.7<span className="text-sm text-slate-600 font-normal">/5</span></p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-600" />
                <span>3 Verified Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-blue-600" />
                <span>100% Recommend</span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full group">
              <a 
                href="https://clutch.co/profile/ai4b2b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                View Clutch Profile
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>

          {/* Upwork Card */}
          <div 
            className={`platform-card bg-white rounded-lg p-6 shadow-sm hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#14a800] rounded-lg flex items-center justify-center transition-transform duration-500" style={{ transform: hoveredCard === 1 ? 'scale(1.1) rotate(5deg)' : '' }}>
                  <span className="text-white font-bold text-lg">Up</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">Upwork</h3>
                  <p className="text-sm text-slate-600">Freelance Marketplace</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Briefcase className="h-5 w-5 text-[#14a800]" />
                  <span className="text-sm font-medium text-[#14a800]">Top Rated</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">Enterprise Partner</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-blue-600" />
                <span>Verified Agency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-600" />
                <span>AI & Development</span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full group">
              <a 
                href="https://www.upwork.com/freelancers/~0137c6a13e1b92ed62" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                View Upwork Profile
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Client Reviews */}
        <div className="max-w-5xl mx-auto">
          <h3 className={`text-xl font-semibold text-center mb-8 text-slate-900 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`review-card bg-white rounded-lg p-6 shadow-sm hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ 
                  transitionDelay: `${800 + index * 150}ms`,
                  transform: hoveredCard === index + 2 ? 'translateY(-8px) scale(1.02)' : '',
                }}
                onMouseEnter={() => setHoveredCard(index + 2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <StarRating rating={review.rating} />
                <blockquote className="mt-4 text-slate-700 font-medium leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-900">{review.author}</p>
                  <p className="text-xs text-slate-600 mt-1">{review.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .platform-card {
          will-change: transform;
        }

        .review-card {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .platform-card,
          .review-card {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
