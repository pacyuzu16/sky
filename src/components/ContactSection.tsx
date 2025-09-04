import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FAQSection from "@/components/FAQSection";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Building2,
  Globe,
  MessageSquare,
  Facebook,
  Linkedin,
  Twitter
} from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [honeypot, setHoneypot] = useState(""); // Bot detection field
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Honeypot check - if filled, it's likely a bot
      if (honeypot) {
        setIsSubmitting(false);
        return; // Silently fail for bots
      }
      // Insert message into database
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service || null,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Get admin email setting
      const { data: adminSettings } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_email')
        .maybeSingle();

      const adminEmail = adminSettings?.setting_value || 'skylineconsengi@gmail.com';

      // Send email notification
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            adminEmail: adminEmail
          }
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole process if email fails
      }

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
      setHoneypot(""); // Reset honeypot
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+250 788 447 022",
      subtitle: "Available 24/7 for emergencies"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "skylineconsengi@gmail.com",
      subtitle: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Kigali, Rwanda",
      subtitle: "KG 123 St, Gasabo District"
    },
    {
      icon: Clock,
      title: "Working Hours",
      info: "Mon - Fri: 8:00 AM - 6:00 PM",
      subtitle: "Sat: 9:00 AM - 4:00 PM"
    }
  ];

  const services = [
    "Architectural Design",
    "Structural Design", 
    "Construction of Building",
    "Civil Engineering Supervision",
    "Interior Design",
    "Land Surveying",
    "Property Services",
    "Project Planning"
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Contact Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your project? Get in touch with our expert team for a free consultation 
            and let's transform your vision into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6 animate-fade-in-left">
              <div className="bg-gradient-primary rounded-2xl p-8 text-center shadow-elegant">

                <div className="flex justify-center">
  <img 
    src="/lovable-uploads/e6415b3c-d84e-4730-85db-6ff2ff190be3.png" 
    alt="Skyline Consultancy & Engineering Logo" 
    className="h-16 w-auto mb-4"
  />
</div>

                
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  Skyline Consultancy
                </h3>
                <p className="text-primary-foreground/90 mb-4">& Engineering</p>
                <p className="text-primary-foreground/80 text-sm">
                  Your trusted partner for innovative engineering solutions and construction excellence.
                </p>
              </div>

              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-construction transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">
                            {item.title}
                          </h4>
                          <p className="text-foreground font-medium mb-1">
                            {item.info}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Social Proof */}
              <div className="bg-muted/50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary mr-2" />
                  <h4 className="text-lg font-semibold text-foreground">Quick Response</h4>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  We typically respond to inquiries within 2-4 hours during business hours.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"></div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">100+ Happy Clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-construction animate-fade-in-up">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Get Your Free Consultation
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you with a detailed proposal.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from real users */}
                  <div style={{ display: 'none' }}>
                    <Input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="border-input focus:border-primary transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="border-input focus:border-primary transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Phone and Service */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="border-input focus:border-primary transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:border-primary transition-colors duration-300"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Project Details *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={5}
                      required
                      className="border-input focus:border-primary transition-colors duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Connect with Us Section */}
        <div className="mt-16 animate-fade-in-up">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Connect with Us
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow us on social media for updates on our latest projects and industry insights.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <Facebook className="h-7 w-7 text-primary-foreground" />
            </a>
            <a href="#" className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <Linkedin className="h-7 w-7 text-primary-foreground" />
            </a>
            <a href="#" className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <Twitter className="h-7 w-7 text-primary-foreground" />
            </a>
            <a href="#" className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
              <Globe className="h-7 w-7 text-primary-foreground" />
            </a>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-8 animate-fade-in-up">
          <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For urgent matters or emergency consultations, call us directly or send us an email. 
              Our team is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.open("tel:+250788447022")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +250 788 447 022
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("mailto:skylineconsengi@gmail.com")}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us Directly
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </section>
  );
};

export default ContactSection;