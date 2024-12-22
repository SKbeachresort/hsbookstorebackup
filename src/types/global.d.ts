declare module "react-magnifier" {
    import React from "react";
  
    interface MagnifierProps {
      src: string;
      height?: number | string;
      width?: number | string;
      zoomImgSrc?: string;
      zoomFactor?: number;
      mgWidth?: number;
      mgHeight?: number;
      mgBorderWidth?: number;
      mgShape?: "circle" | "square";
      mgShowOverflow?: boolean;
      mgMouseOffsetX?: number;
      mgMouseOffsetY?: number;
      mgTouchOffsetX?: number;
      mgTouchOffsetY?: number;
      className?: string;
    }
  
    const Magnifier: React.FC<MagnifierProps>;
    export default Magnifier;
  }
  