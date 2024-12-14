"use client";

import { useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "../../../gql/graphql";
import { userLogout } from "@/server/userLogout";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { FaRegUser } from "react-icons/fa6";

import { Button } from "../ui/button";
import Loader from "@/app/elements/Loader";

type UserAuthPopoverProps = {
  authenticated: boolean;
  locale: string;
  user: User | undefined;
};

const ArrayOfUserLinks = [
  {
    title: "profile",
    link: "/",
  },
  {
    title: "address",
    link: "/address",
  },
  {
    title: "orders",
    link: "/orders",
  },
  {
    title: "wishlist",
    link: "/wishlist",
  },
];

const UserAuthPopover = ({
  authenticated,
  locale,
  user,
}: UserAuthPopoverProps) => {
  const { signOut } = useSaleorAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      userLogout()
        .then(() => {
          signOut();
        })
        .catch(() => {
          toast.error("we could not log you out, Please try again later.");
        });
    });
    return;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-sm text-accent-foreground"></p>
      {authenticated && user ? (
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-textgray">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs font-semibold text-textgray">{user?.email}</p>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-x-[1vh]">
          <FaRegUser className="hidden md:block text-textgray text-2xl" />

          <div className="hidden lg:block">
            <p className="text-sm font-medium text-textgray">Hello, Sign In</p>
            <p className="text-sm font-semibold text-textgray">
              Accounts & Lists
            </p>
          </div>
        </div>
      )}

      {authenticated && user ? (
        <div className="flex flex-col items-center justify-center gap-1">
          {ArrayOfUserLinks.map((userLink, index) => (
            <Link
              key={`user-nav-${index}`}
              href={`/me/${user.id}${userLink.link}`}
              prefetch={false}
              className={cn(
                "w-full rounded-md py-2 text-center text-sm font-medium capitalize text-secondary-foreground/50 hover:bg-muted/70 hover:text-secondary-foreground",
                {
                  "bg-muted/70 text-secondary-foreground":
                    pathname.includes(userLink.link) && userLink.link !== "/",
                },
                {
                  "bg-muted/70 text-secondary-foreground":
                    pathname.includes(userLink.link) &&
                    userLink.title === "profile" &&
                    pathname.split("/").at(-1) === user.id,
                }
              )}
            >
              {userLink.title}
            </Link>
          ))}
        </div>
      ) : null}
      {authenticated ? (
        <Button
          variant="destructive"
          onClick={handleLogout}
          aria-busy={isPending}
          disabled={isPending}
        >
          {isPending ? <Loader /> : "Logout"}
        </Button>
      ) : (
        <div className="flex items-center gap-1">
          <Button variant="link" onClick={() => router.push("/auth/login")}>
            Sign In
          </Button>
          {"/"}
          <Button variant="link" onClick={() => router.push("/auth/register")}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserAuthPopover;