import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#E9EEF3] font-sans selection:bg-[#9ED9E6] selection:text-gray-800">
            <SignUp path="/signup" routing="path" signInUrl="/login" fallbackRedirectUrl="/onboarding/goal" />
        </div>
    );
}
