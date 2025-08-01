import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Assessment', href: '/assessment' },
    { name: 'Prediction', href: '/prediction' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-ai-500 to-neural-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-ai-600 to-neural-600 bg-clip-text text-transparent">
                CareerAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-ai-600",
                    isActive(item.href) 
                      ? "text-ai-600 border-b-2 border-ai-600 pb-4" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Link to="/assessment">
                <Button className="bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600">
                  Start Assessment
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-ai-600 px-4 py-2 rounded-md",
                      isActive(item.href) 
                        ? "text-ai-600 bg-ai-50" 
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/assessment" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-ai-500 to-neural-500 text-white hover:from-ai-600 hover:to-neural-600">
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r from-ai-500 to-neural-500">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-ai-600 to-neural-600 bg-clip-text text-transparent">
                CareerAI
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered career prediction and guidance platform
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-ai-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-ai-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="hover:text-ai-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
