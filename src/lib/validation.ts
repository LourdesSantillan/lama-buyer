import { z } from 'zod';

export const compradorSchema = z.object({
  nombreComprador: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  dni: z.string().optional(),
  telefono: z.string().optional(),
  direccionEnvio: z.string().min(5, 'Dirección muy corta'),
});

export const preferenciaSchema = z.object({
  tallesPreferidos: z.array(z.string()).optional(),
  categoriasPreferidas: z.array(z.string()).optional(),
  vendedoresPreferidos: z.array(z.string()).optional(),
});

export const itemCarritoSchema = z.object({
  productoId: z.string(),
  cantidad: z.number().min(1, 'Cantidad mínima es 1').max(100),
});

export const actualizarItemCarritoSchema = z.object({
  cantidad: z.number().min(1, 'Cantidad mínima es 1').max(100),
});

export const crearPedidoSchema = z.object({
  direccionEnvio: z.string().min(5, 'Dirección muy corta'),
  metodoPago: z.string(),
});

export type CompradorInput = z.infer<typeof compradorSchema>;
export type PreferenciaInput = z.infer<typeof preferenciaSchema>;
export type ItemCarritoInput = z.infer<typeof itemCarritoSchema>;
export type ActualizarItemCarritoInput = z.infer<typeof actualizarItemCarritoSchema>;
export type CrearPedidoInput = z.infer<typeof crearPedidoSchema>;
