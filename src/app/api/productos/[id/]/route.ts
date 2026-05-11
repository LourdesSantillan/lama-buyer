import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
    });

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.error('Error fetching producto:', error);
    return NextResponse.json(
      { error: 'Error fetching producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { titulo, descripcion, precio, imagenUrl, categoria, talle, marca, estado, stock } = body;

    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
    });

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    const actualizado = await prisma.producto.update({
      where: { id: params.id },
      data: {
        ...(titulo && { titulo }),
        ...(descripcion !== undefined && { descripcion }),
        ...(precio && { precio: parseFloat(precio) }),
        ...(imagenUrl && { imagenUrl }),
        ...(categoria && { categoria }),
        ...(talle && { talle }),
        ...(marca && { marca }),
        ...(estado && { estado }),
        ...(stock !== undefined && { stock }),
      },
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('Error updating producto:', error);
    return NextResponse.json(
      { error: 'Error updating producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
    });

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    await prisma.producto.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error deleting producto:', error);
    return NextResponse.json(
      { error: 'Error deleting producto' },
      { status: 500 }
    );
  }
}
