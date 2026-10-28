export default function Imac({ children, className = '', ...rest }) {
  return (
    <div className={`imac ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
