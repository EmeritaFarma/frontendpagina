import { Box, Calendar, ChevronsLeftRight, CircleDot, GalleryVerticalEnd, LogOut, MapPin, Search, TagIcon, User2Icon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {  NavLink, useLocation, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useQueryClient } from "@tanstack/react-query"

// Menu items.
const items = [
  {
    title: "Productos",
    url: "/admin/products",
    icon: Box,
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: User2Icon,
  },
  {
    title: "Sucursales",
    url: "/admin/branchs",
    icon: MapPin,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: CircleDot,
  },
  {
    title: "Etiquetas",
    url: "/admin/tags",
    icon: TagIcon,
  },
  {
    title: "Categorias",
    url: "/admin/categories",
    icon: Search,
  },
  {
    title: "Horarios",
    url: "/admin/schedules",
    icon: Calendar,
  },
  {
    title: "Banner",
    url: "/admin/banner",
    icon: GalleryVerticalEnd, 
  }

]

export function Aside() {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const client = useQueryClient()
  const logOut = () => {
    localStorage.removeItem('token')
    client.clear()
    navigate('/auth',{ replace: true })
  }

  return (
    <Sidebar >
      <SidebarHeader>
        <h2 className="text-gray-400 text-sm pl-2 pt-3 uppercase tracking-[1.5px]">Administrador</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="data-[active=true]:bg-white data-[active=true]:border-gray-200 data-[active=true]:text-cyan-800 data-[active=true]:shadow-[0_6px_5px_rgba(0,0,0,.02)]">
                    <NavLink to={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 gap-3 font-medium">
                  <Avatar className="size-10 text-lg ">
                    <AvatarFallback className="bg-gray-100 text-gray-500">A</AvatarFallback>
                  </Avatar>
                  Administrador
                  <ChevronsLeftRight className="ml-auto text-gray-400 rotate-90" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56"

              >
                <DropdownMenuItem onClick={logOut}>
                  <LogOut className="text-black" width={16} height={16} />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
