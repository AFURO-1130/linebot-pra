
"use strict";
// モジュール呼び出し
const crypto = require("crypto");
const line = require("@line/bot-sdk");

// インスタンス生成
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

exports.handler = (event, context, callback) => {
    // 署名検証
    const signature = crypto
        .createHmac("sha256", process.env.CHANNELSECRET)
        .update(event.body)
        .digest("base64");
    let checkHeader = (event.headers || {})["x-Line-Signature"];
    if (!checkHeader) {
        checkHeader = (event.headers || {})["x-line-signature"];
    }
    const body = JSON.parse(event.body);
    const events = body.events;
    console.log(events);

    // 署名検証が成功した場合
    if (signature === checkHeader) {
        events.forEach(async (event) => {
            let message;
            // イベントタイプごとに関数を分ける
            switch (event.type) {
                // メッセージイベント
                case "message":
                    message = await messageFunc(event);
                    break;
                // フォローイベント
                case "follow":
                    message = { type: "text", text: "追加ありがとうございます！" };
                    break;
                // ポストバックイベント
                case "postback":
                    message = await postbackFunc(event);
                    break;
            }
            // メッセージを返信
            if (message != undefined) {
                client
                    .replyMessage(body.events[0].replyToken, message)
                    .then((response) => {
                        const lambdaResponse = {
                            statusCode: 200,
                            headers: { "X-Line-Status": "OK" },
                            body: '{"result":"completed"}',
                        };
                        context.succeed(lambdaResponse);
                    })
                    .catch((err) => console.log(err));
            }
        });
    }
    // 署名検証に失敗した場合
    else {
        console.log("署名認証エラー");
    }
};

let total_point = 0;
const messageFunc = async function (event) {
    let message;
    
    message = {
        "type": "flex",
        "altText": "問題だよ",
        "contents":
        {
            "type": "bubble",
            "direction": "ltr",
            "action": {
                "type": "postback",
                "label": "あああ",
                
                "data": "あああ"
            },
            "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "Header",
                        "align": "center",
                        "contents": []
                    }
                ]
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "text",
                        "text": "金城よみかたは？　",
                        "align": "center",
                        "contents": []
                    }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "button",
                        "action": {
                            "type": "postback",
                            "label": "かねしろ",
                            
                            "data": "0"
                        },
                        "gravity": "top"
                    },
                    {
                        "type": "button",
                        "action": {
                            "type": "postback",
                            "label": "きんじょう",
                            
                            "data": "1"
                        }
                    }
                ]
            }
        }
    };

    return message;
};

//配列の仕組み
/*
   {
      event = {type:"postback",
      postback:{
        data:"hoge"
      },
      source:{
      userId : "U38xxxxxxxxxxxxx"
      }
    }
    */

    // console.log(event.type) => "postback"

const postbackFunc = async function (event) {
    let message;
    
    if (event.postback.data === "1"){
        total_point++;
        message = [{ type: "text", text: "正解だよ" },
        message = {
  "type": "flex",
  "altText": "問題だよーん",
  "contents": {
  "type": "bubble",
  "direction": "ltr",
  "action": {
    "type": "postback",
    "label": "あああ",
    
    "data": "あああ"
  },
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Header",
        "align": "center",
        "contents": []
      }
    ]
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "最近ハマってるものは？",
        "align": "center",
        "contents": []
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "料理",
          
          "data": "2"
        },
        "gravity": "top"
      },
      {
        "type": "button",

        "action": {
          "type": "postback",
          "label": "開発",
          
          "data": "3"
        }
      }
    ]
  }
}
}


];
        
        return message;

    }
    else if(event.postback.data === "0"){
        message = { type: "text", text: "もう一度考えてみよう！" };
    }
    else if(event.postback.data === "3"){
        total_point++;
        message = [{ type: "text", text: "正解だよ" },
        message = {
  "type": "flex",
  "altText": "問題だよーん",
  "contents": {
  "type": "bubble",
  "direction": "ltr",
  "action": {
    "type": "postback",
    "label": "あああ",
    
    "data": "あああ"
  },
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Header",
        "align": "center",
        "contents": []
      }
    ]
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "今持ってるラケットの本数は？",
        "align": "center",
        "contents": []
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "postback",
          "label": "５本",
          
          "data": "4"
        },
        "gravity": "top"
      },
      {
        "type": "button",

        "action": {
          "type": "postback",
          "label": "７本",
          
          "data": "5"
        }
      }
    ]
  }
}
}

];
        return message;

    }
    else if(event.postback.data === "2"){
        message = { type: "text", text: "もう一度考えてみよう！" };
    }
    
    else if(event.postback.data === "4" || "5"){
    
        message = [{ type: "text", text: "結果発表！！！" },
        message = {
  "type": "flex",
  "altText": "結果発表",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "action": {
      "type": "postback",
      "label": "あああ",
      "text": "ああ",
      "data": "あああ"
    },
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Header",
          "align": "center",
          "contents": []
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "結果発表",
          "align": "center",
          "contents": []
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": "スコアは" + total_point　+"点です",
          "align": "center",
          "contents": []
        }
      ]
    }
  }
}


];
        return message;
    };
    

       
        
    if(event.postback.data === "0" || "2" ){
        message = { type: "text", text: "もう一度考えてみよう！" };

    }
    return message;












};
