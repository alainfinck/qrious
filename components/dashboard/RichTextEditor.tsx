'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered, Link2, Quote, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  name: string
  defaultValue?: string | null
  placeholder?: string
  className?: string
}

interface ToolbarButton {
  icon: React.ReactNode
  label: string
  command: string
  value?: string
  tag?: string
}

const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { icon: <Bold className="h-3.5 w-3.5" />, label: 'Gras', command: 'bold' },
  { icon: <Italic className="h-3.5 w-3.5" />, label: 'Italique', command: 'italic' },
  { icon: <Underline className="h-3.5 w-3.5" />, label: 'Souligner', command: 'underline' },
  { icon: <Heading2 className="h-3.5 w-3.5" />, label: 'Titre H2', command: 'formatBlock', value: 'H2', tag: 'h2' },
  { icon: <Heading3 className="h-3.5 w-3.5" />, label: 'Titre H3', command: 'formatBlock', value: 'H3', tag: 'h3' },
  { icon: <List className="h-3.5 w-3.5" />, label: 'Liste à puces', command: 'insertUnorderedList' },
  { icon: <ListOrdered className="h-3.5 w-3.5" />, label: 'Liste numérotée', command: 'insertOrderedList' },
  { icon: <Quote className="h-3.5 w-3.5" />, label: 'Citation', command: 'formatBlock', value: 'BLOCKQUOTE', tag: 'blockquote' },
]

export function RichTextEditor({ name, defaultValue, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLInputElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [isEmpty, setIsEmpty] = useState(!defaultValue)

  // Sync content to hidden input
  const syncToHidden = useCallback(() => {
    if (editorRef.current && hiddenRef.current) {
      const html = editorRef.current.innerHTML
      hiddenRef.current.value = html
      setIsEmpty(editorRef.current.textContent?.trim() === '')
    }
  }, [])

  // Update active formats on selection change
  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')

    const block = document.queryCommandValue('formatBlock').toLowerCase()
    if (block === 'h2') formats.add('H2')
    if (block === 'h3') formats.add('H3')
    if (block === 'blockquote') formats.add('BLOCKQUOTE')

    setActiveFormats(formats)
  }, [])

  useEffect(() => {
    if (editorRef.current && defaultValue) {
      editorRef.current.innerHTML = defaultValue
      if (hiddenRef.current) {
        hiddenRef.current.value = defaultValue
      }
    }
  }, [defaultValue])

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const handleInput = () => { syncToHidden(); updateActiveFormats() }
    const handleKeyUp = () => updateActiveFormats()
    const handleMouseUp = () => updateActiveFormats()

    editor.addEventListener('input', handleInput)
    editor.addEventListener('keyup', handleKeyUp)
    editor.addEventListener('mouseup', handleMouseUp)

    return () => {
      editor.removeEventListener('input', handleInput)
      editor.removeEventListener('keyup', handleKeyUp)
      editor.removeEventListener('mouseup', handleMouseUp)
    }
  }, [syncToHidden, updateActiveFormats])

  const execCommand = useCallback((command: string, value?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    syncToHidden()
    updateActiveFormats()
  }, [syncToHidden, updateActiveFormats])

  const handleInsertLink = useCallback(() => {
    const url = window.prompt('URL du lien:', 'https://')
    if (url) {
      execCommand('createLink', url)
    }
  }, [execCommand])

  const handleClear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
      syncToHidden()
    }
  }, [syncToHidden])

  const isActive = (btn: ToolbarButton) => {
    if (btn.tag) return activeFormats.has(btn.value || btn.command)
    return activeFormats.has(btn.command)
  }

  return (
    <div className={cn('rounded-xl border border-border bg-background overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1.5">
        {TOOLBAR_BUTTONS.map((btn) => (
          <Button
            key={btn.command + (btn.value || '')}
            type="button"
            variant="ghost"
            size="sm"
            title={btn.label}
            className={cn(
              'h-7 w-7 p-0 rounded',
              isActive(btn) && 'bg-primary/15 text-primary'
            )}
            onClick={() => execCommand(btn.command, btn.value)}
          >
            {btn.icon}
          </Button>
        ))}

        {/* Separator */}
        <div className="mx-1 h-4 w-px bg-border" />

        {/* Link button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Insérer un lien"
          className="h-7 w-7 p-0 rounded"
          onClick={handleInsertLink}
        >
          <Link2 className="h-3.5 w-3.5" />
        </Button>

        {/* Separator */}
        <div className="ml-auto" />

        {/* Clear button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Effacer le contenu"
          className="h-7 w-7 p-0 rounded text-muted-foreground hover:text-destructive"
          onClick={handleClear}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Editor area */}
      <div className="relative">
        {isEmpty && (
          <div
            className="absolute inset-0 pointer-events-none px-3 py-3 text-sm text-muted-foreground/60 select-none"
            aria-hidden
          >
            {placeholder || 'Commencez à écrire votre contenu…'}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            'min-h-[180px] px-3 py-3 text-sm focus:outline-none',
            '[&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1',
            '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1',
            '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-3 [&_blockquote]:my-2 [&_blockquote]:text-muted-foreground [&_blockquote]:italic',
            '[&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-1',
            '[&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-1',
            '[&_a]:text-primary [&_a]:underline',
            '[&_strong]:font-bold',
            '[&_em]:italic',
          )}
          onInput={syncToHidden}
          role="textbox"
          aria-multiline="true"
          aria-label={placeholder || 'Éditeur de contenu'}
        />
      </div>

      {/* Hidden input for form submission */}
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={defaultValue || ''}
      />
    </div>
  )
}
