/*
  ** 文字定義 **
  LINE = LN / ln
  User = usr / Usr
*/
const TOKEN = "/8kuvVd+3q9yRoVhy9d7uP0xl6torvos96uAGRtNmubwvMlkk6MmB9GiZCIOVFEF8oY1b73HM07bFjubN8YGqbKCQAa0SkfqXyz95muuVk03kqPNPBhp013RK/G3HtSfZEulNo14XVTDePhNn8WdhQdB04t89/1O/w1cDnyilFU=";
const SendExec = false;

const HelpCmds = ["##パスワード?", "##?"];
/* HelpCmds　- FnHelp -> インデックス対応付け */
const FnHelp = [
  {
    name: "f_gen_password",
    regex: /^##パスワード$/,
    text: `[機能] 'パスワード生成'^構文 - ##パスワード<BR><111|99912>[<BR>PWDのメモなど]^説明 - 使用文字のみ指定時：1|0を用いて[数字|大文字|記号]の順に指定. default:'110'^桁数も指定するとき、前述に続いて桁数を入力`
  },
  {
    name: "f_sticky_note",
    regex: /^##.+/,
    text: `[機能] '付箋管理'^構文 - ##{文字列}<BR><コンテンツ1><BR><コンテンツ2>...^説明 - 一行目に付箋の名前にハッシュタグを2つつけ、改行してコンテンツを記述する. コンテンツは改行によって複数登録できる. コンテンツを記述せずに送信すると、当該付箋に登録されたコンテンツを表示する. ハッシュタグを3つつけると改行を無視する^予約タグ: [タグ|一覧] タグ一覧を取得`
  }
]

// 特殊文字置き換え (対象文字列)
function spchar(raw_text) {
  let output = raw_text.replace(/#Y/g, "\xA5"); // "#Y"->YEN記号
  output = output.replace(/\^/g, "\n");          // "^"->改行記号
  return output;
}