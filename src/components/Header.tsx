import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { auth } from "@/lib/firebase"; // Make sure this path is correct
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import logo from "../assets/logo.webp"; // Import your logo.webp file

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Why Viable?", href: "#why" },
    { label: "Success Stories", href: "#stories" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Removed the 'V' div */}
          <img src={logo} alt="Viable Logo" className="h-8" /> {/* Adjust height/width as needed */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons or User */}
        <div className="hidden sm:flex items-center gap-3">
          <Button variant="default" size="sm">
            Get Started
          </Button>
          {!user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Login
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  {user.displayName || user.email}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 text-center p-2">
                <p className="text-sm mb-2 text-muted-foreground">Signed in</p>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;