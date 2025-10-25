import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <h4 className="text-xl font-bold text-primary">StreetWise Global</h4>
          <p className="mt-2 text-muted-foreground">
            Enlightened to Enlighten.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 space-y-1">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            <li><Link to="/programs" className="text-muted-foreground hover:text-primary">Programs</Link></li>
            <li><Link to="/get-involved" className="text-muted-foreground hover:text-primary">Get Involved</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Get In Touch</h5>
          <ul className="mt-2 space-y-1">
            <li className="text-muted-foreground">info@streetwise.org</li>
            <li className="text-muted-foreground">+254 700 000 000</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Follow Us</h5>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary"><Twitter /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Facebook /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Instagram /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="border-t bg-muted/60">
        <div className="container flex flex-col items-center justify-between py-4 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} StreetWise Global Network. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-primary"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}