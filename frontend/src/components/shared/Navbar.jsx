import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Bookmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useTheme } from '@/contexts/ThemeContext'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow-md sticky top-0 z-50 border-b border-gray-200'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                <div>
                    <Link to="/">
                        <div className='flex flex-col'>
                            <h1 
                                className='text-3xl font-extrabold hover:scale-105 transition-transform cursor-pointer'
                                style={{ color: theme.primary }}
                            >
                                Job<span style={{ color: theme.secondary }}>Nexus</span>
                            </h1>
                            <p 
                                className='text-xs font-semibold tracking-wider italic -mt-1'
                                style={{ color: theme.primary }}
                            >
                                ✨ Connects Companies & Talent ✨
                            </p>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-semibold items-center gap-8 text-gray-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='hover:opacity-70 transition-opacity'>
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='hover:opacity-70 transition-opacity'>
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='hover:opacity-70 transition-opacity'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='hover:opacity-70 transition-opacity'>
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='hover:opacity-70 transition-opacity'>
                                            Browse
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className="border-2 font-semibold transition-all"
                                        style={{ 
                                            borderColor: theme.primary,
                                            color: theme.primary
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button 
                                        className="font-semibold shadow-lg hover:shadow-xl transition-all"
                                        style={{ 
                                            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`
                                        }}
                                    >
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar 
                                        className="cursor-pointer h-12 w-12 border-2 hover:scale-110 transition-transform"
                                        style={{ borderColor: theme.primary }}
                                    >
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 shadow-2xl border-2 border-purple-100">
                                    <div className=''>
                                        <div className='flex gap-3 items-center p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg mb-3'>
                                            <Avatar className="cursor-pointer h-14 w-14 border-2 border-white">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-gray-800'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'No bio added'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1 text-gray-700'>
                                            <Link to="/profile">
                                                <div 
                                                    className='flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer'
                                                    style={{ 
                                                        ':hover': { backgroundColor: theme.badgeBg }
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.badgeBg}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <User2 className='h-5 w-5' style={{ color: theme.primary }} />
                                                    <span className='font-medium'>View Profile</span>
                                                </div>
                                            </Link>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/saved-jobs">
                                                        <div 
                                                            className='flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer'
                                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.badgeBg}
                                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                        >
                                                            <Bookmark className='h-5 w-5' style={{ color: theme.primary }} />
                                                            <span className='font-medium'>Saved Jobs</span>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                            <div onClick={logoutHandler} className='flex items-center gap-3 p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-2 border-t pt-3'>
                                                <LogOut className='h-5 w-5 text-red-600' />
                                                <span className='font-medium text-red-600'>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar