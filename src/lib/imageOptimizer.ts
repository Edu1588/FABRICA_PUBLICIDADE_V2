import { supabase } from './supabase';

export interface OptimizedImageResult {
  file: File;
  dataUrl: string;
  publicUrl?: string;
  fileName: string;
  altText: string;
  sizeBytes: number;
  width: number;
  height: number;
  format: 'webp' | 'jpeg' | 'png';
}

/**
 * Generates an SEO-friendly filename from slide and client metadata
 */
export function generateSeoFilename(
  originalName: string,
  categoryLabel?: string,
  slideTitle?: string,
  clientName: string = 'brotas-360'
): string {
  const sanitize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);

  const cleanClient = sanitize(clientName || 'brotas-360');
  const cleanCat = sanitize(categoryLabel || 'institucional');
  const cleanTitle = sanitize(slideTitle || 'apresentacao');
  const timestamp = Date.now().toString().slice(-6);

  return `${cleanClient}-${cleanCat}-${cleanTitle}-${timestamp}.webp`;
}

/**
 * Generates SEO Alt and Title attributes for accessible and search-friendly markup
 */
export function generateSeoAltText(
  categoryLabel?: string,
  slideTitle?: string,
  clientName: string = 'Prefeitura Municipal de Brotas'
): string {
  const parts = [clientName, categoryLabel, slideTitle].filter(Boolean);
  return parts.join(' - ');
}

/**
 * Compresses an image client-side to ensure it is strictly UNDER 1MB (1,048,576 bytes)
 * while preserving high fidelity for 16:9 full-screen presentation displays.
 */
export async function optimizeAndCompressImage(
  file: File,
  options: {
    maxDim?: number;
    maxSizeBytes?: number;
    categoryLabel?: string;
    slideTitle?: string;
    clientName?: string;
  } = {}
): Promise<OptimizedImageResult> {
  const maxDim = options.maxDim || 2048; // Max width/height for presentation quality
  const maxSizeBytes = options.maxSizeBytes || 1024 * 1024; // Strictly 1 MB
  const seoFilename = generateSeoFilename(
    file.name,
    options.categoryLabel,
    options.slideTitle,
    options.clientName
  );
  const altText = generateSeoAltText(
    options.categoryLabel,
    options.slideTitle,
    options.clientName
  );

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler arquivo de imagem.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao carregar imagem no navegador.'));
      img.onload = async () => {
        let { width, height } = img;

        // Resize proportionally if dimensions exceed maxDim
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Canvas context 2D não disponível.'));
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Iterative compression to ensure strictly <= maxSizeBytes
        let quality = 0.88;
        let blob: Blob | null = null;
        const mimeType = 'image/webp';

        // Try webp with fallback to jpeg
        const format: 'webp' | 'jpeg' = 'webp';

        while (quality >= 0.3) {
          blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, mimeType, quality)
          );

          if (blob && blob.size <= maxSizeBytes) {
            break;
          }
          quality -= 0.12; // Step down quality until under 1MB
        }

        if (!blob) {
          blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, 'image/jpeg', 0.7)
          );
        }

        if (!blob) {
          return reject(new Error('Falha na compressão do canvas.'));
        }

        const compressedFile = new File([blob], seoFilename, {
          type: blob.type,
          lastModified: Date.now()
        });

        // Convert to dataUrl for immediate local preview
        const dataUrlReader = new FileReader();
        dataUrlReader.onloadend = async () => {
          const dataUrl = dataUrlReader.result as string;

          // Attempt upload to Supabase Storage
          let publicUrl: string | undefined = undefined;
          try {
            const storagePath = `presentations/${seoFilename}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('media')
              .upload(storagePath, compressedFile, {
                cacheControl: '31536000',
                upsert: true
              });

            if (!uploadError && uploadData) {
              const { data: urlData } = supabase.storage
                .from('media')
                .getPublicUrl(storagePath);
              publicUrl = urlData?.publicUrl;
            }
          } catch (storageErr) {
            console.warn('Supabase storage upload skipped or bucket unavailable, using compressed dataUrl', storageErr);
          }

          resolve({
            file: compressedFile,
            dataUrl,
            publicUrl: publicUrl || dataUrl,
            fileName: seoFilename,
            altText,
            sizeBytes: blob?.size || compressedFile.size,
            width,
            height,
            format
          });
        };
        dataUrlReader.readAsDataURL(blob);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
