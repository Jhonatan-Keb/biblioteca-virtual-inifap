"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar, FileText } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export interface SearchFilters {
  search: string;
  tipo: string;
  año: string;
  sortBy: "reciente" | "antiguo" | "descargas";
  page: number;
}

export function SearchFilters({ onSearch, initialFilters }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.search || "");
  const [tipo, setTipo] = useState(initialFilters?.tipo || "todos");
  const [año, setAño] = useState(initialFilters?.año || "todos");
  const [sortBy, setSortBy] = useState<"reciente" | "antiguo" | "descargas">(
    initialFilters?.sortBy || "reciente"
  );

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Generar años desde 2000 hasta el actual
  const años = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => (2000 + i).toString()
  ).reverse();

  // Tipos de publicaciones
  const tipos = [
    { value: "todos", label: "Todos los tipos" },
    { value: "tecnica", label: "Publicaciones Técnicas" },
    { value: "cientifica", label: "Publicaciones Científicas" },
    { value: "video", label: "Videos" },
    { value: "folleto", label: "Folletos" },
    { value: "desplegable", label: "Desplegables" },
    { value: "libro", label: "Libros Técnicos" },
  ];

  // Efecto para disparar búsqueda cuando cambian los filtros
  useEffect(() => {
    onSearch({
      search: debouncedSearch,
      tipo,
      año,
      sortBy,
      page: 1,
    });
  }, [debouncedSearch, tipo, año, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setTipo("todos");
    setAño("todos");
    setSortBy("reciente");
  };

  const hasActiveFilters = 
    searchTerm || 
    tipo !== "todos" || 
    año !== "todos" || 
    sortBy !== "reciente";

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por título, descripción, año..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <SelectValue placeholder="Tipo de publicación" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {tipos.map((tipoItem) => (
                <SelectItem key={tipoItem.value} value={tipoItem.value}>
                  {tipoItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={año} onValueChange={setAño}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Año" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los años</SelectItem>
              {años.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Ordenar por" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reciente">Más reciente</SelectItem>
              <SelectItem value="antiguo">Más antiguo</SelectItem>
              <SelectItem value="descargas">Más descargadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="md:w-auto">
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Badges de filtros activos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Buscar: "{searchTerm}"
              <button onClick={() => setSearchTerm("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {tipo !== "todos" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Tipo: {tipos.find(t => t.value === tipo)?.label}
              <button onClick={() => setTipo("todos")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {año !== "todos" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Año: {año}
              <button onClick={() => setAño("todos")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {sortBy !== "reciente" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Orden: {
                sortBy === "antiguo" ? "Más antiguo" : "Más descargadas"
              }
              <button onClick={() => setSortBy("reciente")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}