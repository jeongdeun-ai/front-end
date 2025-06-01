import { instance } from "./instance";

export const getDailyReport = async (date) => {
  try {
    const response = await instance.get(
      `/home/get-daily-report-update/?${date}`
    );
    console.log("Daily report data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily report:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error.response?.data || error.message;
  }
};

export const getParentEventInfo = async () => {
  try {
    const response = await instance.get("/home/get-parent-event-info/");
    console.log("API Response:", response.data); // Log the full response
    return response.data;
  } catch (error) {
    console.error("Error fetching parent event info:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error.response?.data || error.message;
  }
};
