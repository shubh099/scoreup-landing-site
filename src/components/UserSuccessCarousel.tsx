
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
      <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Success Stories</h3>
          <p className="text-sm text-muted-foreground">Real people, real results with ScoreUp</p>
        </div>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {users.map((user, index) => (
              <CarouselItem key={index}>
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={user.image} 
                      alt={`${user.name} - Credit score success story`}
                      className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-success/20"
                    />
                    {/* Score improvement indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-bold">
                      +{user.scoreAfter - user.scoreBefore}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-lg">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.profession}</p>
                    
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Before</div>
                        <div className="text-lg font-bold text-destructive">{user.scoreBefore}</div>
                      </div>
                      
                      <div className="text-2xl text-success">→</div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">After</div>
                        <div className="text-lg font-bold text-success">{user.scoreAfter}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Join thousands who've improved their credit with ScoreUp
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSuccessCarousel;
