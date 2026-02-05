import React from 'react';
import Footer from '../components/Footer';

const Team = () => {
  const developers = [
    {
      id: 1,
      name: "Adarsh Singh",
      role: " Full Stack Developer",
      specialization: "React, Node.js, MongoDB",
      bio: "Passionate full-stack developer with expertise in modern web technologies. Specializes in building scalable applications and leading development teams to deliver exceptional results.",
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Frontend Architect",
      specialization: "React, Next.js, UI/UX",
      experience: "4+ Years",
      bio: "Creative frontend architect who transforms designs into pixel-perfect, responsive web applications. Expert in modern React ecosystem and performance optimization.",
      skills: ["React", "Next.js", "Tailwind CSS", "Figma", "JavaScript"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Backend Engineer",
      specialization: "Node.js, Python, DevOps",
      experience: "6+ Years",
      bio: "Backend specialist focused on building robust APIs and scalable server architectures. Expert in cloud technologies and database optimization for high-performance applications.",
      skills: ["Node.js", "Python", "PostgreSQL", "Docker", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Mobile App Developer",
      specialization: "React Native, Flutter",
      experience: "3+ Years",
      bio: "Mobile development expert creating cross-platform applications that deliver native performance. Passionate about user experience and mobile-first design principles.",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Kumar",
      role: "DevOps Engineer",
      specialization: "AWS, Docker, CI/CD",
      experience: "4+ Years",
      bio: "DevOps engineer ensuring seamless deployment and infrastructure management. Specializes in cloud architecture, automation, and maintaining high-availability systems.",
      skills: ["AWS", "Docker", "Jenkins", "Terraform", "Linux"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <section className="pt-20 sm:pt-28 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-100 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 mb-8 animate-fadeInUp">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">Meet Our Team</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-8 animate-fadeInUp leading-tight" style={{animationDelay: '0.2s'}}>
              Our Professional
              <span className="block text-blue-600">
                Development Team
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto animate-fadeInUp leading-relaxed" style={{animationDelay: '0.4s'}}>
              Meet the experienced developers behind Illusion's success. 
              <span className="font-semibold text-blue-600"> Expertise, creativity, and dedication</span> combined.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">22+</div>
                <p className="text-gray-600 font-medium text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <p className="text-gray-600 font-medium text-sm">Technologies</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">200+</div>
                <p className="text-gray-600 font-medium text-sm">Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <p className="text-gray-600 font-medium text-sm">Satisfaction</p>
              </div>
            </div>
            
            <div className="animate-fadeInUp" style={{animationDelay: '0.8s'}}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Meet The Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {developers.map((developer, index) => (
              <div 
                key={developer.id} 
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={developer.image} 
                    alt={developer.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{developer.name}</h3>
                    <p className="text-blue-200 font-medium text-sm">{developer.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      {developer.experience}
                    </span>
                    <p className="text-gray-600 font-medium text-sm mt-2">{developer.specialization}</p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {developer.bio}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-gray-900 font-semibold mb-3 text-sm">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {developer.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors cursor-pointer">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Want to Join Our <span className="text-blue-600">Professional Team?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              We're always looking for talented developers who share our passion for creating 
              <span className="font-semibold text-blue-600"> exceptional digital experiences</span>.
            </p>
            
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              Join Our Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;