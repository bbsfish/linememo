const BookId = PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
const AccessToken = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
Logger = BetterLog.useSpreadsheet(BookId);
const MyStr = new MyString();

function doPost(e) {
  try {
    if (e == undefined) throw new Error("doPost().Err: 空の e オブジェクト");
    Logger.log("doPost().GetPOST: %s", e);
    const Event = JSON.parse(e.postData.contents).events[0];
    if (Event.message.type != "text") throw new Error("doPost().Err: 未対応のイベントタイプ");
    const Lc = new LineBotSDK.Client({ channelAccessToken: AccessToken });
    const Calling = (Event.message.text.split(/\r?\n|\s/))[0];
    const Command = (function(){  // "CALLNAME" ARG1 ARG2...
      for (const c of commands) {
        if (Calling == c.callname) return c;
      }
    })();
    const Args = (function(){     // CALLNAME "ARG1 ARG2..."
      let arr = Event.message.text.match(/\r?(?<=^.+(\n|\s)).+/);
      if (arr==null) return "" // 引数なし
      else return arr[0];
    })();
    if (Args=="") {
      // 引数なし
      let res = Command.calling(BookId);
      if (res.lineNotification.flag) {
        Lc.replyMessage(Event.replyToken, [res.lineNotification.message]);
      }
      if (res.ucashe.flag) {
        // User Cahse を res.ucashe.override (String)で書き換え
      }
    } else {
      let res = Command.execute(BookId, Args);
      if (res.lineNotification.flag) {
        Lc.replyMessage(Event.replyToken, [res.lineNotification.message]);
      }
      if (res.ucashe.flag) {
        // User Cahse を res.ucashe.override (String)で書き換え
      }
    }
  } catch (e) {
    e = (typeof e === "string") ? new Error(e) : e;
    Logger.severe(
      "%s: %s (line %s, file \"%s\"). Stack: \"%s\"",
      e.name || "", e.message || "", e.lineNumber || "", e.fileName || "", e.stack || ""
    );
    throw e;
  }
}