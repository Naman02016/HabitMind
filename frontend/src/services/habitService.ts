const API_URL = "http://127.0.0.1:8000";

export interface Habit {
  id: number;
  name: string;
  description: string | null;
  streak: number;
  done: boolean;
}

export interface HabitCreate {
  name: string;
  description?: string | null;
}

export async function getHabits(): Promise<Habit[]> {
  const response = await fetch(`${API_URL}/habits/`);

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }

  return response.json();
}
export async function createHabit(
  habit: HabitCreate
): Promise<Habit> {
  const response = await fetch(`${API_URL}/habits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });

  if (!response.ok) {
    throw new Error("Failed to create habit");
  }

  return response.json();
}
export async function updateHabit(
  id: number,
  updates: Partial<Habit>
): Promise<Habit> {
  const response = await fetch(`${API_URL}/habits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update habit");
  }

  return response.json();
}
export async function deleteHabit(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/habits/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete habit");
  }
}