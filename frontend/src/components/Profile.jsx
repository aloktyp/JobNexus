import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 border-4 border-purple-200 shadow-lg">
                            <AvatarImage 
                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                                alt="profile" 
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-800'>{user?.fullname}</h1>
                            <p className='text-gray-600 mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="text-right bg-gradient-to-r from-[#6A38C2] to-[#8b5cf6] hover:from-[#5b30a6] hover:to-[#7c3aed]" 
                        variant="outline"
                    >
                        <Pen className='mr-2' /> Edit Profile
                    </Button>
                </div>
                <div className='my-6 bg-gray-50 p-4 rounded-lg'>
                    <h2 className='font-bold text-lg mb-3 text-gray-800'>Contact Information</h2>
                    <div className='flex items-center gap-3 my-3 text-gray-700'>
                        <Mail className='text-[#6A38C2]' />
                        <span className='font-medium'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-3 text-gray-700'>
                        <Contact className='text-[#6A38C2]' />
                        <span className='font-medium'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-6'>
                    <h2 className='font-bold text-lg mb-3 text-gray-800'>Skills</h2>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                <Badge 
                                    key={index} 
                                    className='bg-purple-100 text-[#6A38C2] hover:bg-purple-200 px-3 py-1 text-sm font-semibold'
                                >
                                    {item}
                                </Badge>
                            )) : <span className='text-gray-500'>No skills added yet</span>
                        }
                    </div>
                </div>
                <div className='my-6 bg-blue-50 p-4 rounded-lg'>
                    <Label className="text-lg font-bold text-gray-800 mb-2 block">Resume</Label>
                    {
                        isResume && user?.profile?.resume ? (
                            <a 
                                target='blank' 
                                href={user?.profile?.resume} 
                                className='text-[#6A38C2] font-semibold hover:underline cursor-pointer flex items-center gap-2'
                            >
                                📄 {user?.profile?.resumeOriginalName}
                            </a>
                        ) : <span className='text-gray-500'>No resume uploaded</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg my-5'>
                <h1 className='font-bold text-2xl my-5 text-gray-800'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile