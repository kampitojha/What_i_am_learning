
import { Heart, Share2, MessageCircle } from 'lucide-react';

const TailwindExplainCard = () => {
  return (
    // 1. OUTER CONTAINER (Centering on screen)
    // flex + justify-center + items-center: Card ko screen ke beech mein lata hai
    // min-h-screen: Height kam se kam screen jitni hogi
    // bg-gray-100: Halka grey background
    <div className="flex justify-center items-center py-10 bg-gray-50">
      
      {/* 2. MAIN CARD 
          relative: Taaki andar absolute elements use kar sakein
          w-[400px]: Fixed width 400px
          bg-white: Card ka background safed
          rounded-2xl: Kone goal (Curved) honge (Large curve)
          shadow-xl: Card utha hua lagega (Drop shadow)
          overflow-hidden: Jo cheez card se bahar niklegi woh chup jayegi
          group: Ispe hover karne par andar ke elements change honge
          transition-all + duration-300: Har animation smooth hogi 
          hover:-translate-y-2: Mouse laane par card thoda upar uthega
      */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* 3. TOP BANNER IMAGE
            h-32: Height fix kar di
            bg-gradient-to-r: Color left se right badlega
            object-cover: Image ache se fit hogi
        */}
        <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white cursor-pointer hover:bg-white/40 transition">
             <Share2 size={20} />
          </div>
        </div>

        {/* 4. PROFILE SECTION (Positioning tricks)
            px-6: Left-Right padding
            pb-6: Bottom padding
        */}
        <div className="px-6 pb-6">
          
          {/* PROFILE IMAGE
              -mt-12: Margin Top Negative (Image ko upar khiska ke banner ke upar laata hai)
              border-4 border-white: Safed border taaki banner se alag dikhe
          */}
          <div className="relative flex justify-between items-end -mt-12 mb-4">
             <img 
               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
               alt="Profile" 
               className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
             />
             
             {/* FOLLOW BUTTON
                bg-violet-600: Button colour
                hover:bg-violet-700: Hover pe dark
                active:scale-95: Click karne par button thoda pitchkega (Press effect)
             */}
             <button className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 hover:shadow-lg active:scale-95 transition-all">
               Follow
             </button>
          </div>

          {/* TEXT CONTENT */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sarah Anderson</h2>
            <p className="text-gray-500 font-medium text-sm">UI/UX Designer @ TechFlow</p>
            
            {/* TAGS (Flexbox gap use kiya hai) */}
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 text-xs font-semibold text-violet-600 bg-violet-50 rounded-full border border-violet-100">
                Design
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-pink-600 bg-pink-50 rounded-full border border-pink-100">
                Development
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Passionately creating intuitive and beautiful digital experiences. Love to code, design and travel. 
            <span className="text-violet-600 font-semibold cursor-pointer hover:underline ml-1">#creating</span>
          </p>

          {/* DIVIDER LINE */}
          <div className="h-px w-full bg-gray-200 mb-6"></div>

          {/* STATS ROW (Grid System)
              grid-cols-3: Teen barabar hisse
              text-center: Text beech mein
          */}
          <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-200">
            <div className="flex flex-col hover:bg-gray-50 rounded-lg p-2 transition cursor-pointer">
              <span className="text-xl font-bold text-gray-800">1.2k</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Followers</span>
            </div>
            <div className="flex flex-col hover:bg-gray-50 rounded-lg p-2 transition cursor-pointer">
              <span className="text-xl font-bold text-gray-800">842</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Following</span>
            </div>
            <div className="flex flex-col hover:bg-gray-50 rounded-lg p-2 transition cursor-pointer">
              <span className="text-xl font-bold text-gray-800">182</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Posts</span>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR 
            bg-gray-50: Alag background section
        */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div className="flex -space-x-2">
               {/* Overlapping Avatars (negative space) */}
               <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
               <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
               <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                 +5
               </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
               <Heart className="w-6 h-6 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
               <MessageCircle className="w-6 h-6 hover:text-blue-500 transition-colors cursor-pointer" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default TailwindExplainCard;
