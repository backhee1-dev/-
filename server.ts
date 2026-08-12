import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route 1: Verify User's Gemini API Key
  app.post("/api/verify-key", async (req, res) => {
    try {
      const userApiKey = req.body?.apiKey || req.headers["x-gemini-api-key"];

      if (!userApiKey || typeof userApiKey !== "string" || !userApiKey.trim()) {
        return res.status(400).json({
          success: false,
          error: "API Key를 입력해 주세요.",
        });
      }

      const clientKey = userApiKey.trim();

      // Test key against Google Gemini API
      const ai = new GoogleGenAI({
        apiKey: clientKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Hello, Gemini! Key validation test.",
      });

      if (response && response.text) {
        return res.json({
          success: true,
          message: "Gemini API Key 유효성 검증 및 승인이 성공적으로 완료되었습니다.",
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "API Key 검증 응답에 실패했습니다. 올바른 키인지 확인해 주세요.",
        });
      }
    } catch (err: any) {
      // Security Rule: NEVER log raw API key in console logs or error traces!
      const status = err?.status || err?.statusCode || 500;
      const message = String(err?.message || "");

      let userFriendlyMsg = "Gemini API Key 검증 중 오류가 발생했습니다.";

      if (
        status === 400 ||
        status === 401 ||
        status === 403 ||
        message.includes("API_KEY_INVALID") ||
        message.includes("API key not valid") ||
        message.includes("UNAUTHENTICATED")
      ) {
        userFriendlyMsg =
          "유효하지 않거나 권한이 없는 Gemini API Key입니다. 입력한 키를 정확히 다시 확인해 주세요.";
      } else if (
        status === 429 ||
        message.includes("RESOURCE_EXHAUSTED") ||
        message.includes("quota")
      ) {
        userFriendlyMsg =
          "API 호출 한도가 초과되었습니다 (429). 잠시 후 다시 시도하시거나 계정 할당량을 확인해 주세요.";
      } else if (
        message.includes("fetch failed") ||
        message.includes("ENOTFOUND") ||
        message.includes("network")
      ) {
        userFriendlyMsg =
          "네트워크 연결 오류가 발생했습니다. 인터넷 연결 상태를 확인 후 다시 시도해 주세요.";
      }

      return res.status(status >= 400 && status < 600 ? status : 500).json({
        success: false,
        error: userFriendlyMsg,
      });
    }
  });

  // API Route 2: Real-time AI Career Analysis Report
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const userApiKey = req.body?.apiKey || req.headers["x-gemini-api-key"];
      const effectiveKey =
        userApiKey && typeof userApiKey === "string" && userApiKey.trim()
          ? userApiKey.trim()
          : process.env.GEMINI_API_KEY;

      if (!effectiveKey) {
        return res.status(400).json({
          success: false,
          error:
            "승인된 Gemini API Key가 없습니다. 랜딩페이지에서 API Key를 등록 및 승인해 주세요.",
        });
      }

      const { resultTitle, resultSubtitle, selectedAnswers } = req.body || {};

      const ai = new GoogleGenAI({
        apiKey: effectiveKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `당신은 대한민국 최고 명성의 커리어 컨설턴트이자 HR 인사 전략 전문가입니다.
사용자가 '커리어 밸런스 게임'을 완료하였으며 진단 결과는 다음과 같습니다:

[사용자 진단 프로필]
- 커리어 유형: ${resultTitle || "커리어 모험가"}
- 서브 타이틀: ${resultSubtitle || "일하는 스타일 진단 완료"}
${selectedAnswers ? `- 주요 밸런스 선택 데이터: ${JSON.stringify(selectedAnswers)}` : ""}

위 성향 데이터를 바탕으로 사용자에게 실질적인 도움을 주는 [맞춤형 커리어 코칭 및 스케일업 분석 리포트]를 작성해 주세요.
반드시 아래 4개 파트를 구체적이고 다정한 마크다운(Markdown) 문서 형태로 구성해 주세요:

### 🌟 1. 나만의 핵심 업무 강점 분석
- 이 캐릭터가 실제 조직과 업무 현장에서 발휘하는 차별화된 핵심 능력 3가지

### 🏢 2. 최적의 조직 문화 & 추천 직무
- 주도성을 높일 수 있는 조직 분위기와 시너지를 발휘할 만한 직무 분야

### 📝 3. 자기소개서 & 면접 핵심 어필 팁
- 서류 작성 및 면접 시 나만의 일하는 스타일을 강점으로 호감 있게 전달하는 구체적 문장 예시

### 🚀 4. 커리어 스케일업 성장 가이드
- 직장생활과 장기 커리어 발전 과정에서 기억해야 할 따뜻하고 실용적인 조언`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const analysisText =
        response.text || "AI 분석 결과를 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.";

      return res.json({
        success: true,
        analysis: analysisText,
      });
    } catch (err: any) {
      const status = err?.status || err?.statusCode || 500;
      const message = String(err?.message || "");

      let userFriendlyMsg = "AI 커리어 분석 생성 중 오류가 발생했습니다.";

      if (
        status === 400 ||
        status === 401 ||
        status === 403 ||
        message.includes("API_KEY_INVALID")
      ) {
        userFriendlyMsg =
          "API Key 승인이 유효하지 않거나 만료되었습니다. 랜딩페이지에서 Key를 다시 등록해 주세요.";
      } else if (status === 429 || message.includes("RESOURCE_EXHAUSTED")) {
        userFriendlyMsg =
          "API 호출 할당량이 초과되었습니다 (429). 잠시 후 다시 시도해 주세요.";
      }

      return res.status(status >= 400 && status < 600 ? status : 500).json({
        success: false,
        error: userFriendlyMsg,
      });
    }
  });

  // Vite Middleware integration for dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
