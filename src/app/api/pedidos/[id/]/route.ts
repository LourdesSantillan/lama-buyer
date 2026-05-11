import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const comprador = await prisma.comprador.findUnique({
      where: { clerkUserId: userId },
    });

    if (!comprador) {
      return NextResponse.json(
        { error: 'Comprador no encontrado' },
        { status: 404 }
      );
    }

    const pedido = await prisma.pedido.findFirst({
      where: {
        id: params.id,
        compradorId: comprador.id,
      },
      include: {
        items: {
          include: {
            producto: true,
          },
        },
        estadoEnvio: true,
      },
    });

    if (!pedido) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido);
  } catch (error) {
    console.error('Error fetching pedido:', error);
    return NextResponse.json(
      { error: 'Error fetching pedido' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { estado } = body;

    if (!estado) {
      return NextResponse.json(
        { error: 'Estado requerido' },
        { status: 400 }
      );
    }

    const pedidoActual = await prisma.pedido.findUnique({
      where: { id: params.id },
    });

    if (!pedidoActual) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      );
    }

    const pedidoActualizado = await prisma.pedido.update({
      where: { id: params.id },
      data: { estado },
      include: {
        items: {
          include: {
            producto: true,
          },
        },
        estadoEnvio: true,
      },
    });

    return NextResponse.json(pedidoActualizado);
  } catch (error) {
    console.error('Error updating pedido:', error);
    return NextResponse.json(
      { error: 'Error updating pedido' },
      { status: 500 }
    );
  }
}
