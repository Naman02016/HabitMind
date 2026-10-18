from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.custom_list import CustomList, ListItem
from app.schemas.custom_list import (
    CustomListCreate,
    CustomListUpdate,
    CustomListResponse,
    ListItemCreate,
    ListItemUpdate,
    ListItemResponse,
)

router = APIRouter(prefix="/lists", tags=["Lists"])


# Get all lists with their items
@router.get("/", response_model=list[CustomListResponse])
def get_lists(db: Session = Depends(get_db)):
    return db.query(CustomList).all()


# Create a new list
@router.post("/", response_model=CustomListResponse, status_code=201)
def create_list(data: CustomListCreate, db: Session = Depends(get_db)):
    new_list = CustomList(title=data.title.strip())

    if not new_list.title:
        raise HTTPException(status_code=422, detail="List title cannot be empty")

    db.add(new_list)
    db.commit()
    db.refresh(new_list)

    return new_list


# Rename a list
@router.put("/{list_id}", response_model=CustomListResponse)
def update_list(
    list_id: int,
    data: CustomListUpdate,
    db: Session = Depends(get_db),
):
    custom_list = db.query(CustomList).filter(CustomList.id == list_id).first()

    if not custom_list:
        raise HTTPException(status_code=404, detail="List not found")

    updates = data.model_dump(exclude_unset=True)

    if "title" in updates and updates["title"] is not None:
        updates["title"] = updates["title"].strip()

        if not updates["title"]:
            raise HTTPException(
                status_code=422,
                detail="List title cannot be empty",
            )

    for key, value in updates.items():
        setattr(custom_list, key, value)

    db.commit()
    db.refresh(custom_list)

    return custom_list


# Delete a list and its items
@router.delete("/{list_id}", status_code=204)
def delete_list(list_id: int, db: Session = Depends(get_db)):
    custom_list = db.query(CustomList).filter(CustomList.id == list_id).first()

    if not custom_list:
        raise HTTPException(status_code=404, detail="List not found")

    db.delete(custom_list)
    db.commit()


# Add an item to a list
@router.post("/{list_id}/items", response_model=ListItemResponse, status_code=201)
def create_item(
    list_id: int,
    data: ListItemCreate,
    db: Session = Depends(get_db),
):
    custom_list = db.query(CustomList).filter(CustomList.id == list_id).first()

    if not custom_list:
        raise HTTPException(status_code=404, detail="List not found")

    text = data.text.strip()

    if not text:
        raise HTTPException(status_code=422, detail="Item text cannot be empty")

    item = ListItem(text=text, list_id=list_id)

    db.add(item)
    db.commit()
    db.refresh(item)

    return item


# Update an item
@router.put("/items/{item_id}", response_model=ListItemResponse)
def update_item(
    item_id: int,
    data: ListItemUpdate,
    db: Session = Depends(get_db),
):
    item = db.query(ListItem).filter(ListItem.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    updates = data.model_dump(exclude_unset=True)

    if "text" in updates and updates["text"] is not None:
        updates["text"] = updates["text"].strip()

        if not updates["text"]:
            raise HTTPException(
                status_code=422,
                detail="Item text cannot be empty",
            )

    for key, value in updates.items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)

    return item


# Delete an item
@router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ListItem).filter(ListItem.id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()