import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useTheme } from '@/contexts/ThemeContext'

const Job = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { theme } = useTheme();
    const [isSaved, setIsSaved] = useState(user?.savedJobs?.includes(job?._id) || false);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleSaveJob = async () => {
        if (!user) {
            toast.error("Please login to save jobs");
            return;
        }

        try {
            const endpoint = isSaved ? 'unsave' : 'save';
            const res = await axios.post(`${USER_API_END_POINT}/${endpoint}/${job?._id}`, {}, {
                withCredentials: true
            });

            if (res.data.success) {
                setIsSaved(!isSaved);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    
    return (
        <div className={`p-6 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-2xl ${theme.cardHover} transition-all duration-300 hover:-translate-y-1 flex flex-col h-full`}>
            <div className='flex items-center justify-between'>
                <p className='text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "🔥 Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="outline" 
                    className={`rounded-full hover:scale-110 transition-transform ${isSaved ? theme.badgeBg : ''}`}
                    style={isSaved ? { borderColor: theme.primary } : {}}
                    size="icon"
                    onClick={handleSaveJob}
                >
                    <Bookmark fill={isSaved ? theme.primary : "none"} style={isSaved ? { color: theme.primary } : {}} />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-bold text-lg text-gray-800'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 flex items-center gap-1'>
                        📍 India
                    </p>
                </div>
            </div>

            <div className='mb-4 flex-grow'>
                <h1 
                    className='font-bold text-xl my-2 text-gray-900 transition-colors cursor-pointer'
                    onMouseEnter={(e) => e.target.style.color = theme.primary}
                    onMouseLeave={(e) => e.target.style.color = ''}
                >
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1' variant="ghost">
                    👥 {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-semibold bg-orange-50 hover:bg-orange-100 px-3 py-1' variant="ghost">
                    💼 {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-semibold bg-purple-50 hover:bg-purple-100 px-3 py-1' variant="ghost">
                    💰 {job?.salary}LPA
                </Badge>
            </div>
            <div className='flex items-center gap-3 mt-6'>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 border-2 font-semibold transition-all duration-300"
                    style={{ 
                        borderColor: theme.primary,
                        color: theme.primary
                    }}
                >
                    View Details
                </Button>
                <Button 
                    className="flex-1 font-semibold transition-all duration-300"
                    style={isSaved ? 
                        { background: '#059669' } : 
                        { background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }
                    }
                    onClick={handleSaveJob}
                >
                    {isSaved ? "✓ Saved" : "Save Job"}
                </Button>
            </div>
        </div>
    )
}

export default Job