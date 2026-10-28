export default function Laptop({ children, className = '', ...rest }) {
  return (
    <div className={`lap ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
