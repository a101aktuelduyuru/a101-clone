import { supabase } from './client'
import {
  Product,
  gurmeProducts as fallbackGurme,
  herSeydenOnceSenProducts as fallbackHerSeydenOnceSen,
  flyers as fallbackFlyers,
} from '@/lib/site-data'

export type FlyerItem = {
  image: string
  date: string
  title: string
  tag: string
}

// Ürünleri kategoriye göre çeken fonksiyon (Supabase bağlı değilse fallback mock veriyi döner)
export async function getProductsByCategory(category: 'gurme' | 'hsos'): Promise<Product[]> {
  if (!supabase) {
    return category === 'gurme' ? fallbackGurme : fallbackHerSeydenOnceSen
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: true })

    if (error || !data || data.length === 0) {
      return category === 'gurme' ? fallbackGurme : fallbackHerSeydenOnceSen
    }

    return (data as any[]).map((item: any) => ({
      name: item.name,
      size: item.size,
      image: item.image,
      price: item.price,
      oldPrice: item.old_price || undefined,
    }))
  } catch (err) {
    console.error('Error fetching products from Supabase:', err)
    return category === 'gurme' ? fallbackGurme : fallbackHerSeydenOnceSen
  }
}

// Afişleri çeken fonksiyon
export async function getFlyers(): Promise<FlyerItem[]> {
  if (!supabase) {
    return fallbackFlyers
  }

  try {
    const { data, error } = await supabase
      .from('flyers')
      .select('*')
      .order('id', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackFlyers
    }

    return (data as any[]).map((item: any) => ({
      image: item.image,
      date: item.date,
      title: item.title,
      tag: item.tag,
    }))
  } catch (err) {
    console.error('Error fetching flyers from Supabase:', err)
    return fallbackFlyers
  }
}
