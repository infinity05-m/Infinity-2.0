const axios = require("axios");

const apiList = "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "Miss you too jans🥺🤌",
    "miss u too": "Awww চলো পালায় যাই😏💖",
    "kiss deo": "আমি যাকে তাকে কিস দেই নাহ পিও🥴তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "🙂": "senti na kheye amake khao🫣",
    "hi": " hlw সোনা ভালো আছো?😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "good night": "Sweet Dream babu… 😏💤",
    "tor bal": "~ আমার তো আছে..এখনো উঠে নাই নাকি তোমার?? 🤖",
    "Alif": " ভাইকে disturb করিছ নাহ..উনি ভাবীর সাথে busy আছে..!👀",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Md.Ahsan Habib Alif☜\nFacebook: https://www.facebook.com/a.a.a.h.alif\nWhatsApp: +8801717685362",
    "admin": "She is Mushfika Jahan Moon তাকে সবাই Owner Munu হিসেবে চিনে😘☺️",
    "bby": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ😑চুপ কর পাগল ছাগল😑",
    "Assalamualaikum": "Wa alaikumus Salam wa rohmatulloh ❤️‍🩹",
    "fork": "যা ভাগ আবাল fork চায় আবার 🥴",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": " welcome.আবার সাহায্য চেয়ে disturb করবেন নাহ.!🐸🥵",
    "i love you": "আর কতো লাগে তোর..🤨 লুচ্চামি বাদ দেহ🥱",
    "love you": "সব Chipay নেওয়ার ধান্দা 👀🐸",
    "by": "জান আমাকে রেখে চলে যাচ্ছো..!🥹",
    "ami moon": "আসসালামু আলাইকুম ভাবী কেমন আছেন..?☺️ Alif  বস আপনার জন্য অপেক্ষা করছে..☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌Munu 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭💖",
    "pic de": "এন থেকে সর...দুরে গিয়া মর😒",
    "to ki korbo?": "আসো প্রেম করি..!🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "mejaj gorom": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "kemon aso": "Alhamdulillah.. tumi?🌸",
    "ki koro": "তোমার কথা ভাবতে ছি জানু 😚",
    "ki koros": "জালাইছ নাহ চুপ থাক 🥱",
    "bot": "ভেবাইস নাহ😑 কি বলবি বল😏",
    "valo aso": " Alhamdulillah পিও.. Tumi kemon acho?, 😌💞",
    "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂",
    "breakup": "চিন্তা করিস না… owner তো আছেই তোকে নতুন জন দিয়া দিবে 😎🔥",
    "tui ke": "আমি তোর বস Moon এর ChatBot 😏",
    "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "love": "ফাঁদে পা দিও না পিও..😁"
  };

  if (!responses[msg]) return;

  if (!global.client.handleReply) global.client.handleReply = [];

  return api.sendMessage(
    responses[msg],
    threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "sahu"
      });
    },
    messageID
  );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!global.client.handleReply) global.client.handleReply = [];

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
