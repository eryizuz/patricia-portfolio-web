/**
 * Renderiza texto de content.json permitiendo **negritas**.
 */
export default function RichText({ text, as: Tag = 'span', ...rest }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)

  return (
    <Tag {...rest}>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <b key={index}>{part.slice(2, -2)}</b>
        ) : (
          part
        ),
      )}
    </Tag>
  )
}
