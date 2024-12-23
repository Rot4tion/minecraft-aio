import React, { Component } from 'react'

interface ObfuscatedTextProps {
  randomChars: string
  text: string
}

export default class ObfuscatedText extends Component<ObfuscatedTextProps> {
  private span: HTMLSpanElement | null = null

  generateText(): string {
    let randomString = ''
    for (let i = 0; i < this.props.text.length; i++) {
      randomString +=
        this.props.randomChars[Math.floor(Math.random() * this.props.randomChars.length)]
    }
    return randomString
  }

  animate = (): void => {
    if (this.span && this.span.innerText) {
      this.span.innerText = this.generateText()
      window.requestAnimationFrame(this.animate)
    }
  }

  setSpan = (span: HTMLSpanElement | null): void => {
    if (this.span == null && span != null) {
      this.span = span
      this.animate()
    } else {
      this.span = span
    }
  }

  render(): React.ReactNode {
    return <span ref={this.setSpan}>{this.generateText()}</span>
  }
}
