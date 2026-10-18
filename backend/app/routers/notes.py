from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate, NoteResponse

router = APIRouter(prefix="/notes", tags=["Notes"])


# Get all notes
@router.get("/", response_model=list[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).order_by(Note.updated_at.desc()).all()


# Create a note
@router.post("/", response_model=NoteResponse, status_code=201)
def create_note(data: NoteCreate, db: Session = Depends(get_db)):
    title = data.title.strip()

    if not title:
        raise HTTPException(status_code=422, detail="Note title cannot be empty")

    note = Note(
        title=title,
        content=data.content,
        updated_at=datetime.now(timezone.utc),
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


# Update a note
@router.put("/{note_id}", response_model=NoteResponse)
def update_note(
    note_id: int,
    data: NoteUpdate,
    db: Session = Depends(get_db),
):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    updates = data.model_dump(exclude_unset=True)

    if "title" in updates and updates["title"] is not None:
        updates["title"] = updates["title"].strip()

        if not updates["title"]:
            raise HTTPException(
                status_code=422,
                detail="Note title cannot be empty",
            )

    for key, value in updates.items():
        setattr(note, key, value)

    note.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(note)

    return note


# Delete a note
@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()