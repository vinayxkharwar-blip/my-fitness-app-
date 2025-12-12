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
        <meta name="description" content="Connect with certified fitness coaches and nutritionists. Book consultations, chat, or call for personalized guidance." />
      </Helmet>
      
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/home")}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-subtitle text-foreground font-display">Find a Coach</h1>
                <p className="text-small text-muted-foreground">Expert guidance for your goals</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by specialty..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted border border-border text-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search coaches"
              />
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 pt-6 space-y-4">
          {trainers.map((trainer, index) => (
            <div 
              key={trainer.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
