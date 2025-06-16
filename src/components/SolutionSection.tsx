const SolutionSection = () => {
  const steps = [
    {
      number: "1",
      title: "Deep Analysis",
      description: "We fetch your latest reports and pinpoint the exact factors holding you back."
    },
    {
      number: "2", 
      title: "Identify & Dispute",
      description: "We help you find errors or fake accounts and guide you on how to dispute them."
    },
    {
      number: "3",
      title: "Expert Plan", 
      description: "Our credit expert calls you to explain your report and creates a personalized action plan."
    },
    {
      number: "4",
      title: "Track & Improve",
      description: "Follow your custom tips and watch your score climb."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Introducing ScoreUp: Your Personal Guide to a Better Credit Score
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We've created a proven 4-step plan designed to demystify your credit report, identify key issues, and give you actionable steps, all with expert human guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connection line for steps 1->2 and 3->4 */}
              {(index === 0 || index === 2) && (
                <div className="hidden sm:block absolute top-8 left-full w-4 md:w-8 h-0.5 bg-primary/30 z-0"></div>
              )}
              
              <div className="relative bg-card rounded-xl p-3 md:p-6 shadow-soft border border-border hover:shadow-card transition-all duration-300">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mb-2 md:mb-4 mx-auto">
                  <span className="text-primary-foreground font-bold text-sm md:text-lg">{step.number}</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3 text-center">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-center leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-success/10 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-success font-semibold text-lg mb-2">
              ✓ Proven Process
            </p>
            <p className="text-muted-foreground">
              This exact system has helped thousands of people improve their credit scores by an average of 130+ points.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
