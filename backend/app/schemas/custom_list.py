from pydantic import BaseModel, ConfigDict, Field


class ListItemCreate(BaseModel):
    text: str = Field(min_length=1, max_length=150)


class ListItemUpdate(BaseModel):
    text: str | None = Field(default=None, min_length=1, max_length=150)
    completed: bool | None = None


class ListItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    completed: bool


class CustomListCreate(BaseModel):
    title: str = Field(min_length=1, max_length=80)


class CustomListUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=80)


class CustomListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    items: list[ListItemResponse] = []