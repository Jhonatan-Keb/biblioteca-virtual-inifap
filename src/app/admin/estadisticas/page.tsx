import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsChart } from "@/components/admin/stats-chart";
import { prisma } from "@/lib/prisma";
import { FileText, Download, Users, TrendingUp } from "lucide-react";

async function getDashboardStats() {
  const [
    totalPublicaciones,
    totalDescargas,
    totalUsuarios,
    publicacionesPorTipo,
    descargasPorMes,
    publicacionesPorAño,
  ] = await Promise.all([
    // Total publicaciones
    prisma.publicacion.count(),

    // Total descargas
    prisma.publicacion.aggregate({
      _sum: { cuenta: true },
    }),

    // Total usuarios
    prisma.user.count(),

    // Publicaciones por tipo
    prisma.publicacion.groupBy({
      by: ['tipo'],
      _count: {
        id: true,
      },
    }),

    // Descargas por mes (últimos 6 meses)
    prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(cuenta) as total_descargas
      FROM "Publicacion"
      WHERE "createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
    `,

    // Publicaciones por año
    prisma.publicacion.groupBy({
      by: ['año'],
      _count: {
        id: true,
      },
      orderBy: {
        año: 'desc',
      },
      take: 10,
    }),
  ]);

  // Formatear datos para gráficas
  const publicacionesPorTipoData = publicacionesPorTipo.map(item => ({
    name: item.tipo,
    value: item._count.id,
  }));

  const descargasPorMesData = (descargasPorMes as any[]).map(item => ({
    month: new Date(item.month).toLocaleDateString('es-ES', { month: 'short' }),
    descargas: Number(item.total_descargas) || 0,
  })).reverse();

  const publicacionesPorAñoData = publicacionesPorAño
    .filter(item => item.año)
    .map(item => ({
      año: item.año!,
      publicaciones: item._count.id,
    }));

  return {
    totalPublicaciones,
    totalDescargas: totalDescargas._sum.cuenta || 0,
    totalUsuarios,
    publicacionesPorTipoData,
    descargasPorMesData,
    publicacionesPorAñoData,
  };
}

export default async function EstadisticasPage() {
  const stats = await getDashboardStats();

  // Calcular promedio de descargas por publicación
  const promedioDescargas = stats.totalPublicaciones > 0 
    ? Math.round(stats.totalDescargas / stats.totalPublicaciones)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Estadísticas</h1>
      </div>

      {/* Cards de resumen */}
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
              Descargas Totales
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
              Descargas por Pub.
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promedioDescargas}</div>
            <p className="text-xs text-muted-foreground">
              Promedio por publicación
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

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <StatsChart
            data={stats.descargasPorMesData}
            type="line"
            title="Descargas por mes (últimos 6 meses)"
            dataKey="descargas"
            xAxisKey="month"
          />
        </Card>

        <Card className="p-4">
          <StatsChart
            data={stats.publicacionesPorTipoData}
            type="pie"
            title="Publicaciones por tipo"
            dataKey="value"
          />
        </Card>

        <Card className="p-4">
          <StatsChart
            data={stats.publicacionesPorAñoData}
            type="bar"
            title="Publicaciones por año"
            dataKey="publicaciones"
            xAxisKey="año"
          />
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Top Publicaciones</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Las 5 publicaciones más descargadas:
              </p>
              {/* Aquí iría una consulta para las publicaciones más descargadas */}
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">Publicación {i}</p>
                      <p className="text-sm text-muted-foreground">Tipo: Técnica</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{100 * i} descargas</p>
                      <p className="text-sm text-muted-foreground">2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}