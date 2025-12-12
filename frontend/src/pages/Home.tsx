export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5FAFC] pb-32 flex justify-center">
      
      {/* CENTERED CONTENT WRAPPER */}
      <div className="w-full max-w-2xl px-6 mt-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold flex items-center gap-2">
            🌱 Good Evening
          </h1>
          <p className="text-gray-500 text-sm">
            Small steps today = big results tomorrow
          </p>
        </div>

        {/* TODAY’S FOCUS CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8 border border-gray-100">
          <p className="text-xs font-bold text-[#00A884] mb-1">
            TODAY'S FOCUS
          </p>
          <p className="text-gray-700 text-sm">
            Stay hydrated and hit your protein goal today! 💪
          </p>
        </div>

        {/* CALORIES CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-8 border border-gray-100">

          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg">Calories</p>
              <p className="text-gray-400 text-xs">Daily intake</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">1420</p>
              <p className="text-gray-400 text-xs">/ 2000 kcal</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-5 mb-6">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: "72%" }}
            ></div>
          </div>

          {/* Macros */}
          <div className="flex justify-between text-center">

            <div>
              <p className="font-bold text-lg">65g</p>
              <p className="text-gray-500 text-sm">Protein</p>
            </div>

            <div>
              <p className="font-bold text-lg">180g</p>
              <p className="text-gray-500 text-sm">Carbs</p>
            </div>

            <div>
              <p className="font-bold text-lg">45g</p>
              <p className="text-gray-500 text-sm">Fats</p>
            </div>

          </div>
        </div>

        {/* HYDRATION CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">

          {/* Row */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">Hydration</p>
              <p className="text-gray-500 text-xs">1200 / 2500 ml</p>
            </div>
            <p className="text-blue-600 font-semibold text-lg">48%</p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <button className="border border-gray-300 py-2 rounded-full text-sm shadow-sm bg-white">
              +200 ml
            </button>
            <button className="border border-gray-300 py-2 rounded-full text-sm shadow-sm bg-white">
              +300 ml
            </button>
            <button className="border border-gray-300 py-2 rounded-full text-sm shadow-sm bg-white">
              +500 ml
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
