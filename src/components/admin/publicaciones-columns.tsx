"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export type Publicacion = {
  id: number;
  titulo: string;
  tipo: string;
  año: string;
  cuenta: number;
  muestra: boolean;
  liga: string | null;
  descripcion: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<Publicacion>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titulo",
    header: "Título",
    cell: ({ row }) => {
      const titulo = row.getValue("titulo") as string;
      return (
        <div className="font-medium max-w-xs truncate" title={titulo}>
          {titulo}
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;
      return (
        <Badge
          variant={tipo === "tecnica" ? "default" : "secondary"}
          className="capitalize"
        >
          {tipo}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "año",
    header: "Año",
  },
  {
    accessorKey: "cuenta",
    header: "Descargas",
    cell: ({ row }) => {
      const cuenta = row.getValue("cuenta") as number;
      return <span className="font-medium">{cuenta}</span>;
    },
  },
  {
    accessorKey: "muestra",
    header: "Visible",
    cell: ({ row }) => {
      const muestra = row.getValue("muestra") as boolean;
      return (
        <Badge variant={muestra ? "default" : "destructive"}>
          {muestra ? "Sí" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("createdAt"));
      return fecha.toLocaleDateString("es-ES");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const publicacion = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            {publicacion.liga && (
              <DropdownMenuItem asChild>
                <a
                  href={`/uploads/${publicacion.liga}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center cursor-pointer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link
                href={`/publicaciones/${publicacion.id}`}
                className="flex items-center cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/publicaciones/${publicacion.id}/editar`}
                className="flex items-center cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
