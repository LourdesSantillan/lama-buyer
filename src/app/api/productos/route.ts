import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const categoria = searchParams.get('categoria') || '';
    const talle = searchParams.get('talle') || '';
    const precioMin = parseFloat(searchParams.get('precioMin') || '0');
    const precioMax = parseFloat(searchParams.get('precioMax') || '10000');

    const skip = (page - 1) * limit;

    const where: any = {
      AND: [],
    };

    if (search) {
      where.AND.push({
        OR: [
          { titulo: { contains: search, mode: 'insensitive' } },
          { descripcion: { contains: search, mode: 'insensitive' } },
          { marca: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    if (categoria) {
      where.AND.push({ categoria });
    }

    if (talle) {
      where.AND.push({ talle });
    }

    where.AND.push({
      precio: {
        gte: precioMin,
        lte: precioMax,
      },
    });

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where: where.AND.length > 0 ? where : undefined,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.producto.count({
        where: where.AND.length > 0 ? where : undefined,
      }),
    ]);

    return NextResponse.json({
      productos,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching productos:', error);
    return NextResponse.json(
      { error: 'Error fetching productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, descripcion, precio, imagenUrl, categoria, talle, marca, estado, stock, vendedorId } = body;

    if (!titulo || !precio || !categoria || !talle || !marca) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const producto = await prisma.producto.create({
      data: {
        titulo,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        imagenUrl: imagenUrl || '',
        categoria,
        talle,
        marca,
        estado: estado || 'buen estado',
        stock: stock || 1,
        vendedorId: vendedorId || 'admin',
      },
    });

    return NextResponse.json(producto, { status: 201 });
  } catch (error) {
    console.error('Error creating producto:', error);
    return NextResponse.json(
      { error: 'Error creating producto' },
      { status: 500 }
    );
  }
}
