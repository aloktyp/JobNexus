import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: [],
        Industry: [],
        Salary: []
    });
    const dispatch = useDispatch();
    
    const changeHandler = (filterType, value, checked) => {
        setSelectedFilters(prev => {
            const updated = { ...prev };
            if (checked) {
                // Add filter
                updated[filterType] = [...updated[filterType], value];
            } else {
                // Remove filter
                updated[filterType] = updated[filterType].filter(item => item !== value);
            }
            return updated;
        });
    }

    const clearFilters = () => {
        setSelectedFilters({
            Location: [],
            Industry: [],
            Salary: []
        });
    }

    useEffect(() => {
        // Combine all selected filters into a single query object
        const allFilters = {
            location: selectedFilters.Location,
            industry: selectedFilters.Industry,
            salary: selectedFilters.Salary
        };
        dispatch(setSearchedQuery(allFilters));
    }, [selectedFilters, dispatch]);

    const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

    return (
        <div className='w-full bg-white p-5 rounded-xl shadow-lg border border-gray-200'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-bold text-xl text-gray-800'>Filter Jobs</h1>
                {hasActiveFilters && (
                    <Button 
                        onClick={clearFilters} 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        Clear All
                    </Button>
                )}
            </div>
            <hr className='mb-4' />
            {
                fitlerData.map((data, index) => (
                    <div key={index} className='mb-6'>
                        <h2 className='font-bold text-lg mb-3 text-gray-700'>{data.fitlerType}</h2>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `filter-${index}-${idx}`;
                                const isChecked = selectedFilters[data.fitlerType].includes(item);
                                return (
                                    <div key={itemId} className='flex items-center space-x-3 my-2 hover:bg-purple-50 p-2 rounded-lg transition-colors'>
                                        <Checkbox 
                                            id={itemId}
                                            checked={isChecked}
                                            onCheckedChange={(checked) => changeHandler(data.fitlerType, item, checked)}
                                            className="border-2 border-gray-300 data-[state=checked]:bg-[#6A38C2] data-[state=checked]:border-[#6A38C2]"
                                        />
                                        <Label 
                                            htmlFor={itemId}
                                            className="cursor-pointer font-medium text-gray-700"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard