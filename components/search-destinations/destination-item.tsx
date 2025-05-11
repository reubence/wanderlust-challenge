import { Destination } from "@prisma/client";
import React from "react";

const DestinationItem = ({ destination }: { destination: Destination }) => {
  return (
    <div key={destination.id} className="p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">{destination.name}</h3>
      <p className="text-muted-foreground">{destination.description}</p>
    </div>
  );
};

export default DestinationItem;
