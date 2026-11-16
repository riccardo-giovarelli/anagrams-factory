import { JSX } from "react";

import { mergeClassNames } from "@utils/style";

import { AlertMessageType } from "./message-box.type";
import { ALERT_CONFIG } from "@/components/message-box/message-box.lib";

const MessageBox = ({ type, message }: AlertMessageType): JSX.Element | null => {
  const config = ALERT_CONFIG[type];

  if (!config) {
    return null;
  }

  const { bgClass, iconClass, textClass, title, Icon } = config;

  return (
    <div role="alert" className={mergeClassNames(bgClass, "rounded-md p-4 w-full")}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={mergeClassNames(iconClass, "h-5 w-5")} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={mergeClassNames(textClass, "text-sm font-medium")}>{title}</h3>
          <div className={mergeClassNames(textClass, "mt-2 text-sm")}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
