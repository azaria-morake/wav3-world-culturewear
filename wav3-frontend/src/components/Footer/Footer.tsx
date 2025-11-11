import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../UI/Icon';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContent}>
        {/* Brand Section */}
        <motion.div 
          className={styles.brandSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.logo}>
            <h2 className={styles.logoText}>Wav3 World</h2>
            <p className={styles.tagline}>
              The Wave = trial. The Spirit = response.
            </p>
          </div>
          
          <div className={styles.socialLinks}>
            <a 
              href="https://instagram.com/wav3world" 
              className={styles.socialLink}
              aria-label="Follow on Instagram"
            >
              <Icon name="heart" size={20} />
            </a>
            <a 
              href="https://twitter.com/wav3world" 
              className={styles.socialLink}
              aria-label="Follow on Twitter"
            >
              <Icon name="heart" size={20} />
            </a>
            <a 
              href="https://tiktok.com/@wav3world" 
              className={styles.socialLink}
              aria-label="Follow on TikTok"
            >
              <Icon name="heart" size={20} />
            </a>
          </div>
        </motion.div>

        {/* Links Sections */}
        <div className={styles.linksSections}>
          {/* Explore */}
          <motion.div 
            className={styles.linksSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Explore</h3>
            <ul className={styles.linksList}>
              <li><a href="/collections" className={styles.footerLink}>All Collections</a></li>
              <li><a href="/new-arrivals" className={styles.footerLink}>New Arrivals</a></li>
              <li><a href="/best-sellers" className={styles.footerLink}>Best Sellers</a></li>
              <li><a href="/sale" className={styles.footerLink}>Sale</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div 
            className={styles.linksSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Support</h3>
            <ul className={styles.linksList}>
              <li><a href="/shipping" className={styles.footerLink}>Shipping Info</a></li>
              <li><a href="/returns" className={styles.footerLink}>Returns & Exchanges</a></li>
              <li><a href="/size-guide" className={styles.footerLink}>Size Guide</a></li>
              <li><a href="/care" className={styles.footerLink">Product Care</a></li>
              <li><a href="/faq" className={styles.footerLink">FAQ</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div 
            className={styles.linksSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.linksList}>
              <li><a href="/about" className={styles.footerLink}>Our Story</a></li>
              <li><a href="/sustainability" className={styles.footerLink}>Sustainability</a></li>
              <li><a href="/press" className={styles.footerLink}>Press</a></li>
              <li><a href="/careers" className={styles.footerLink">Careers</a></li>
              <li><a href="/contact" className={styles.footerLink">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className={styles.newsletterSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.sectionTitle}>Stay Connected</h3>
            <p className={styles.newsletterText}>
              Join the Wav3 World for exclusive drops, artist collabs, and early access.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {currentYear} Wav3 World. All rights reserved.
          </div>
          
          <div className={styles.legalLinks}>
            <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="/terms" className={styles.legalLink}>Terms of Service</a>
            <a href="/cookies" className={styles.legalLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};