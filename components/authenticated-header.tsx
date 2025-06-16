"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Bell,
  Settings,
  User,
  CreditCard,
  LogOut,
  Users,
  Crown,
  HelpCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getUserOrganizations } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Organization = {
  id: string;
  name: string;
  slug: string;
  role: string;
  createdAt: Date;
};

export function AuthenticatedHeader() {
  const [notifications] = useState(3);
  const [currentOrg, setCurrentOrg] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setAuthError(null);
        const supabase = createClient();
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!session) {
          // Clear any stale auth data
          await supabase.auth.signOut();
          window.location.href = "/signin";
          return;
        }

        // Fetch user data
        setUser(session.user);

        // Fetch organizations
        const { organizations, error: orgError } = await getUserOrganizations();
        if (orgError) {
          throw new Error(orgError);
        }

        if (organizations && organizations.length > 0) {
          setOrganizations(organizations);
          // Set the first organization as current if none selected
          if (!currentOrg) {
            setCurrentOrg(organizations[0].slug);
          }
        }
      } catch (error) {
        console.error("Auth error:", error);
        setAuthError("Authentication failed. Please try signing in again.");
        // Clear any stale auth data
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = "/signin?error=auth_failed";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up auth state change listener
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        window.location.href = "/signin";
      } else if (event === "SIGNED_IN") {
        // Refresh data on sign in
        fetchData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentOrg]);

  const handleOrgChange = (slug: string) => {
    if (slug === "create-org") {
      // Show organization creation dialog
      router.push("/organizations/new");
      return;
    }
    setCurrentOrg(slug);
    // TODO: Update URL or state to reflect current organization
  };

  const currentOrgData = organizations.find((org) => org.slug === currentOrg);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Clear any local state
      setUser(null);
      // The auth state change listener will handle the redirect
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError("Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocuForge</span>
          </div>
          <div className="animate-pulse">Loading...</div>
        </div>
      </header>
    );
  }

  if (authError) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocuForge</span>
          </div>
          <div className="text-red-600">{authError}</div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold truncate">DocuForge</span>
          <Badge variant="secondary" className="ml-2">
            4.1
          </Badge>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Organization Selector */}
          {organizations.length > 0 && (
            <div className="flex items-center min-w-0">
              <Select value={currentOrg || ""} onValueChange={handleOrgChange}>
                <SelectTrigger className="w-48 h-10 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {currentOrgData?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[120px]">
                      <SelectValue />
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.slug}>
                      <div className="flex items-center gap-3 py-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {org.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-medium truncate max-w-[100px]">
                              {org.name}
                            </span>
                            {org.role === "OWNER" && (
                              <Crown className="h-3 w-3 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Badge
                              variant="secondary"
                              className="text-xs px-1 py-0"
                            >
                              {org.role}
                            </Badge>
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
            </div>
          )}

          {/* Credits Display */}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md h-10">
            <CreditCard className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {user?.credits?.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-green-600">credits</span>
          </div>

          {/* New Project Button */}
          <Link href="/connect">
            <Button size="sm" className="h-10">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-10 w-10 p-0 flex items-center justify-center"
              >
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
                      <p className="text-sm font-medium">
                        Documentation updated
                      </p>
                      <p className="text-xs text-slate-600">
                        Legacy COBOL System docs were auto-updated
                      </p>
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
                      <p className="text-xs text-slate-600">
                        Sarah joined {currentOrgData?.name}
                      </p>
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
                      <p className="text-xs text-slate-600">
                        {user?.credits?.toLocaleString() || "0"} credits
                        remaining this month
                      </p>
                      <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 flex items-center justify-center"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url || "/placeholder.svg"}
                    alt={user?.user_metadata?.name || user?.email}
                  />
                  <AvatarFallback>
                    {(user?.user_metadata?.name || user?.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          user?.user_metadata?.avatar_url || "/placeholder.svg"
                        }
                        alt={user?.user_metadata?.name || user?.email}
                      />
                      <AvatarFallback>
                        {(user?.user_metadata?.name || user?.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate">
                        {user?.user_metadata?.name ||
                          user?.email?.split("@")[0]}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground mt-1 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {currentOrgData?.role || "Member"}
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
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
