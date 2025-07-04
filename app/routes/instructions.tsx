import { Link } from "react-router";
import Navigation from "../components/Navigation";

export default function Instructions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">2048 游戏说明</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">游戏目标</h2>
              <p className="text-gray-600">
                在4×4的网格中移动数字瓷砖，当两个相同数字的瓷砖碰撞时，它们会合并成一个更大的数字。
                你的目标是创建一个标有"2048"的瓷砖来获胜！
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">如何游戏</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>移动瓷砖：</strong> 使用方向键（↑↓←→）或者在手机上使用屏幕上的按钮</li>
                <li><strong>合并瓷砖：</strong> 当两个相同数字的瓷砖碰撞时，它们会合并成一个数字加倍的瓷砖</li>
                <li><strong>新瓷砖：</strong> 每次移动后，会在空白位置随机出现一个新的瓷砖（2或4）</li>
                <li><strong>得分：</strong> 每次合并瓷砖时，合并后的数字会加到你的总分中</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">游戏规则</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>每次移动时，所有瓷砖都会向选定方向滑动</li>
                <li>如果两个相同的瓷砖在移动中碰撞，它们会合并成一个</li>
                <li>合并后的瓷砖在同一次移动中不能再次合并</li>
                <li>每次有效移动后都会出现一个新的瓷砖</li>
                <li>当网格填满且无法进行有效移动时，游戏结束</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">获胜条件</h2>
              <p className="text-gray-600">
                当你成功创建一个2048瓷砖时，你就赢了！但你可以选择继续游戏，尝试创建更大的数字。
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">策略提示</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>尽量将最大的数字保持在角落</li>
                <li>专注于一个方向，避免随意移动</li>
                <li>保持一行或一列为最高数字序列</li>
                <li>为新瓷砖留出足够的空间</li>
                <li>耐心等待合适的移动机会</li>
              </ul>
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
              to="/about"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
            >
              关于游戏
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
