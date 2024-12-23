import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Category, Source } from "@/types";
import { formatEnumValue } from "@/lib/format-enum-value";

/**
 * ArticleFilters component allows users to apply filters such as date, category, and source to articles.
 * The filters are applied using URL search parameters, and the component can be closed after applying filters.
 */
export function ArticleFilters({ onClose }: { onClose?: () => void }) {
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

   /**
   * Handles the application of the selected filters and updates the URL with the new search parameters.
   * Closes the filters modal if the onClose callback is provided.
   */
  const handleApplyFilters = () => {
    const params = new URLSearchParams(window.location.search);
    if (date) params.set("date", format(date, "yyyy-MM-dd"));
    else params.delete("date");
    if (category) params.set("category", category);
    else params.delete("category");
    if (source) params.set("source", source);
    else params.delete("source");
    navigate(`/?${params.toString()}`);
    if (onClose) onClose();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 lg:mb-2">Filters</h2>
      <div className="space-y-2 lg:space-y-1">
        <label className="block text-sm font-medium lg:text-xs">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal text-sm lg:text-xs lg:py-1"
            >
              <CalendarIcon className="mr-2 h-4 w-4 lg:h-3 lg:w-3" />
              {date ? format(date, "PP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2 lg:space-y-1">
        <label className="block text-sm font-medium lg:text-xs">Category</label>
        <Select onValueChange={setCategory}>
          <SelectTrigger className="lg:text-xs lg:py-1">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Category).map((categoryValue) => (
              <SelectItem key={categoryValue} value={categoryValue}>
                {formatEnumValue(categoryValue)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 lg:space-y-1">
        <label className="block text-sm font-medium lg:text-xs">Source</label>
        <Select onValueChange={setSource}>
          <SelectTrigger className="lg:text-xs lg:py-1">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Source).map((sourceValue) => (
              <SelectItem key={sourceValue} value={sourceValue}>
                {formatEnumValue(sourceValue)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleApplyFilters}
        className="w-full lg:text-xs lg:py-1"
      >
        Apply Filters
      </Button>
      {onClose && (
        <Button onClick={onClose} className="w-full mt-4 lg:text-xs lg:py-1">
          Close Filters
        </Button>
      )}
    </div>
  );
}
