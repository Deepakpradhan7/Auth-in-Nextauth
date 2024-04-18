import User from "@/models/User";
import connect from "@/utils/db";
//@ts-ignore
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export const POST = async (request:any) =>{
    const {username, email, password} = await request.json()
    await connect();

    const existingUser = await User.findOne({email: email})

    if (existingUser){
        return new NextResponse("Email is already in use", {status: 400})
    };

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });
    try {
       await newUser.save();
       return new NextResponse("User Registered Successfully", {status: 200}) 
    } catch (error:any) {
        return new NextResponse(error, { status: 500})
    }
  
}