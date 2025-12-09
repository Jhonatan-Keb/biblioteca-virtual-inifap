import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { FileText, Download, Eye, Users } from "lucide-react";

async function getStats() {
  const [
    totalPublicaciones,
    totalDescargas,
    totalVisualizaciones,
    totalUsuarios,
  ] = await Promise.all([
    prisma.publicacion.count(),
    prisma.publicacion.aggregate({ _sum: { cuenta: true } }),
    prisma.publicacion.aggregate({ _sum: { cuenta: true } }),
    prisma.user.count(),
  ]);

  return {
    totalPublicaciones,
    totalDescargas: totalDescargas._sum.cuenta || 0,
    totalVisualizaciones: totalVisualizaciones._sum.cuenta || 0,
    totalUsuarios,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Nueva Publicación</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Publicaciones
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPublicaciones}</div>
            <p className="text-xs text-muted-foreground">
              Total de publicaciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Descargas
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDescargas}</div>
            <p className="text-xs text-muted-foreground">
              Total de descargas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visualizaciones
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisualizaciones}</div>
            <p className="text-xs text-muted-foreground">
              Total de visualizaciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios registrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de publicaciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Publicaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Aquí iría la tabla de publicaciones recientes...</p>
        </CardContent>
      </Card>
    </div>
  );
}
