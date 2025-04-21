import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { AQIIndicator } from "./aqi-indicator";
  import { format } from "date-fns";
  
  
  const aqiDescriptions = {
    1: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    2: "Air quality is acceptable; however, some pollutants may be a concern for a very small number of people.",
    3: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    4: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious effects.",
    5: "Health alert: The risk of health effects is increased for everyone.",
  };
  
  
  const healthRecommendations = {
    1: "Enjoy outdoor activities.",
    2: "Unusually sensitive people should consider reducing prolonged outdoor exertion.",
    3: "People with respiratory or heart disease, the elderly and children should limit prolonged exertion.",
    4: "People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.",
    5: "Everyone should avoid outdoor activities.",
  };
  
  export function AirQualityInfo({ data }) {
    if (!data || !data.list || data.list.length === 0) {
      return null;
    }
  
    
    const currentData = data.list[0];
    const aqi = currentData.main.aqi;
    const components = currentData.components;
    const timestamp = currentData.dt * 1000;
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Air Quality</span>
            <AQIIndicator aqi={aqi} showLabel={true} />
          </CardTitle>
          <CardDescription>
            {format(new Date(timestamp), "EEEE, MMMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm">{aqiDescriptions[aqi] || "Air quality information unavailable."}</p>
            <p className="mt-2 text-sm font-medium">Health Recommendation:</p>
            <p className="text-sm">{healthRecommendations[aqi] || "No specific recommendations available."}</p>
          </div>
  
          <div className="mt-4">
            <p className="font-medium mb-2">Pollutant Concentrations (μg/m³):</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">PM2.5</p>
                <p className="text-lg font-semibold">{components.pm2_5?.toFixed(1) || "N/A"}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">PM10</p>
                <p className="text-lg font-semibold">{components.pm10?.toFixed(1) || "N/A"}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">NO₂</p>
                <p className="text-lg font-semibold">{components.no2?.toFixed(1) || "N/A"}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">SO₂</p>
                <p className="text-lg font-semibold">{components.so2?.toFixed(1) || "N/A"}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">O₃</p>
                <p className="text-lg font-semibold">{components.o3?.toFixed(1) || "N/A"}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">CO</p>
                <p className="text-lg font-semibold">{components.co?.toFixed(1) || "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }