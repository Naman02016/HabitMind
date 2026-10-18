from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi import HTTPException
from pydantic import BaseModel

from app.database.connection import get_db
from app.models.good_habit import GoodHabit
from app.schemas.good_habit import GoodHabitCreate, GoodHabitResponse

router = APIRouter(
    prefix="/habits",
    tags=["Good Habits"],
)


@router.post(
    "/",
    response_model=GoodHabitResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_habit(
    habit: GoodHabitCreate,
    db: Session = Depends(get_db),
):
    new_habit = GoodHabit(
        name=habit.name.strip(),
        description=habit.description,
    )

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return new_habit


@router.get(
    "/",
    response_model=list[GoodHabitResponse],
)
def get_habits(db: Session = Depends(get_db)):
    return db.query(GoodHabit).order_by(GoodHabit.id).all()


class GoodHabitUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    streak: int | None = None
    done: bool | None = None


@router.put("/{habit_id}", response_model=GoodHabitResponse)
def update_habit(
    habit_id: int,
    habit_update: GoodHabitUpdate,
    db: Session = Depends(get_db),
):
    habit = db.query(GoodHabit).filter(
        GoodHabit.id == habit_id
    ).first()

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    update_data = habit_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(habit, key, value)

    db.commit()
    db.refresh(habit)

    return habit
@router.delete("/{habit_id}")
def delete_habit(
    habit_id: int,
    db: Session = Depends(get_db),
):
    habit = db.query(GoodHabit).filter(
        GoodHabit.id == habit_id
    ).first()

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    db.delete(habit)
    db.commit()

    return {"message": "Habit deleted successfully"}