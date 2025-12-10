"use client";

import { useState, useEffect } from "react";
import { SearchFilters } from "@/components/publicaciones/search-filters";

export interface Publicacion {
  id: number;
  titulo: string;
  tipo: string;
  año: string | null;
  descripcion: string | null;
  cuenta: number;
  imagenUrl: string | null;
  liga: string | null;
  muestra: boolean;
  createdAt: string;
}

interface UsePublicacionesReturn {
  publicaciones: Publicacion[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
  };
  search: (filters: SearchFilters) => void;
}

export function usePublicaciones(initialFilters?: SearchFilters): UsePublicacionesReturn {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 12,
  });
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      search: "",
      tipo: "todos",
      año: "todos",
      sortBy: "reciente",
      page: 1,
    }
  );

  const fetchPublicaciones = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.tipo !== "todos") params.append("tipo", filters.tipo);
      if (filters.año !== "todos") params.append("año", filters.año);
      params.append("page", filters.page.toString());
      params.append("limit", pagination.limit.toString());
      params.append("sortBy", filters.sortBy);

      const response = await fetch(`/api/publicaciones?${params}`);
      
      if (!response.ok) {
        throw new Error("Error al cargar publicaciones");
      }

      const data = await response.json();
      
      if (data.success) {
        setPublicaciones(data.data.publicaciones);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error fetching publicaciones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicaciones(filters);
  }, [filters]);

  const search = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return {
    publicaciones,
    loading,
    error,
    pagination,
    search,
  };
}