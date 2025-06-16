"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Documentation Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your AI-generated documentation projects
        </p>
      </div>
      <Button asChild>
        <Link href="/connect">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </Button>
    </div>
  );
}
