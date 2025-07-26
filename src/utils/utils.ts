export async function convertUrlToFile(
  url: string,
  fileName?: string,
  type?: string
) {
  const response = await fetch(url);
  const result = await response.blob();
  const metadata = { type: type ?? "audio/mpeg" };
  const file = new File([result], fileName ?? "Audio File", metadata);

  return file;
}

export const AUDIO_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/mpeg",
];

export function isSupportedAudioType(audioType: string) {
  return AUDIO_TYPES.some((type) => type === audioType);
}
