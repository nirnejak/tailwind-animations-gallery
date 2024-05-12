import * as React from "react"

import classNames from "utils/classNames"

interface Props {
  type:
    | "text"
    | "email"
    | "number"
    | "password"
    | "date"
    | "datetime-local"
    | "checkbox"
    | "radio"
  id: string
  placeholder?: string
  className?: string
  checked?: boolean
  value?: string
  label?: string
  icon?: JSX.Element
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({
  id,
  type,
  value,
  checked,
  placeholder,
  className,
  onChange,
  label,
  icon,
  ...restProps
}) => {
  if (type === "checkbox" || type === "radio") {
    return (
      <label
        htmlFor={id}
        className={classNames(className, "flex items-center gap-1")}
      >
        <input
          id={id}
          type={type}
          value={value}
          checked={checked}
          placeholder={placeholder}
          onChange={onChange}
          className="mr-0.5 h-3.5 w-3.5 accent-zinc-800"
          {...restProps}
        />
        {label !== "undefined" && (
          <span className="text-sm bg-zinc-700">{label}</span>
        )}
      </label>
    )
  } else {
    return (
      <label htmlFor={id} className="relative">
        {label !== "undefined" && (
          <div className="mb-1 text-xs font-medium text-zinc-700">{label}</div>
        )}
        {typeof icon !== "undefined" && (
          <span className="absolute left-2.5 top-[15px] text-zinc-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className={classNames(
            className,
            typeof icon !== "undefined" && "pl-7",
            "w-full rounded-lg border-[1px] text-zinc-400 px-3 py-2 text-sm bg-zinc-950 border-zinc-900 outline-none"
          )}
          onChange={onChange}
          {...restProps}
        />
      </label>
    )
  }
}

export default Input