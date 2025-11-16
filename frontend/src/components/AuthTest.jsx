import React, { useState } from 'react';
import { Button } from './ui/button';
import api from '@/utils/axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const AuthTest = () => {
    const [result, setResult] = useState('');

    const testAuth = async () => {
        try {
            console.log('Testing authentication...');
            const token = localStorage.getItem('token');
            console.log('Token in localStorage:', token ? 'Present' : 'Not found');
            
            const res = await api.get(`${USER_API_END_POINT}/saved`);
            setResult('✅ Authentication successful!');
            toast.success('Authentication working!');
        } catch (error) {
            console.error('Auth test failed:', error);
            setResult(`❌ Authentication failed: ${error.response?.data?.message || error.message}`);
            toast.error('Authentication failed');
        }
    };

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setResult(`Token found: ${token.substring(0, 50)}...`);
        } else {
            setResult('No token found in localStorage');
        }
    };

    return (
        <div className="p-4 border rounded-lg m-4">
            <h3 className="font-bold mb-4">Authentication Test</h3>
            <div className="space-x-2 mb-4">
                <Button onClick={testAuth}>Test Auth</Button>
                <Button onClick={checkToken} variant="outline">Check Token</Button>
            </div>
            <div className="p-2 bg-gray-100 rounded">
                {result || 'Click a button to test'}
            </div>
        </div>
    );
};

export default AuthTest;