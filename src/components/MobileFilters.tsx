
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { ArticleFilters } from './ArticleFilters'

export  function MobileFilters() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] lg:hidden">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <ArticleFilters onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

