import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Lock, Star } from 'lucide-react';

const features = [
  {
    title: "Real-Time Device Tracking",
    description:
      "Locate your lost or stolen Android devices instantly with live GPS tracking from anywhere in the world.",
    imgUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Remote Lock & Wipe",
    description:
      "Protect your sensitive data by remotely locking your device or wiping all information before it falls into the wrong hands.",
    imgUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Trusted Contacts & Alerts",
    description:
      "Add trusted contacts to receive instant alerts when suspicious activity is detected or when a theft report is sent.",
    imgUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    name: "Chidi Nwosu",
    role: "Tech Enthusiast",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "SafeGad helped me recover my phone within hours after it was stolen. The tracking feature is super accurate!",
    rating: 5,
  },
  {
    name: "Aisha Bako",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "I love the App Locker feature — it gives me peace of mind knowing my personal apps are secure even if someone gets hold of my phone.",
    rating: 5,
  },
  {
    name: "Emeka Francis",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    review: "The premium plan is worth every kobo. Remote wipe saved my data during a robbery attempt. Highly recommend!",
    rating: 4,
  },
  {
    name: "Femi Adeyemi",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review: "Very easy to use. I wish there were more customization options for app locker, but overall solid experience.",
    rating: 4,
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 inline-block ${i < rating ? 'text-yellow-400' : 'text-slate-600'
          }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">


      <main className="flex-1 max-w-full md:max-w-6xl mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SafeGad
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-slate-300">
            Secure your Android devices remotely. Track, lock, and wipe stolen devices instantly — all from one dashboard.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={feature.imgUrl}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Free Plan</h3>
              <p className="text-slate-300 mb-6">Perfect for basic security needs.</p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Real-time device tracking</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Remote lock & wipe</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Trusted contacts support</li>
                <li className="flex items-center gap-2 text-slate-600"><XCircle size={18} /> No app locker access</li>
                <li className="flex items-center gap-2 text-slate-600"><XCircle size={18} /> Limited premium support</li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-lg font-semibold text-slate-300">Free Forever</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-900 to-indigo-950 border border-purple-600 rounded-xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-xs font-bold uppercase px-3 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
              <p className="text-slate-300 mb-6">Unlock full control and privacy with advanced tools.</p>
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Real-time device tracking</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Remote lock & wipe</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Trusted contacts support</li>
                <li className="flex items-center gap-2"><Lock size={18} className="text-purple-400" /> App Locker – hide and secure sensitive apps</li>
                <li className="flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Priority customer support</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Enhanced encryption & privacy features</li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-2xl font-bold text-purple-300">₦1,500</span>
                <span className="text-slate-400 ml-1">for 3 months</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="min-w-full px-4"
                  >
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-slate-400 text-sm">{testimonial.role}</p>
                          <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>
                      <p className="italic text-slate-300">"{testimonial.review}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-700 hover:bg-slate-600 p-2 rounded-full z-10"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-700 hover:bg-slate-600 p-2 rounded-full z-10"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* CTA at Bottom */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to upgrade your security?</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Join thousands of users who trust SafeGad to protect their devices and personal data.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Upgrade to Premium
          </Link>
        </section>
      </main>
    </div>
  );
}