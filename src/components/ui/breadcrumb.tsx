import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type BreadcrumbItem = {
  label: string
  to?: string // jika ada, bisa diklik
}

type Props = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="flex text-sm text-muted-foreground" aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center">
            {!isLast && item.to ? (
              <Link
                to={item.to}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && "font-semibold text-foreground")}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="mx-2">›</span>} {/* Separator */}
          </span>
        )
      })}
    </nav>
  )
}
