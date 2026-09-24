const Footer = () => {
  return (
    <footer className="bg-primary section-padding py-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-display text-primary-foreground text-xl tracking-wider uppercase">
          TrimSync
        </span>
        <p className="font-body text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} TrimSync. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="font-body text-primary-foreground/40 text-sm hover:text-primary-foreground transition-colors">
            Instagram
          </a>
          <a href="#" className="font-body text-primary-foreground/40 text-sm hover:text-primary-foreground transition-colors">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
