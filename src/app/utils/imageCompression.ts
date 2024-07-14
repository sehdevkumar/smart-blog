/* eslint-disable @typescript-eslint/no-unsafe-argument */
import imageCompression from "browser-image-compression";

/**
 * Convert ArrayBuffer to Base64 string.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @returns {string} - The Base64 encoded string.
 */
function arrayBufferToBase64(buffer: Iterable<number> | ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer as ArrayBufferLike);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  return window.btoa(binary);
}

/**
 * Compress an image file and convert it to a Base64 string with MIME type prefix.
 * @param {File} file - The image file to compress and convert.
 * @returns {Promise<string>} - A promise that resolves to the Base64 encoded string with MIME type prefix.
 */
export async function compressAndConvertToBase64(file) {
  try {
    // Compress the image
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 800, // Maximum width or height in pixels
      useWebWorker: true, // Use web worker for performance
    };
    const compressedFile = await imageCompression(file, options);

    // Convert compressed image to ArrayBuffer
    const arrayBuffer = await compressedFile?.arrayBuffer();

    // Convert ArrayBuffer to Base64
    const base64String = arrayBufferToBase64(arrayBuffer);

    // Get MIME type from file type
    const mimeType = file.type;

    // Return Base64 string with MIME type prefix
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error("Error during compression and conversion:", error);
    throw error;
  }
}
