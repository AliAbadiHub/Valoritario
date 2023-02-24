newFunction(dotenv.config());

// 👇️ if you use ES6 you only need this line to import
// import 'dotenv/config'

console.log(process.env.DB_USER); // 👉️ "james_doe"
console.log(process.env.ENV); // 👉️ "dev"
console.log(process.env.DB_PORT); // 👉️ "1234"
console.log(process.env.REFRESH_SECRET);
console.log(process.env.ACCESSS_SECRET);
