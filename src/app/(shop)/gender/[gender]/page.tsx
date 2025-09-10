export const revalidate = 60 //60 segundos


import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function ({ params, searchParams }: Props ) {

  const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
  
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
      page, 
      gender: gender as Gender
    });
  
    if(products.length === 0) {
      redirect(`/gender/${gender}`)
    }
  

  // if(id === 'kid' ){
  //   notFound();
  // }

  const labels: Record<string, string> = {
    'men': 'hombres',
    'women': 'mujeres',
    'kid': 'niños',
    'unisex': 'Todos'
  }

  return (
    <>
      <Title
        title={`Articulos para ${labels[gender]}`}
        subtitle={`Todos los productos`}
        className="mb-5"/>

      <ProductGrid
        products={products}/>

      <Pagination
        totalPages={totalPages}/>
    </>
  );
}