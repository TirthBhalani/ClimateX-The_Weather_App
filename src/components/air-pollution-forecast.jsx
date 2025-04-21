import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const airQualityCategories = {
  SO2: [
    { max: 20, category: "Good", color: "#4ade80" },
    { max: 80, category: "Fair", color: "#a3e635" },
    { max: 250, category: "Moderate", color: "#facc15" },
    { max: 350, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
  NO2: [
    { max: 40, category: "Good", color: "#4ade80" },
    { max: 70, category: "Fair", color: "#a3e635" },
    { max: 150, category: "Moderate", color: "#facc15" },
    { max: 200, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
  PM10: [
    { max: 20, category: "Good", color: "#4ade80" },
    { max: 50, category: "Fair", color: "#a3e635" },
    { max: 100, category: "Moderate", color: "#facc15" },
    { max: 200, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
  PM2_5: [
    { max: 10, category: "Good", color: "#4ade80" },
    { max: 25, category: "Fair", color: "#a3e635" },
    { max: 50, category: "Moderate", color: "#facc15" },
    { max: 75, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
  O3: [
    { max: 60, category: "Good", color: "#4ade80" },
    { max: 100, category: "Fair", color: "#a3e635" },
    { max: 140, category: "Moderate", color: "#facc15" },
    { max: 180, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
  CO: [
    { max: 4400, category: "Good", color: "#4ade80" },
    { max: 9400, category: "Fair", color: "#a3e635" },
    { max: 12400, category: "Moderate", color: "#facc15" },
    { max: 15400, category: "Poor", color: "#f97316" },
    { max: Infinity, category: "Very Poor", color: "#ef4444" },
  ],
};

export function AirPollutionForecast({ data }) {
  const [selectedPollutant, setSelectedPollutant] = useState("PM2_5");
  
  if (!data || !data.list || data.list.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Air Pollution Forecast</CardTitle>
          <CardDescription>No forecast data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const pollutantKey = selectedPollutant === "PM2_5" ? "pm2_5" : selectedPollutant.toLowerCase();
  const categories = airQualityCategories[selectedPollutant];

  const chartData = data.list.map((item) => ({
    date: new Date(item.dt * 1000),
    value: item.components[pollutantKey],
    aqi: item.main.aqi,
  }));

  const getAQILabel = (aqi) => {
    switch (aqi) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Air Pollution Forecast</CardTitle>
          <CardDescription>
            Forecast for the next 4-5 days
          </CardDescription>
        </div>
        <Select
          value={selectedPollutant}
          onValueChange={setSelectedPollutant}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select pollutant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PM2_5">PM2.5</SelectItem>
            <SelectItem value="PM10">PM10</SelectItem>
            <SelectItem value="NO2">NO2</SelectItem>
            <SelectItem value="SO2">SO2</SelectItem>
            <SelectItem value="O3">O3</SelectItem>
            <SelectItem value="CO">CO</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(time) => format(new Date(time), "MMM dd")}
              />
              <YAxis 
                domain={[0, 
                  selectedPollutant === "PM2_5" ? 100 : 
                  selectedPollutant === "PM10" ? 250 : 
                  selectedPollutant === "NO2" ? 250 : 
                  selectedPollutant === "SO2" ? 400 : 
                  selectedPollutant === "O3" ? 200 :
                  selectedPollutant === "CO" ? 20000 : 100
                ]} 
              />
              <Tooltip
                labelFormatter={(label) => format(new Date(label), "MMM dd, yyyy h:mm a")}
                formatter={(value, name) => {
                  if (name === "aqi") {
                    return [getAQILabel(value), "Air Quality Index"];
                  }
                  const category = categories.find((cat) => value < cat.max);
                  return [
                    `${value} μg/m³ (${category ? category.category : "Very Poor"})`,
                    selectedPollutant,
                  ];
                }}
              />
              <Legend />
              
              
              {categories.map((category, index) => {
                const prevMax = index > 0 ? categories[index - 1].max : 0;
                return (
                  <ReferenceArea
                    key={category.category}
                    y1={prevMax}
                    y2={category.max === Infinity ? 
                      (selectedPollutant === "PM2_5" ? 100 : 
                       selectedPollutant === "PM10" ? 250 : 
                       selectedPollutant === "NO2" ? 250 : 
                       selectedPollutant === "SO2" ? 400 : 
                       selectedPollutant === "O3" ? 200 :
                       selectedPollutant === "CO" ? 20000 : 100) : 
                      category.max}
                    fill={category.color}
                    fillOpacity={0.2}
                  />
                );
              })}
              
              <Line
                type="monotone"
                dataKey="value"
                name={selectedPollutant}
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                name="aqi"
                stroke="#9333ea"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                hide={true} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          {categories.map((category) => (
            <div key={category.category} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-xs">{category.category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}