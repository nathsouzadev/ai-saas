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
}

export const tools: IRoutes[] = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "violet-500",
    href: "/conversation",
  },
  {
    label: "Image",
    icon: ImageIcon,
    href: "/image",
    color: "pink-700",
  },
  {
    label: "Video",
    icon: VideoIcon,
    href: "/video",
    color: "orange-700",
  },
  {
    label: "Music",
    icon: MusicIcon,
    href: "/music",
    color: "emerald-700",
  },
  {
    label: "Code",
    icon: Code,
    href: "/code",
    color: "green-700",
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
