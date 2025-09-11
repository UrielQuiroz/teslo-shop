'use client'

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";


interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {
    const [size, setSize] = useState<Size|undefined>()
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        console.log({ size, quantity })
    }

  return (
    <>
      {/* SELECTOR DE TALLAS */}
      <SizeSelector
        slectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* SELECTOR DE CANTIDADA */}
      <QuantitySelector 
        quantity={quantity}
        onQuantityChanged={ setQuantity } />

      {/* BOTON */}
      <button
        onClick={addToCart} 
        className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};
