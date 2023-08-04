import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import ToggleSwitch from "./ToggleSwitch";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between w-full py-4 gap-4 px-6 sm:px-24">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={150}
          height={40}
        />
      </Link>

      <div className="flex-center gap-4 sm:gap-6">
        <div className="flex-center mx-4">
          <ToggleSwitch />
          <div>
            <Image
              src="/assets/icons/moon.svg"
              width={25}
              height={25}
              alt="Theme"
            />
          </div>
        </div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-6">
            <ProfileMenu session={session} />
            <Link href="/create-prompt">
              <span className="rounded-navbar-button hidden sm:flex">
                Create Post
              </span>
              <span className="rounded-icon px-3 py-1 sm:hidden">+</span>
            </Link>
          </div>
        ) : (
          <Link href="/signin" className="primary-button">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
