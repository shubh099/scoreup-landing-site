import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this a monthly subscription?",
      answer: "This offer is a single, one-time payment of ₹99. There are no recurring charges, hidden fees, or monthly subscriptions. You pay once and get access to everything included in the package."
    },
    {
      question: "How quickly will I see results?",
      answer: "You will see your full report and get your expert plan immediately after payment. Improving your credit score is a journey that varies by individual, but some users see positive changes in as little as 45-60 days by following the personalized plan we create for them."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We use bank-grade security and SSL encryption to protect your data. Your privacy is our top priority, and we never share your personal information with third parties. All data is stored securely and handled according to strict privacy standards."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We're confident you'll love ScoreUp, but if you're not completely satisfied within 30 days, we'll provide a full refund. No questions asked. Your success is our priority."
    },
    {
      question: "How does the expert consultation call work?",
      answer: "Within 24-48 hours of your purchase, one of our credit experts will call you at your preferred time. The call typically lasts 20-30 minutes where they'll explain your credit report, identify improvement opportunities, and create your personalized action plan."
    },
    {
      question: "Can this help if I have very poor credit?",
      answer: "Yes! ScoreUp is specifically designed to help people with all types of credit situations, including those with poor credit. In fact, people with lower scores often see the most dramatic improvements because there are more opportunities for positive changes."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about ScoreUp.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/30 transition-colors">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Contact our support team
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
