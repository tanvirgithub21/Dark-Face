import Link from "next/link";
import Image from "next/image"; // Next.js এর ডিফল্ট Image কম্পোনেন্ট
import avatar from "../../public/general/avatar.png";

const menuList = [
  { id: 1, name: "Homepage", link: "/", icon: "/icons/home.svg" },
  { id: 2, name: "Explore", link: "/", icon: "/icons/explore.svg" },
  { id: 3, name: "Notification", link: "/", icon: "/icons/notification.svg" },
  { id: 4, name: "Messages", link: "/", icon: "/icons/message.svg" },
  { id: 5, name: "Bookmarks", link: "/", icon: "/icons/bookmark.svg" },
  { id: 6, name: "Jobs", link: "/", icon: "/icons/job.svg" },
  { id: 7, name: "Communities", link: "/", icon: "/icons/community.svg" },
  { id: 8, name: "Premium", link: "/", icon: "/icons/logo.svg" },
  { id: 9, name: "Profile", link: "/", icon: "/icons/profile.svg" },
  { id: 10, name: "More", link: "/", icon: "/icons/more.svg" },
];

const LeftBar = () => {
  return (
    <div className="hidden md:flex h-screen sticky top-0 flex-col justify-between pt-2 pb-8">
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-2 mr-auto rounded-full hover:bg-[#181818]">
          <Image src="/icons/logo.svg" alt="logo" width={24} height={24} />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              key={item.id}
            >
              <Image src={item.icon} alt={item.name} width={24} height={24} />
              <span className="inline">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <Image src="/icons/post.svg" alt="new post" width={24} height={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image src={avatar} alt="lama dev" width={100} height={100} />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">Lama Dev</span>
            <span className="text-sm text-textGray">@lamaWebDev</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
};

export default LeftBar;
