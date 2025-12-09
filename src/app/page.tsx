import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Biblioteca Virtual INIFAP</h1>
        <p className="text-muted-foreground">
          Publicaciones técnicas y científicas sobre agricultura en Zacatecas
        </p>
      </header>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por palabra..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Todos los años
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Todos los tipos
          </Button>
          <Button variant="ghost">
            Limpiar filtros
          </Button>
        </div>
      </div>

      {/* Grid de publicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Técnica
                </span>
                <span className="text-sm text-muted-foreground">2023</span>
              </div>
              <CardTitle className="text-lg mt-2">
                Título de la publicación técnica #{i}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Descripción breve de la publicación técnica con información relevante.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  <Download className="inline h-4 w-4 mr-1" />
                  150 descargas
                </span>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Panel de administración (solo visible si no hay publicaciones) */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Para acceder al panel de administración:
        </p>
        <Button asChild>
          <a href="/auth/login">Acceder como Administrador</a>
        </Button>
      </div>
    </div>
  );
}