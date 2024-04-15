import { MessageSquareOff } from "lucide-react";

interface EmptyProps {
    label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full -[20 flex flex-col items-center justify-center">
      <MessageSquareOff className="relative m-5 text-gray-500" size={148}/>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
};
