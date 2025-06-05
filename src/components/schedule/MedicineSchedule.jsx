import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMedicineSchedule } from "../../api/scheduleApi";

const TIME_SLOT_LABELS = {
  morning: "아침 약",
  lunch: "점심 약",
  dinner: "저녁 약",
  before_sleep: "취침 전 약",
};

const TIME_SLOT_TIMES = {
  morning: "오전 8:00",
  lunch: "오후 12:30",
  dinner: "오후 6:30",
  before_sleep: "오후 10:00",
};

const MedicineSchedule = () => {
  const [medicineData, setMedicineData] = useState({ schedules: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicineSchedule = async () => {
      try {
        setIsLoading(true);
        const data = await getMedicineSchedule();

        // Define the desired order of time slots
        const timeSlotOrder = ["morning", "lunch", "dinner", "before_sleep"];

        // Sort the schedules array based on the defined order
        const sortedSchedules = [...(data.schedules || [])].sort((a, b) => {
          return (
            timeSlotOrder.indexOf(a.time_slot) -
            timeSlotOrder.indexOf(b.time_slot)
          );
        });

        setMedicineData({ ...data, schedules: sortedSchedules });
      } catch (err) {
        console.error("Failed to fetch medicine schedule:", err);
        setError("약 일정을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicineSchedule();
  }, []);

  if (isLoading) {
    return <LoadingText>약 일정을 불러오는 중...</LoadingText>;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container>
      {medicineData.schedules.length === 0 ? (
        <NoScheduleText>등록된 약 일정이 없습니다.</NoScheduleText>
      ) : (
        medicineData.schedules.map((schedule) => (
          <MedicineCard key={schedule.time_slot}>
            <CardHeader>
              <TimeSlot>
                {TIME_SLOT_LABELS[schedule.time_slot] || schedule.time_slot}
              </TimeSlot>
              <Time>{TIME_SLOT_TIMES[schedule.time_slot] || ""}</Time>
            </CardHeader>
            {schedule.items.map((medicine, index) => (
              <MedicineItem key={index}>
                <MedicineName>{medicine.name}</MedicineName>
                <Dose>{medicine.dose}</Dose>
              </MedicineItem>
            ))}
          </MedicineCard>
        ))
      )}
    </Container>
  );
};

export default MedicineSchedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const MedicineCard = styled.div`
  padding: 16px;

  border-radius: 14px;
  background: var(--background-primary, #fff);

  /* 그림자 */
  box-shadow: 0px 10px 40px 0px rgba(29, 22, 23, 0.07);
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TimeSlot = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
`;

const Time = styled.div`
  font-size: 14px;
  color: var(--text-tertiary);
`;

const MedicineItem = styled.div`
  padding: 13px 16px;
  margin: 8px 0;
  border: 1px solid var(--line-primary);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MedicineName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
`;

const Dose = styled.div`
  font-size: 14px;
  color: var(--text-tertiary);
`;

const LoadingText = styled.div`
  padding: 20px 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
`;

const ErrorText = styled.div`
  padding: 20px 0;
  text-align: center;
  color: var(--status-negative);
  font-size: 14px;
`;

const NoScheduleText = styled.div`
  padding: 20px 0;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 14px;
`;
