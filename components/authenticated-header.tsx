"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Bell, Settings, User, CreditCard, LogOut, Users, Crown, HelpCircle } from "lucide-react"

export function AuthenticatedHeader() {
  const [notifications] = useState(3)
  const [currentOrg, setCurrentOrg] = useState("acme-corp")

  const user = {
    name: "John Doe",
    email: "john@acme-corp.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
    plan: "Team",
    credits: 1250,
    role: "Admin",
  }

  const organizations = [
    {
      id: "acme-corp",
      name: "Acme Corporation",
      plan: "Team",
      role: "Admin",
      avatar: "/placeholder.svg?height=24&width=24",
      members: 12,
    },
    {
      id: "personal",
      name: "Personal Account",
      plan: "Starter",
      role: "Owner",
      avatar: "/placeholder.svg?height=24&width=24",
      members: 1,
    },
    {
      id: "startup-inc",
      name: "Startup Inc",
      plan: "Enterprise",
      role: "Member",
      avatar: "/placeholder.svg?height=24&width=24",
      members: 45,
    },
  ]

  const currentOrgData = organizations.find((org) => org.id === currentOrg)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">DocuForge</span>
          <Badge variant="secondary" className="ml-2">
            4.1
          </Badge>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Organization Selector */}
          <Select value={currentOrg} onValueChange={setCurrentOrg}>
            <SelectTrigger className="w-48">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={currentOrgData?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{currentOrgData?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  <div className="flex items-center gap-3 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={org.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{org.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{org.name}</span>
                        {org.plan === "Enterprise" && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {org.plan}
                        </Badge>
                        <span>{org.role}</span>
                        <span>•</span>
                        <span>{org.members} members</span>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
              <DropdownMenuSeparator />
              <SelectItem value="create-org" className="text-blue-600">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Organization
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Credits Display */}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md">
            <CreditCard className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">{user.credits.toLocaleString()}</span>
            <span className="text-xs text-green-600">credits</span>
          </div>

          {/* New Project Button */}
          <Button size="sm" asChild>
            <a href="/connect">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </a>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary">{notifications}</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-1">
                <div className="p-3 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded">
                      <FileText className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documentation updated</p>
                      <p className="text-xs text-slate-600">Legacy COBOL System docs were auto-updated</p>
                      <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded">
                      <Users className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New team member</p>
                      <p className="text-xs text-slate-600">Sarah joined Acme Corporation</p>
                      <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 rounded-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-yellow-100 rounded">
                      <CreditCard className="h-3 w-3 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Credits running low</p>
                      <p className="text-xs text-slate-600">1,250 credits remaining this month</p>
                      <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600">View all notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {user.plan} Plan
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing & Usage
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/help" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
