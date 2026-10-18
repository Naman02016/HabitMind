from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class BadHabitCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    description: str | None = None


class BadHabitUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=80)
    description: str | None = None
    streak: int | None = Field(default=None, ge=0)
    status: Literal["unconfirmed", "avoided", "occurred"] | None = None


class BadHabitResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    streak: int
    status: Literal["unconfirmed", "avoided", "occurred"]