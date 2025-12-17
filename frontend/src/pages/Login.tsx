import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        // TODO: Integrate actual auth logic here
        console.log("Login submitted:", data);

        // Simulate delay for UI testing
        setTimeout(() => {
            setIsLoading(false);
            navigate("/home"); // Redirect to Dashboard
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* LEFT SIDE - Form Section */}
            <div className="w-full md:w-1/2 lg:w-[40%] flex flex-col justify-center items-center p-6 md:p-12 relative animate-fade-in">
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Enter your implementation details to access your account.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground/80 font-medium">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="pl-10 h-10 rounded-full border-border bg-white focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base"
                                    {...form.register("email")}
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-sm text-destructive pl-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 h-10 rounded-full border-border bg-white focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base"
                                    {...form.register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-sm text-destructive pl-1">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in to Account"
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/signup" className="font-bold text-primary hover:underline underline-offset-4 transition-all">
                                    Sign up for free
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer info (optional) */}
                <div className="absolute bottom-6 text-center text-xs text-muted-foreground/50 hidden md:block">
                    © 2024 FitSnap Coach. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE - Abstract Visual */}
            <div className="hidden md:flex w-1/2 lg:w-[60%] bg-[#FDFBF7] relative overflow-hidden items-center justify-center p-12">
                {/* Abstract Shapes / Illustration placeholder */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-90 mix-blend-multiply filter sepia-[0.3]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>

                <div className="relative z-10 max-w-lg text-center space-y-6 p-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl animate-scale-in border border-white/40">
                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                        <span className="text-3xl">🧘‍♀️</span>
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-slate-900">
                        Your Wellness Journey <br /> Starts Here
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Track your meals, analyze nutrition with AI, and achieve your biological potential with a calm, focused mind.
                    </p>

                    <div className="pt-4 flex justify-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/30"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/30"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
