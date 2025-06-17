
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const UserSuccessCarousel = () => {
  const users = [
    {
      image: "/lovable-uploads/e897daf0-3c07-4500-b827-eebdc15c6df5.png",
      name: "Ankit Sharma",
      profession: "IT Employee",
      scoreBefore: 580,
      scoreAfter: 650
    },
    {
      image: "/lovable-uploads/e88940e0-e43e-4f17-8ff1-4da59732ad82.png",
      name: "Himanshu Devgun",
      profession: "Cafe Owner",
      scoreBefore: 590,
      scoreAfter: 720
    },
    {
      image: "/lovable-uploads/4a7dfd7d-7c25-411e-81fd-6e16215f38fa.png",
      name: "Shravan Suthar",
      profession: "IT employee",
      scoreBefore: 600,
      scoreAfter: 780
    },
    {
      image: "/lovable-uploads/4ea972df-3df9-4b4a-99c6-2ddfb2e04428.png",
      name: "Arvind patel",
      profession: "Sales Person",
      scoreBefore: 590,
      scoreAfter: 750
    },
    {
      image: "/lovable-uploads/46cbf358-7d2f-47ef-a86c-7fb8e493e1de.png",
      name: "Tarun pal",
      profession: "Grocery shop owner",
      scoreBefore: 600,
      scoreAfter: 780
    },
    {
      image: "/lovable-uploads/a41e25e0-570e-47a4-9b79-f86e0ad3e0f4.png",
      name: "Priya jiaswal",
      profession: "Event manager",
      scoreBefore: 590,
      scoreAfter: 720
    }
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="relative animate-scale-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Success Stories</h3>
        <p className="text-muted-foreground">Real people, real results with ScoreUp</p>
      </div>
      
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {users.map((user, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    {/* Credit Score Display */}
                    <div className="relative">
                      <div className="text-4xl font-bold text-success mb-1">{user.scoreAfter}</div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <span className="line-through">{user.scoreBefore}</span>
                        <span className="text-success font-semibold">+{user.scoreAfter - user.scoreBefore}</span>
                      </div>
                      {/* Score improvement indicator with arc */}
                      <div className="w-16 h-8 mx-auto mt-2">
                        <svg viewBox="0 0 64 32" className="w-full h-full">
                          <path
                            d="M 8 24 A 24 24 0 0 1 56 24"
                            stroke="hsl(var(--muted))"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            d="M 8 24 A 24 24 0 0 1 56 24"
                            stroke="hsl(var(--success))"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="75.4"
                            strokeDashoffset={75.4 - (75.4 * ((user.scoreAfter - user.scoreBefore) / 200))}
                            className="transition-all duration-1000"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* User Image */}
                    <div className="relative">
                      <img 
                        src={user.image} 
                        alt={`${user.name} - Credit score success story`}
                        className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-success/20"
                      />
                    </div>
                    
                    {/* User Details */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-lg">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.profession}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Join thousands who've improved their credit with ScoreUp
        </p>
      </div>
    </div>
  );
};

export default UserSuccessCarousel;
