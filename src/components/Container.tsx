import clsx from "clsx";


export default function Container({className = '',children}: {className?: string, children: React.ReactNode}) {
  return (
    <div className={clsx("max-w-[1200px] mx-auto w-[90%]", className)}>
      {children}
    </div>
  )
}
