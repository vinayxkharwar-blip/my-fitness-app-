import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button";
import { ArrowLeft, Save, Utensils, Clock } from "lucide-react";

export default function LogMeal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mealName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        mealType: "Breakfast",
        time: new Date().toTimeString().slice(0, 5), // Current time HH:MM
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.mealName || !formData.calories) {
            alert("Please enter at least meal name and calories!");
            return;
        }

        // TODO: Send to backend API
        console.log("Meal logged:", formData);

        // Show success message and navigate back
        alert(`✅ ${formData.mealName} logged successfully!\n${formData.calories} kcal added to your daily intake.`);
        navigate("/home");
    };

    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

    return (
        <div className="min-h-screen w-full bg-[#E9EEF3] pb-32 text-[#1F2937] font-sans selection:bg-[#9ED9E6]/30 relative">

            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFA07A]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="px-6 pt-8 pb-6 flex items-center gap-4 sticky top-0 z-20 bg-[#E9EEF3]/90 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#1F2937] transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold font-heading text-[#1F2937] tracking-tight">Log Meal</h1>
                    <p className="text-sm text-gray-500 font-medium">Add your meal manually</p>
                </div>
            </header>

            <main className="px-6 space-y-6 relative z-10">

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Meal Info Card */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white space-y-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-2xl bg-[#FFF7ED]">
                                <Utensils className="w-6 h-6 text-[#FFA07A]" />
                            </div>
                            <h2 className="text-lg font-bold text-[#1F2937]">Meal Details</h2>
                        </div>

                        {/* Meal Name */}
                        <div className="space-y-2">
                            <label htmlFor="mealName" className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
                                Meal Name *
                            </label>
                            <input
                                type="text"
                                id="mealName"
                                name="mealName"
                                value={formData.mealName}
                                onChange={handleInputChange}
                                placeholder="e.g., Grilled Chicken Salad"
                                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#FFA07A] focus:outline-none text-[#1F2937] font-medium transition-colors bg-[#F7FAFC]"
                                required
                            />
                        </div>

                        {/* Meal Type & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="mealType" className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    Type
                                </label>
                                <select
                                    id="mealType"
                                    name="mealType"
                                    value={formData.mealType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#FFA07A] focus:outline-none text-[#1F2937] font-medium transition-colors bg-[#F7FAFC] cursor-pointer"
                                >
                                    {mealTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="time" className="block text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Time
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#FFA07A] focus:outline-none text-[#1F2937] font-medium transition-colors bg-[#F7FAFC]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Card */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-blue-900/5 border border-white space-y-5">
                        <h2 className="text-lg font-bold text-[#1F2937] mb-4">Nutrition Information</h2>

                        {/* Calories */}
                        <div className="space-y-2">
                            <label htmlFor="calories" className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
                                Calories (kcal) *
                            </label>
                            <input
                                type="number"
                                id="calories"
                                name="calories"
                                value={formData.calories}
                                onChange={handleInputChange}
                                placeholder="0"
                                min="0"
                                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#FFA07A] focus:outline-none text-[#1F2937] font-bold text-xl transition-colors bg-[#FFF7ED]"
                                required
                            />
                        </div>

                        {/* Macros */}
                        <div className="space-y-3">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Macros (Optional)</p>

                            <div className="grid grid-cols-3 gap-3">
                                {/* Protein */}
                                <div className="space-y-2">
                                    <label htmlFor="protein" className="block text-xs font-bold text-gray-400 uppercase">
                                        Protein
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="protein"
                                            name="protein"
                                            value={formData.protein}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            min="0"
                                            className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-[#FFA07A] focus:outline-none text-[#1F2937] font-bold transition-colors bg-[#FFF7ED]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">g</span>
                                    </div>
                                </div>

                                {/* Carbs */}
                                <div className="space-y-2">
                                    <label htmlFor="carbs" className="block text-xs font-bold text-gray-400 uppercase">
                                        Carbs
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="carbs"
                                            name="carbs"
                                            value={formData.carbs}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            min="0"
                                            className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-[#9ED9E6] focus:outline-none text-[#1F2937] font-bold transition-colors bg-[#E0F2FE]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">g</span>
                                    </div>
                                </div>

                                {/* Fat */}
                                <div className="space-y-2">
                                    <label htmlFor="fat" className="block text-xs font-bold text-gray-400 uppercase">
                                        Fat
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="fat"
                                            name="fat"
                                            value={formData.fat}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            min="0"
                                            className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 focus:border-[#BFE8C7] focus:outline-none text-[#1F2937] font-bold transition-colors bg-[#F0FDF4]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button
                            type="submit"
                            className="w-full h-14 rounded-[2rem] text-base font-bold bg-[#FFA07A] hover:bg-[#FF8C60] text-white shadow-xl shadow-[#FFA07A]/20 transition-all hover:scale-[1.02] border-none"
                        >
                            <Save className="mr-2 w-5 h-5" />
                            Save Meal
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="w-full h-14 rounded-[2rem] text-base font-bold border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm"
                        >
                            Cancel
                        </Button>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center font-medium">
                        * Required fields. Macros are optional but help track your nutrition better.
                    </p>
                </form>

            </main>
        </div>
    );
}
