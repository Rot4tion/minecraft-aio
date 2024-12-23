import React from 'react'
import ObfuscatedText from './ObfuscatedText'
import { isString } from './util'
import { ColorMap } from './defaultColormap'

interface StyleProps {
  color?: keyof ColorMap
  bold?: boolean
  italic?: boolean
  underlined?: boolean
  strikethrough?: boolean
}

interface ComponentExtra extends StyleProps {
  text: string
  obfuscated?: boolean
  extra?: ComponentExtra[]
}

interface TextComponentProps {
  colormap: ColorMap
  component: string | ComponentExtra
  randomChars: string
  obfuscated?: boolean
}

function getStyle(
  colormap: ColorMap,
  { color, bold, italic, underlined, strikethrough }: StyleProps
): React.CSSProperties {
  return {
    color: color && colormap[color],
    fontWeight: bold ? 'bold' : undefined,
    fontStyle: italic ? 'italic' : undefined,
    textDecoration:
      underlined || strikethrough
        ? `${underlined ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`.trim()
        : undefined
  }
}

export default function TextComponent({
  colormap,
  component,
  randomChars,
  obfuscated
}: TextComponentProps): JSX.Element {
  if (isString(component)) {
    return obfuscated ? (
      <ObfuscatedText randomChars={randomChars} text={component} />
    ) : (
      <span>{component}</span>
    )
  } else {
    return (
      <span style={getStyle(colormap, component)}>
        {component.obfuscated || (obfuscated && component.obfuscated !== false) ? (
          <ObfuscatedText randomChars={randomChars} text={component.text} />
        ) : (
          component.text
        )}
        {component.extra &&
          component.extra.map((extra, i) => (
            <TextComponent
              key={i}
              colormap={colormap}
              component={extra}
              obfuscated={component.obfuscated}
              randomChars={randomChars}
            />
          ))}
      </span>
    )
  }
}
