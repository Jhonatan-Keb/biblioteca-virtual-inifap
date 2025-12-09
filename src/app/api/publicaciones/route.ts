import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parámetros de filtro
    const tipo = searchParams.get("tipo");
    const año = searchParams.get("año");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const muestra = searchParams.get("muestra");

    const skip = (page - 1) * limit;

    // Construir condiciones de filtro
    const where: any = {};

    if (tipo && tipo !== "todos") {
      where.tipo = tipo;
    }

    if (año && año !== "todos") {
      where.año = año;
    }

    if (search) {
      where.OR = [
        { titulo: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (muestra !== null) {
      where.muestra = muestra === "true";
    }

    // Obtener publicaciones con paginación
    const [publicaciones, total] = await Promise.all([
      prisma.publicacion.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      }),
      prisma.publicacion.count({ where }),
    ]);

    return NextResponse.json(
      ApiResponse.success({
        publicaciones,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      })
    );
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      ApiResponse.error("Error al obtener publicaciones"),
      { status: 500 }
    );
  }
}

  export async function POST(request: Request) {
    try {
      const session = await getServerSession(authOptions);

      if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
          ApiResponse.error("No autorizado"),
          { status: 401 }
        );
      }

      const data = await request.json();

      // Validar datos requeridos
      if (!data.titulo || !data.tipo) {
        return NextResponse.json(
          ApiResponse.error("Título y tipo son requeridos"),
          { status: 400 }
        );
      }

      // Crear la publicación
      const publicacion = await prisma.publicacion.create({
        data: {
          ...data,
          userId: session.user.id,
        },
      });

      return NextResponse.json(
        ApiResponse.success(publicacion, "Publicación creada exitosamente")
      );
    } catch (error) {
      console.error("Error creating publication:", error);
      return NextResponse.json(
        ApiResponse.error("Error al crear publicación"),
        { status: 500 }
      );
    }
  }

