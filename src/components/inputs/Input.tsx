import { useField } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
//import InputTypePassword from "./InputTypePassword";
import InputPicture from "./InputPicture";
import { InputProps } from "../../types/types";

function renderChildInput({ type, name, settings, onChange }: InputProps) {
  switch (type) {
    // case "password":
    //   return <InputTypePassword name={name} settings={settings} />;
    case "picture":
      return <InputPicture name={name} settings={settings} onChange={onChange} />;
    default:
      return null;
  }
}

export function Input({ type, className, label, labelStyles, name, settings, onChange }: InputProps) {
  const [, meta] = useField(name);
  // Class name definitions
  const baseLabelStyle = "font-nunito mb-2 text-base text-gray-900 ";
  const baseMessageStyle = "font-nunito text-base text-gray-500 ";

  return (
    <div className={className ?? "flex w-full flex-col"}>
      {label && (
        <label
          htmlFor={name}
          className={baseLabelStyle + (meta?.error ? "text-red-500" : "") + (labelStyles ? labelStyles : "")}>
          {label}
        </label>
      )}
      {renderChildInput({ type, name, settings, onChange })}
      {(label || settings.hint) && (
        <div className={baseMessageStyle + (meta?.error ? "text-red-500" : "")}>
          {meta?.error ? (
            <div className="font-nunito mt-2 flex items-start text-base text-red-500">
              <ExclamationCircleIcon className="h-5 w-5" />
              <span className="ml-1">
                {typeof meta.error == "object" ? (Object.values(meta.error)[0] as any) : meta.error}
              </span>
            </div>
          ) : (
            <div>
              {settings.hint && <div className="font-nunito mt-2 text-base text-gray-500">{settings.hint}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
