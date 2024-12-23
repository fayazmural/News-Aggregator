import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

/**
 * SearchBar component that allows users to search articles.
 * This component consists of a text input field where users can type a search query, and a button
 * that triggers the search action. Upon submitting the form, the user is navigated to a search results
 * page with the query passed as a URL parameter.
 */
export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      navigate("/");
      return;
    }
    navigate(`/?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 lg:gap-3">
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow lg:text-sm lg:py-1 "
      />
      <Button type="submit" className="lg:text-sm lg:py-1">
        <Search className="mr-2 h-4 w-4 lg:h-3 lg:w-3" /> Search
      </Button>
    </form>
  );
}
