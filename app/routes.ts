import {
  Code,
  ImageIcon,
  LucideIcon,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from 'lucide-react';

interface ITools {
  label: string;
  icon: LucideIcon;
  href: string;
  color: string;
  bgColor: string;
  description: string;
}

interface IRoutes {
  label: string;
  icon: LucideIcon;
  href: string;
  color?: string;
  bgColor?: string;
}

export const conversationDetails: ITools = {
  label: 'Conversation',
  icon: MessageSquare,
  href: '/conversation',
  color: 'text-violet-500',
  bgColor: 'bg-violet-500/10',
  description: 'Our conversation model',
}

export const musicDetails: ITools = {
  label: 'Music',
  icon: MusicIcon,
  href: '/music',
  color: 'text-emerald-700',
  bgColor: 'bg-emerald-700/10',
  description: 'Music model',
}

export const imageDetails: ITools = {
  label: 'Image',
  icon: ImageIcon,
  href: '/image',
  color: 'text-pink-700',
  bgColor: 'bg-pink-700/10',
  description: 'Image model',
}

export const videoDetails: ITools = {
  label: 'Video',
  icon: VideoIcon,
  href: '/video',
  color: 'text-orange-700',
  bgColor: 'bg-orange-700/10',
  description: 'Video model',
}

export const codeDetails: ITools = {
  label: 'Code',
  icon: Code,
  href: '/code',
  color: 'text-green-700',
  bgColor: 'bg-green-700/10',
  description: 'Generate code using descriptive text',
}

export const tools: IRoutes[] = [
  { ...conversationDetails },
  { ...musicDetails },
  { ...imageDetails },
  { ...videoDetails },
  { ...codeDetails },
];

export const routes: IRoutes[] = [
  ...tools,
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];
