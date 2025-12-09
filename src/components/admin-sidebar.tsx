import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Upload,
  Users,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Panel Admin</h2>
        <p className="text-sm text-muted-foreground">Biblioteca Virtual</p>
      </div>
      <nav className="p-4 space-y-1">
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/publicaciones">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Publicaciones
          </Button>
        </Link>
        <Link href="/admin/nueva">
          <Button variant="ghost" className="w-full justify-start">
            <Upload className="mr-2 h-4 w-4" />
            Nueva Publicación
          </Button>
        </Link>
        <Link href="/admin/usuarios">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </Button>
        </Link>
        <Link href="/admin/estadisticas">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Estadísticas
          </Button>
        </Link>
        <Link href="/admin/configuracion">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
        </Link>
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </form>
      </nav>
    </aside>
  );
}
