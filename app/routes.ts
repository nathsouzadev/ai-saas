import {
  Code,
  ImageIcon,
  LucideIcon,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";

interface IRoutes {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  bgColor?: string;
}

export const tools: IRoutes[] = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    href: "/conversation",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
  },
  {
    label: "Image",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Code",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

export const routes: IRoutes[] = [
  ...tools,
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
