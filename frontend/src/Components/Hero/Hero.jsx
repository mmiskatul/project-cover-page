import { RiGeminiFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [stats, setStats] = useState({
        templates: 12,
        users: 0,
        coverPagesGenerated: 0,
        uptime: "24/7"
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    const fetchStats = async () => {
        try {
            setIsLoadingStats(true);
            const response = await fetch('/api/stats');
            if (!response.ok) throw new Error('Failed to fetch stats');
            
            const data = await response.json();
            setStats({
                templates: data.templates || 12,
                users: data.users || 0,
                coverPagesGenerated: data.coverPagesGenerated || 0,
                uptime: "24/7"
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats(prev => ({
                ...prev,
                users: 1250,
                coverPagesGenerated: 3842
            }));
        } finally {
            setIsLoadingStats(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const intervalId = setInterval(fetchStats, 30000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, feedback }),
            });

            if (!response.ok) throw new Error('Failed to submit feedback');
            
            setIsSubmitted(true);
            setEmail("");
            setFeedback("");
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <section className="relative  flex flex-col items-center bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800 pb-24 pt-32 px-4 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-center">
                {/* Header section */}
                <div className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Professional Assignment Cover Pages <span className="text-indigo-600">Made Simple</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create polished, academic cover pages in minutes with our intuitive builder.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="mt-10">
                    <Link 
                        to='/template' 
                        className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full transition-all duration-300 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 shadow-lg hover:shadow-xl"
                    >
                        <span className="relative text-lg">Generate Cover Page</span>
                        <RiGeminiFill className="ml-3 text-yellow-200 text-xl transition-transform group-hover:rotate-12" />
                        <span className="absolute inset-0 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
                    <div className="px-6 py-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm min-w-[160px]">
                        <p className="text-2xl font-bold text-indigo-600">
                            {isLoadingStats ? (
                                <span className="inline-block h-8 w-12 bg-gray-200 rounded animate-pulse"></span>
                            ) : `${stats.templates}+`}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Templates</p>
                    </div>
                    
                    <div className="px-6 py-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm min-w-[160px]">
                        <p className="text-2xl font-bold text-indigo-600">
                            {isLoadingStats ? (
                                <span className="inline-block h-8 w-12 bg-gray-200 rounded animate-pulse"></span>
                            ) : `${formatNumber(stats.users)}+`}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Active Users</p>
                    </div>
                    
                    <div className="px-6 py-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm min-w-[160px]">
                        <p className="text-2xl font-bold text-indigo-600">
                            {isLoadingStats ? (
                                <span className="inline-block h-8 w-16 bg-gray-200 rounded animate-pulse"></span>
                            ) : formatNumber(stats.coverPagesGenerated)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Pages Generated</p>
                    </div>
                    
                    <div className="px-6 py-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm min-w-[160px]">
                        <p className="text-2xl font-bold text-indigo-600">24/7</p>
                        <p className="text-sm text-gray-600 mt-1">Availability</p>
                    </div>
                </div>

                {/* Manual refresh button */}
                <button 
                    onClick={fetchStats}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mx-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Stats
                </button>

                {/* Feedback Form */}
                <div className="mt-16 w-full max-w-2xl">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-80">
                        {isSubmitted ? (
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h4 className="text-lg font-medium text-gray-800 mb-1">Thank You!</h4>
                                <p className="text-gray-600">We appreciate your feedback.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    Submit another feedback
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-800">Help Me Improve</h3>
                                    <p className="text-gray-600 mt-2">Your feedback helps me improve</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-5 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Feedback
                                        </label>
                                        <textarea
                                            id="feedback"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="w-full px-5 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                            rows="4"
                                            required
                                            placeholder="Your thoughts..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : 'Submit Feedback'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;