import { sdf } from "@/configs/AiModel";
import { NextResponse } from "next/server";



export  async function POST(req){
    try{
        const {prompt}=await req.json();
        console.log(prompt);
        const result=await sdf(prompt);
        console.log(result)
        return NextResponse.json(result)
    }
    catch(e){
       return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
       );
    }
}