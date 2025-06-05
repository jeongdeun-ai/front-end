import { instance } from "./instance";
import { format } from "date-fns";

export const getRecordsByDate = async (date) => {
  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  const url = `/record/get-target-date-chat-logs/?date=${formattedDate}`;

  console.log("[recordsApi] Fetching records from:", url);

  try {
    const response = await instance.get(url);

    console.log("[recordsApi] Received response:", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("[recordsApi] Error fetching records:", {
      url,
      status: error.response?.status,
      data: error.response?.data,
      message: errorMessage,
    });
    throw new Error(errorMessage || "Failed to fetch records");
  }
};
