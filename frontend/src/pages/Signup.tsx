import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        // TODO: Integrate actual auth logic
        console.log("Signup submitted:", data);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate("/home"); // Redirect to Dashboard
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-background">

            {/* RIGHT SIDE - Abstract Visual (Left for Signup to alternate? Or Keep Right for consistency? Lets keep Right for consistency on desktop, maybe swap on demand. I'll stick to Right side visual for consistency) */}

            {/* LEFT SIDE - Form Section */}
            <div className="w-full md:w-1/2 lg:w-[40%] flex flex-col justify-center items-center p-6 md:p-12 relative animate-fade-in bg-background">
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="text-center md:text-left space-y-2">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2">
                            FITSNAP COACH
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading">
                            Create Account
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Start your fitness journey today. It's free and takes less than a minute.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-foreground/80 font-medium">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10 h-10 rounded-full border-border bg-white focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base"
                                    {...form.register("fullName")}
                                />
                            </div>
                            {form.formState.errors.fullName && (
                                <p className="text-sm text-destructive pl-1">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

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
                            <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
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
                        <div className="space-y-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-full text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                                <Link to="/login" className="font-bold text-primary hover:underline underline-offset-4 transition-all">
                                    Sign in
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {/* RIGHT SIDE - Abstract Visual */}
            <div className="hidden md:flex w-1/2 lg:w-[60%] bg-[#FDFBF7] relative overflow-hidden items-center justify-center p-12">
                {/* Different visual for Signup */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply filter grayscale-[0.2]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/20 via-transparent to-background/50"></div>

                <div className="relative z-10 w-full max-w-lg">
                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 animate-slide-up">
                        <h3 className="text-2xl font-bold mb-3 text-slate-900">Join 50,000+ Users</h3>
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="user" className="h-full w-full object-cover" />
                                </div>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold text-primary-foreground">
                                +5k
                            </div>
                        </div>
                        <p className="text-slate-600">
                            "FitSnap AI completely changed how I look at food. I'm finally eating right without overthinking."
                        </p>
                        <div className="mt-2 text-sm font-semibold text-primary">— Sarina K., Pro Plan User</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
