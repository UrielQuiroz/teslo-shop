import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  }
}

const products = initialData.products;

export default function ({ params }: Props ) {

  const { id } = params;

  // if(id === 'kid' ){
  //   notFound();
  // }

  const labels: Record<Category, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'Todos'
  }

  return (
    <>
      <Title
        title={`Articulos para ${labels[id]}`}
        subtitle={`Todos los productos`}
        className="mb-5"/>

      <ProductGrid
        products={products.filter(x => x.gender == id)}/>
    </>
  );
}