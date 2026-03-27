"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

function SelectTopic({onUserSelect}) {
    const options=['Custom Prompt','Random AI Story','Scary Story','Historical Facts','Bed Time Story','Motivational','Fun Facts']
    const [selectedOption,setSelectedOption]=useState();
  return (
    <div>
        <h2 className='font-bold text-xl text-primary'>Content</h2>
        <p className='text-gray-500'> What is the topic of your video?</p>
        <Select onValueChange={(value)=>{
                                setSelectedOption(value)
                                value!='Custom Prompt' && onUserSelect('topic',value)
                            }}>
            <SelectTrigger className="w-full mt-2 p-6 text-lg">
                <SelectValue placeholder="Content Type"></SelectValue>
            </SelectTrigger>
            <SelectContent
                position="popper"
                className="z-50 mt-1 bg-white border shadow-lg rounded-md"
             >

            {options.map((item, index) => (
                <SelectItem
                key={index}
                value={item}
                className="py-3 px-3 cursor-pointer"
                >
                {item}
                </SelectItem>
            ))}

            </SelectContent>
        </Select>

        {selectedOption=='Custom Prompt'&&
            <Textarea  
                onChange={(e)=>onUserSelect('topic',e.target.value)}
               className='mt-3' placeholder="Write Prompt on which you want to generate video"/>
        }
    </div>
  )
}

export default SelectTopic