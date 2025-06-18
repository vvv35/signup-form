import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordInputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    value,
    onChange,
    label = "Password",
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative w-full h-10 flex items-center">
            <input
                id={name}
                type={show ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                maxLength={25}
                required
                placeholder=" "
                className="peer w-full bg-white outline-none px-4 py-3 text-sm rounded-md border border-[#1C1B1F] focus:shadow-md pr-10 text-[#1C1B1F]"
            />
            <label
                htmlFor={name}
                className="absolute top-1/2 -translate-y-1/2 left-3 px-1 bg-white text-sm text-[#1C1B1F]
          peer-focus:top-[-2px] peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#1C1B1F]
          peer-valid:top-[-2px] peer-valid:left-3 peer-valid:text-xs peer-valid:text-[#1C1B1F]
          transition-all duration-70"
            >
                {label}
            </label>
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 text-[#1C1B1F] top-1/2 -translate-y-1/2"
            >
                {show ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
        </div>
    );
};

export default PasswordInput;
// This component is a password input field with a toggle to show/hide the password.
// It uses React state to manage the visibility of the password and includes a label that floats above the input when focused or filled.