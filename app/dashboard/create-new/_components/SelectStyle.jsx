"use client"
import React, { useState } from 'react'
import Image from 'next/image'

function SelectStyle({onUserSelect}) {
    const styleOptions = [
  {
    name: 'Realistic',
    image: '/Realistic.png'
  },
  {
    name: 'Cartoon',
    image: '/Cartoon.png'
  },
  {
    name: 'Comic',
    image: '/image1.png'
  },
  {
    name: 'WaterColor',
    image: '/Watercolor.png'
  },
  {
    name: 'GTA',
    image: '/GTA.png'
  }
]
    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Style</h2>
        <p className='text-gray-500'>Select your video style</p>
        <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3'>
            {styleOptions.map((item,index)=>(
                <div className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                                  ${selectedOption==item.name&&'border-4 border-b-amber-400'}`}>
                    <Image onClick={()=>{
                                   setSelectedOption(item.name)
                                   onUserSelect('image',item.name)}} src={item.image} width={100} height={100} alt={item.name}
                            className='h-48 object-cover rounded-l-lg w-full'/>
                    <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg'>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectStyle