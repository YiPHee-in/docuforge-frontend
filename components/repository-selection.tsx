"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Github,
  GitBranch,
  Star,
  Eye,
  Calendar,
  Search,
  ArrowRight,
  Code2,
  Loader2,
  Plus,
  CheckCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Repository = {
  id: string;
  name: string;
  description: string;
  language: string;
  size: string;
  lines: number;
  lastUpdated: string;
  stars: number;
  visibility: "private" | "public";
  branch: string;
  url: string;
  cloneUrl: string;
  provider: "github" | "gitlab" | "bitbucket";
};

export function RepositorySelection() {
  const router = useRouter();
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("updated");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [connectedProviders, setConnectedProviders] = useState<
    ("github" | "gitlab" | "bitbucket")[]
  >([]);

  useEffect(() => {
    const fetchConnectedProviders = async () => {
      try {
        const response = await fetch("/api/auth/providers");
        if (!response.ok)
          throw new Error("Failed to fetch connected providers");
        const data = await response.json();
        setConnectedProviders(data.providers);
      } catch (err) {
        console.error("Error fetching connected providers:", err);
      }
    };

    fetchConnectedProviders();
  }, []);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch repositories from all connected providers in parallel
        const repositoryPromises = connectedProviders.map(async (provider) => {
          const response = await fetch(`/api/${provider}/repositories`);
          if (!response.ok) {
            const data = await response.json();
            // Handle token refresh case
            if (
              response.status === 403 &&
              data.error === "token_refresh_required"
            ) {
              // Redirect to GitLab OAuth
              window.location.href = data.redirectUrl;
              return []; // Return empty array since we're redirecting
            }
            throw new Error(`Failed to fetch ${provider} repositories`);
          }
          const repos = await response.json();
          return repos.map((repo: any) => ({ ...repo, provider }));
        });

        const results = await Promise.allSettled(repositoryPromises);

        // Combine all successful repository fetches
        const allRepositories = results
          .filter(
            (result): result is PromiseFulfilledResult<Repository[]> =>
              result.status === "fulfilled"
          )
          .flatMap((result) => result.value);

        // Handle any failed fetches
        const failedProviders = results
          .filter(
            (result): result is PromiseRejectedResult =>
              result.status === "rejected"
          )
          .map((_, index) => connectedProviders[index]);

        if (failedProviders.length > 0) {
          console.error(
            `Failed to fetch repositories from: ${failedProviders.join(", ")}`
          );
        }

        setRepositories(allRepositories);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError("Failed to load repositories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (connectedProviders.length > 0) {
      fetchRepositories();
    }
  }, [connectedProviders]);

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "size":
        return parseFloat(b.size) - parseFloat(a.size);
      case "language":
        return a.language.localeCompare(b.language);
      case "updated":
      default:
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
    }
  });

  const handleRepoSelect = (repoId: string) => {
    setSelectedRepo(selectedRepo === repoId ? null : repoId);
  };

  const handleCreateProject = async () => {
    try {
      setIsCreatingProject(true);
      setCreateError(null);

      if (!projectName.trim()) {
        setCreateError("Project name is required");
        return;
      }

      if (!selectedRepo) {
        setCreateError("Please select a repository");
        return;
      }

      const selectedRepository = repositories.find(
        (repo) => `${repo.provider}-${repo.id}` === selectedRepo
      );
      if (!selectedRepository) {
        setCreateError("Selected repository not found");
        return;
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName.trim(),
          description: projectDescription.trim(),
          repositories: [
            {
              id: selectedRepository.id,
              name: selectedRepository.name,
              url: selectedRepository.url,
              provider: selectedRepository.provider,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }

      const project = await response.json();
      router.push(`/projects/${project.id}`);
    } catch (err) {
      console.error("Error creating project:", err);
      setCreateError(
        err instanceof Error ? err.message : "Failed to create project"
      );
    } finally {
      setIsCreatingProject(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-lg">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Error Loading Repositories</h3>
                <p className="text-red-800 text-sm mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Select Repository
        </h1>
        <p className="text-lg text-slate-600">
          Choose the repository you want to generate documentation for
        </p>
      </div>

      {connectedProviders.length === 0 && (
        <Card className="border-yellow-200 bg-yellow-50 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-yellow-600">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">No Providers Connected</h3>
                <p className="text-yellow-800 text-sm mt-1">
                  Please connect at least one Git provider to continue. You can
                  connect providers from the{" "}
                  <a
                    href="/connect"
                    className="underline hover:text-yellow-900"
                  >
                    Connect Repository
                  </a>{" "}
                  page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Connected Repositories
                  </CardTitle>
                  <CardDescription>
                    {isLoading
                      ? "Loading repositories..."
                      : `${repositories.length} repositories found across ${connectedProviders.length} providers`}
                  </CardDescription>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search repositories..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedRepos.map((repo) => (
                      <Card
                        key={`${repo.provider}-${repo.id}`}
                        className={`relative overflow-hidden cursor-pointer transition-colors ${
                          selectedRepo === `${repo.provider}-${repo.id}`
                            ? "border-blue-500 bg-blue-50"
                            : ""
                        }`}
                        onClick={() =>
                          handleRepoSelect(`${repo.provider}-${repo.id}`)
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedRepo === `${repo.provider}-${repo.id}`
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-slate-300"
                              }`}
                            >
                              {selectedRepo ===
                                `${repo.provider}-${repo.id}` && (
                                <CheckCircle className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium truncate">
                                    <a
                                      href={repo.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      {repo.name}
                                    </a>
                                  </h3>
                                  <Badge
                                    variant={
                                      repo.visibility === "private"
                                        ? "secondary"
                                        : "outline"
                                    }
                                  >
                                    {repo.visibility}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`capitalize ${
                                      repo.provider === "github"
                                        ? "bg-gray-100"
                                        : repo.provider === "gitlab"
                                        ? "bg-orange-100"
                                        : "bg-blue-100"
                                    }`}
                                  >
                                    {repo.provider}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4" />
                                    {repo.stars}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {repo.visibility}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                                {repo.description || "No description provided"}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Code2 className="h-4 w-4" />
                                  {repo.language}
                                </span>
                                <span>{repo.size}</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDistanceToNow(
                                    new Date(repo.lastUpdated),
                                    { addSuffix: true }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Repository</CardTitle>
              <CardDescription>
                {selectedRepo
                  ? "Repository selected"
                  : "No repository selected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!selectedRepo ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    Select a repository to continue
                  </p>
                ) : (
                  <div className="space-y-2">
                    {(() => {
                      const repo = repositories.find(
                        (r) => `${r.provider}-${r.id}` === selectedRepo
                      );
                      return repo ? (
                        <div className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {repo.name}
                            </div>
                            <div className="text-slate-500 text-xs truncate">
                              {repo.url}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRepoSelect(`${repo.provider}-${repo.id}`)
                            }
                          >
                            Change
                          </Button>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg" disabled={!selectedRepo}>
                Create Project
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Create a new documentation project from your selected
                  repository
                </DialogDescription>
              </DialogHeader>

              {createError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                  {createError}
                </div>
              )}

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Documentation Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe what this documentation project is about..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Selected Repository</Label>
                  <div className="text-sm text-slate-600">
                    {selectedRepo
                      ? "Repository selected"
                      : "No repository selected"}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                  disabled={isCreatingProject}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={isCreatingProject || !projectName.trim()}
                >
                  {isCreatingProject ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
