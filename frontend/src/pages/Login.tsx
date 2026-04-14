import { SignIn } from "@clerk/clerk-react";

export default function Login() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#E9EEF3] font-sans selection:bg-[#9ED9E6] selection:text-gray-800">
            <SignIn path="/login" routing="path" signUpUrl="/signup" fallbackRedirectUrl="/home" />
        </div>
    );
}
