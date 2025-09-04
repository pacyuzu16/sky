import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToPage = (page: string) => {
    const path = page === "home" ? "/" : `/${page}`;
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePage = (page: string) => {
    const currentPath = location.pathname;
    if (page === "home") return currentPath === "/";
    return currentPath === `/${page}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm transition-all duration-300">
    
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {["home", "services", "projects", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => navigateToPage(item)}
                className={`transition-colors duration-300 capitalize font-medium relative group ${
                  isActivePage(item) ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                {item}
                <span className={`absolute left-0 bottom-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  isActivePage(item) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </button>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-white">+250 788 447 022</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateToPage("contact")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-fade-in-up">
            <div className="px-6 py-6 space-y-4">
              {["home", "services", "projects", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => navigateToPage(item)}
                  className={`block w-full text-left py-3 transition-colors duration-300 capitalize font-medium border-b border-border/50 last:border-b-0 ${
                    isActivePage(item) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+250 788 447 022</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>skylineconsengi@gmail.com</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToPage("contact")}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;