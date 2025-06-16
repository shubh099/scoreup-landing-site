
import React from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const UserReviewsSection = () => {
  const reviews = [
    {
      rating: 5,
      text: "I was skeptical at first, but ScoreUp is the real deal. They explained my credit report in a way I could finally understand. My score has already gone up by 30 points in two months!",
      name: "Priya Sharma"
    },
    {
      rating: 5,
      text: "Finally got my dream car loan approved! The interest rate was much lower than I expected. Couldn't have done it without the personalized action plan from their team. Thank you, ScoreUp!",
      name: "Rohan Mehra"
    },
    {
      rating: 4.5,
      text: "The best part was the 1-on-1 call with the credit expert. He was so patient and answered all my questions. It felt like I had a personal guide. Very helpful service.",
      name: "Anjali Singh"
    },
    {
      rating: 5,
      text: "I had a fake loan account on my report that I didn't even know about. The ScoreUp team helped me identify it and guided me through the dispute process. My score jumped by 50 points after it was removed!",
      name: "Vikram Patel"
    },
    {
      rating: 5,
      text: "Just crossed the 750 score mark! The app is easy to use and the tips are genuinely tailored to your profile. It takes discipline, but their plan works if you follow it.",
      name: "Sameer Khan"
    },
    {
      rating: 4.5,
      text: "A great tool for anyone confused about their credit score. The interface is clean and the process is straightforward. Made a complex subject feel simple.",
      name: "Neha Gupta"
    },
    {
      rating: 5,
      text: "My home loan application was stuck due to my low CIBIL score. After following their 4-step plan for a few months, I was finally able to get it approved. This service is worth every rupee.",
      name: "Arjun Das"
    }
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Thousands on the Path to a Better Score
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who transformed their credit scores with ScoreUp
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-card rounded-xl p-6 shadow-soft border border-border h-full flex flex-col">
                    {/* Star Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(review.rating)}
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      "{review.text}"
                    </p>
                    
                    {/* Full Name */}
                    <div className="pt-4 border-t border-border">
                      <p className="font-bold text-foreground">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default UserReviewsSection;
