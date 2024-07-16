
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

// import PostThread from "@/components/forms/postThread"

async function Page({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
  
    const results = await fetchUsers({
      userId: user.id,
      searchString: searchParams.q,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    });
  return (
    <section>
        <h1 className="head-text mb-10">search</h1>
        {/* search bar */}
        <Searchbar routeType='search' />
        <div className="mt-14 flex flex-col gap-9">
            {results.user.length===0?(
                <p className="no-result"> No Users </p>
            ):(
                <>
                {results.user.map((person)=>(
                    <UserCard 
                    key={person.id}
                    id = {person.id}
                    name = {person.name}
                    username = {person.username}
                    imgUrl = {person.image}
                    personType = 'User'
                    />
                ))}
                </>
            )}
        </div>
        <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={results.isNext}
      />
    </section>
  )
}

export default Page
