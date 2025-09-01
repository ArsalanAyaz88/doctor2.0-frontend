import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, Shield, Zap, ArrowRight, Stethoscope } from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced machine learning algorithms analyze your symptoms and medical history'
    },
    {
      icon: Activity,
      title: 'Real-time Health Monitoring',
      description: 'Continuous health tracking with instant alerts and recommendations'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your medical data stays completely private'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate medical insights and recommendations in real-time'
    }
  ];

  return (
    <div className="min-h-screen bg-background particle-bg">
      {/* Navigation Header */}
      <nav className="glass-panel border-b border-primary/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Stethoscope className="text-primary-foreground" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MedAI
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="btn-neon-primary px-6 py-2 rounded-lg font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="btn-neon-secondary px-6 py-2 rounded-lg font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            {/* Hero Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Future of
                </span>
                <br />
                <span className="bg-gradient-secondary bg-clip-text text-transparent">
                  Medical AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
                Revolutionary AI-powered medical assistant that provides instant health analysis, 
                symptom diagnosis, and personalized medical recommendations
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/signup"
                className="holographic-border group"
              >
                <div className="btn-neon-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 relative z-10">
                  <span>Get Started Free</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </Link>
              
              <Link 
                to="/chat"
                className="btn-neon-secondary px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Try Demo Chat
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-foreground-secondary">Accuracy Rate</div>
              </div>
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-foreground-secondary">Available</div>
              </div>
              <div className="glass-panel p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">10M+</div>
                <div className="text-foreground-secondary">Consultations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-pulse-neon" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-pulse-neon" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Experience the next generation of healthcare with our cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-panel p-6 text-center group hover:shadow-primary-glow transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-panel p-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Ready to Transform Your Health?
              </span>
            </h2>
            <p className="text-xl text-foreground-secondary mb-8">
              Join millions of users who trust our AI for their medical needs
            </p>
            <Link 
              to="/signup"
              className="holographic-border inline-block"
            >
              <div className="btn-neon-secondary px-12 py-4 rounded-lg font-bold text-xl relative z-10">
                Start Your Journey
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel border-t border-primary/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Stethoscope className="text-primary-foreground" size={16} />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MedAI
            </span>
          </div>
          <p className="text-foreground-secondary">
            © 2024 MedAI. Advanced Medical AI Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};