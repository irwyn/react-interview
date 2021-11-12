import XXH from 'xxhashjs';

export function hashToColor(str) {
  return `#${XXH.h32(str, 0xDEADBEEF).toString(16).substr(0, 6)}`;
}
