// color values taken from http://minecraft.gamepedia.com/Formatting_codes
export interface ColorMap {
  black: string
  dark_blue: string
  dark_green: string
  dark_aqua: string
  dark_red: string
  dark_purple: string
  gold: string
  gray: string
  dark_gray: string
  blue: string
  green: string
  aqua: string
  red: string
  light_purple: string
  yellow: string
  white: string
}

const defaultColormap: ColorMap = {
  black: '#000',
  dark_blue: '#0000aa',
  dark_green: '#00aa00',
  dark_aqua: '#00aaaa',
  dark_red: '#aa0000',
  dark_purple: '#aa00aa',
  gold: '#ffaa00',
  gray: '#aaa',
  dark_gray: '#555',
  blue: '#5555ff',
  green: '#55ff55',
  aqua: '#55ffff',
  red: '#ff5555',
  light_purple: '#ff55ff',
  yellow: '#ffff55',
  white: '#fff'
}

export default defaultColormap
