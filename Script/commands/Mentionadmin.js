module.exports.config = {
 name: "adminmention",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU ",
 description: "Bot will reply when someone tags any of the admins",
 commandCategory: "Other",
 usages: "@",
 cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
 const adminIDs = ["61578348665752", "", "61589810691589"].map(String); //update your UID✅
 
 if (adminIDs.includes(String(event.senderID))) return;

 const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
 const isMentioningBoss = adminIDs.some(adminID => mentionedIDs.includes(adminID));

 if (isMentioningBoss) {
 const replies = [
 "ডাকাডাকি করিস না বস ব্যস্ত আছে 😒😌",
 "বস এক আবালে আপনাকে মেনশন দিছে 😑🌚😁",
 "যেভাবে মেনশন দিতাচত মনে হয় তোর গার্লফ্রেন্ডটারে , আমার বস্ পালায় নিয়ে গেছে 🫥😒",
 "বস এক পাগল ছাগল , আপনাকে ডাকতেছে 🐸🫵",
 "বস এক হালায় আপনার নাম ধরছে , আপনি শুধু একবার আদেশ করুন, আজকে হালার নানিরে চমলক্ক করে দিমু 😑🥴",
 "বস্ এখন সংসারে সামলাতে ব্যস্ত Disturb  করিস নাহ🙃😮💨",
 "সমস্যা হলে বসের ইনবক্স এ যাও😗😁",
 "বস এখন ব্যস্ত আছে , কিছু বলতে হলে ইনবক্স এ গিয়া বল",
 "বস এখন আমার সাথে মিটিং এ আছে , মেনশন দিস না 🙂",
 "বস এখন ব্যস্ত আছে , কি বলবি আমাকে বল",
 "মেনশন না দিয়া বস বল বস 🥵💋",
 "কিরে তোর এতো সাহস আমার বসের নাম ধরিস😾🫵",
 "এতো মেনশন না দিয়া তোর গার্লফ্রেন্ডটারে দিয়া দে😹🐸",
 "মেনশন দিয়ে লাভ নাই বস এখন বিজি আছেন😗😘"
 ];
 return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
 }
};

module.exports.run = async function() {};
