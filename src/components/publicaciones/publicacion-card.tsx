import Link from "next/link";
import { FileText, Download, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Asumiendo que tienes shadcn, si no, usa un div con clases
import { Button } from "@/components/ui/button";

interface Publicacion {
    id: string | number;
  titulo: string;
  descripcion?: string | null;
  tipo: string;
  // CAMBIO AQUÍ: También hacemos flexible el año
  año?: string | number | null; 
  imagenUrl?: string | null;
  liga?: string | null;
}

interface Props {
  publicacion: Publicacion;
}

export const PublicacionCard = ({ publicacion }: Props) => {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {/* Encabezado: Tipo y Año */}
        <div className="flex justify-between items-start mb-4">
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 uppercase text-xs tracking-wider font-semibold">
            {publicacion.tipo}
          </Badge>
          {publicacion.año && (
            <span className="flex items-center text-xs text-gray-500 font-sans">
              <Calendar className="w-3 h-3 mr-1" />
              {publicacion.año}
            </span>
          )}
        </div>

        {/* Título */}
        <h3 className="font-title font-bold text-lg text-gray-800 mb-3 leading-snug group-hover:text-gob-red transition-colors">
          {publicacion.titulo}
        </h3>

        {/* Descripción (Truncada) */}
        <p className="text-gray-600 text-sm font-light leading-relaxed flex-grow line-clamp-3 mb-4">
          {publicacion.descripcion || "Sin descripción disponible."}
        </p>

        {/* Pie de tarjeta: Botones */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            {/* Botón Ver Detalles (Secundario) */}
            <Link href={`/publicaciones/${publicacion.id}`} className="flex-1">
                <Button variant="outline" className="w-full text-xs border-gob-gold text-gob-gold hover:bg-gob-gold hover:text-white">
                    <FileText className="w-3 h-3 mr-2" />
                    Detalles
                </Button>
            </Link>

            {/* Botón Descargar (Principal - Guinda) */}
            {publicacion.liga ? (
                <a href={publicacion.liga} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full text-xs bg-gob-red hover:bg-[#801D3D] text-white">
                        <Download className="w-3 h-3 mr-2" />
                        Descargar
                    </Button>
                </a>
            ) : (
                <Button disabled className="flex-1 text-xs opacity-50">
                    No disponible
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};