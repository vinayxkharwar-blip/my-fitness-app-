import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { useAuth } from "@/context/AuthContext";

// Validation Schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let result;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                // If not JSON (e.g. 404 HTML or 500 text), read as text
                const text = await response.text();
                throw new Error(text || `Server error: ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                // Backend uses 'msg', fallback to 'message' or generic
                throw new Error(result.msg || result.message || "Login failed");
            }

            // Store auth data via Context
            login(result.token, result.user);

            // Redirect based on profile completion
            if (result.user.is_profile_complete) {
                navigate("/home");
            } else {
                navigate("/onboarding/goal");
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            // Clean up error message if it's an HTML doc
            const displayMessage = errorMessage.startsWith("<!DOCTYPE") ? "Server configuration error (Check console)" : errorMessage;

            form.setError("root", {
                message: displayMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: string) => {
        const email = prompt(`Enter your ${provider} email to simulate login:`);
        if (!email) return;

        setIsLoading(true);
        try {
            const response = await fetch("/auth/social-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    full_name: `${provider} User`, // Mock name
                    provider,
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.msg || "Social login failed");

            login(result.token, result.user);

            if (result.user.is_profile_complete) {
                navigate("/home");
            } else {
                navigate("/onboarding/goal");
            }

        } catch (error) {
            console.error("Social login error:", error);
            alert("Social login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#E9EEF3] font-sans selection:bg-[#9ED9E6] selection:text-gray-800">

            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-blue-900/5 animate-fade-in relative z-10 mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-sm font-medium text-gray-500">
                        New user?{" "}
                        <Link to="/signup" className="font-bold text-[#FFA07A] hover:text-[#FF8C60] hover:underline transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Main Form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Error Display */}
                    {form.formState.errors.root && (
                        <div className="p-3 rounded-2xl bg-red-50 text-red-600 text-sm text-center border border-red-100">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#9ED9E6] transition-colors" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-14 pl-12 rounded-2xl bg-gray-50 border-transparent text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#9ED9E6] focus:ring-4 focus:ring-[#9ED9E6]/20 transition-all font-medium"
                                    {...form.register("email")}
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-500 pl-1 font-medium">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <Label htmlFor="password" className="sr-only">Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#9ED9E6] transition-colors" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-14 pl-12 pr-12 rounded-2xl bg-gray-50 border-transparent text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#9ED9E6] focus:ring-4 focus:ring-[#9ED9E6]/20 transition-all font-medium"
                                    {...form.register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-xs text-red-500 pl-1 font-medium">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-xs font-semibold text-gray-400 hover:text-[#FFA07A] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-full bg-[#9ED9E6] hover:bg-[#8CD0E0] text-gray-800 font-bold text-lg transition-all shadow-lg shadow-[#9ED9E6]/40 border-none transform hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">
                            or continue with
                        </span>
                    </div>
                </div>

                {/* Social Login Section */}
                <div className="flex justify-center gap-4">
                    {/* Google */}
                    <button
                        onClick={() => handleSocialLogin('Google')}
                        className="w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#9ED9E6]/30 hover:shadow-md transition-all flex items-center justify-center group"
                        title="Sign in with Google"
                    >
                        <svg className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                    </button>

                    {/* Apple */}
                    <button
                        onClick={() => handleSocialLogin('Apple')}
                        className="w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#9ED9E6]/30 hover:shadow-md transition-all flex items-center justify-center group"
                        title="Sign in with Apple"
                    >
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.403-2.363-2.013-.156-3.675 1.04-4.61 1.04zm-.09-2.73a5.212 5.212 0 0 1 2.44-4.166 5.152 5.152 0 0 1-3.413 1.769 4.381 4.381 0 0 1-2.454 4.14 5.384 5.384 0 0 1 3.427-1.745z" />
                        </svg>
                    </button>
                </div>

                {/* Footer Legal */}
                <div className="text-center pt-8 pb-2">
                    <p className="text-[10px] text-gray-400 leading-tight max-w-xs mx-auto">
                        By signing in, you agree to our <span className="font-bold text-gray-500 cursor-pointer hover:text-[#FFA07A] transition-colors">Terms</span> and <span className="font-bold text-gray-500 cursor-pointer hover:text-[#FFA07A] transition-colors">Privacy Policy</span>.
                    </p>
                </div>

            </div>
        </div>
    );
}
