"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Github, GitBranch, Loader2, Gift, Zap } from "lucide-react"

export function SignUp() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const providers = [
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      description: "Sign up with your GitHub account",
      color: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white",
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: GitBranch,
      description: "Sign up with your GitLab account",
      color: "bg-orange-600 hover:bg-orange-700",
      textColor: "text-white",
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: GitBranch,
      description: "Sign up with your Bitbucket account",
      color: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white",
    },
    {
      id: "azure",
      name: "Azure DevOps",
      icon: GitBranch,
      description: "Sign up with your Azure DevOps account",
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
    },
  ]

  const handleOAuthSignUp = async (providerId: string) => {
    setIsLoading(providerId)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(null)
    window.location.href = "/connect"
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading("email")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(null)
    window.location.href = "/connect"
  }

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Get started for free</h1>
        <p className="text-slate-600">Create your account and start generating documentation in minutes</p>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred method to get started with DocuForge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Free Tier Highlight */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900">Free Tier Included</span>
            </div>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• 5 documentation projects per month</li>
              <li>• 10k lines of code per project</li>
              <li>• All templates and output formats</li>
              <li>• Community support</li>
            </ul>
          </div>

          {/* OAuth Providers */}
          <div className="space-y-3">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className={`w-full h-12 ${provider.color} ${provider.textColor} border-0`}
                onClick={() => handleOAuthSignUp(provider.id)}
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

          {/* Email Sign Up Toggle */}
          {!showEmailForm ? (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowEmailForm(true)}
              disabled={isLoading !== null}
            >
              Sign up with email instead
            </Button>
          ) : (
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" required disabled={isLoading !== null} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" required disabled={isLoading !== null} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@company.com" required disabled={isLoading !== null} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required disabled={isLoading !== null} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" type="password" required disabled={isLoading !== null} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required disabled={isLoading !== null} />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading !== null}>
                {isLoading === "email" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}

          {showEmailForm && (
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={() => setShowEmailForm(false)} disabled={isLoading !== null}>
                Back to OAuth providers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Get Started in 2 Minutes</h3>
                <p className="text-blue-800 text-sm mt-1">
                  Connect your repositories and generate your first documentation project instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center space-y-4">
        <div className="text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
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
      </div>
    </div>
  )
}
