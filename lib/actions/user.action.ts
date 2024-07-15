"use server"

import { connectToDB } from "../mongoose"
import User from "../models/user.model"
import { revalidatePath } from "next/cache";
import { string } from "zod";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {

    await connectToDB(); // Ensure we wait for the connection to establish

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true },
        );

        if (path === '/profile/edit') {
            revalidatePath(path);
        }

    } catch (error: any) {
        console.error('Error in updateUser:', error);
        throw new Error(`Failed to create / update user: ${error.message}`);
    }
}


export async function fetchUser(userId: string) {
    await connectToDB(); // Ensure we wait for the connection to establish

    try {
        return await User.findOne({ id: userId });
        // .populate({
        //     path: 'communities',
        //     model: 'community'
        // });
    } catch (error: any) {
        console.error('Error in fetchUser:', error);
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserPosts(userId:string) {
    try {

        await connectToDB();

        const threads = await User.findOne({id: userId}).populate({
            path:'threads',
            model:Thread,
            populate:{
                path: 'children',
                model:Thread,
                populate:{
                    path:'author',
                    model:User,
                    select:'name image id'

                }
            }
        })
        return threads;
    } catch (error:any) {
        throw new Error(`Failed to fetch user posts : ${error.message}`)
    }
    
}

export async function fetchUsers({
    userId,
    searchString= "",
    pageNumber=1,
    pageSize = 20,
    sortBy= "desc"
}:{
    userId : string;
searchString? : string;
pageNumber? : number;
pageSize? : number;
sortBy? : SortOrder;
}) {
    try{
       await connectToDB();
        const skipAmount = (pageNumber-1)*pageSize;

        const regex  = new RegExp(searchString,'i');

        const query: FilterQuery<typeof User> = {
            id :{$ne: userId}
        }

        if(searchString.trim() != ''){
            query.$or = [
                  {  username : {$regex: regex} },
                  {name : {$regex: regex}},
                
            ]
        }

        const sortOptions = {createdAt: sortBy};
        const userQuery= User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);
        const totalUserCount = await User.countDocuments(query);

        const user = await userQuery.exec();

        const isNext = totalUserCount > skipAmount + user.length;

        return {user ,isNext};
    }catch(error:any){
        throw new Error(`Error Search not Working: ${error.message}`)
    }
}

export async function getActivity(userId : string) {

    try {
      await connectToDB();

        const userThreads = await Thread.find({author:userId});
        const childThreadIds = userThreads.reduce((acc, userThread)=>{
            return acc.concat(userThread.children);
        },[])

        const replies = await Thread.find({
            _id : {$in : childThreadIds},
            author: {$ne:userId}
        }).populate({
            path:'author',
            model : User,
            select : 'name image _id',
        })

        return replies;

    } catch (error:any) {
        
        throw new Error(`Error : ${error.message}`);
    }
}