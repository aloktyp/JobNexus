import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    // Only clear search query when component unmounts
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>
                    {searchedQuery && typeof searchedQuery === 'string' ? 
                        `Search Results for "${searchedQuery}" (${allJobs.length})` : 
                        `All Jobs (${allJobs.length})`
                    }
                </h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.length > 0 ? (
                            allJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        ) : (
                            <div className='col-span-3 text-center py-10'>
                                <p className='text-gray-500 text-lg'>No jobs found. Try a different search term.</p>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse