import connectDB from "@/database";
import { Account } from "@/models/Account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic ="force-dynamic"

export async function POST(req){
    try{
await  connectDB();
const {pin, accountId, uid}= await req.json();

const getcurrentAccount =await Account.findOne({_id : accountId, uid})

if(!getcurrentAccount){
    return NextResponse.json({
        success:false,
        message:"Account not found"
    })
}
const checkPin =await compare(pin, getcurrentAccount.pin)
if(checkPin){
    return NextResponse.json({
        success: true,
        message: "Welcome to Netflix"
    })
}else{
    return NextResponse.json({
        success:false,
        message:"Incorrect PIN"
    })
}

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}