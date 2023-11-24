import { BoxModelIcon, CursorArrowIcon, ZoomInIcon } from "@radix-ui/react-icons";
import { useState, type HTMLAttributes, useCallback } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";
import { Button } from "./ui/button";

export function ZoomImage({ children }: HTMLAttributes<HTMLDivElement>) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);
  return (
    <div className="flex flex-col gap-2 items-center">
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={(zoomed)=> isZoomed ? handleZoomChange(zoomed) : null}
        classDialog="zoom-image"
      >
        {children}
      </ControlledZoom>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsZoomed((value) => !value)}
      >
        <ZoomInIcon />
      </Button>
    </div>
  );
}
