const API_URL = "http://127.0.0.1:8000";

// ---------- TYPES ----------

export interface ListItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface CustomList {
  id: number;
  title: string;
  items: ListItem[];
}

export interface Note {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

export interface ListCreate {
  title: string;
}

export interface ItemCreate {
  text: string;
}

export interface NoteCreate {
  title: string;
  content: string;
}

// ---------- LISTS ----------

export async function getLists(): Promise<CustomList[]> {
  const response = await fetch(`${API_URL}/lists/`);

  if (!response.ok) {
    throw new Error("Failed to fetch lists");
  }

  return response.json();
}

export async function createList(data: ListCreate): Promise<CustomList> {
  const response = await fetch(`${API_URL}/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create list");
  }

  return response.json();
}

export async function updateList(
  id: number,
  updates: Partial<ListCreate>,
): Promise<CustomList> {
  const response = await fetch(`${API_URL}/lists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update list");
  }

  return response.json();
}

export async function deleteList(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/lists/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete list");
  }
}

// ---------- LIST ITEMS ----------

export async function createItem(
  listId: number,
  data: ItemCreate,
): Promise<ListItem> {
  const response = await fetch(`${API_URL}/lists/${listId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create list item");
  }

  return response.json();
}

export async function updateItem(
  id: number,
  updates: Partial<Pick<ListItem, "text" | "completed">>,
): Promise<ListItem> {
  const response = await fetch(`${API_URL}/lists/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update list item");
  }

  return response.json();
}

export async function deleteItem(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/lists/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete list item");
  }
}

// ---------- NOTES ----------

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(`${API_URL}/notes/`);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}

export async function createNote(data: NoteCreate): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
}

export async function updateNote(
  id: number,
  updates: Partial<NoteCreate>,
): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
}

export async function deleteNote(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}