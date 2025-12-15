import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Heart, 
  Share2,
  Calendar,
  User,
  Search,
  Filter,
  Plus
} from 'lucide-react'

const Community = () => {
  const [activeTab, setActiveTab] = useState('blogs')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - replace with real API calls
  const blogs = [
    {
      id: 1,
      title: '10 Easy Ways to Reduce Household Waste',
      excerpt: 'Discover simple yet effective strategies to minimize waste in your daily life and contribute to a greener environment.',
      author: 'Sarah Green',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      category: 'tips',
      likes: 124,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'The Future of Recycling: Innovative Technologies',
      excerpt: 'Explore cutting-edge recycling technologies that are revolutionizing waste management and creating new possibilities.',
      author: 'Dr. Mike Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      category: 'technology',
      likes: 89,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Community Composting: A Beginner\'s Guide',
      excerpt: 'Learn how to start and maintain a community composting program that benefits everyone in your neighborhood.',
      author: 'Emma Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      category: 'composting',
      likes: 156,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    }
  ]

  const discussions = [
    {
      id: 1,
      title: 'Best practices for organizing neighborhood cleanups?',
      content: 'I\'m planning to organize a neighborhood cleanup event and would love to hear from others who have done this successfully.',
      author: 'John D.',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      timestamp: '2 hours ago',
      replies: 8,
      views: 45,
      category: 'events'
    },
    {
      id: 2,
      title: 'Recycling plastic bags - what\'s the most effective method?',
      content: 'I\'ve been trying to find the best way to recycle plastic bags. Some places accept them, others don\'t. What\'s your experience?',
      author: 'Lisa M.',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      timestamp: '1 day ago',
      replies: 15,
      views: 89,
      category: 'recycling'
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories', color: 'bg-gray-100 text-gray-800' },
    { value: 'tips', label: 'Tips & Tricks', color: 'bg-green-100 text-green-800' },
    { value: 'technology', label: 'Technology', color: 'bg-blue-100 text-blue-800' },
    { value: 'composting', label: 'Composting', color: 'bg-amber-100 text-amber-800' },
    { value: 'events', label: 'Events', color: 'bg-purple-100 text-purple-800' },
    { value: 'recycling', label: 'Recycling', color: 'bg-cyan-100 text-cyan-800' }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with eco-conscious individuals, share sustainability tips, 
              and join discussions about waste management and environmental protection.
            </p>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-eco-50 border border-eco-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-eco-600">2,847</div>
              <div className="text-sm text-eco-700">Community Members</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-blue-700">Blog Posts</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">89</div>
              <div className="text-sm text-purple-700">Active Discussions</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'blogs'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="inline-block w-4 h-4 mr-2" />
              Blogs & Tips
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'discussions'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageCircle className="inline-block w-4 h-4 mr-2" />
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'events'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Events
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'blogs' ? 'blogs' : 'discussions'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-eco-600 text-white'
                      : category.color + ' hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Write Article
              </button>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Blog Image */}
                    <div className="h-48 bg-gray-200">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories.find(c => c.value === blog.category)?.color}`}>
                          {categories.find(c => c.value === blog.category)?.label}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Author and Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={blog.authorAvatar}
                            alt={blog.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(blog.publishDate)}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{blog.readTime}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-red-600 transition-colors duration-200">
                            <Heart className="h-4 w-4 mr-1" />
                            {blog.likes}
                          </button>
                          <button className="flex items-center hover:text-eco-600 transition-colors duration-200">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {blog.comments}
                          </button>
                        </div>
                        
                        <button className="text-eco-600 hover:text-eco-700 text-sm font-medium hover:underline transition-colors duration-200">
                          Read More
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
              <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Start Discussion
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={discussion.authorAvatar}
                      alt={discussion.author}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-eco-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories.find(c => c.value === discussion.category)?.color}`}>
                          {categories.find(c => c.value === discussion.category)?.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {discussion.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {discussion.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {discussion.timestamp}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {discussion.replies} replies
                          </span>
                          <span>{discussion.views} views</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-eco-600 hover:bg-eco-50 rounded-full transition-colors duration-200">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-eco-600 hover:bg-eco-50 rounded-full transition-colors duration-200">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Events Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              Community events and meetups will be displayed here. Stay tuned for updates!
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Suggest Event
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Community
