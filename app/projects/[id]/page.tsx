import { AuthenticatedHeader } from "@/components/authenticated-header"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectDetail } from "@/components/project-detail"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AuthenticatedHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProjectDetail projectId={params.id} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
