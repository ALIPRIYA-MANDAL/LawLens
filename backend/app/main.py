from fastapi import FastAPI
from app.routes import router


app = FastAPI(
    title="LawLens API",
    version="1.0"
)


app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "LawLens Backend Running"
    }