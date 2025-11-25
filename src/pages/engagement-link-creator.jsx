import React, { useState } from 'react';
import Head from 'next/head';

export default function EngagementLinkCreator() {
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) {
      alert('Please enter a guest name');
      return;
    }

    const baseUrl = 'https://heyashu.in';
    const link = `${baseUrl}/events/engagement-invite?name=${encodeURIComponent(guestName.trim())}`;
    
    setGeneratedLink(link);
    
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      alert('Link generated and copied to clipboard!');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }).catch((err) => {
      console.error('Failed to copy:', err);
      alert('Link generated but failed to copy. Please copy manually.');
    });
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink).then(() => {
        setCopied(true);
        alert('Link copied to clipboard!');
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      }).catch((err) => {
        console.error('Failed to copy:', err);
        alert('Failed to copy. Please copy manually.');
      });
    }
  };

  return (
    <>
      <Head>
        <title>Engagement Link Creator | Heyashu</title>
        <meta name="description" content="Generate personalized engagement invitation links" />
        <link rel="icon" href="/engagement_card.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 dark:text-rose-400 mb-2">
              Engagement Link Creator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate personalized invitation links for your guests
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="guestName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Guest Name
              </label>
              <input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleGenerate();
                  }
                }}
                placeholder="Enter guest name (e.g., Pinku)"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 transition-colors"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-serif font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Generate Link
            </button>

            {generatedLink && (
              <div className="mt-6 space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Generated Link:
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 break-all font-mono">
                    {generatedLink}
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy Link Again'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

