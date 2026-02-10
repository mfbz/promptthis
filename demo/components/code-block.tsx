interface CodeBlockProps {
  children: string;
  label?: string;
}

export function CodeBlock({ children, label = "Code" }: CodeBlockProps) {
  return (
    <div>
      <div className="inline-block font-pixel text-[10px] tracking-widest uppercase px-3 py-1.5 bg-neutral-900 text-neutral-400">
        {label}
      </div>
      <pre className="bg-neutral-900 text-neutral-100 font-pixel text-[13px] leading-[1.8] p-6 overflow-x-auto whitespace-pre m-0 border-0">
        <code className="bg-transparent p-0">{children.trim()}</code>
      </pre>
    </div>
  );
}
