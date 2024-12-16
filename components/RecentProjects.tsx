import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentProjects() {
  return (
    <div className="space-y-8">
      {recentProjects.map((project) => (
        <div key={project.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={project.avatar} alt="Avatar" />
            <AvatarFallback>{project.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium text-gray-800 leading-none">{project.name}</p>
            <p className="text-sm text-gray-500">
              {project.status}
            </p>
          </div>
          <div className="ml-auto font-medium text-gray-800">
            {project.projectedOutput} kg/day
          </div>
        </div>
      ))}
    </div>
  )
}

const recentProjects = [
  {
    id: "1",
    name: "Green Valley H2",
    status: "In Progress",
    projectedOutput: "500",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "SunWave Energy",
    status: "Planning",
    projectedOutput: "750",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "AquaBlue H2",
    status: "Completed",
    projectedOutput: "1000",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

