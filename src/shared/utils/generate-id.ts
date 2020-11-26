export function generateId() {
  const part1 = Date.now().toString(34);
  const part2 = Math.random().toString(34).replace('0.', '');
  const merged = `${part1}${part2}`;
  return merged.substring(merged.length - 13, merged.length - 1).toUpperCase();
}
