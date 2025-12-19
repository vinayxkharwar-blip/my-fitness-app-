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
        // TODO: Integrate actual auth logic here
        console.log("Login submitted:", data);

        // Simulate delay for UI testing
        setTimeout(() => {
            setIsLoading(false);
            navigate("/onboarding/goal"); // Redirect to Onboarding
        }, 1500);
    };

    return (
        <AuthLayout
            title=""
            subtitle=""
            noHeader={true}
        >
            <div className="text-center mb-8 space-y-3">
                <h1 className="text-3xl font-bold font-heading text-foreground">
                    Welcome to<br />FitSnapAI!
                </h1>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                    Achieve your goals with our personalized plans. Start your journey now.
                </p>
            </div>

            {!showEmailForm ? (
                <div className="space-y-3">
                    <Button
                        className="w-full h-14 rounded-full bg-black hover:bg-black/90 text-white font-medium text-lg flex items-center justify-center gap-2"
                        onClick={() => { }}
                    >
                        <span className="text-xl"></span> Continue with Apple
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-14 rounded-full border-2 border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700 font-medium"
                            onClick={() => { }}
                        >
                            <span className="mr-2 text-lg">G</span> Google
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 rounded-full border-2 border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700 font-medium"
                            onClick={() => setShowEmailForm(true)}
                        >
                            <Mail className="mr-2 h-5 w-5" /> Email
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2 animate-fade-in">

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground/80 font-medium ml-1">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="hello@example.com"
                                className="pl-12 h-12 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-sans text-base text-gray-900 placeholder:text-gray-400"
                                {...form.register("email")}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive pl-4 font-medium">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                            <Link
                                to="/forgot-password"
                                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-12 pr-12 h-12 rounded-full border-border/50 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base"
                                {...form.register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive pl-4 font-medium">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-6 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
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

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-bold text-primary hover:text-primary/80 transition-all">
                                Sign up free
                            </Link>
                        </div>
                    </div>

                </form>
            )
            }
        </AuthLayout >
    );
}
