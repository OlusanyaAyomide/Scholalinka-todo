import { Avatar, AvatarFallback } from '@/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'


export default function UserAvatar() {
  return (
    <Avatar className='h-8 w-8'>
      <AvatarFallback>TD</AvatarFallback>
      <AvatarImage src={"/profile.png"}/>
    </Avatar>
  )
}
