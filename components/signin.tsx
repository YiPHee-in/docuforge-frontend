"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Github,
  GitBranch,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function SignIn() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const providers = [
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      description: "Sign in with your GitHub account",
      color: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white",
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: GitBranch,
      description: "Sign in with your GitLab account",
      color: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-white",
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: GitBranch,
      description: "Sign in with your Bitbucket account",
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
    },
    {
      id: "azure",
      name: "Azure DevOps",
      icon: GitBranch,
      description: "Sign in with your Azure DevOps account",
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
    },
  ];

  const handleOAuthSignIn = async (providerId: string) => {
    setIsLoading(providerId);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerId as "github" | "gitlab" | "bitbucket" | "azure",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          ...(providerId === "github" && {
            scopes: "repo read:org",
            queryParams: {
              prompt: "consent",
            },
          }),
          ...(providerId === "gitlab" && {
            scopes: "read_repository read_user email",
            queryParams: {
              prompt: "consent",
            },
          }),
          ...(providerId === "bitbucket" && {
            scopes: "repository repository:write account team pullrequest",
            queryParams: {
              prompt: "consent",
            },
          }),
        },
      });

      if (error) {
        console.error("OAuth error:", error.message);
        // You might want to show an error toast here
      }
    } catch (error) {
      console.error("Sign in error:", error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("email");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(null);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold">DocuForge</span>
          <Badge variant="secondary">4.1</Badge>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-600">
          Sign in to your account to continue generating documentation
        </p>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign-in method to access DocuForge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* OAuth Providers */}
          <div className="space-y-3">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className={`w-full h-12 ${provider.color} ${provider.textColor} border-0`}
                onClick={() => handleOAuthSignIn(provider.id)}
                disabled={isLoading !== null}
              >
                {isLoading === provider.id ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <provider.icon className="mr-2 h-5 w-5" />
                )}
                Continue with {provider.name}
              </Button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or</span>
            </div>
          </div>

          {/* Email Sign In Toggle */}
          {!showEmailForm ? (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowEmailForm(true)}
              disabled={isLoading !== null}
            >
              Sign in with email instead
            </Button>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  disabled={isLoading !== null}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  disabled={isLoading !== null}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" disabled={isLoading !== null} />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading !== null}
              >
                {isLoading === "email" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          )}

          {showEmailForm && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEmailForm(false)}
                disabled={isLoading !== null}
              >
                Back to OAuth providers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security & Features */}
      <div className="mt-8 space-y-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Secure Authentication
                </h3>
                <p className="text-blue-800 text-sm mt-1">
                  We use OAuth 2.0 for secure authentication. Your credentials
                  are never stored on our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Instant Access</h3>
                <p className="text-green-800 text-sm mt-1">
                  Sign in once and automatically connect to all your
                  repositories across different platforms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center space-y-4">
        <div className="text-sm text-slate-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up for free
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <a href="/privacy" className="hover:text-slate-700">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-slate-700">
            Terms of Service
          </a>
          <span>•</span>
          <a href="/support" className="hover:text-slate-700">
            Support
          </a>
        </div>

        <div className="text-xs text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
