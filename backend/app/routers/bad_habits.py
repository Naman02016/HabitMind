from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.bad_habit import BadHabit
from app.schemas.bad_habit import (
    BadHabitCreate,
    BadHabitUpdate,
    BadHabitResponse,
)

router = APIRouter(prefix="/bad-habits", tags=["Bad Habits"])


@router.get("/", response_model=list[BadHabitResponse])
def get_bad_habits(db: Session = Depends(get_db)):
    return db.query(BadHabit).all()


@router.post("/", response_model=BadHabitResponse, status_code=201)
def create_bad_habit(
    habit: BadHabitCreate,
    db: Session = Depends(get_db),
):
    new_habit = BadHabit(
        name=habit.name.strip(),
        description=habit.description,
        streak=0,
        status="unconfirmed",
    )

    if not new_habit.name:
        raise HTTPException(status_code=422, detail="Habit name cannot be empty")

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return new_habit


@router.put("/{habit_id}", response_model=BadHabitResponse)
def update_bad_habit(
    habit_id: int,
    updates: BadHabitUpdate,
    db: Session = Depends(get_db),
):
    habit = db.query(BadHabit).filter(BadHabit.id == habit_id).first()

    if habit is None:
        raise HTTPException(status_code=404, detail="Bad habit not found")

    update_data = updates.model_dump(exclude_unset=True)

    if "name" in update_data:
        update_data["name"] = update_data["name"].strip()

        if not update_data["name"]:
            raise HTTPException(
                status_code=422,
                detail="Habit name cannot be empty",
            )

    for key, value in update_data.items():
        setattr(habit, key, value)

    db.commit()
    db.refresh(habit)

    return habit


@router.delete("/{habit_id}", status_code=204)
def delete_bad_habit(
    habit_id: int,
    db: Session = Depends(get_db),
):
    habit = db.query(BadHabit).filter(BadHabit.id == habit_id).first()

    if habit is None:
        raise HTTPException(status_code=404, detail="Bad habit not found")

    db.delete(habit)
    db.commit()

    return None