import { JSX } from "react";

import { Switch } from "@headlessui/react";
import { mergeClassNames } from "@utils/style";

import { ToggleType } from "./toggle.type";

const Toggle = ({ label, enabled, setEnabled }: ToggleType): JSX.Element => (
  <Switch.Group as="div" className="flex items-center">
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={mergeClassNames(
        enabled ? "bg-af-900" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-af-600 focus-visible:ring-offset-2",
      )}
    >
      <span
        aria-hidden="true"
        className={mergeClassNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
    <Switch.Label as="span" className="ml-3 cursor-pointer text-lg text-af-900">
      {label}
    </Switch.Label>
  </Switch.Group>
);

export default Toggle;
