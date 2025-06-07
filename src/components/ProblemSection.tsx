
import { FileX, Percent, QuestionMark, TangledLines } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: FileX,
      title: "Confused by a loan rejection?",
      description: "Don't know why your application was denied"
    },
    {
      icon: Percent,
      title: "Facing high interest rates on loans and cards?",
      description: "Paying more than you should because of your score"
    },
    {
      icon: QuestionMark,
      title: "Don't know what's *actually* lowering your score?",
      description: "Credit reports are confusing and hard to understand"
    },
    {
      icon: TangledLines,
      title: "Feeling stuck and unsure how to fix it?",
      description: "No clear path forward to improve your situation"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Does This Sound Familiar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're not alone. Thousands of people struggle with these same credit challenges every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-soft border border-border text-center hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <problem.icon className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Good news:</span> Every single one of these problems has a solution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
