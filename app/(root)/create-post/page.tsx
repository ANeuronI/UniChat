import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/postThread"

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    return (
        <> 
            <h1 className="head-text">Create Post</h1>
            <PostThread userId={userInfo._id} /> 
        </>
    );
}

export default Page;
