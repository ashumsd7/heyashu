import { useState } from 'react';
import { motion } from "framer-motion";
import { FaSeedling, FaUsers } from "react-icons/fa";
import DigiGardenFooter from '@/components/garden/DigiGardenFooter';
import Head from 'next/head';
import { PHONE_CALL_THIRTY_MIN } from '@/utils/constant';

const InterviewPrep = () => {
  const [experienceFilter, setExperienceFilter] = useState('all');

  const topics = [
    {
      name: 'JavaScript',
      description: 'Core concepts, ES6+, async programming, closures, prototypes, and modern JavaScript features.',
      questionCount: '100+',
      enabled: true,
      route: '/tech/interview-prep/javascript',
      ctaText: 'Explore 10+ Questions'
    },
    {
      name: 'React',
      description: 'Components, hooks, state management, context API, performance optimization, and React patterns.',
      questionCount: '100+',
      enabled: true,
      route: '/tech/interview-prep/react',
      ctaText: 'Explore 10+ Questions'
    },
    {
      name: 'HTML/CSS',
      description: 'Semantic HTML5, flexbox, grid, responsive design, , web accessibility, and browser compatibility.',
      questionCount: '80+',
      enabled: false,
      route: '/tech/interview-prep/html-css',
      ctaText: 'Coming Soon'
    },
    {
      name: 'System Design',
      description: 'Frontend architecture, scalability, caching, performance, security, and design patterns.',
      questionCount: '50+',
      enabled: true,
      route: '/digital-garden/notes/front-end-design-system/how-the-web-works',
      ctaText: 'Read Notes',
      minExperience: 4 // Only show for 4+ years experience
    }
  ];

  const filteredTopics = topics.filter(topic => {
    if (experienceFilter === 'all') return true;
    if (topic.name === 'System Design') {
      const years = parseInt(experienceFilter.split('-')[0]);
      return years >= 4;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Head>
        <title>Frontend Interview Prep - JavaScript, React, HTML/CSS Questions</title>
        <meta name="description" content="Prepare for your frontend developer interview with our comprehensive collection of 100+ curated questions covering JavaScript, React, HTML/CSS and System Design. Perfect for all experience levels." />
        <meta name="keywords" content="frontend interview questions, JavaScript interview prep, React interview questions, frontend system design, HTML CSS interview, web development interview" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Frontend Interview Prep - JavaScript, React, HTML/CSS Questions" />
        <meta property="og:description" content="Access 100+ curated frontend interview questions. Practice JavaScript, React, and system design concepts. Perfect for your next technical interview!" />
        <meta property="og:image" content="/og-interview-prep.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frontend Interview Prep - JavaScript, React, HTML/CSS Questions" />
        <meta name="twitter:description" content="Access 100+ curated frontend interview questions. Practice JavaScript, React, and system design concepts. Perfect for your next technical interview!" />
        <meta name="twitter:image" content="/og-interview-prep.png" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/tech/interview-prep" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Hero Section */}
      <section className="pb-12 pt-10 md:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto mt-2">
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: -10 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="text-6xl mb-4"
          >
            🚀
          </motion.div>
          <p className="text-2xl md:text-3xl italic text-gray-600 dark:text-gray-400 mb-4">Revise me before</p>
          <h1 className="text-4xl md:text-6xl font-bold pb-4 md:pb-6 bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500 text-transparent bg-clip-text">
            Your Frontend Interview
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-400">
            Access our comprehensive collection of 100+ curated interview questions. Get topic-wise practice on JavaScript fundamentals, React concepts, and system design - all in one place. Perfect for your next technical interview preparation!
          </p>
          <button 
            onClick={() => window.open('/tech/interview-prep/javascript', '_blank')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow-lg"
          >
            Start with JavaScript
          </button>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Explore Topics & Practice Questions
          </h2>
          <p className="text-center mb-8 md:mb-12 text-gray-600 dark:text-gray-400">
            Select a topic and customize questions based on your experience.
          </p>

          {/* Experience Filter */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            {['all', 'fresher-1', '2-4', '4+'].map((level) => (
              <button
                key={level}
                onClick={() => setExperienceFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm md:text-base ${
                  experienceFilter === level
                    ? 'bg-yellow-400 text-black font-medium'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {level === 'all' ? 'All Levels' : 
                 level === 'fresher-1' ? 'Fresher-1 Year' :
                 level === '2-4' ? '2-4 Years' : '4+ Years'}
              </button>
            ))}
          </div>

          {/* Topic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredTopics.map((topic) => (
              <div 
                key={topic.name} 
                className={`bg-white dark:bg-gray-700 rounded-lg p-5 md:p-6 shadow-lg h-full ${!topic.enabled && 'opacity-50 cursor-not-allowed'}`}
              >
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white">{topic.name}</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 flex-grow">{topic.description}</p>
                <button 
                  className={`w-full ${topic.enabled ? 'bg-yellow-400 text-black' : 'bg-gray-400'} hover:opacity-90 font-medium px-4 py-2 rounded shadow`}
                  disabled={!topic.enabled}
                  onClick={() => topic.enabled && window.open(topic.route, '_blank')}
                >
                  {/* Explore {topic.questionCount} Questions */}
                  {topic.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Special Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            What Makes This Special?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">✨ Company-specific</span>
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">🎯 Real Experiences</span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">📚 Curated Content</span>
            <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">🔄 Regular Updates</span>
            <span className="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm">📖 Topic-wise</span>
            <span className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">🎯 Guided Practice</span>
            <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm">🔗 Best Resources</span>
            <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm">💻 Machine Coding</span>
            <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm">⌨️ Coding Questions</span>
          </div>
        </div>
      </section>

      {/* Combined Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Share Your Questions
            </h2>
            <p className="mb-6 md:mb-8 text-gray-600 dark:text-gray-400">
              Help fellow developers by sharing your interview experiences. Your contribution can make a difference in someone's preparation journey. Join our community of contributors today!
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => window.open(PHONE_CALL_THIRTY_MIN, '_blank')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-lg shadow-lg">
                Share Your Experience
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Something Missing?</h2>
            <p className="mb-6 md:mb-8 text-gray-600 dark:text-gray-400">
              We're constantly improving! If you have suggestions for new topics, features, or improvements, we'd love to hear from you. Your feedback helps us create a better learning platform.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => window.open(PHONE_CALL_THIRTY_MIN, '_blank')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-lg shadow-lg">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </section>

     <DigiGardenFooter/>
    </div>
  );
};

export default InterviewPrep;
