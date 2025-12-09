import { columns } from "@/components/admin/publicaciones-columns";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getPublicaciones() {
  const publicaciones = await prisma.publicacion.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return publicaciones;
}

export default async function PublicacionesPage() {
  const publicaciones = await getPublicaciones();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Publicaciones</h1>
          <p className="text-muted-foreground">
            Gestiona todas las publicaciones técnicas y científicas
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/publicaciones/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Publicación
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 bg-card rounded-lg border p-4">
          <DataTable columns={columns} data={publicaciones} />
        </div>
      </div>
    </div>
  );
}
