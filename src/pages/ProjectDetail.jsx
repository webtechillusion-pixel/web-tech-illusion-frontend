import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { id } = useParams();
  
  const projectsData = {
    1: {
      title: "Siddhart Tour and Travel",
      subtitle: "Complete Travel Booking Platform",
      description: "A comprehensive travel booking platform with tour packages, hotel reservations, and seamless payment integration for memorable travel experiences.",
      longDescription: "Developed a complete travel booking platform for Siddhart Tour and Travel that revolutionizes how customers plan and book their trips. The platform features an intuitive interface for browsing tour packages, booking accommodations, and managing travel itineraries with integrated payment processing.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Google Maps API", "Razorpay"],
      category: "Web Development",
      gradient: "from-blue-500 to-purple-600",
      client: "Siddhart Tour and Travel",
      duration: "3 months",
      team: "3 developers",
      year: "2024",
      features: [
        "Tour Package Browsing & Booking",
        "Hotel Reservation System", 
        "Itinerary Planning Tools",
        "Secure Payment Gateway Integration",
        "Customer Dashboard",
        "Mobile-Responsive Design",
        "Admin Panel for Package Management",
        "Booking Confirmation & Notifications"
      ],
      challenges: [
        "Integrating multiple travel APIs for real-time data",
        "Creating seamless booking flow for complex travel packages",
        "Implementing secure payment processing for travel bookings",
        "Managing dynamic pricing for seasonal packages"
      ],
      results: [
        "200% increase in online bookings",
        "Reduced booking time by 60%",
        "Improved customer satisfaction scores",
        "Streamlined business operations"
      ]
    },
    2: {
      title: "Car Rental Website",
      subtitle: "Modern Vehicle Rental Platform",
      description: "A modern car rental platform with real-time availability, booking management, and secure payment processing for hassle-free vehicle rentals.",
      longDescription: "Built a comprehensive car rental platform that simplifies the vehicle booking process for customers while providing powerful management tools for the rental business. The system includes real-time vehicle availability, automated booking confirmations, and integrated payment processing.",
      tech: ["React", "Express.js", "MongoDB", "Razorpay", "Node.js", "JWT"],
      category: "Web Development",
      gradient: "from-green-500 to-teal-600",
      client: "Car Rental Services",
      duration: "2.5 months",
      team: "3 developers",
      year: "2024",
      features: [
        "Real-time Vehicle Availability",
        "Online Booking & Reservation System",
        "Customer Profile Management",
        "Secure Payment Processing",
        "Booking History & Tracking",
        "Vehicle Fleet Management",
        "Automated Email Notifications",
        "Mobile-Friendly Interface"
      ],
      challenges: [
        "Managing real-time vehicle availability across multiple locations",
        "Implementing dynamic pricing based on demand and season",
        "Creating efficient booking management system",
        "Ensuring secure payment processing for rentals"
      ],
      results: [
        "150% increase in online reservations",
        "Reduced manual booking errors by 90%",
        "Improved fleet utilization by 40%",
        "Enhanced customer experience ratings"
      ]
    },
    3: {
      title: "Cosmetics E-Commerce",
      subtitle: "Beautiful Online Beauty Store",
      description: "A beautiful cosmetics online store with product catalog, shopping cart, user reviews, and integrated payment gateway for beauty enthusiasts.",
      longDescription: "Created an elegant e-commerce platform specifically designed for cosmetics and beauty products. The website features a visually appealing product showcase, advanced filtering options, customer reviews system, and seamless checkout process tailored for the beauty industry.",
      tech: ["React", "Node.js", "MongoDB", "PayPal", "Stripe", "Cloudinary"],
      category: "E-Commerce", 
      gradient: "from-purple-500 to-pink-600",
      client: "Beauty & Cosmetics Store",
      duration: "4 months",
      team: "4 developers",
      year: "2024",
      features: [
        "Product Catalog with High-Quality Images",
        "Advanced Search & Filter Options",
        "Shopping Cart & Wishlist",
        "Customer Reviews & Ratings",
        "Secure Checkout Process",
        "Order Tracking System",
        "Beauty Tips Blog Section",
        "Mobile-Optimized Shopping Experience"
      ],
      challenges: [
        "Creating visually appealing product displays for cosmetics",
        "Implementing color-accurate product photography system",
        "Building trust through customer reviews and ratings",
        "Optimizing mobile shopping experience for beauty products"
      ],
      results: [
        "300% increase in online sales",
        "Improved conversion rate by 45%",
        "Enhanced brand visibility and reach",
        "Reduced cart abandonment by 35%"
      ]
    },
    4: {
      title: "Food Delivery App",
      subtitle: "On-Demand Food Delivery Platform",
      description: "A comprehensive food delivery platform connecting restaurants with customers for seamless ordering and delivery experiences.",
      longDescription: "Built a feature-rich food delivery application that connects restaurants with hungry customers. The platform includes real-time order tracking, restaurant management dashboard, delivery partner app, and secure payment processing.",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io", "Razorpay"],
      category: "Mobile App", 
      gradient: "from-orange-500 to-red-600",
      client: "Food Delivery Services",
      duration: "5 months",
      team: "5 developers",
      year: "2024",
      features: [
        "Restaurant Listings & Search",
        "Real-time Order Tracking",
        "Multiple Payment Options",
        "Restaurant Dashboard",
        "Delivery Partner App",
        "Push Notifications",
        "Rating & Reviews System",
        "Promo Codes & Offers"
      ],
      challenges: [
        "Real-time tracking across delivery partners",
        "Managing peak hour order surges",
        "Ensuring delivery time accuracy",
        "Building reliable delivery partner network"
      ],
      results: [
        "500+ restaurants onboarded",
        "10,000+ orders delivered monthly",
        "4.5+ average app rating",
        "30-minute average delivery time"
      ]
    },
    5: {
      title: "Healthcare Portal",
      subtitle: "Comprehensive Healthcare Management System",
      description: "A complete healthcare management system with appointment scheduling, patient records, and telemedicine capabilities.",
      longDescription: "Developed a comprehensive healthcare portal that streamlines hospital operations and improves patient experience. The system includes appointment scheduling, electronic health records, telemedicine integration, and pharmacy management.",
      tech: ["React", "Python", "PostgreSQL", "Django", "WebRTC"],
      category: "Web Development", 
      gradient: "from-teal-500 to-cyan-600",
      client: "Healthcare Network",
      duration: "6 months",
      team: "4 developers",
      year: "2024",
      features: [
        "Online Appointment Booking",
        "Electronic Health Records",
        "Telemedicine Consultations",
        "Pharmacy Management",
        "Lab Report Access",
        "Billing & Insurance",
        "Doctor Dashboard",
        "Patient Mobile App"
      ],
      challenges: [
        "Ensuring HIPAA compliance",
        "Integrating with legacy hospital systems",
        "Building secure telemedicine platform",
        "Managing sensitive patient data"
      ],
      results: [
        "50% reduction in appointment wait times",
        "10,000+ patients registered",
        "100+ doctors onboarded",
        "99.9% uptime maintained"
      ]
    },
    6: {
      title: "Educational Platform",
      subtitle: "Online Learning Management System",
      description: "A modern e-learning platform with course creation, enrollment, live classes, and progress tracking for students and educators.",
      longDescription: "Built a comprehensive educational platform that transforms online learning. Features include course creation tools, live video classes, assignment management, progress tracking, and certification generation.",
      tech: ["Next.js", "Node.js", "MongoDB", "AWS", "Zoom API"],
      category: "Web Development", 
      gradient: "from-indigo-500 to-blue-600",
      client: "Educational Institution",
      duration: "4 months",
      team: "3 developers",
      year: "2024",
      features: [
        "Course Creation & Management",
        "Live Video Classes",
        "Assignment & Quizzes",
        "Progress Tracking",
        "Certificate Generation",
        "Discussion Forums",
        "Student Dashboard",
        "Instructor Tools"
      ],
      challenges: [
        "Creating engaging video content delivery",
        "Building interactive assessment tools",
        "Ensuring academic integrity in online exams",
        "Managing large concurrent class sessions"
      ],
      results: [
        "5000+ students enrolled",
        "100+ courses available",
        "95% course completion rate",
        "4.8 student satisfaction rating"
      ]
    }
  };

  const project = projectsData[id] || projectsData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link to="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </Link>
              
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-700 mb-6">
                {project.category}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
                {project.subtitle}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-sm text-gray-500 font-medium">Client</div>
                  <div className="text-gray-900 font-semibold">{project.client}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Duration</div>
                  <div className="text-gray-900 font-semibold">{project.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Team Size</div>
                  <div className="text-gray-900 font-semibold">{project.team}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Year</div>
                  <div className="text-gray-900 font-semibold">{project.year}</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <img 
                  src={`https://picsum.photos/600/400?random=${id}`}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover-scale transition-all duration-300">
                    Live Demo
                  </button>
                  <button className="border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                    View Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {project.longDescription}
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Results</h3>
                <div className="space-y-4">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Challenges & Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.challenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-shadow transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge {index + 1}</h3>
                    <p className="text-gray-600">{challenge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-yellow-300">Next Project?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create something amazing together. Contact us to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover-scale transition-all duration-300 shadow-lg"
            >
              Start Your Project
            </Link>
            <Link 
              to="/projects"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
