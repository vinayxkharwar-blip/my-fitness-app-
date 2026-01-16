import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { useAuth } from "@/context/AuthContext";

// Validation Schema
const signupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'user' | 'trainer'>('user');

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
            const response = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: data.fullName, // Map to backend expected field
                    email: data.email,
                    password: data.password,
                    role: role // Send selected role
                }),
            });

            let result;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || `Server error: ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                throw new Error(result.msg || result.message || "Registration failed");
            }

            // Redirect to login on success
            navigate("/login");
        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            const displayMessage = errorMessage.startsWith("<!DOCTYPE") ? "Server configuration error (Check console)" : errorMessage;

            form.setError("root", {
                message: displayMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#E9EEF3] font-sans selection:bg-[#9ED9E6] selection:text-gray-800">

            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-blue-900/5 animate-fade-in relative z-10 mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h1>
                    <p className="text-sm font-medium text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-[#FFA07A] hover:text-[#FF8C60] hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Error Display */}
                    {form.formState.errors.root && (
                        <div className="p-3 rounded-2xl bg-red-50 text-red-600 text-sm text-center border border-red-100">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    {/* Role Selection (Light Theme) */}
                    <div className="bg-gray-100 p-1.5 rounded-full flex w-full relative">
                        <button
                            type="button"
                            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${role === 'user' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setRole('user')}
                        >
                            Member
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${role === 'trainer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setRole('trainer')}
                        >
                            Coach
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <Label htmlFor="fullName" className="sr-only">Full Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#9ED9E6] transition-colors" />
                                </div>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="h-14 pl-12 rounded-2xl bg-gray-50 border-transparent text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#9ED9E6] focus:ring-4 focus:ring-[#9ED9E6]/20 transition-all font-medium"
                                    {...form.register("fullName")}
                                />
                            </div>
                            {form.formState.errors.fullName && (
                                <p className="text-xs text-red-500 pl-1 font-medium">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

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
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-full bg-[#9ED9E6] hover:bg-[#8CD0E0] text-gray-800 font-bold text-lg transition-all shadow-lg shadow-[#9ED9E6]/40 border-none transform hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>

                    <div className="text-center pt-4">
                        <p className="text-[10px] text-gray-400 leading-tight">
                            By signing up you agree to our <Link to="/privacy" className="underline font-bold text-gray-500 hover:text-[#FFA07A] transition-colors">Privacy Policy</Link> and <Link to="/terms" className="underline font-bold text-gray-500 hover:text-[#FFA07A] transition-colors">Terms and Conditions</Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
