export function removeColorsFromString(text) {
  // Removing minecraft colors from strings, because console can`t read it and it will look crazy.
  return text.replace(/§a|§b|§c|§d|§e|§1|§2|§3|§4|§5|§6|§7|§8|§9|§k|§l|§m|§n|§o|§f|§r/g, '')
}

export function getRandomUsername(prefix?: string): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const length = Math.floor(Math.random() * 6) + 5 // Random length between 5 and 10
  return `${prefix || ''}${Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')}`
}
