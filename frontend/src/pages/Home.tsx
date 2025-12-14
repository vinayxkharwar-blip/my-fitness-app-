export default function Home() {
  return (
    <div
      className="min-h-screen pb-32 flex justify-center"
      style={{ backgroundColor: "#12492f" }} // ✅ UPDATED BACKGROUND
    >
      {/* CENTER WRAPPER */}
      <div className="w-full max-w-md px-5 pt-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Good Afternoon,
          </h1>
          <p className="text-white/70 text-sm">
            Ready to crush your goals today?
          </p>
        </div>

        {/* TODAY'S FOCUS */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            🏆
          </div>
          <div>
            <p className="text-xs font-bold text-green-600">TODAY&apos;S FOCUS</p>
            <p className="text-sm text-gray-700">
              Hit your protein goal! 💪
            </p>
          </div>
        </div>

        {/* CALORIES CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
          <p className="text-sm text-gray-500 mb-1">Calories Remaining</p>
          <h2 className="text-4xl font-bold text-gray-900">
            580 <span className="text-base font-medium text-gray-500">kcal</span>
          </h2>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4 mb-6 overflow-hidden">
            <div className="h-full bg-orange-500 w-[72%]" />
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="font-bold text-gray-900">65g</p>
              <p className="text-xs text-gray-500">Protein</p>
              <div className="h-1 bg-blue-500 rounded-full mt-2 mx-4" />
            </div>
            <div>
              <p className="font-bold text-gray-900">180g</p>
              <p className="text-xs text-gray-500">Carbs</p>
              <div className="h-1 bg-green-500 rounded-full mt-2 mx-4" />
            </div>
            <div>
              <p className="font-bold text-gray-900">45g</p>
              <p className="text-xs text-gray-500">Fats</p>
              <div className="h-1 bg-yellow-400 rounded-full mt-2 mx-4" />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <p className="text-xs font-bold text-white/70 mb-3">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "Scan Meal", icon: "📷" },
            { label: "Body Check", icon: "👤" },
            { label: "Log Food", icon: "➕" },
            { label: "Workout", icon: "🏋️" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <p className="text-sm font-medium text-gray-800">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* HYDRATION */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold text-gray-900">Hydration</p>
              <p className="text-xs text-gray-500">1200 / 2500 ml</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              48%
            </div>
          </div>

          {/* Progress */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-5">
            <div className="h-full w-[48%] bg-blue-500 rounded-full" />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-2 rounded-xl border text-sm text-blue-600">
              +200ml
            </button>
            <button className="py-2 rounded-xl border text-sm text-blue-600">
              +500ml
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
