import { Link } from "react-router";
import Navigation from "../components/Navigation";

export default function Instructions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navigation />
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">2048 游戏说明</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  游戏目标
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  在4×4的网格中移动数字瓷砖，当两个相同数字的瓷砖碰撞时，它们会合并成一个更大的数字。
                  你的目标是创建一个标有<span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent font-bold">"2048"</span>的瓷砖来获胜！
                </p>
              </section>
              
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🎮</span>
                  如何游戏
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">⌨️</span>
                      <span className="font-semibold text-blue-600">移动瓷砖</span>
                    </div>
                    <p className="text-sm text-slate-600">使用方向键（↑↓←→）或屏幕按钮</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🔄</span>
                      <span className="font-semibold text-blue-600">合并瓷砖</span>
                    </div>
                    <p className="text-sm text-slate-600">相同数字碰撞时会合并加倍</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">✨</span>
                      <span className="font-semibold text-blue-600">新瓷砖</span>
                    </div>
                    <p className="text-sm text-slate-600">每次移动后随机出现新瓷砖</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🏆</span>
                      <span className="font-semibold text-blue-600">得分</span>
                    </div>
                    <p className="text-sm text-slate-600">合并数字会增加总分</p>
                  </div>
                </div>
              </section>
              
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  游戏规则
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                    <span className="text-slate-600">每次移动时，所有瓷砖都会向选定方向滑动</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                    <span className="text-slate-600">相同瓷砖在移动中碰撞时会合并成一个</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                    <span className="text-slate-600">合并后的瓷砖在同一次移动中不能再次合并</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                    <span className="text-slate-600">每次有效移动后都会出现一个新的瓷砖</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                    <span className="text-slate-600">当网格填满且无法进行有效移动时，游戏结束</span>
                  </div>
                </div>
              </section>
              
              <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🏅</span>
                  获胜条件
                </h2>
                <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                  <p className="text-slate-600 leading-relaxed">
                    当你成功创建一个<span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent font-bold text-lg">2048</span>瓷砖时，你就赢了！
                    但你可以选择继续游戏，尝试创建更大的数字，挑战你的极限！
                  </p>
                </div>
              </section>
              
              <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">💡</span>
                  策略提示
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm">🏰</span>
                    </div>
                    <span className="text-slate-600">将最大数字保持在角落</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm">🎯</span>
                    </div>
                    <span className="text-slate-600">专注一个方向避免随意移动</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm">📊</span>
                    </div>
                    <span className="text-slate-600">保持最高数字序列排列</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm">🎨</span>
                    </div>
                    <span className="text-slate-600">为新瓷砖留出空间</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                      <span className="text-sm">⏰</span>
                    </div>
                    <span className="text-slate-600">耐心等待合适机会</span>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="mt-10 text-center space-x-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
              >
                🚀 开始游戏
              </Link>
              <Link
                to="/about"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
              >
                📖 关于游戏
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
