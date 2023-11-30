import { useCallback, useState, type HTMLAttributes } from "react"
import { ZoomInIcon } from "@radix-ui/react-icons"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

import { Button } from "./ui/button"

export function ZoomImage({ children }: HTMLAttributes<HTMLDivElement>) {
  const [isZoomed, setIsZoomed] = useState(false)
  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom)
  }, [])
  return (
    <div className="flex flex-col items-center gap-2">
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={(zoomed) => (isZoomed ? handleZoomChange(zoomed) : null)}
        classDialog="zoom-image"
      >
        {children}
      </ControlledZoom>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setIsZoomed((value) => !value)}
      >
        <ZoomInIcon />
      </Button>
    </div>
  )
}
