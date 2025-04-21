import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export function AirPollutionSearch({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data: locations, isLoading } = useLocationSearch(query);

  const handleSelect = (cityData) => {
    const [lat, lon, name, country] = cityData.split("|");
    
    onSelect({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      country
    });
    
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search location for air quality...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities for air quality data..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && locations?.length === 0 && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {locations && locations.length > 0 && (
              <CommandGroup heading="Results">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {locations?.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}