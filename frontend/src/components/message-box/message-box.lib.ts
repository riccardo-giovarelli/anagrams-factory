import { AlertMessageType, AlertVariantConfig } from "@/components/message-box/message-box.type";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const ALERT_CONFIG: Record<AlertMessageType["type"], AlertVariantConfig> = {
  warning: {
    bgClass: "bg-yellow-50",
    iconClass: "text-yellow-800",
    textClass: "text-yellow-800",
    title: "Attention!",
    Icon: ExclamationTriangleIcon,
  },
  error: {
    bgClass: "bg-red-50",
    iconClass: "text-red-800",
    textClass: "text-red-700",
    title: "Error!",
    Icon: XCircleIcon,
  },
  success: {
    bgClass: "bg-green-50",
    iconClass: "text-green-800",
    textClass: "text-green-700",
    title: "Success!",
    Icon: CheckCircleIcon,
  },
  message: {
    bgClass: "bg-blue-50",
    iconClass: "text-blue-700",
    textClass: "text-blue-700",
    title: "Message",
    Icon: InformationCircleIcon,
  },
};
