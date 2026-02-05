import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(99,102,241,0.1),transparent_50%)] opacity-60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_25%,rgba(139,92,246,0.05)_25%,rgba(139,92,246,0.05)_50%,transparent_50%,transparent_75%,rgba(139,92,246,0.05)_75%)] bg-[length:32px_32px]"></div>
          <div className="absolute top-1/6 right-1/3 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/6 left-1/3 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs sm:text-sm font-medium text-blue-300 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                About Our Company
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                Transforming Ideas Into
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Digital Excellence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                We are a team of passionate developers and designers dedicated to creating 
                innovative digital solutions that drive business growth and exceed expectations.
              </p>
              
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">1+</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">3+</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">3+</div>
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Founded with a vision to bridge the gap between imagination and reality, 
                Illusion has been at the forefront of digital innovation. We believe that 
                every great project starts with a dream, and our mission is to make those dreams come true.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team combines years of experience in web development, design, and digital 
                strategy to deliver solutions that not only meet but exceed expectations.
              </p>
            </div>
            <div>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl h-80 flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-3xl sm:text-4xl font-bold mb-4">Our Vision</div>
                  <p className="text-lg sm:text-xl opacity-90">Creating Digital Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Our <span className="text-blue-600">Core Values</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Innovation</h3>
                <p className="text-gray-600">Pushing boundaries with cutting-edge solutions</p>
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Quality</h3>
                <p className="text-gray-600">Excellence in every detail we create</p>
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Creativity</h3>
                <p className="text-gray-600">Unique designs that stand out</p>
              </div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Passion</h3>
                <p className="text-gray-600">Building lasting relationships</p>
              </div>
            </div>
          </div>

          {/* Our Services Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              What We <span className="text-blue-600">Specialize In</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Web Development</h3>
                <p className="text-gray-600 mb-4">Custom websites, web applications, and e-commerce platforms built with modern technologies like React, Node.js, and MongoDB.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Responsive Design</li>
                  <li>• SEO Optimization</li>
                  <li>• Performance Optimization</li>
                  <li>• Cross-browser Compatibility</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-100 p-8 rounded-2xl border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">E-Commerce Solutions</h3>
                <p className="text-gray-600 mb-4">Complete online store development with secure payment gateways, inventory management, and customer analytics.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Payment Gateway Integration</li>
                  <li>• Inventory Management</li>
                  <li>• Order Tracking System</li>
                  <li>• Customer Dashboard</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Marketing</h3>
                <p className="text-gray-600 mb-4">Comprehensive digital marketing strategies including SEO, social media marketing, and content optimization.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Search Engine Optimization</li>
                  <li>• Social Media Marketing</li>
                  <li>• Content Strategy</li>
                  <li>• Analytics & Reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Process Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Our Development <span className="text-blue-600">Process</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Discovery</h3>
                <p className="text-gray-600 text-sm">Understanding your business requirements, target audience, and project goals through detailed consultation.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Planning</h3>
                <p className="text-gray-600 text-sm">Creating detailed project roadmap, wireframes, and technical specifications for optimal results.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Development</h3>
                <p className="text-gray-600 text-sm">Building your solution using best practices, modern technologies, and agile development methodology.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Launch</h3>
                <p className="text-gray-600 text-sm">Deploying your project with thorough testing, optimization, and ongoing support for success.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Choose <span className="text-blue-600">Illusion?</span>
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 sm:p-12 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Leading Web Development Company in Lucknow</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Expert Team</h4>
                        <p className="text-gray-600 text-sm">Skilled developers with expertise in latest technologies and frameworks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Affordable Pricing</h4>
                        <p className="text-gray-600 text-sm">Competitive rates with transparent pricing and no hidden costs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Timely Delivery</h4>
                        <p className="text-gray-600 text-sm">On-time project completion with regular updates and milestone tracking</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                        <p className="text-gray-600 text-sm">Comprehensive maintenance and support services post-launch</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies We Use</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-bold">R</span>
                      </div>
                      <span className="text-xs text-gray-600">React</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-600 font-bold">N</span>
                      </div>
                      <span className="text-xs text-gray-600">Node.js</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-600 font-bold">M</span>
                      </div>
                      <span className="text-xs text-gray-600">MongoDB</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-cyan-600 font-bold">T</span>
                      </div>
                      <span className="text-xs text-gray-600">Tailwind</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-yellow-600 font-bold">J</span>
                      </div>
                      <span className="text-xs text-gray-600">JavaScript</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 font-bold">E</span>
                      </div>
                      <span className="text-xs text-gray-600">Express</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;