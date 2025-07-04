import type { Route } from "./+types/home";
import Game2048 from "../components/Game2048";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "2048 游戏 - React Router V7" },
    { name: "description", content: "经典的2048数字拼图游戏，使用React Router V7构建" },
  ];
}

export default function Home() {
  return <Game2048 />;
}
