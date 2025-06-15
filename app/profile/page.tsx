import { AuthenticatedHeader } from "@/components/authenticated-header"
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <AuthenticatedHeader />
      <UserProfile />
    </div>
  )
}
