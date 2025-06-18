
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
    },
    {
      image: "/lovable-uploads/e88940e0-e43e-4f17-8ff1-4da59732ad82.png",
    },
    {
      image: "/lovable-uploads/4a7dfd7d-7c25-411e-81fd-6e16215f38fa.png",
    },
    {
      image: "/lovable-uploads/4ea972df-3df9-4b4a-99c6-2ddfb2e04428.png",
    },
    {
      image: "/lovable-uploads/46cbf358-7d2f-47ef-a86c-7fb8e493e1de.png",
    },
    {
      image: "/lovable-uploads/a41e25e0-570e-47a4-9b79-f86e0ad3e0f4.png",
    }
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="relative animate-scale-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Real People, Real Results</h3>
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
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] w-full">
                    <img 
                      src={user.image} 
                      alt={`Success story ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
