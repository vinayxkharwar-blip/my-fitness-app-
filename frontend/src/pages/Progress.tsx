import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Progress() {
    const navigate = useNavigate();

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handleBack = () => {
            navigate("/home", { replace: true });
        };

        window.addEventListener("popstate", handleBack);

        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-background pb-24 text-foreground animate-fade-in p-6">
            <h1 className="text-2xl font-bold font-heading mb-6">Your Progress</h1>
            <div className="bg-card rounded-3xl p-8 border border-white/5 text-center shadow-premium">
                <p className="text-muted-foreground">
                    Detailed analytics and progress charts coming soon.
                </p>
            </div>
        </div>
    );
}
