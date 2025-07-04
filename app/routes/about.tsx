import { Link } from "react-router";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">关于 2048</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">关于游戏</h2>
              <p className="text-gray-600 mb-4">
                2048是一个经典的数字拼图游戏，最初由Gabriele Cirulli在2014年创建。
                这个版本使用React Router V7和TypeScript重新实现，提供了现代的用户体验。
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">技术栈</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>React Router V7:</strong> 现代的React路由解决方案</li>
                <li><strong>TypeScript:</strong> 类型安全的JavaScript</li>
                <li><strong>Tailwind CSS:</strong> 实用优先的CSS框架</li>
                <li><strong>Vite:</strong> 快速的构建工具</li>
                <li><strong>pnpm:</strong> 高效的包管理器</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">特性</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>响应式设计，支持桌面和移动设备</li>
                <li>流畅的动画效果</li>
                <li>键盘和触摸控制</li>
                <li>游戏状态管理</li>
                <li>分数跟踪</li>
                <li>胜利和失败状态处理</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">版本信息</h2>
              <p className="text-gray-600">
                版本 1.0.0 - 基于React Router V7的现代实现
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-center space-x-4">
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              开始游戏
            </Link>
            <Link
              to="/instructions"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              游戏说明
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
