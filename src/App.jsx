import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar';
import NotificationBanner from './components/NotificationBanner';
import LoadingSpinner from './components/LoadingSpinner';
import SeoHead from './components/SeoHead';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Team = lazy(() => import('./pages/Team'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Documentation = lazy(() => import('./pages/Documentation'));

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="App">
          <SeoHead />
          <Navbar />
          <main className="pt-16">
            <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[50vh]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:type" element={<ServiceDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:type" element={<IndustryDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/dashboard/admin" element={<Dashboard />} />
              </Routes>
            </Suspense>
          </main>
          <NotificationBanner />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;