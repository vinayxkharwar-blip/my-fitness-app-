import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/layouts/AuthLayout";

// Validation Schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

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
                throw new Error(result.message || "Login failed");
            }

            // Store auth data
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

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

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

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
        <AuthLayout
            title=""
            subtitle=""
            noHeader={true}
        >
            <div className="text-center mb-6 space-y-2">
                <h1 className="text-2xl font-bold font-heading text-foreground">
                    Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm">
                    Enter your details to sign in.
                </p>
            </div>

            {/* Social Login Row */}
            <div className="flex justify-center gap-6 mb-8">
                <Button
                    variant="outline"
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:scale-110 transition-all duration-300 shadow-sm flex items-center justify-center p-0 group"
                    onClick={() => handleSocialLogin('Google')}
                    title="Sign in with Google"
                >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
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
                </Button>
                <Button
                    variant="outline"
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:scale-110 transition-all duration-300 shadow-sm flex items-center justify-center p-0 group"
                    onClick={() => handleSocialLogin('Apple')}
                    title="Sign in with Apple"
                >
                    <svg className="w-8 h-8 text-black group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.48-1.17 3.93-1.13 1.6.17 2.83.92 3.65 1.59-1.39 1.17-2.29 3.29-1.92 5.43.33 2.5 2.1 3.75 2.7 4.19-.88 2.54-2.17 4.51-3.44 5.95l.02-.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.29-1.93 4.23-3.74 4.25z" />
                    </svg>
                </Button>
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or sign in with email
                    </span>
                </div>
            </div>

            {/* Form - Always Visible */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
                <div className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            className="h-12 rounded-xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-xs text-destructive pl-1">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <Label htmlFor="password" className="sr-only">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="h-12 rounded-xl bg-secondary/30 border-transparent focus:bg-background focus:border-primary/20 transition-all pr-10"
                                {...form.register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-xs text-destructive pl-1">{form.formState.errors.password.message}</p>
                        )}
                        <div className="flex justify-end pt-1">
                            <Link
                                to="/forgot-password"
                                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 mt-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-primary hover:underline">
                        Sign up free
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
