from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.good_habits import router as good_habits_router
from app.routers.bad_habits import router as bad_habits_router
from app.routers.custom_lists import router as custom_lists_router
from app.routers.notes import router as notes_router
from app.database.connection import engine
from app.database.base import Base
from app.models.good_habit import GoodHabit
from app.models.bad_habit import BadHabit
from app.models.custom_list import CustomList, ListItem
from app.models.note import Note
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HabitMind API",
    description="API for tracking habits, lists, notes, and personal progress.",
    version="1.0.0",
)

app.include_router(good_habits_router)
app.include_router(bad_habits_router)
app.include_router(custom_lists_router)
app.include_router(notes_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Welcome to HabitMind API"}