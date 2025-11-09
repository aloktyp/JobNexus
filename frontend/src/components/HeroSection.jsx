import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className={`text-center bg-gradient-to-b ${theme.bgGradient} py-20`}>
            <div className='flex flex-col gap-5 my-10'>
                <span className={`mx-auto px-6 py-2 rounded-full bg-gradient-to-r ${theme.gradient} text-white font-semibold shadow-lg animate-pulse`}>🏆 No. 1 Job Hunt Website</span>
                <h1 className='text-6xl font-extrabold leading-tight'>
                    Search, Apply & <br /> 
                    Get Your <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Dream Jobs</span>
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover thousands of job opportunities with all the information you need. 
                    <span className='font-semibold' style={{ color: theme.primary }}> It's your future. Come find it.</span> 
                    <br />Manage all your job applications from start to finish.
                </p>
                <div className={`flex w-[50%] shadow-2xl border-2 pl-6 rounded-full items-center gap-4 mx-auto bg-white transition-all duration-300`} style={{ borderColor: theme.primary + '40' }}>
                    <input
                        type="text"
                        placeholder='Search by job title, company, or keywords...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-lg py-4'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className={`rounded-r-full bg-gradient-to-r ${theme.gradient} px-8 py-6 transition-all duration-300`}
                        style={{ 
                            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                        }}
                    >
                        <Search className='h-6 w-6' />
                    </Button>
                </div>
                <div className='flex gap-4 justify-center mt-4 text-sm text-gray-500'>
                    <span className='flex items-center gap-1'>
                        <span className='font-bold' style={{ color: theme.primary }}>10,000+</span> Jobs
                    </span>
                    <span>•</span>
                    <span className='flex items-center gap-1'>
                        <span className='font-bold' style={{ color: theme.primary }}>5,000+</span> Companies
                    </span>
                    <span>•</span>
                    <span className='flex items-center gap-1'>
                        <span className='font-bold' style={{ color: theme.primary }}>50,000+</span> Candidates
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection