import classNames from "classnames";
import { Field } from "formik";

type InputTypeEmailProps = {
  name: string;
  settings: InputSettingsShape;
};

const dynamicStyles = {
  base: "font-nunito bg-gray-50 text-base text-gray-500 border-[1px] border-gray-300 rounded-lg focus:border-primary-600 w-full px-4 py-3 placeholder-gray-400 !shadow-none !outline-none !ring-0",
  error: "bg-red-50 border-red-500 text-red-700",
  disabled: "border-gray-300 text-gray-400 opacity-60",
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
        [`${dynamicStyles.error}`]: errorField,
        [`${dynamicStyles.disabled}`]: props.disabled,
      })}
      placeholder={props.placeholder}
      {...props}
      {...field}></input>
  );
}

export function InputTypeEmail({ name, settings }: InputTypeEmailProps) {
  const { placeholder, disabled, id, errors, ...rest } = settings;
  return (
    <Field
      name={name}
      className={classNames(dynamicStyles.base, {
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
