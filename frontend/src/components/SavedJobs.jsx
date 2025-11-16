import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchSavedJobs = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/saved`, {
                withCredentials: true
            });
            if (res.data.success) {
                setSavedJobs(res.data.savedJobs);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to fetch saved jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const handleUnsaveJob = async (jobId) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/unsave/${jobId}`, {}, {
                withCredentials: true
            });

            if (res.data.success) {
                // Remove the job from the list immediately
                setSavedJobs(savedJobs.filter(job => job._id !== jobId));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-5'>Saved Jobs ({savedJobs.length})</h1>
                {
                    loading ? (
                        <div className='flex items-center justify-center h-[50vh]'>
                            <Loader2 className='h-8 w-8 animate-spin' />
                        </div>
                    ) : savedJobs.length === 0 ? (
                        <div className='text-center py-10'>
                            <p className='text-gray-500'>No saved jobs yet. Start saving jobs you're interested in!</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                savedJobs.map((job) => {
                                    // Skip rendering if job or company data is missing
                                    if (!job || !job._id) return null;
                                    
                                    return (
                                        <div key={job._id} className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-sm text-gray-500'>
                                                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                                                </p>
                                                <Button 
                                                    variant="outline" 
                                                    className="rounded-full" 
                                                    size="icon"
                                                    onClick={() => handleUnsaveJob(job._id)}
                                                >
                                                    <Bookmark fill="currentColor" />
                                                </Button>
                                            </div>

                                            <div className='flex items-center gap-2 my-2'>
                                                <Button className="p-6" variant="outline" size="icon">
                                                    <Avatar>
                                                        <AvatarImage src={job?.company?.logo} />
                                                    </Avatar>
                                                </Button>
                                                <div>
                                                    <h1 className='font-medium text-lg'>{job?.company?.name || 'Company'}</h1>
                                                    <p className='text-sm text-gray-500'>{job?.location || 'India'}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                                                <p className='text-sm text-gray-600'>{job?.description}</p>
                                            </div>
                                            <div className='flex items-center gap-2 mt-4'>
                                                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                                                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                                                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
                                            </div>
                                            <div className='flex items-center gap-4 mt-4'>
                                                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                                                <Button 
                                                    className="bg-red-600 hover:bg-red-700" 
                                                    onClick={() => handleUnsaveJob(job._id)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SavedJobs
