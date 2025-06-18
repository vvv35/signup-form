import React, { useState, ChangeEvent, FormEvent } from "react";
import FloatingInput from "./FloatingInput";
import PasswordInput from "./PasswordInput";

import Logo from "/Group 47603.png";
import Illustration from "/Group 4.png";
import FacebookIcon from "/Vector.png";
import GoogleIcon from "/flat-color-icons_google.png";
import AppleIcon from "/ant-design_apple-filled.png";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}

const SignUpForm = () => {
    const [form, setForm] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showErrors, setShowErrors] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.firstName) newErrors.firstName = "First name is required";
        if (!form.lastName) newErrors.lastName = "Last name is required";
        if (!form.email.includes("@")) newErrors.email = "Invalid email";
        if (!form.phone) {
            newErrors.phone = "Phone is required";
        } else if (form.phone.length < 9 || form.phone.length > 10) {
            newErrors.phone = "Phone number must be 9 or 10 digits";
        }
        if (form.password.length < 6) newErrors.password = "Password too short";
        if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!form.termsAccepted) newErrors.termsAccepted = "Accept the terms";

        setErrors(newErrors);
        setShowErrors(Object.keys(newErrors).length > 0);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", form);
        }
    };

    return (
        <div className="max-h-screen flex items-center justify-center p-12">
            {showErrors && Object.values(errors).length > 0 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md px-4 py-3 shadow-lg w-[90%] max-w-md">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <ul className="list-disc list-inside space-y-1">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setShowErrors(false)}
                            className="text-red-700 text-lg font-bold leading-none"
                            aria-label="Close error popup"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            <div className="w-screen h-full flex flex-col md:flex-row overflow-hidden m-12 gap-18">
                <div className="md:w-1/3 flex items-center justify-center">
                    <img src={Illustration} alt="Sign Up" className="w-full max-w-sm" />
                </div>

                <div className="md:w-2/3 p-8">
                    <div className="flex justify-end mb-12">
                        <img src={Logo} alt="Logo" className="h-8" />
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Sign up</h2>
                    <p className="text-gray-500 mb-6 text-sm">
                        Let's get you all set up so you can access your personal account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FloatingInput
                                label="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                maxLength={20}
                            />
                            <FloatingInput
                                label="Last Name"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                maxLength={20}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FloatingInput
                                type="email"
                                name="email"
                                label="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <FloatingInput
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value) && value.length <= 10) {
                                        handleChange(e);
                                    }
                                }}
                            />
                        </div>

                        <PasswordInput
                            label="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />

                        <div className="flex gap-2 text-xs font-semi-bold items-center">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={form.termsAccepted}
                                onChange={handleChange}
                            />
                            <label>
                                I agree to all the <span className="text-pink-500 font-medium">Terms</span> and {" "}
                                <span className="text-pink-500 font-medium">Privacy Policies</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mt-2"
                        >
                            Create account
                        </button>

                        <p className="text-center text-sm mt-2">
                            Already have an account? {" "}
                            <a href="#" className="text-pink-500 font-medium">
                                Login
                            </a>
                        </p>
                    </form>

                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4 my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="text-sm text-gray-500 whitespace-nowrap">Or Sign up with</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <div className="flex justify-center gap-4 w-full">
                            {[FacebookIcon, GoogleIcon, AppleIcon].map((src, index) => (
                                <button
                                    key={index}
                                    className="border border-[#5B5CE2] rounded-md p-3 w-full h-[50px] flex items-center justify-center"
                                >
                                    <img src={src} alt="Social icon" className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
