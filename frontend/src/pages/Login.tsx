import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [email, setEmail] = useState("demo@fitsnap.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fromLocation = (location.state as any)?.from?.pathname || "/home";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setErrorMessage("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", {
                email: email.trim().toLowerCase(),
                password
            });

            if (response.data?.token && response.data?.user) {
                login(response.data.token, response.data.user);
                toast.success("Welcome back! Logged in successfully.");
                navigate(fromLocation, { replace: true });
            } else {
                setErrorMessage("Invalid response from server.");
            }
        } catch (err: any) {
            const serverMsg = err.response?.data?.error || err.response?.data?.message;
            let fallbackMsg = "Login failed. Please check your credentials.";
            if (err.response?.status === 405) {
                fallbackMsg = "Production API route not configured. Please add VITE_API_URL to your Vercel Project Settings pointing to your live backend.";
            } else if (err.response?.status >= 502 && err.response?.status <= 504) {
                fallbackMsg = "Backend server is currently starting up (Render free tier cold start). Please wait ~30 seconds and retry.";
            } else if (!err.response) {
                fallbackMsg = import.meta.env.DEV
                    ? "Cannot connect to server. Please ensure the backend is running on port 5000."
                    : "Cannot connect to backend server. Please verify your internet connection and ensure your live backend is running.";
            }
            const msg = serverMsg || fallbackMsg;
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F6F8] px-4 py-8 relative overflow-y-auto selection:bg-[#16A34A]/20">
            {/* Background subtle glowing effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F0FDF4] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#EFF6FF] rounded-full blur-[90px] pointer-events-none" />

            <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
                {/* Header Badge */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-xs font-semibold mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        FitSnap AI Coaching
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                        Sign in to access your nutrition plan and AI coaching
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
                                placeholder="name@example.com"
                                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Demo Helper Banner */}
                <div className="mt-6 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                    <div>
                        <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Demo Account</span>
                        <span className="text-[#0F172A] text-xs font-mono font-medium">demo@fitsnap.com</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setEmail("demo@fitsnap.com");
                            setPassword("password123");
                            toast.info("Demo credentials loaded!");
                        }}
                        className="text-[11px] text-[#16A34A] hover:text-[#15803D] font-semibold px-2.5 py-1 rounded bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] transition-colors"
                    >
                        Auto Fill
                    </button>
                </div>

                {/* Footer Switcher */}
                <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
                    <p className="text-xs text-[#64748B]">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#16A34A] hover:text-[#15803D] font-bold transition-colors underline-offset-4 hover:underline"
                        >
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
