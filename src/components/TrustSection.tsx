const TrustSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="animate-scale-in">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Professional credit consultant - friendly financial expert" 
                className="w-full h-[400px] object-cover rounded-2xl shadow-card"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              You're Not Alone.{" "}
              <span className="text-gradient">Talk to Your Personal Credit Guide.</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success-foreground text-sm">✓</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Real human experts</span> with years of credit repair experience
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success-foreground text-sm">✓</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Personalized guidance</span> tailored to your specific situation
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-success-foreground text-sm">✓</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Clear explanations</span> of what's affecting your score and how to fix it
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 bg-success/10 rounded flex items-center justify-center">
                <span className="text-success text-sm">🔒</span>
              </div>
              <span className="text-sm font-medium">Secure 256-bit SSL</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 bg-success/10 rounded flex items-center justify-center">
                <span className="text-success text-sm">✓</span>
              </div>
              <span className="text-sm font-medium">Verified Payment Gateway</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 bg-success/10 rounded flex items-center justify-center">
                <span className="text-success text-sm">🛡️</span>
              </div>
              <span className="text-sm font-medium">Data Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
