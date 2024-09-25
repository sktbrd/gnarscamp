import {
  HomeIcon,
  LightBulbIcon,
  LinkIcon,
  QueueListIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useEffect,
  useState,
} from "react";

function Navbar() {
  return (
    <div className="w-[140px] lg:w-[220px] md:flex flex-col px-4 lg:px-8 py-4 hidden">
      <a className="text-3xl mb-8">Gnars</a>
      <div className="w-[220px] flex flex-col">
        <a>MENU</a>
        <div className="font-xl flex flex-col pt-4 gap-4">
          <NavbarItem
            href="/"
            text="Discover"
            icon={HomeIcon}
            color="#CA6CFF"
          />
          <NavbarItem
            href="/about"
            text="About"
            icon={LightBulbIcon}
            color="#8FD1F9"
          />
          <NavbarItem
            href="/vote"
            text="Proposals"
            icon={QueueListIcon}
            color="#51DB6E"
          />
          <NavbarItem
            href="/#"
            text="Propdates"
            icon={TableCellsIcon}
            color="#CAEB00"
          />
          <NavbarItem
            href="https://gnars.com"
            text="Gnars"
            icon={LinkIcon}
            color="#EA8C3F"
          />
        </div>
      </div>
    </div>
  );
}

interface NavbarItemProps {
  text: string;
  href: string;
  icon: React.ElementType;
  className?: string;
  color: string;
}

function NavbarItem(props: NavbarItemProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const active = router.asPath === props.href || isHovered;

  useEffect(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link
      href={props.href}
      className={clsx("flex gap-2 items-center", props.className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          "p-2 rounded-lg",
          active
            ? "bg-opacity-100 scale-105"
            : "bg-gray-200 hover:bg-opacity-80"
        )}
        style={{ backgroundColor: active ? props.color : undefined }}
      >
        <props.icon width={"18px"} color={active ? "white" : "black"} />
      </div>
      <p>{props.text}</p>
    </Link>
  );
}

export default Navbar;