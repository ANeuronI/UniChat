// "use client"
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import {  ClerkProvider, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home(){
const result= await fetchPosts(1,30);
const user = await currentUser();
console.log(result);

  return(

    <div>
      <span><h1 className="head-text text-left">Home</h1></span>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 head-text">
      {/* <h1>UniChat</h1>   */}

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length===0?(
          <p className="no-result">No Posts Founds</p>
        ):(
          <>
          {result.posts.map((post)=>(
            <ThreadCard 
             
            key = {post._id}
            id = {post._id}
            currentUserId = {user?.id || ""} 
            parentId = {post.parentId}
            content = {post.text}
            author = {post.author}
            community = {post.community}
            createdAt = {post.createdAt}
            comments = {post.children}
             />
          ))}
          </>
        )}
      </section>
       
      {/* <UserButton afterSignOutUrl="/"></UserButton> */}
    </main>


    </div>
   
  

  )
}