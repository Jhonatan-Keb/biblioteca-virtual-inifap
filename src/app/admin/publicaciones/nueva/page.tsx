"use client";

import { PublicacionForm } from "@/components/admin/publicacion-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NuevaPublicacionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al crear publicación");
      }

      toast.success("Publicación creada exitosamente");
      router.push("/admin/publicaciones");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nueva Publicación</CardTitle>
          <p className="text-muted-foreground">
            Completa los datos para agregar una nueva publicación a la biblioteca
          </p>
        </CardHeader>
        <CardContent>
          <PublicacionForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
