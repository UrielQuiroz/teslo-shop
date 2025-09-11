export const revalidate = 604800;
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions";
import { QuantitySelector, SizeSelector, SlideShowProduct, SlideShowProductMobile, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";


interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await getProductBySlug(slug)
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [
        `/products/${ product?.images[1] }`
      ]
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {
  
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if(!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* SLIDESHOW */}
      <div className="col-span-1 md:col-span-2">

        {/* MOBILE */}
        <SlideShowProductMobile
          title={product.title}
          images={product.images}
          className="block md:hidden"/>

        {/* DESKTOP */}
        <SlideShowProduct
          title={product.title}
          images={product.images}
          className="hidden md:block"/>
      </div>

      {/* DETALLES */}
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug}/>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>

        <p className="text-lg mb-5">{product.price}</p>

        {/* SELECTOR DE TALLAS */}
        <SizeSelector
          slectedSize={product.sizes[0]}
          availableSizes={product.sizes}/>

        {/* SELECTOR DE CANTIDADA */}
        <QuantitySelector
          quantity={2}/>

        {/* BOTON */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* DESCRIPCION */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
} 