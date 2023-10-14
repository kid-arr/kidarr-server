import React from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/maps/main-map"), {
  loading: () => <p>loading...</p>,
  ssr: false
})

const MapPage = async () => {
  return (
    <div>
      <h1>Map Page</h1>
      <div>
        <Map />
      </div>
    </div>
  );
};

export default MapPage;
