import { CHARACTER_AVATARS, CHARACTER_COLORS } from '../data/characterData';

export type LineType = 'narrator' | 'dialog' | 'thought';

export interface ScriptLine {
  type: LineType;
  speaker?: string;
  text: string;
  color?: string;
  avatar?: string;
}

/** 角色名:"对话内容" */
const DIALOG_RE = /^(.+?):"(.+)"$/s;

/** 角色名:*内心独白* */
const THOUGHT_RE = /^(.+?):\*(.+)\*$/s;

/**
 * 需要从解析前移除的思维/规划标签对及其内容
 * [开始标记, 结束标记]
 */
const STRIP_PAIRS: [string, string][] = [
  ['<Chain_of_Thought>', '</Chain_of_Thought>'],
  ['<draft>', '</draft>'],
  ['<think>', '</think>'],
  ['<thinking>', '</thinking>'],
  // <konatan_planning~> 由 cutAboveKonatanEnd 特殊处理，不走正则删除
];

/** 转义正则特殊字符 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 在提取正文之前清理原始文本：
 * 1. 切掉 </konatan_planning~> 及之前的所有内容
 * 2. 删除所有思维/规划标签对及其内容
 *
 * 这样即使思维链内部出现了 <content> 也不会干扰正文提取
 */
function stripThinkingZones(raw: string): string {
  let text = raw;

  // ── 切掉 </konatan_planning~>（含）之前的所有内容 ──
  const konatanEnd = text.indexOf('</konatan_planning~>');
  if (konatanEnd !== -1) {
    text = text.slice(konatanEnd + '</konatan_planning~>'.length);
  }

  // ── 删除所有思维标签对 ──
  for (const [open, close] of STRIP_PAIRS) {
    const re = new RegExp(escapeRegExp(open) + '[\\s\\S]*?' + escapeRegExp(close), 'gi');
    text = text.replace(re, '');
  }

  return text;
}

/**
 * 从 AI 消息文本中提取 <content> 标签内的剧本内容，解析为 ScriptLine[]
 * 按换行切段，一行 = 一次点击推进
 * 11 个角色均通过正则可以自动识别，无需硬编码名单
 */
export function parseScriptContent(rawText: string): ScriptLine[] {
  const cleaned = stripThinkingZones(rawText);
  const contentMatch = cleaned.match(/<content>([\s\S]*?)<\/content>/);
  if (!contentMatch) return [];

  const content = contentMatch[1].trim();
  const segments = content.split(/\n/).filter(s => s.trim());

  return segments.map(segment => {
    const trimmed = segment.trim();

    const dialogMatch = trimmed.match(DIALOG_RE);
    if (dialogMatch) {
      const speaker = dialogMatch[1].trim();
      return {
        type: 'dialog' as const,
        speaker,
        text: dialogMatch[2],
        color: CHARACTER_COLORS[speaker] || 'bg-pop-cyan',
        avatar: isUser(speaker) ? undefined : CHARACTER_AVATARS[speaker],
      };
    }

    const thoughtMatch = trimmed.match(THOUGHT_RE);
    if (thoughtMatch) {
      const speaker = thoughtMatch[1].trim();
      return {
        type: 'thought' as const,
        speaker,
        text: thoughtMatch[2],
        color: CHARACTER_COLORS[speaker] || 'bg-pop-cyan',
        avatar: isUser(speaker) ? undefined : CHARACTER_AVATARS[speaker],
      };
    }

    return { type: 'narrator' as const, text: trimmed };
  });
}

/** <user> 或 我 不需要立绘 */
function isUser(speaker: string): boolean {
  return speaker === '<user>' || speaker === '我';
}