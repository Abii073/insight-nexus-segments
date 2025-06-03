
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import BackgroundGradient from '../components/BackgroundGradient';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Real-time Classification",
    description: "Instant customer and transaction analysis powered by advanced AI algorithms"
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description: "Built-in compliance with financial regulations and industry standards"
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Forecast customer behavior and identify opportunities proactively"
  },
  {
    icon: Users,
    title: "Customer Segmentation",
    description: "8-dimensional classification for precise marketing and risk assessment"
  },
  {
    icon: BarChart3,
    title: "Advanced Reporting",
    description: "Comprehensive dashboards and analytics for strategic decision-making"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 Type II compliance and data encryption"
  }
];

const trustMarkers = [
  "SOC 2 Type II Certified",
  "ISO 27001 Compliant",
  "GDPR Ready",
  "Enterprise SLA"
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/institutions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100">
      <BackgroundGradient />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Logo size="lg" />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button variant="ghost" size="sm">
              Support
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="bg-brand-500 hover:bg-brand-600"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Customer
              <br />
              <span className="text-brand-500">Classification Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your financial institution with real-time customer segmentation, 
              predictive analytics, and regulatory-compliant AI solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-brand-500 hover:bg-brand-600 text-lg px-8 py-4 h-auto"
              >
                Get Started with Your Institution
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/institutions')}
                className="text-lg px-8 py-4 h-auto"
              >
                Try Demo
              </Button>
            </div>

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-500">
              {trustMarkers.map((marker, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{marker}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for financial institutions requiring advanced analytics, 
              compliance, and scalable architecture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-brand-100 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-brand-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Leading Financial Institutions Choose Octagon
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Cloud-Native Architecture</h3>
                    <p className="text-gray-600">Scalable, secure, and designed for modern financial infrastructure</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Regulatory Compliance</h3>
                    <p className="text-gray-600">Built-in compliance with financial regulations and audit requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">360° Client Visualization</h3>
                    <p className="text-gray-600">Deep customer insights and predictive modeling capabilities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Institution?</h3>
                <p className="text-brand-100 mb-6">
                  Join leading financial institutions using Octagon for customer intelligence and risk management.
                </p>
                <Button 
                  onClick={handleGetStarted}
                  variant="secondary"
                  className="bg-white text-brand-600 hover:bg-gray-100"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900">
        <div className="container mx-auto text-center">
          <Logo size="md" className="justify-center mb-4 text-white" />
          <p className="text-gray-400 mb-6">
            Enterprise AI solutions for financial institutions
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span>© 2024 Octagon AI</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
