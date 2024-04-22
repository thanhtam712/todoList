from fastapi import FastAPI, HTTPException
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware



class Todo_List(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    task: str = Field(default="", index=True)
    state: Optional[bool] = Field(default=False, index=True)


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/todo_list/")
def create_todo(todo: Todo_List):
    # try:
    with Session(engine) as session:
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo


@app.get("/todo_list/")
def read_todo():
    try:
        with Session(engine) as session:
            todo = session.exec(select(Todo_List)).all()
            return todo
    except Exception as error:
        print(error)
        raise HTTPException(status_code=400)

@app.put("/todo_list/")
def update_todo(update: Todo_List):
    with Session(engine) as session:
        statement = select(Todo_List).where(Todo_List.id == update.id)
        results = session.exec(statement)
        todo = results.one()

        todo.task = update.task
        todo.state = update.state

        session.add(todo)
        session.commit()
        session.refresh(todo)

        return {"update done"}

@app.delete("/todo_list/")
def delete_todo(id: Todo_List):
    with Session(engine) as session:
        statement = select(Todo_List).where(Todo_List.id == id.id)
        results = session.exec(statement)
        todo = results.one()


        session.delete(todo)
        session.commit()

        return {"delete done"}