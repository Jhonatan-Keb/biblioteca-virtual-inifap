"use client";

import { SearchFilters } from "@/components/publicaciones/search-filters";
import { PublicacionCard } from "@/components/publicaciones/publicacion-card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { usePublicaciones } from "@/hooks/use-publicaciones";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HomePage() {
  const {
    publicaciones,
    loading,
    error,
    pagination,
    search,
  } = usePublicaciones();

  const handleSearch = (filters: any) => {
    search(filters);
  };

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
        <SearchFilters onSearch={handleSearch} />
      </div>

      {/* Estado de carga o error */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Grid de publicaciones */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : publicaciones.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Mostrando {publicaciones.length} de {pagination.total} publicaciones
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicaciones.map((publicacion) => (
              <PublicacionCard
                key={publicacion.id}
                publicacion={publicacion}
              />
            ))}
          </div>

          {/* Paginación */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => search({
                    search: "",
                    tipo: "todos",
                    año: "todos",
                    sortBy: "reciente",
                    page: pagination.page - 1,
                  })}
                >
                  Anterior
                </Button>
                <div className="flex items-center px-4 text-sm">
                  Página {pagination.page} de {pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => search({
                    search: "",
                    tipo: "todos",
                    año: "todos",
                    sortBy: "reciente",
                    page: pagination.page + 1,
                  })}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No se encontraron publicaciones con los filtros seleccionados
          </div>
          <Button variant="outline" onClick={() => search({
            search: "",
            tipo: "todos",
            año: "todos",
            sortBy: "reciente",
            page: 1,
          })}>
            Mostrar todas las publicaciones
          </Button>
        </div>
      )}

      {/* Panel de administración */}
      <div className="mt-12 text-center border-t pt-8">
        <p className="text-muted-foreground mb-4">
          Para acceder al panel de administración:
        </p>
        <Button asChild variant="outline">
          <a href="/auth/login">Acceder como Administrador</a>
        </Button>
      </div>
    </div>
  );
}