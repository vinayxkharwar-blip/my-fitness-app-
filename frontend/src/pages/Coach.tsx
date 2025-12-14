import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainerCard } from "@/components/fit/TrainerCard";
import { BottomNav } from "@/components/fit/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const trainers = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Weight Loss & Nutrition",
    rating: 4.9,
    reviewCount: 234,
    pricePerSession: 45,
    available: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    specialty: "Strength Training",
    rating: 4.8,
    reviewCount: 189,
    pricePerSession: 55,
    available: true,
  },
  {
    id: "3",
    name: "Emily Davis",
    specialty: "HIIT & Cardio",
    rating: 4.7,
    reviewCount: 156,
    pricePerSession: 40,
    available: false,
  },
  {
    id: "4",
    name: "Alex Rivera",
    specialty: "Yoga & Flexibility",
    rating: 5.0,
    reviewCount: 98,
    pricePerSession: 50,
    available: true,
  },
];

const Coach = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBook = (id: string) => {
    const trainer = trainers.find(t => t.id === id);
    toast({
      title: "Booking session...",
      description: `Opening booking for ${trainer?.name}`,
    });
  };

  const handleChat = (id: string) => {
    const trainer = trainers.find(t => t.id === id);
    toast({
      title: "Opening chat...",
      description: `Starting conversation with ${trainer?.name}`,
    });
  };

  const handleCall = (id: string) => {
    const trainer = trainers.find(t => t.id === id);
    toast({
      title: "Calling...",
      description: `Connecting you with ${trainer?.name}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Find a Coach - FitSnap AI</title>
        <meta
          name="description"
          content="Connect with certified fitness coaches and nutritionists. Book consultations, chat, or call for personalized guidance."
        />
      </Helmet>

      {/* MAIN BACKGROUND */}
      <div
        className="min-h-screen pb-24"
        style={{ backgroundColor: "#12492f" }}
      >
        {/* HEADER */}
        <header
          className="sticky top-0 z-30 backdrop-blur-sm border-b"
          style={{ backgroundColor: "#12492f" }}
        >
          <div className="max-w-lg mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/home")}
                aria-label="Go back"
                className="text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  Find a Coach
                </h1>
                <p className="text-white/70 text-sm">
                  Expert guidance for your goals
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Search by specialty..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Search coaches"
              />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-lg mx-auto px-4 pt-6 space-y-4">
          {trainers.map((trainer, index) => (
            <div key={trainer.id} style={{ animationDelay: `${index * 100}ms` }}>
              <TrainerCard
                {...trainer}
                onBook={handleBook}
                onChat={handleChat}
                onCall={handleCall}
              />
            </div>
          ))}
        </main>

        <BottomNav />
      </div>
    </>
  );
};

export default Coach;
