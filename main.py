import uvicorn


if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True, host="0.0.0.0", port=9999)