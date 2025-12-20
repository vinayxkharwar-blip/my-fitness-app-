import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/layouts/AuthLayout";

// Validation Schema
const signupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignupFormValues) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: data.fullName, // Map to backend expected field
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.msg || "Registration failed");
            }

            // Redirect to login on success
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            form.setError("root", {
                message: errorMessage,
            });
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
            <div className="text-center mb-8 space-y-3">
                <h1 className="text-3xl font-bold font-heading text-foreground">
                    Join FitSnapAI
                </h1>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                    Start your biological potential journey today.
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
                    <div className="text-center text-sm text-muted-foreground pt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-foreground hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2 animate-fade-in">

                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-foreground/80 font-medium ml-1">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                className="pl-12 h-12 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all font-sans text-base text-gray-900 placeholder:text-gray-400"
                                {...form.register("fullName")}
                            />
                        </div>
                        {form.formState.errors.fullName && (
                            <p className="text-sm text-destructive pl-4 font-medium">{form.formState.errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground/80 font-medium ml-1">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="hello@example.com"
                                className="pl-12 h-12 rounded-full border-border/50 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base"
                                {...form.register("email")}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive pl-4 font-medium">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground/80 font-medium ml-1">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-all">
                                Sign in
                            </Link>
                        </div>
                    </div>

                </form>
            )}
        </AuthLayout>
    );
}
