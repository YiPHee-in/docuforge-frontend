import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>
            There was a problem signing you in. This could be due to an expired
            or invalid authentication code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Please try signing in again. If the problem persists, you may need
            to clear your browser cookies and try again.
          </p>
          <Button className="w-full" asChild>
            <a href="/signin">Return to Sign In</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
