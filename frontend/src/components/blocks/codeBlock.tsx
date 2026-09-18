import { useEffect, useRef } from "react"
import type { CodeBlockType } from "#/types/block-types"

declare global {
  interface Window {
    Prism?: {
      highlightElement: (element: HTMLElement) => void
    }
  }
}


// Prism mutates the DOM when it highlights code. Because this component
// is server-rendered by TanStack Start, loading/running Prism before React
// hydrates would change the server HTML and cause a hydration mismatch.
// I therefore load Prism inside useEffect so it only runs after hydration.




export function CodeBlock({ content, language }: CodeBlockType) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Load Prism after hydration
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"

    script.onload = () => {
      if (codeRef.current) {
        window.Prism?.highlightElement(codeRef.current)
      }
    }

    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <pre>
      <code
        ref={codeRef}
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/^<pre><code>/, "")
            .replace(/<\/code><\/pre>$/, ""),
        }}
      />
    </pre>
  )
}