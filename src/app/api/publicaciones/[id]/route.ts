import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";

// Obtener publicación por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const publicacion = await prisma.publicacion.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    if (!publicacion) {
      return NextResponse.json(
        ApiResponse.error("Publicación no encontrada"),
        { status: 404 }
      );
    }

    // Incrementar contador de visualizaciones
    await prisma.publicacion.update({
      where: { id },
      data: { cuenta: { increment: 1 } },
    });

    return NextResponse.json(ApiResponse.success(publicacion));
  } catch (error) {
    console.error("Error fetching publication:", error);
    return NextResponse.json(
      ApiResponse.error("Error al obtener publicación"),
      { status: 500 }
    );
  }
}

// Actualizar publicación
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        ApiResponse.error("No autorizado"),
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    const data = await request.json();

    const publicacion = await prisma.publicacion.update({
      where: { id },
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      ApiResponse.success(publicacion, "Publicación actualizada exitosamente")
    );
  } catch (error) {
    console.error("Error updating publication:", error);
    return NextResponse.json(
      ApiResponse.error("Error al actualizar publicación"),
      { status: 500 }
    );
  }
}

// Eliminar publicación
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        ApiResponse.error("No autorizado"),
        { status: 401 }
      );
    }

    const id = parseInt(params.id);

    await prisma.publicacion.delete({
      where: { id },
    });

    return NextResponse.json(
      ApiResponse.success(null, "Publicación eliminada exitosamente")
    );
  } catch (error) {
    console.error("Error deleting publication:", error);
    return NextResponse.json(
      ApiResponse.error("Error al eliminar publicación"),
      { status: 500 }
    );
  }
}
