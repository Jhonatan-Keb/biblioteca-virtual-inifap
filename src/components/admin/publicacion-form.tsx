"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicacionSchema } from "@/schemas/publicacion-schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

type PublicacionFormValues = z.infer<typeof publicacionSchema>;

interface PublicacionFormProps {
  initialData?: Partial<PublicacionFormValues>;
  onSubmit: (data: PublicacionFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function PublicacionForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PublicacionFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PublicacionFormValues>({
    resolver: zodResolver(publicacionSchema),
    defaultValues: {
      titulo: initialData?.titulo || "",
      tipo: initialData?.tipo || "tecnica",
      año: initialData?.año || new Date().getFullYear().toString(),
      descripcion: initialData?.descripcion || "",
      imagenUrl: initialData?.imagenUrl || "",
      archivoUrl: initialData?.archivoUrl || "",
      liga: initialData?.liga || "",
      mensaje: initialData?.mensaje || "",
      publicacionot: initialData?.publicacionot || "",
      cuenta: initialData?.cuenta || 0,
      muestra: initialData?.muestra ?? true,
    },
  });

  const handleFileUpload = async (file: File, field: "archivoUrl" | "imagenUrl") => {
    setIsUploading(true);

    // Aquí implementarías la lógica de upload real
    // Por ahora, simulamos un delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fakeUrl = `/uploads/${field}/${file.name}`;
    form.setValue(field, fakeUrl);

    setIsUploading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Título *</FormLabel>
                <FormControl>
                  <Input placeholder="Título de la publicación" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tecnica">Publicación Técnica</SelectItem>
                    <SelectItem value="cientifica">Publicación Científica</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="folleto">Folleto</SelectItem>
                    <SelectItem value="desplegable">Desplegable</SelectItem>
                    <SelectItem value="libro">Libro Técnico</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="año"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año *</FormLabel>
                <FormControl>
                  <Input placeholder="2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción breve de la publicación"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Archivos</h3>

            <FormField
              control={form.control}
              name="archivoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivo PDF</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="URL del archivo PDF"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('pdf-upload')?.click()}
                        disabled={isUploading}
                      >
                        Subir
                      </Button>
                      <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "archivoUrl");
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Sube el archivo PDF de la publicación
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imagenUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de portada</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="URL de la imagen"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={isUploading}
                      >
                        Subir
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "imagenUrl");
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Imagen que se mostrará en la lista
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace alternativo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Enlace externo si no hay archivo PDF
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Configuración</h3>

            <FormField
              control={form.control}
              name="cuenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contador de descargas</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Número inicial de descargas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="muestra"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mostrar públicamente</FormLabel>
                    <FormDescription>
                      La publicación será visible en el sitio público
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? "Guardando..." : "Guardar Publicación"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
