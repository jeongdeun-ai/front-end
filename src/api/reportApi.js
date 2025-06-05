import { instance } from "./instance";
import { format } from "date-fns";

export const getDailyReport = async (date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  console.log("[reportApi] Fetching daily report for date:", formattedDate);

  try {
    const response = await instance.get(
      `/record/get-target-date-report/?date=${formattedDate}`
    );

    console.log("[reportApi] Received response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    // If data is null or undefined, return default values
    const defaultReport = {
      total_chat_time: 0,
      event_success_ratio: 0,
      parent_emotion: "-",
      summary: "",
    };

    return response.data || defaultReport;
  } catch (error) {
    const errorData = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      },
    };
    console.error("[reportApi] Error fetching daily report:", errorData);
    throw error.response?.data || error.message;
  }
};
