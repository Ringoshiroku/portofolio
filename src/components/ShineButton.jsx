import React from "react"
export default function ShineButton({ as='button', href, className='', variant='primary', children, ...props }){
  const Cmp = as === 'a' || href ? 'a' : 'button'
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost'

  const anchorDefaults = (Cmp === 'a')
    ? {
        target: props.target ?? '_blank',
        rel: props.rel ?? 'noopener noreferrer',
      }
    : {}

  return (
    <Cmp href={href} className={['btn','btn-glow',variantClass,className].join(' ')} {...anchorDefaults} {...props}>
      <span className="relative z-10">{children}</span>
    </Cmp>
  )
}
