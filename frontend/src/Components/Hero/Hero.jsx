import { RiGeminiFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        const response = await fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, feedback }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit feedback');
        }

        setIsSubmitted(true);
        setEmail("");
        setFeedback("");
    } catch (error) {
        console.error('Error submitting feedback:', error);
        // You might want to show an error message to the user here
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <section className="relative flex flex-col items-center bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800 pb-24 pt-32 px-4 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-center">
                {/* Main heading and description */}
                <div className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Professional Assignment Cover Pages <span className="text-indigo-600">Made Simple</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create polished, academic cover pages in minutes with our intuitive builder. Perfect for students and professionals alike.
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

                {/* Stats or trust indicators can be added here */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
                    <div className="px-6 py-3 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-indigo-600">100+</p>
                        <p className="text-sm text-gray-600">Templates</p>
                    </div>
                    <div className="px-6 py-3 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-indigo-600">10K+</p>
                        <p className="text-sm text-gray-600">Users</p>
                    </div>
                    <div className="px-6 py-3 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-2xl font-bold text-indigo-600">24/7</p>
                        <p className="text-sm text-gray-600">Available</p>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="mt-16 w-full max-w-2xl">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm bg-opacity-80">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Help Us Improve</h3>
                            <p className="text-gray-600 mt-2">
                                Your feedback helps us create better tools for academic success
                            </p>
                        </div>
                        
                        {isSubmitted ? (
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h4 className="text-lg font-medium text-gray-800 mb-1">Thank You!</h4>
                                <p className="text-gray-600">We appreciate your valuable feedback.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address (Optional)
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
                                        placeholder="What do you think about our cover page builder?"
                                        required
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;