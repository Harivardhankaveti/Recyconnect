import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  RefreshCw, 
  AlertTriangle, 
  Bell, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Leaf
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: RefreshCw,
      title: 'Smart Waste Exchange',
      description: 'Connect with others to exchange, donate, or find reusable items. Turn waste into value.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: AlertTriangle,
      title: 'Civic Reporting',
      description: 'Report community issues like broken street lights, garbage problems, and infrastructure concerns.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Stay updated with instant alerts about nearby waste collection, community events, and more.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Calendar,
      title: 'Waste Management',
      description: 'Schedule pickups, track recycling events, and manage your waste disposal efficiently.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Join discussions, share sustainability tips, and connect with like-minded individuals.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      title: 'Impact Tracking',
      description: 'Monitor your environmental impact with detailed analytics and progress reports.',
      color: 'from-amber-500 to-yellow-600'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '100K+', label: 'Items Exchanged', icon: RefreshCw },
    { number: '25K+', label: 'Issues Resolved', icon: CheckCircle },
    { number: '500+', label: 'Tons Diverted', icon: Leaf }
  ]

  const benefits = [
    'Reduce waste sent to landfills by up to 80%',
    'Save money through item exchange and reuse',
    'Build stronger, more connected communities',
    'Contribute to environmental sustainability goals',
    'Access real-time waste management information',
    'Earn rewards for sustainable practices'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-50 via-white to-eco-50" />
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-eco-100 text-eco-800 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4 mr-2" />
                Join the Sustainability Revolution
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Turning{' '}
                <span className="bg-gradient-to-r from-eco-600 to-emerald-600 bg-clip-text text-transparent">
                  Waste
                </span>{' '}
                into{' '}
                <span className="bg-gradient-to-r from-eco-600 to-emerald-600 bg-clip-text text-transparent">
                  Value
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                RecyConnect is your smart platform for waste exchange, community reporting, and sustainable living. 
                Connect, contribute, and create a cleaner future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth"
                  className="btn-primary text-lg px-8 py-4 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/exchange"
                  className="btn-outline text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
                >
                  Explore Exchange
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-eco-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-16 h-16 bg-emerald-200 rounded-full opacity-20"
        />
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for{' '}
              <span className="text-eco-600">Sustainable Living</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and features you need to make a positive 
              environmental impact in your community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card h-full p-8 text-center hover:shadow-strong transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-eco-600 to-emerald-700">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Making a Real Impact
            </h2>
            <p className="text-xl text-eco-100 max-w-3xl mx-auto">
              Join thousands of users who are already making a difference in their communities 
              and contributing to a more sustainable future.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-eco-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Choose{' '}
                <span className="text-eco-600">RecyConnect</span>?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-eco-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-eco-600" />
                    </div>
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/auth"
                  className="btn-primary text-lg px-8 py-4 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-eco-400 to-emerald-500 rounded-3xl transform rotate-6 scale-105 opacity-20" />
                <div className="relative bg-white rounded-3xl p-8 shadow-strong">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-eco-100 rounded-full mb-6">
                      <Star className="w-10 h-10 text-eco-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Join the Movement
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Be part of a growing community dedicated to sustainability and waste reduction.
                    </p>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Free to join and use</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Instant community access</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Start making impact today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-eco-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-eco-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already transforming their communities through 
              smart waste management and sustainable practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="btn-secondary text-lg px-8 py-4 bg-white text-eco-700 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/exchange"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-eco-700 transition-all duration-300"
              >
                Explore Platform
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
