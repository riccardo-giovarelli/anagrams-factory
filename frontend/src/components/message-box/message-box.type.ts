import { ComponentType, SVGProps } from "react";

export interface AlertMessageType {
  type: "warning" | "error" | "success" | "message";
  message: string;
}

export type AlertVariantConfig = {
  bgClass: string;
  iconClass: string;
  textClass: string;
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};
