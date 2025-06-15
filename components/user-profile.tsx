"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, Shield, Key, Trash2 } from "lucide-react"

export function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@acme-corp.com",
    bio: "Senior Software Engineer with 10+ years of experience in legacy system modernization.",
    company: "Acme Corporation",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    avatar: "/placeholder.svg?height=80&width=80",
    joinDate: "January 2024",
    plan: "Team",
    role: "Admin",
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-slate-600 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={user.company}
                    onChange={(e) => setUser({ ...user, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={user.location}
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={user.website}
                  onChange={(e) => setUser({ ...user, website: e.target.value })}
                />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your account details and subscription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Account Type</p>
                    <div className="flex items-center gap-2">
                      <Badge>{user.plan} Plan</Badge>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-slate-600">{user.joinDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-900">Delete Account</h3>
                  <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-slate-600">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Connected Accounts</h3>
                <div className="space-y-3">
                  {[
                    { name: "GitHub", connected: true, email: "john@acme-corp.com" },
                    { name: "GitLab", connected: true, email: "john@acme-corp.com" },
                    { name: "Bitbucket", connected: false, email: null },
                    { name: "Azure DevOps", connected: false, email: null },
                  ].map((account) => (
                    <div key={account.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        {account.connected ? (
                          <p className="text-sm text-green-600">Connected • {account.email}</p>
                        ) : (
                          <p className="text-sm text-slate-600">Not connected</p>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        {account.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Documentation Updates",
                    description: "Get notified when your documentation is automatically updated",
                    enabled: true,
                  },
                  {
                    title: "Team Activity",
                    description: "Notifications about team member actions and changes",
                    enabled: true,
                  },
                  {
                    title: "Billing & Usage",
                    description: "Alerts about billing, usage limits, and subscription changes",
                    enabled: true,
                  },
                  {
                    title: "Security Alerts",
                    description: "Important security notifications and login alerts",
                    enabled: true,
                  },
                  {
                    title: "Product Updates",
                    description: "News about new features and product improvements",
                    enabled: false,
                  },
                ].map((notification) => (
                  <div key={notification.title} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-slate-600">{notification.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={notification.enabled}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                ))}
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
