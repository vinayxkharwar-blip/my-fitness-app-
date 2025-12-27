import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

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
            form.setError("root", {
                message: errorMessage
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
            const response = await fetch("http://localhost:5000/auth/social-login", {
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white font-sans">
            <div className="w-full max-w-sm space-y-8 animate-fade-in">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-extrabold text-black mb-2">Sign in</h1>
                    <p className="text-sm font-medium text-gray-900">
                        New user?{" "}
                        <Link to="/signup" className="font-bold text-gray-900 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Main Form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Error Display */}
                    {form.formState.errors.root && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1">
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-12 pl-10 rounded-xl bg-[#EFF4FF] border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-transparent transition-all placeholder:text-gray-500 text-gray-900"
                                    {...form.register("email")}
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-xs text-red-500 pl-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <Label htmlFor="password" className="sr-only">Password</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-12 pl-10 pr-10 rounded-xl bg-[#EFF4FF] border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-transparent transition-all placeholder:text-gray-500 text-gray-900"
                                    {...form.register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-xs text-red-500 pl-1">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex justify-start">
                            <Link
                                to="/forgot-password"
                                className="text-xs font-semibold text-gray-900 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base transition-all mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500 font-medium">
                            or
                        </span>
                    </div>
                </div>

                {/* Social Login Section */}
                <div className="space-y-4">
                    <p className="text-center text-xs font-semibold text-gray-900">
                        Join With Your Favourite Social Media Account
                    </p>
                    <div className="flex justify-center gap-4">
                        {/* Google */}
                        <button
                            onClick={() => handleSocialLogin('Google')}
                            className="w-12 h-12 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center justify-center"
                            title="Sign in with Google"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                            className="w-12 h-12 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all flex items-center justify-center"
                            title="Sign in with Apple"
                        >
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.403-2.363-2.013-.156-3.675 1.04-4.61 1.04zm-.09-2.73a5.212 5.212 0 0 1 2.44-4.166 5.152 5.152 0 0 1-3.413 1.769 4.381 4.381 0 0 1-2.454 4.14 5.384 5.384 0 0 1 3.427-1.745z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Footer Legal */}
                <div className="text-center pt-8 pb-4">
                    <p className="text-[10px] text-gray-500 leading-tight max-w-xs mx-auto">
                        By signing in with an account, you agree to our <span className="font-bold underline cursor-pointer">Terms of Service</span> and <span className="font-bold underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>

            </div>
        </div>
    );
}
