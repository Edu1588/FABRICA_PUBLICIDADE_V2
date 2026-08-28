import { supabase } from './supabase';
import { BrotasSlideData } from '../data/brotasSlidesData';

export interface PresentationMeta {
  id: string;
  name: string;
  slug: string;
  clientName: string;
  slideCount: number;
  updatedAt: string;
  customData?: any;
}

const DEFAULT_PRESENTATIONS: PresentationMeta[] = [
  {
    id: 'brotas-360',
    name: 'Brotas 360° — Sistema Integrado de Comunicação',
    slug: 'apresentacao-brotas',
    clientName: 'Prefeitura Municipal de Brotas',
    slideCount: 39,
    updatedAt: new Date().toLocaleDateString('pt-BR')
  },
  {
    id: 'fabrica-azul',
    name: 'Fábrica Azul — Apresentação Institucional',
    slug: 'apresentacao-azul',
    clientName: 'Azul Veículos',
    slideCount: 20,
    updatedAt: new Date().toLocaleDateString('pt-BR')
  }
];

/**
 * Loads the list of presentations from Supabase database with localStorage fallback
 */
export async function fetchPresentationsList(): Promise<PresentationMeta[]> {
  try {
    // 1. Try Supabase presentations table or clients metadata
    const { data, error } = await supabase
      .from('presentations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const parsed: PresentationMeta[] = data.map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        clientName: row.client_name || row.clientName,
        slideCount: row.slide_count || row.slideCount || 1,
        updatedAt: row.updated_at ? new Date(row.updated_at).toLocaleDateString('pt-BR') : row.updatedAt
      }));
      localStorage.setItem('fabrica_presentations_list_v2', JSON.stringify(parsed));
      return parsed;
    }
  } catch (err) {
    console.warn('Supabase fetchPresentationsList table check error, using cached storage:', err);
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem('fabrica_presentations_list_v2') || localStorage.getItem('fabrica_presentations_list');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('localStorage error', e);
  }

  return DEFAULT_PRESENTATIONS;
}

/**
 * Saves the presentation list to Supabase database and localStorage
 */
export async function syncPresentationsList(list: PresentationMeta[]): Promise<boolean> {
  // 1. Always update localStorage
  try {
    localStorage.setItem('fabrica_presentations_list_v2', JSON.stringify(list));
  } catch (e) {
    console.warn('localStorage save error', e);
  }

  // 2. Upsert to Supabase
  try {
    const rows = list.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      client_name: item.clientName,
      slide_count: item.slideCount,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('presentations').upsert(rows);
    if (error) {
      console.warn('Supabase presentations upsert notice (table may need creation):', error.message);
    }
    return !error;
  } catch (err) {
    console.warn('Supabase syncPresentationsList error:', err);
    return false;
  }
}

/**
 * Loads slide data for a specific presentation from Supabase database or cache
 */
export async function fetchPresentationSlides(
  presentationId: string,
  fallbackSlides: BrotasSlideData[]
): Promise<{ slides: BrotasSlideData[]; images: Record<string, string> }> {
  let loadedSlides: BrotasSlideData[] = fallbackSlides;
  let loadedImages: Record<string, string> = {};

  // 1. Try Supabase database first
  try {
    const { data, error } = await supabase
      .from('presentation_slides')
      .select('*')
      .eq('presentation_id', presentationId)
      .maybeSingle();

    if (!error && data) {
      if (data.slides_payload) {
        const parsed = typeof data.slides_payload === 'string' ? JSON.parse(data.slides_payload) : data.slides_payload;
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedSlides = parsed;
        }
      }
      if (data.images_payload) {
        const parsedImgs = typeof data.images_payload === 'string' ? JSON.parse(data.images_payload) : data.images_payload;
        if (parsedImgs && typeof parsedImgs === 'object') {
          loadedImages = parsedImgs;
        }
      }
      // Update local cache with remote source of truth
      try {
        localStorage.setItem(`pres_slides_${presentationId}`, JSON.stringify(loadedSlides));
        localStorage.setItem(`pres_images_${presentationId}`, JSON.stringify(loadedImages));
      } catch (cacheErr) {
        console.warn('LocalStorage quota limit reached for presentation cache:', cacheErr);
      }
      return { slides: loadedSlides, images: loadedImages };
    }
  } catch (err) {
    console.warn('Supabase fetchPresentationSlides notice:', err);
  }

  // 2. Fallback to localStorage
  try {
    const cachedSlides = localStorage.getItem(`pres_slides_${presentationId}`) || localStorage.getItem('brotas360_custom_slides_v2');
    if (cachedSlides) {
      const parsed = JSON.parse(cachedSlides);
      if (Array.isArray(parsed) && parsed.length > 0) {
        loadedSlides = parsed;
      }
    }

    const cachedImages = localStorage.getItem(`pres_images_${presentationId}`) || localStorage.getItem('brotas360_images');
    if (cachedImages) {
      loadedImages = JSON.parse(cachedImages);
    }
  } catch (e) {
    console.warn('localStorage read error', e);
  }

  return { slides: loadedSlides, images: loadedImages };
}

/**
 * Saves presentation slides and image mappings to Supabase database and local storage
 */
export async function syncPresentationSlides(
  presentationId: string,
  slides: BrotasSlideData[],
  images: Record<string, string> = {}
): Promise<boolean> {
  // 1. Save to local storage for instant access
  try {
    localStorage.setItem(`pres_slides_${presentationId}`, JSON.stringify(slides));
    localStorage.setItem('brotas360_custom_slides_v2', JSON.stringify(slides));
    localStorage.setItem(`pres_images_${presentationId}`, JSON.stringify(images));
    localStorage.setItem('brotas360_images', JSON.stringify(images));
  } catch (e) {
    console.warn('localStorage cache save notice (safe to continue):', e);
  }

  // 2. Sync to Supabase database
  try {
    const payload = {
      presentation_id: presentationId,
      slides_payload: slides,
      images_payload: images,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('presentation_slides')
      .upsert(payload, { onConflict: 'presentation_id' });

    if (error) {
      console.error('Supabase presentation_slides upsert error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase syncPresentationSlides network error:', err);
    return false;
  }
}
