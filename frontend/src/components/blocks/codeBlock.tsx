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
    const prismScript = document.createElement("script")
    prismScript.src =
      "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"

    prismScript.onload = () => {
      if (language === "python") {
        const pythonScript = document.createElement("script")
        pythonScript.src =
          "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js"

        pythonScript.onload = () => {
          if (codeRef.current) {
            window.Prism?.highlightElement(codeRef.current)
          }
        }

        document.body.appendChild(pythonScript)
      } else if (codeRef.current) {
        window.Prism?.highlightElement(codeRef.current)
      }
    }

    document.body.appendChild(prismScript)

    return () => {
      prismScript.remove()
    }
  }, [language])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        <span className="terminal-language">
          {language}
        </span>
      </div>

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
    </div>
  )
}
