import { AuthenticatedHeader } from "@/components/authenticated-header"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsList } from "@/components/projects-list"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AuthenticatedHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProjectsList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
