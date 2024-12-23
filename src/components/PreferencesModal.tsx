import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Source } from "@/types";
import { useToast } from "@/hooks/use-toast";

/**
 * PreferencesModal component that allows users to customize their news feed preferences.
 * This modal allows users to select their preferred news sources and categories. The selected preferences
 * are stored in local storage and can be used to personalize the user’s news feed.
 */
export function PreferencesModal() {
  const [open, setOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(() => {
    const savedSources = localStorage.getItem("preferredSources");
    return savedSources ? JSON.parse(savedSources) : [];
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem("preferredCategories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const { toast } = useToast();

  const handleSave = () => {
    // Save to local storage
    localStorage.setItem("preferredSources", JSON.stringify(selectedSources));
    localStorage.setItem(
      "preferredCategories",
      JSON.stringify(selectedCategories)
    );

    // Show success notification
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been successfully saved.",
    });

    // Close the modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Customize Feed
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Personalize Your News Feed</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Preferred Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Preferred Sources</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(Source).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`source-${value}`}
                    checked={selectedSources.includes(value)}
                    onCheckedChange={(checked) => {
                      setSelectedSources((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((s) => s !== value)
                      );
                    }}
                  />
                  <label
                    htmlFor={`source-${key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preferred Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Preferred Categories</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(Category).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${value}`}
                    checked={selectedCategories.includes(value)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((c) => c !== value)
                      );
                    }}
                  />
                  <label
                    htmlFor={`category-${key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {key}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </DialogContent>
    </Dialog>
  );
}
