from pydantic import BaseModel, ConfigDict, Field


class GoodHabitCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    description: str | None = None


class GoodHabitResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    streak: int
    done: bool