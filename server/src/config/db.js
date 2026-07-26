const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(process.env.mongoose_url);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error");
        throw err;
    }
}

module.exports = main;