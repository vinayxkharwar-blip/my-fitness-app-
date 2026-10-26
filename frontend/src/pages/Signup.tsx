import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Lock, Mail, User as UserIcon, ArrowRight, Sparkles, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        // Client-side validations
        if (!fullName.trim()) {
            setErrorMessage("Please enter your full name.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please verify.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/auth/register", {
                full_name: fullName.trim(),
                email: email.trim().toLowerCase(),
                password
            });

            if (response.data?.token && response.data?.user) {
                signup(response.data.token, response.data.user);
                toast.success("Welcome to FitSnap! Account created successfully.");
                navigate("/home");
            } else {
                toast.success("Account created! Please sign in.");
                navigate("/login");
            }
        } catch (err: any) {
            const serverMsg = err.response?.data?.error || err.response?.data?.message;
            let fallbackMsg = "Registration failed. Please check your details and try again.";
            if (!err.response) {
                fallbackMsg = import.meta.env.DEV
                    ? "Cannot connect to server. Please ensure the backend is running on port 5000."
                    : "Cannot connect to backend server. Please verify your internet connection and ensure the production backend is running.";
            }
            const msg = serverMsg || fallbackMsg;
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F6F8] px-4 py-8 relative overflow-y-auto selection:bg-[#16A34A]/20">
            {/* Background subtle glowing effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F0FDF4] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#EFF6FF] rounded-full blur-[90px] pointer-events-none" />

            <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
                {/* Header Badge */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs font-semibold mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        FitSnap AI Platform
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                        Get personalized meal tracking, smart hydration, and AI coaching.
                    </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs animate-shake">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="flex-1 leading-relaxed">{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                            Full Name
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Alex Morgan"
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@fitsnap.com"
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 uppercase tracking-wider">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-11 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {password && confirmPassword && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                                {password === confirmPassword ? (
                                    <span className="text-[#16A34A] flex items-center gap-1 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                                    </span>
                                ) : (
                                    <span className="text-rose-600 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5" /> Passwords do not match
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Complete Sign Up</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Switcher */}
                <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
                    <p className="text-xs text-[#64748B]">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#16A34A] hover:text-[#15803D] font-bold transition-colors underline-offset-4 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
