import { Link } from "react-router";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navigation />
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎮</div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">关于 2048</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📖</span>
                  关于游戏
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  2048是一个经典的数字拼图游戏，最初由Gabriele Cirulli在2014年创建。
                  这个版本使用React Router V7和TypeScript重新实现，提供了现代的用户体验和优雅的视觉设计。
                </p>
              </section>
              
              <section className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  技术栈
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="font-semibold text-blue-600">React Router V7</div>
                    <div className="text-sm text-slate-600">现代的React路由解决方案</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="font-semibold text-blue-600">TypeScript</div>
                    <div className="text-sm text-slate-600">类型安全的JavaScript</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="font-semibold text-cyan-600">Tailwind CSS</div>
                    <div className="text-sm text-slate-600">实用优先的CSS框架</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                    <div className="font-semibold text-purple-600">Vite</div>
                    <div className="text-sm text-slate-600">快速的构建工具</div>
                  </div>
                </div>
              </section>
              
              <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">✨</span>
                  特性
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-slate-600">响应式设计，支持所有设备</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-slate-600">流畅的动画效果</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <span className="text-slate-600">键盘和触摸控制</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-slate-600">智能游戏状态管理</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                    <span className="text-slate-600">实时分数跟踪</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                    <span className="text-slate-600">优雅的胜负状态处理</span>
                  </div>
                </div>
              </section>
              
              <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🏷️</span>
                  版本信息
                </h2>
                <div className="bg-white/60 rounded-lg p-4 border border-white/50">
                  <div className="font-semibold text-amber-600">版本 1.0.0</div>
                  <div className="text-slate-600">基于React Router V7的现代实现，具有优美的视觉设计和流畅的用户体验</div>
                </div>
              </section>
            </div>
            
            <div className="mt-10 text-center space-x-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
              >
                🚀 开始游戏
              </Link>
              <Link
                to="/instructions"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
              >
                📚 游戏说明
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
