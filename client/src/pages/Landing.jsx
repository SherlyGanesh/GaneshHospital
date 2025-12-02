import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users, Calendar, Activity, Shield } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient records and history tracking'
    },
    {
      icon: Calendar,
      title: 'Appointments',
      description: 'Easy scheduling and appointment management'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Track patient progress and vital statistics'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'HIPAA compliant data protection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 animate-pulse">
              <Heart className="w-12 h-12 text-white" fill="currentColor" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-bold mb-6 font-serif">
            <span className="bg-gradient-to-r from-primary-500 via-accent to-secondary-500 bg-clip-text text-transparent">
              Ganesh Hospital
            </span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Patient Care Dashboard
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Empowering healthcare professionals with modern, intuitive tools for exceptional patient care and management.
          </p>

          {/* CTA Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent text-white rounded-full shadow-2xl shadow-primary-500/40 hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg font-semibold"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 card max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">
                248
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Total Patients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">
                8
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Doctors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">
                12
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Today's Appointments</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent">
                99%
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
