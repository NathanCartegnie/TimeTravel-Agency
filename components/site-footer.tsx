'use client'

export function SiteFooter() {
  return (
      <footer className="border-t border-border px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">

            {/* BRAND */}
            <div className="flex items-center gap-2">
            <span className="font-heading font-medium text-ivory">
              TimeTravel Agency
            </span>
              <span className="hidden md:inline">•</span>
              <span>Voyage temporel de luxe</span>
            </div>

            {/* COPYRIGHT */}
            <div>
              © {new Date().getFullYear()} TimeTravel Agency. Tous siècles réservés.
            </div>

          </div>
        </div>
      </footer>
  )
}