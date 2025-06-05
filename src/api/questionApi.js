import { instance } from "./instance";

export const generateRecommendedQuestion = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await instance.post(
      "/question/generate-recommend-question/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating recommended question:", error);
    throw error;
  }
};

export const sendDirectQuestion = async (question) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await instance.post("/question/direct-question-to-parent/", {
      direct_question: question,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending direct question:", error);
    throw error;
  }
};
