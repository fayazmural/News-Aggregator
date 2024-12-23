import { Source } from "@/types";

// Helper function to format enum values for display
export const formatEnumValue = (value: string): string => {
  switch (value) {
    case Source.NYT:
      return "New York Times";
    case Source.NewsOrg:
      return "News Org";
    case Source.Guardian:
      return "The Guardian";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};
