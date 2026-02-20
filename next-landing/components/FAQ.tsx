"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const faqs = [
  {
    question: "How long does it take to build?",
    answer: "Typical implementations take 2–6 weeks depending on scope."
  },
  {
    question: "Do you work with our existing tools?",
    answer: "Yes. We integrate with your current stack whenever possible."
  },
  {
    question: "What about data security?",
    answer: "We design with access control, data isolation, and security best practices."
  },
  {
    question: "Do we own the solution?",
    answer: "Yes. You own the implementation and can extend it further."
  },
  {
    question: "Is this suitable for small teams?",
    answer: "Yes. Many solutions are designed specifically for small and mid-size teams."
  }
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            FAQ
          </h2>
        </div>

        <Accordion type="single" collapsible className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={`faq-item border-l-4 border-l-transparent transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <AccordionTrigger className="text-left text-lg hover:text-blue-600 transition-colors faq-trigger group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 faq-content">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <style>{`
        :global(.faq-item[data-state="open"]) {
          background: linear-gradient(to right, rgba(59, 130, 246, 0.05), transparent);
        }

        :global(.faq-item:hover) {
          background: linear-gradient(to right, rgba(59, 130, 246, 0.02), transparent);
        }

        :global(.faq-content) {
          animation: slide-down 0.3s ease-out;
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.faq-content) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}