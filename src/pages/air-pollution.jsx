import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import { useGeolocation } from "@/hooks/use-geolocation";
import { AirPollutionSearch } from "@/components/air-pollution-search";
import { AirPollutionHistorical } from "@/components/air-pollution-historical";
import { AirPollutionForecast } from "@/components/air-pollution-forecast";
import { AirQualityInfo } from "@/components/air-quality-info";
import { getAirPollutionHistorical, getAirPollutionForecast, getCurrentAirPollution } from "@/api/air-pollution";

function AirPollutionPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { coordinates, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();

  
  const activeCoordinates = selectedLocation || coordinates;

  const historicalQuery = useQuery({
    queryKey: ["air-pollution-historical", activeCoordinates || { lat: 0, lon: 0 }],
    queryFn: () => (activeCoordinates ? getAirPollutionHistorical(activeCoordinates) : null),
    enabled: Boolean(activeCoordinates),
  });

  const forecastQuery = useQuery({
    queryKey: ["air-pollution-forecast", activeCoordinates || { lat: 0, lon: 0 }],
    queryFn: () => (activeCoordinates ? getAirPollutionForecast(activeCoordinates) : null),
    enabled: Boolean(activeCoordinates),
  });

  const currentQuery = useQuery({
    queryKey: ["air-pollution-current", activeCoordinates || { lat: 0, lon: 0 }],
    queryFn: () => (activeCoordinates ? getCurrentAirPollution(activeCoordinates) : null),
    enabled: Boolean(activeCoordinates),
  });

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      country: location.country
    });
  };

  const handleRefresh = () => {
    if (activeCoordinates) {
      historicalQuery.refetch();
      forecastQuery.refetch();
      currentQuery.refetch();
    }
  };

  if (locationLoading && !selectedLocation) {
    return <Loading />;
  }

  if (locationError && !selectedLocation) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (historicalQuery.error || forecastQuery.error || currentQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch air pollution data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationDisplayName = selectedLocation 
    ? `${selectedLocation.name}, ${selectedLocation.country}` 
    : "My Location";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Air Pollution Data</h1>
        <AirPollutionSearch onSelect={handleLocationSelect} />
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{locationDisplayName}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={historicalQuery.isFetching || forecastQuery.isFetching || currentQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              historicalQuery.isFetching || forecastQuery.isFetching || currentQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        {currentQuery.data && (
          <AirQualityInfo data={currentQuery.data} />
        )}
        
        {historicalQuery.data && (
          <AirPollutionHistorical data={historicalQuery.data} />
        )}
        
        {forecastQuery.data && (
          <AirPollutionForecast data={forecastQuery.data} />
        )}
        
        {(!historicalQuery.data || !forecastQuery.data || !currentQuery.data) && 
         !historicalQuery.isLoading && !forecastQuery.isLoading && !currentQuery.isLoading && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No Data Available</AlertTitle>
            <AlertDescription>
              No air pollution data is available for this location.
            </AlertDescription>
          </Alert>
        )}
        
        {(historicalQuery.isLoading || forecastQuery.isLoading || currentQuery.isLoading) && <Loading />}
      </div>
    </div>
  );
}

export default AirPollutionPage;