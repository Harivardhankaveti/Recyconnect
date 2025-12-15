import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Exchange', href: '/exchange' },
      { name: 'Complaints', href: '/complaints' },
      { name: 'Schedule', href: '/schedule' },
      { name: 'Community', href: '/community' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    resources: [
      { name: 'Sustainability Tips', href: '/tips' },
      { name: 'Recycling Guide', href: '/guide' },
      { name: 'Blog', href: '/blog' },
      { name: 'Events', href: '/events' },
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Email', href: 'mailto:hello@recyconnect.com', icon: Mail },
  ]

  return (
    <footer className="bg-gradient-to-br from-eco-800 to-eco-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-eco-600 text-2xl font-bold">♻</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">RecyConnect</h3>
                <p className="text-eco-200 text-sm">Smart Waste Exchange</p>
              </div>
            </motion.div>
            
            <p className="text-eco-200 mb-6 leading-relaxed">
              Connecting communities for sustainable waste management, civic reporting, 
              and environmental consciousness. Together, we turn waste into value.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center text-eco-200">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">hello@recyconnect.com</span>
              </div>
              <div className="flex items-center text-eco-200">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-eco-200">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Green City, Eco State</span>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-eco-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-eco-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-eco-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-eco-200 mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-eco-700 hover:bg-eco-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-eco-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-eco-200 text-sm mb-4 md:mb-0">
              <span>© {currentYear} RecyConnect. All rights reserved.</span>
            </div>
            
            <div className="flex items-center text-eco-200 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-400" />
              <span>for a sustainable future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
