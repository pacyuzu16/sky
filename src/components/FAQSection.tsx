import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What services does Skyline Consultancy & Engineering offer?",
      answer: "We offer comprehensive construction and engineering services including architectural design, structural design, construction of buildings, civil engineering supervision, interior design, land surveying, property services, and project planning. Our team provides end-to-end solutions for residential, commercial, and industrial projects."
    },
    {
      question: "How long does a typical construction project take?",
      answer: "Project timelines vary depending on the scope and complexity. A typical residential home construction takes 6-12 months, while commercial projects may take 12-24 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process."
    },
    {
      question: "Do you provide free consultations and project estimates?",
      answer: "Yes, we offer free initial consultations where we discuss your project requirements, assess the site if needed, and provide a preliminary cost estimate. This helps you understand the scope and budget requirements before committing to the project."
    },
    {
      question: "What makes Skyline different from other construction companies?",
      answer: "Our key differentiators include our experienced team of licensed engineers and architects, use of modern construction techniques and materials, transparent pricing, adherence to international building standards, and our commitment to delivering projects on time and within budget. We also provide comprehensive project management from design to completion."
    },
    {
      question: "Do you handle permits and regulatory approvals?",
      answer: "Absolutely. We handle all necessary permits, approvals, and regulatory compliance as part of our comprehensive service. Our team is well-versed with local building codes, zoning requirements, and environmental regulations to ensure your project meets all legal requirements."
    },
    {
      question: "What is your payment structure?",
      answer: "Our payment structure is typically milestone-based, with payments aligned to project completion phases. Usually, we require a small deposit to begin design work, followed by payments at foundation completion, structural completion, and final handover. We provide detailed payment schedules during contract signing."
    },
    {
      question: "Do you provide warranties on your construction work?",
      answer: "Yes, we provide comprehensive warranties on all our construction work. Structural work comes with a 10-year warranty, while finishing work typically has a 2-year warranty. We also provide ongoing maintenance support and are always available to address any post-completion concerns."
    },
    {
      question: "Can you work with my existing architect or designer?",
      answer: "Certainly! We're happy to collaborate with your existing architect, designer, or engineering team. We believe in teamwork and can integrate seamlessly with other professionals to bring your vision to life while ensuring structural integrity and building compliance."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Common Questions About Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to the most commonly asked questions about our construction and engineering services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-12 animate-fade-in-up">
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't see your question answered here? Our team is ready to provide personalized answers 
              to all your construction and engineering inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 font-medium"
              >
                Contact Us Today
              </a>
              <a 
                href="tel:+250788447022"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium"
              >
                Call for Quick Answers
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;