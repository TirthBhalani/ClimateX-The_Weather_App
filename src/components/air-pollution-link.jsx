import { Link } from "react-router-dom";
import { Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AirPollutionLink() {
  return (
    <Link to="/air-pollution">
      <Button variant="outline" className="flex items-center gap-2" size="sm">
        <Wind className="h-4 w-4" />
        <span className="hidden md:inline">Air Quality</span>
      </Button>
    </Link>
  );
}