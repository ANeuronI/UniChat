

import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { communityTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadTab from "@/components/shared/ThreadTab";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/components/cards/UserCard";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return <div>User not authenticated</div>;

  try {
    const communityDetails = await fetchCommunityDetails(params.id);

    if (!communityDetails) {
      return <div className="text-light-2">Community not found</div>;
    }

    return (
      <section>
        <ProfileHeader
          accountId={communityDetails.id} 
          authUserId={user.id}
          name={communityDetails.name}
          username={communityDetails.username}
          imgUrl={communityDetails.image}
          bio={communityDetails.bio}
          type="Community"
        />

        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              {communityTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="max-sm:hidden">{tab.label}</p>
                  {tab.label === "Posts" && (
                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                      {communityDetails?.threads?.length}
                    </p>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="threads" className="w-full text-light-1">
              <ThreadTab
                currentUserId={user.id}
                accountId={communityDetails._id} 
                accountType="Community"
              />
            </TabsContent>

            <TabsContent value="members" className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                {communityDetails?.members.map((member: any) => (
                  <UserCard
                    key={member.id} 
                    id={member.id} 
                    name={member.name}
                    username={member.username}
                    imgUrl={member.image}
                    personType="User"
                  />
                ))}
              </section>
            </TabsContent>

            <TabsContent value="requests" className="w-full text-light-1">
              <ThreadTab
                currentUserId={user.id}
                accountId={communityDetails._id} 
                accountType="Community"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching community details:", error);
    return <div>Error fetching community details</div>;
  }
}

export default Page;
