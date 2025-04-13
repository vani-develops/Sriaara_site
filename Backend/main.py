from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import random

app = FastAPI()
port = int(os.environ.get("PORT", 8000))  # Use Railway's dynamic port
uvicorn.run(app, host="0.0.0.0", port=port)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (safe for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve images from the /images folder
app.mount("/images", StaticFiles(directory="images"), name="images")


@app.get("/sarees")
def get_sarees():
    saree_folder = "images"
    sarees = []
    for filename in os.listdir(saree_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            name = os.path.splitext(filename)[0].replace("_", " ").title()
            image_url = f"/images/{filename}"
            # Simulating availability (for demo)
            available = random.choice([True, False])
            sarees.append({
                "name": name,
                "image": image_url,
                "available": available
            })
    return JSONResponse(content=sarees)