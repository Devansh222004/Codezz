require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const main = require("./src/config/db");
const redisClient = require("./src/config/redis");

const authRouter = require("./src/routes/userAuth");
const problemRouter = require("./src/routes/problemRouter");
const submitRouter = require("./src/routes/submitProblem");
const aiChatRouter = require("./src/routes/aiChatRouter");

const app = express();

/* -------------------- Middlewares -------------------- */

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://codezz-zeta.vercel.app"
        ],
        credentials: true
    })
);

/* -------------------- Routes -------------------- */

app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);
app.use("/ai", aiChatRouter);

/* -------------------- Health Route -------------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Codezz Backend Running",
    });
});

/* -------------------- Start Server -------------------- */

async function startServer() {
    try {
        // Connect MongoDB
        await main();
        console.log("✅ MongoDB Connected");

        // Connect Redis (optional)
        if (redisClient) {
            try {
                if (!redisClient.isOpen) {
                    await redisClient.connect();
                }
                console.log("✅ Redis Connected");
            } catch (err) {
                console.warn("⚠️ Redis unavailable. Continuing without Redis.");
                console.warn(err.message);
            }
        }

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ Server failed to start");
        console.error(err);
        process.exit(1);
    }
}

startServer();

/* -------------------- Graceful Shutdown -------------------- */

process.on("SIGINT", async () => {
    try {
        if (redisClient && redisClient.isOpen) {
            await redisClient.quit();
        }
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
});

process.on("SIGTERM", async () => {
    try {
        if (redisClient && redisClient.isOpen) {
            await redisClient.quit();
        }
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
});