import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            const response = await fetch("http://localhost:5000/auth/register", {
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

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.msg || result.message || "Registration failed");
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white font-sans">
            <div className="w-full max-w-sm space-y-8 animate-fade-in">

                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-extrabold text-black mb-2">Sign up</h1>
                    <p className="text-sm font-medium text-gray-900">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-gray-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Error Display */}
                    {form.formState.errors.root && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                            {form.formState.errors.root.message}
                        </div>
                    )}

                    {/* Role Selection (Styled to match theme) */}
                    <div className="bg-[#EFF4FF] p-1 rounded-full flex w-full relative">
                        <button
                            type="button"
                            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${role === 'user' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setRole('user')}
                        >
                            Member
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${role === 'trainer' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            onClick={() => setRole('trainer')}
                        >
                            Coach
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <Label htmlFor="fullName" className="sr-only">Full Name</Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="h-12 pl-10 rounded-xl bg-[#EFF4FF] border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-transparent transition-all placeholder:text-gray-500 text-gray-900"
                                    {...form.register("fullName")}
                                />
                            </div>
                            {form.formState.errors.fullName && (
                                <p className="text-xs text-red-500 pl-1">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

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
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-full bg-black text-white hover:bg-gray-800 font-bold text-base transition-all mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>

                    <div className="text-center pt-4">
                        <p className="text-[10px] text-gray-500 leading-tight">
                            By Sign up you agree to our <Link to="/privacy" className="underline font-bold text-gray-900">Privacy Policy</Link> and <Link to="/terms" className="underline font-bold text-gray-900">Terms and Condition</Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
