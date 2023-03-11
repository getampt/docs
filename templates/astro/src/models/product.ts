import { data } from '@ampt/data'

export interface Product {
  id: string
  name: string
  price: number
  image: string
}

export async function getProducts(): Promise<Product[]> {
  const result = await data.get<Product>('products:*')
  if ('items' in result) {
    return result.items.map((item) => item.value)
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await data.get(`products:${id}`)) as Product
}
