const API_URL = "http://127.0.0.1:8000";

export interface BadHabit {
  id: number;
  name: string;
  description: string | null;
  streak: number;
  status: "unconfirmed" | "avoided" | "occurred";
}

export interface BadHabitCreate {
  name: string;
  description?: string | null;
}

export async function getBadHabits(): Promise<BadHabit[]> {
  const response = await fetch(`${API_URL}/bad-habits/`);

  if (!response.ok) {
    throw new Error("Failed to fetch bad habits");
  }

  return response.json();
}

export async function createBadHabit(
  habit: BadHabitCreate
): Promise<BadHabit> {
  const response = await fetch(`${API_URL}/bad-habits/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });

  if (!response.ok) {
    throw new Error("Failed to create bad habit");
  }

  return response.json();
}

export async function updateBadHabit(
  id: number,
  updates: Partial<BadHabit>
): Promise<BadHabit> {
  const response = await fetch(`${API_URL}/bad-habits/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update bad habit");
  }

  return response.json();
}

export async function deleteBadHabit(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/bad-habits/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete bad habit");
  }
}   