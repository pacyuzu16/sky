import { Building2, Phone, Mail, MapPin, Globe, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "home" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "About Us", href: "about" },
    { name: "Contact", href: "contact" }
  ];

  const services = [
    "Architectural Design",
    "Structural Design",
    "Construction of Building",
    "Civil Engineering Supervision",
    "Interior Design",
    "Land Surveying"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-contain sm:bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url('/lovable-uploads/742c8476-009a-4fb8-9440-c2befe553fe1.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 to-secondary/60" />
      
      <div className="relative container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div>
              {/* <img 
                src="/lovable-uploads/e6415b3c-d84e-4730-85db-6ff2ff190be3.png" 
                alt="Skyline Consultancy & Engineering Logo" 
                className="h-16 w-auto mb-4"
              /> */}
              <div className="flex items-center space-x-3 animate-fade-in-left">
            <img 
              src="/lovable-uploads/e6415b3c-d84e-4730-85db-6ff2ff190be3.png" 
              alt="Skyline Consultancy & Engineering Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg leading-tight">
                Skyline Consultancy
                <br />
                <span className="text-white font-bold text-lg">& Engineering</span>
              </h1>
            </div>
          </div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                Building tomorrow's infrastructure with innovative engineering solutions. 
                Quality is our first priority in every project we undertake.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Facebook className="h-5 w-5 text-primary-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-5 w-5 text-primary-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Twitter className="h-5 w-5 text-primary-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        if (link.href === 'home') {
                          window.location.href = '/';
                        } else {
                          window.location.href = `/${link.href}`;
                        }
                        setTimeout(() => window.scrollTo(0, 0), 100);
                      }}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="tel:+250788447022"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    +250 788 447 022
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a 
                    href="mailto:skylineconsengi@gmail.com"
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    skylineconsengi@gmail.com
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-secondary-foreground/80">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-foreground/80 text-center md:text-left">
              © {currentYear} Skyline Consultancy & Engineering. All rights reserved.
            </p>
            <p className="text-secondary-foreground/60 text-sm">
              Quality is Our First Priority
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="relative">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-primary opacity-5 rounded-full -mb-16 -ml-16"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mb-24 -mr-24"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;