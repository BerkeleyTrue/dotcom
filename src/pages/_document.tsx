import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html style={{ height: '100vh', width: '100vw' }}>
        <Head />
        <body style={{ height: '100vh', width: '100vw' }}>
          {/* Make Color mode to persists when you refresh the page. */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
