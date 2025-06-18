import React from "react";

interface FloatingInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    maxLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    maxLength,

}) => {
    return (
        <div className="relative w-full h-10 flex items-center">
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required
                placeholder=" "
                maxLength={maxLength}
                className="peer w-full bg-white outline-none px-4 py-3 text-sm rounded-md border border-[#1C1B1F] focus:shadow-md text-[#1C1B1F]"
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
        </div>
    );
};

export default FloatingInput;
