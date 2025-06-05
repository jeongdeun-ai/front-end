import { instance } from "./instance";

export const getMedicineSchedule = async () => {
  try {
    const response = await instance.get("/schedule/get-medicine-plan/");
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine schedule:", error);
    if (error.response && error.response.status === 400) {
      return { schedules: [] };
    }
    throw error;
  }
};

export const getEventsForDate = async (date) => {
  try {
    const response = await instance.get(
      `/schedule/get-events-for-specific-date/?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    if (error.response && error.response.status === 400) {
      // Handle duplicate event error
      return [];
    }
    throw error;
  }
};
