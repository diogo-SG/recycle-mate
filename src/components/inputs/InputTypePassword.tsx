// import classNames from "classnames";
// import { Field } from "formik";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import { useEffect, useState } from "react";
// import { InputTypePasswordSettingsShape } from "../../types/types";
// import { Popover } from "flowbite";
// import type { PopoverInterface } from "flowbite";

// export interface InputTypePasswordProps {
//   name: string;
//   settings: InputTypePasswordSettingsShape;
// }

// const dynamicStyles = {
//   base: "font-nunito bg-gray-50 text-base text-gray-500 border-[1px] border-gray-300 rounded-lg focus:border-primary-600 w-full px-4 py-3 placeholder-gray-400 !shadow-none !outline-none !ring-0",
//   error: "bg-red-50 border-red-500 focus:ring-red-500 text-red-700",
//   disabled: "border-gray-300 text-gray-400 opacity-60",
//   iconStyle: "h-4 w-4 text-gray-500",
// };

// export function InputTypePassword({ name, settings }: InputTypePasswordProps) {
//   const { placeholder, disabled, id, popoverTarget, popoverPlacement, popoverTrigger, ...rest } = settings;
//   const [showPassword, setShowPassword] = useState(false);
//   const [popover, setPopover] = useState<PopoverInterface | null>(null);

//   useEffect(() => {
//     if (popoverTarget && id) {
//       const targetEl: HTMLElement | null = document.getElementById(popoverTarget);
//       const triggerEl: HTMLElement | null = document.getElementById(id);
//       if (targetEl && triggerEl && !popover)
//         setPopover(new Popover(targetEl, triggerEl, { placement: popoverPlacement }));
//     }
//   }, [popover]);

//   const onPasswordFocus = () => {
//     if (popover) popover.show();
//   };

//   const onPasswordBlur = () => {
//     if (popover) popover.hide();
//   };

//   return (
//     <Field name={name}>
//       {({ field, meta }: any) => (
//         <div
//           data-popover-target={popoverTarget}
//           data-popover-placement={popoverPlacement}
//           data-popover-trigger={popoverTrigger}
//           className="relative h-fit">
//           <input
//             type={showPassword ? "text" : "password"}
//             id={id}
//             className={classNames(`${dynamicStyles.base}`, {
//               [`${dynamicStyles.error}`]: meta.error,
//               [`${dynamicStyles.disabled}`]: disabled,
//             })}
//             placeholder={placeholder}
//             {...rest}
//             {...field}
//             disabled={disabled}
//             onFocus={onPasswordFocus}
//             onBlur={onPasswordBlur}></input>
//           <div
//             className="absolute top-[50%] right-0 z-10 translate-y-[-50%] cursor-pointer pr-3"
//             onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? (
//               <EyeSlashIcon className={dynamicStyles.iconStyle} />
//             ) : (
//               <EyeIcon className={dynamicStyles.iconStyle} />
//             )}
//           </div>
//         </div>
//       )}
//     </Field>
//   );
// }
// export default InputTypePassword;
