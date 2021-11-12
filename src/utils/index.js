import XXH from 'xxhashjs';

export function hashToColor(str) {
  return `#${XXH.h32(`8771eff12f09${str}6b4636964da813f867b65a58`, 0xDEADBEEF).toString(16).substr(0, 6)}`;
}
