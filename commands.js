const commands = [
  // ----- 設定
  {
    callname: "ヘルプ",
    desciption: "",
    calling: function (book_id = "") {
      const MyStr = new MyString();
      let arr = commands.map((c) => {
        return `#_${c.callname}` + (c.desciption!="") ? `^${c.callname}` : "";
      });
      let message = "[コマンド一覧]^" + arr.join("^");
      return {
        lineNotification: {
          flag: true,
          message: { type: 'text', text: MyStr.spchars(MyStr.sptrim(message)), "quickReply": QuickReplyTemplates.standby }
        },
        ucashe: {
          flag: false,
          override: ""
        }
      }
    },
    execute: function (book_id = "", arg = "") {}
  }
];