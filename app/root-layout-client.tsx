"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Header } from "@/components/header";
import { AuthenticatedHeader } from "@/components/authenticated-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { createOrganization } from "@/app/actions/organizations";
import { getUserOrganizations } from "@/app/actions/user";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOrgDialog, setShowOrgDialog] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        // Check if user has an organization using server action
        const { organizations } = await getUserOrganizations();
        if (!organizations || organizations.length === 0) {
          setShowOrgDialog(true);
        }
      }

      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        // Check organization membership on auth change
        checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateOrg = async () => {
    if (!orgName.trim()) {
      setCreateError("Organization name is required");
      return;
    }

    try {
      setIsCreatingOrg(true);
      setCreateError(null);

      const { error } = await createOrganization({ name: orgName });

      if (error) {
        throw new Error(error);
      }

      // Refresh the page to update the organization list
      router.refresh();
      setShowOrgDialog(false);
    } catch (error) {
      console.error("Error creating organization:", error);
      setCreateError(
        error instanceof Error ? error.message : "Failed to create organization"
      );
    } finally {
      setIsCreatingOrg(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        {isAuthenticated ? <AuthenticatedHeader /> : <Header />}
        <div className="flex">
          {isAuthenticated && <AppSidebar />}
          <main className="flex-1">{children}</main>
        </div>

        {/* Organization Creation Dialog */}
        <Dialog open={showOrgDialog} onOpenChange={setShowOrgDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Your Organization</DialogTitle>
              <DialogDescription>
                Create an organization to start managing your documentation
                projects. You can invite team members later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  placeholder="Acme Corporation"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  disabled={isCreatingOrg}
                />
                {createError && (
                  <p className="text-sm text-red-600">{createError}</p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={handleCreateOrg}
                disabled={isCreatingOrg}
              >
                {isCreatingOrg ? "Creating..." : "Create Organization"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
