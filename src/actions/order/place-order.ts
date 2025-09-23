'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrders = async (productIds: ProductToOrder[], address: Address) => {
    const session = await auth();
    const userId = session?.user.id;

    // Verificar sesión del usuario
    if(!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    // Obtener la informacion de los productos
    // Nota: podemos llevar mas de 2 productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    })

    // Calcular los montos // Encabezados
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    
    // Los totales de tax, subtotal, y total
    const { subtotal, tax, total } = productIds.reduce( (totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find( product => product.id === item.productId );

        if( !product ) throw new Error(`${ item.productId } no existe - 500`);

        const subTotal = product.price * productQuantity;

        totals.subtotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, { subtotal: 0, tax: 0, total: 0})

    // Crear la transaccion de base de datos
    const prismaTx = await prisma.$transaction( async (tx) => {
        
        // 1. Actualizar el stock de los productos

        // 2. Crear la ordern - Encabezado - Detalles
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subtotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data: productIds.map( p => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find( product => product.id === p.productId)?.price ?? 0
                        }))
                    }
                }
            }
        })

        // 3. Crear la direccion de la orden
        // Address
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                firstName: restAddress.firstName,             
                lastName: restAddress.lastName, 
                address: restAddress.address,
                address2: restAddress.address2,
                postalCode: restAddress.postalCode,
                city: restAddress.city,
                phone: restAddress.phone,
                
                countryId: country,
                orderId: order.id
            }
        })

        return {
            orden: order,
            updateProducts: [],
            orderAddress: orderAddress
        }
    })
}