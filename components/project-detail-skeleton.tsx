import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-24" /> {/* Back button */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-8 w-64" /> {/* Project name */}
              <Skeleton className="h-5 w-16" /> {/* Status badge */}
              <Skeleton className="h-5 w-20" /> {/* Language badge */}
            </div>
            <Skeleton className="h-4 w-96" /> {/* Description */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" /> {/* Share button */}
          <Skeleton className="h-9 w-32" /> {/* View site button */}
          <Skeleton className="h-9 w-9" /> {/* More button */}
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                  <Skeleton className="h-8 w-16" /> {/* Value */}
                </div>
                <Skeleton className="h-8 w-8" /> {/* Icon */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            {[
              "Overview",
              "Preview",
              "Repositories",
              "Generations",
              "Analytics",
              "Settings",
            ].map((tab) => (
              <Skeleton key={tab} className="h-10 w-24" />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Project Information Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48 mb-2" /> {/* Title */}
                  <Skeleton className="h-4 w-64" /> {/* Description */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" /> {/* Label */}
                        <Skeleton className="h-4 w-32" /> {/* Value */}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Access Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2" /> {/* Title */}
                  <Skeleton className="h-4 w-48" /> {/* Description */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />{" "}
                          {/* Avatar */}
                          <div>
                            <Skeleton className="h-4 w-24 mb-1" /> {/* Name */}
                            <Skeleton className="h-3 w-16" /> {/* Role */}
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8" /> {/* More button */}
                      </div>
                    ))}
                    <Skeleton className="h-9 w-full mt-4" />{" "}
                    {/* Manage Team button */}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Generations Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" /> {/* Title */}
                <Skeleton className="h-4 w-64" /> {/* Description */}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-4" /> {/* Status icon */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Skeleton className="h-4 w-20" /> {/* Status */}
                            <Skeleton className="h-4 w-16" />{" "}
                            {/* Trigger badge */}
                          </div>
                          <Skeleton className="h-3 w-48" /> {/* Details */}
                          <Skeleton className="h-3 w-24 mt-1" /> {/* Time */}
                        </div>
                      </div>
                      <Skeleton className="h-9 w-24" />{" "}
                      {/* View Details button */}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
