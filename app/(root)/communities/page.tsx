

import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadTab from "@/components/shared/ThreadTab";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.action";
import CommunityCard from "@/components/cards/CommunityCard";

// import PostThread from "@/components/forms/postThread"

async function Page(  ) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    
    const results = await fetchCommunities({
        searchString: '',
        pageNumber:1,
        pageSize:25
    })
  return (
    <section>
        <h1 className="head-text mb-10">Community</h1>
        {/* search bar */}

        <div className="mt-14 flex flex-col gap-9">
            {results.communities.length===0?(
                <p className="no-result"> No communities </p>
            ):(
                <>
                {results.communities.map((community)=>(
                    <CommunityCard 
                    key={community.id}
                    id = {community.id}
                    name = {community.name}
                    username = {community.username}
                    imgUrl = {community.image}
                    bio={community.bio}
                    members={community.members}
                    />
                ))}
                </>
            )}
        </div>
    </section>
  )
}

export default Page
