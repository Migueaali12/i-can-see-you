import Button from "@/components/ui/Button"
import { Play } from "lucide-react"
import { useEffect, useState } from "react"
import {
  checkAllExplicitPermissions,
  hasPendingPermissions,
} from "@/core/permissions"

export default function HeroCtaButton() {
  const [hasPendingPermissionsFlag, setHasPendingPermissionsFlag] = useState(false)

  useEffect(() => {
    checkAllExplicitPermissions().then((results) => {
      setHasPendingPermissionsFlag(hasPendingPermissions(results))
    }).catch(() => {
      // if permissions check fails, default to demo
      setHasPendingPermissionsFlag(false)
    })
  }, [])

  return (
    <div className='flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-2'>
      <Button size='lg' variant='gray' href={hasPendingPermissionsFlag ? "/signals" : "/demo"}>
        Let's try it out!
        <Play size={20} />
      </Button>
    </div>
  )
}
