const fs = require('fs');
const crypto = require('crypto');

// 生成数、桁数、有効時間（分）
const NUM_CODES = 100;
const OTP_LENGTH = 6;
const EXPIRE_MINUTES = 60;

// ランダムな数字コードを作る関数
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ランダムなキーを作る関数
function generateKey() {
  return crypto.randomBytes(4).toString('hex');
}

// 有効期限のタイムスタンプ
function getExpireTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + EXPIRE_MINUTES);
  return now.toISOString();
}

// OTP一覧生成
const data = [];
for (let i = 0; i < NUM_CODES; i++) {
  const otp = generateOTP();
  const key = generateKey();
  const expireAt = getExpireTime();
  data.push({ otp, key, expireAt });
}

// CSV形式に整形
const csvContent = "otp,key,expireAt\n" + data.map(d => `${d.otp},${d.key},${d.expireAt}`).join("\n");

// 書き込み
fs.writeFileSync("otp_codes.csv", csvContent);
console.log("✅ ワンタイムコードを生成して保存しました（otp_codes.csv）");
