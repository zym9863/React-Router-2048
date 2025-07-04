import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const linkClasses = (path: string) => {
    const baseClasses = "px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:-translate-y-0.5";
    if (isActive(path)) {
      return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`;
    }
    return `${baseClasses} text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:shadow-md`;
  };
  
  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            2048
          </Link>
          
          <div className="flex space-x-2">
            <Link to="/" className={linkClasses("/")}>
              🎮 游戏
            </Link>
            <Link to="/instructions" className={linkClasses("/instructions")}>
              📖 说明
            </Link>
            <Link to="/about" className={linkClasses("/about")}>
              ℹ️ 关于
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
