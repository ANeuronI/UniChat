import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";
async function page() {
    const user = await currentUser();
    const userInfo = {};
    const userData = {

    id: user?.id || "",
    objectId: userInfo?._id || "",
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || " ",
    image: userInfo?.image || user?.imageUrl ,
    }; 

  return (
    <main className="mx-auto flex max-w-3x1 flex-col justify-start px-10 py-20">
      <h1 className="head-text">DashBoard</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete Your Profile To Use UniChat
      </p>

<section className="mt-9 bg-dark-2 p-10">
    <AccountProfile user={userData} btnTitle ="continue"/>
</section>

    </main>
  );
}

export default page;


// //from chatgpt
// import AccountProfile from "@/components/forms/AccountProfile";
// import { currentUser } from "@clerk/nextjs/server";
// import mongoose from "mongoose";
// import UserModel from "@/models/User"; // Adjust the path based on your actual model file location

// async function page() {
//   const user = await currentUser();

//   // Connect to your MongoDB database
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // Fetch additional user info from your database
//   const userInfo = await UserModel.findById(user?.id);

//   const userData = {
//     id: user?.id || "",
//     objectId: userInfo?._id || "",
//     username: userInfo?.username || user?.username || "",
//     name: userInfo?.name || user?.firstName || "",
//     bio: userInfo?.bio || " ",
//     image: userInfo?.image || user?.imageUrl || "/assets/profile.svg",
//   };

//   return (
//     <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
//       <h1 className="head-text">OnBoarding</h1>
//       <p className="mt-3 text-base-regular text-light-2">
//         Complete Your Profile To Use UniChat
//       </p>

//       <section className="mt-9 bg-dark-2 p-10">
//         <AccountProfile user={userData} btnTitle="Continue" />
//       </section>
//     </main>
//   );
// }

// export default page;
