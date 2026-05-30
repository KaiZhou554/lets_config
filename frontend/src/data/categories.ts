import {
  AppFolder20Regular,
  CommentLightning20Regular,
  EmojiSparkle20Regular,
  WindowConsole20Regular,
  Box20Regular,
} from "@vicons/fluent";
import type { Category } from "../types";

export const categories: Category[] = [
  {
    id: "mc",
    name: "MC命令",
    icon: AppFolder20Regular,
    phrases: [
      { label: "获得命令方块", text: "/give @p command_block" },
      { label: "切换游戏模式", text: "/gamemode creative" },
      { label: "设置世界时间", text: "/time set day" },
      { label: "传送玩家", text: "/tp @p 0 64 0" },
    ],
  },
  {
    id: "social",
    name: "交际用语",
    icon: CommentLightning20Regular,
    phrases: [
      { label: "初次见面", text: "你好，很高兴认识你！" },
      { label: "感谢表达", text: "非常感谢你的帮助。" },
      { label: "委婉拒绝", text: "抱歉，我可能没办法参加。" },
      { label: "结束对话", text: "好的，我们下次再聊。" },
    ],
  },
  {
    id: "prompt",
    name: "Prompt",
    icon: EmojiSparkle20Regular,
    phrases: [
      {
        label: "降AI率",
        text: `帮我降AI率，将修改的地方加粗，只输出修改后的文本：
一是多添加使用 的、了、到、过、会、有、能、把 这种废话字
二是把首先、其次、最后这种经典人机删了，可以用一是、二是、三是，一方面、另一方面，第一点（个方面）、第二点（个方面）、第三点（个方面）代替
三是减少句号。的使用，用，或；代替
四是把短句合成长句，经常出现的词换成同义词，把比较标准正式的词换成简单易懂的代替
五是改变句子的前后结构，如"产量提升了40%"改成"提升了40%的产量"等等，把字句，被动句交换使用等等，如40%的产量得到了提升之类的`,
      },
    ],
  },
  {
    id: "pwshcommand",
    name: "PowerShell",
    icon: WindowConsole20Regular,
    phrases: [
      {
        label: "按后缀名归类文件",
        text: "ls -File | % {$d=$_.Name.Split('.')[-1]; ni $d -ItemType Directory -Force; mv $_ $d}",
      },
    ],
  },
  {
    id: "frontend",
    name: "创建前端项目",
    icon: Box20Regular,
    phrases: [
      {
        label: "创建 Vue",
        text: "npm create vue@latest",
      },
      {
        label: "Naive UI",
        text: "npm i -D naive-ui",
      },
      {
        label: "vicons",
        text: "npm i -D @vicons/fluent",
      },
      {
        label: "Tailwind CSS",
        text: "npm install tailwindcss @tailwindcss/vite",
      },
      {
        label: "Add tailwindcss to vite.config.ts",
        text: "import tailwindcss from '@tailwindcss/vite'",
      },
      {
        label: "Use tailwindcss in vite.config.ts",
        text: "tailwindcss(),",
      },
      {
        label: "Import Tailwind CSS",
        text: '@import "tailwindcss";',
      },
    ],
  },
];
