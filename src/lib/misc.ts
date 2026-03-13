export function normalizeText(name: string) {
  if (!name?.trim()) return '';
  let baseName = name.replace(/_/g, ' ');
  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}