import classNames from "classnames";
import { Field } from "formik";
import { InputSettingsShape } from "@rabbit/elements/shared-types";

type InputTypeEmailProps = {
  name: string;
  settings: InputSettingsShape;
};

const dynamicStyles = {
  base: "font-nunito bg-gray-50 text-base text-gray-500 border-[1px] border-gray-300 rounded-lg focus:border-primary-600 w-full px-4 py-3 placeholder-gray-400 !shadow-none !outline-none !ring-0",
  error: "bg-red-50 border-red-500 text-red-700",
  disabled: "border-gray-300 text-gray-400 opacity-60",
  chat: "!bg-white h-[42px]",
};

function StyledInput({ field, form: { touched, errors }, ...props }: any) {
  let errorField = false;
  if (errors[field.name] || props.errors) errorField = true;
  if (field.name.indexOf(".") > -1) {
    const nameSplit = field.name.split(".");
    if (errors[nameSplit[0]] && errors[nameSplit[0]][nameSplit[1]]) errorField = true;
  }

  return (
    <input
      type={props.type}
      id={props.id}
      className={classNames(dynamicStyles.base, {
        [`${dynamicStyles.chat}`]: props.id === "chat_input",
        [`${dynamicStyles.error}`]: errorField,
        [`${dynamicStyles.disabled}`]: props.disabled,
      })}
      placeholder={props.placeholder}
      {...props}
      {...field}></input>
  );
}

//TODO: investigate Errors prop in formik - does not change styles
export function InputTypeEmail({ name, settings }: InputTypeEmailProps) {
  const { placeholder, disabled, id, errors, ...rest } = settings;
  return (
    <Field
      name={name}
      // note: something made the component lose formatting and re-adding the classes here is a dirty hack but a necessary one given time constraints
      // todo: fix this on a later date. If we wrap the input above inside Field (check out Input Type Password) it works, so check that one out for a possible fix - dc
      className={classNames(dynamicStyles.base, {
        [`${dynamicStyles.chat}`]: id === "chat_input",
        [`${dynamicStyles.error}`]: errors,
        [`${dynamicStyles.disabled}`]: disabled,
      })}
      component={StyledInput}
      placeholder={placeholder}
      type={"email"}
      id={id}
      disabled={disabled}
      {...rest}
    />
  );
}
