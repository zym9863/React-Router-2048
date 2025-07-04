import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const linkClasses = (path: string) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
    if (isActive(path)) {
      return `${baseClasses} bg-blue-600 text-white`;
    }
    return `${baseClasses} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;
  };
  
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            2048
          </Link>
          
          <div className="flex space-x-2">
            <Link to="/" className={linkClasses("/")}>
              游戏
            </Link>
            <Link to="/instructions" className={linkClasses("/instructions")}>
              说明
            </Link>
            <Link to="/about" className={linkClasses("/about")}>
              关于
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
