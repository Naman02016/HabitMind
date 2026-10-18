from sqlalchemy import Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class CustomList(Base):
    __tablename__ = "custom_lists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(80), nullable=False)

    items = relationship(
        "ListItem",
        back_populates="custom_list",
        cascade="all, delete-orphan",
    )


class ListItem(Base):
    __tablename__ = "list_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    text: Mapped[str] = mapped_column(String(150), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    list_id: Mapped[int] = mapped_column(
        ForeignKey("custom_lists.id", ondelete="CASCADE"),
        nullable=False,
    )

    custom_list = relationship("CustomList", back_populates="items")