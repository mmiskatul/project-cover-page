import { RiGeminiFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
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

                
            </div>
        </section>
    );
};

export default Hero;