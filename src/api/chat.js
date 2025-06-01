import { instance } from "./instance";

export const chatAPI = {
  // Get response from GPT
  getGptResponse: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await instance.post(
        "/chat/gpt-ask-parent/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting GPT response:", error);
      throw error;
    }
  },

  // Send user's audio response to GPT
  sendUserResponse: async (audioBase64) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      console.log(
        "[Chat] Sending audio to server, length:",
        audioBase64.length
      );

      const response = await instance.post(
        "/chat/parent-reply-to-gpt/",
        {
          audio_base64: audioBase64,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[Chat] Audio sent successfully");
      return response.data;
    } catch (error) {
      console.error(
        "Error sending user response:",
        {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data?.substring(0, 100) + "...", // Log first 100 chars of data
          },
        },
        error
      );
      throw error;
    }
  },

  // Get chat history for a specific date (YYYY-MM-DD format)
  getChatHistory: async (date) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await instance.get(`/chat/history/?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process the response to decode audio URLs if they're in base64
      if (response.data && Array.isArray(response.data.messages)) {
        const processedMessages = response.data.messages.map((message) => {
          if (
            message.audio_url &&
            message.audio_url.startsWith("data:audio/")
          ) {
            try {
              // Extract the base64 part of the data URL
              const base64Data = message.audio_url.split(",")[1];
              // Create a Blob URL from the base64 data
              const audioBlob = base64ToBlob(base64Data, "audio/mp3");
              message.audio_url = URL.createObjectURL(audioBlob);
            } catch (error) {
              console.error("Error processing audio URL:", error);
            }
          }
          return message;
        });

        return {
          ...response.data,
          messages: processedMessages,
        };
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  },
};

// Helper function to convert base64 to Blob
function base64ToBlob(base64, type = "") {
  try {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  } catch (error) {
    console.error("Error converting base64 to Blob:", error);
    return null;
  }
}
