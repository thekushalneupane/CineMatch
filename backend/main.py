import random

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer

app = FastAPI()

# Allow React frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Load the exported model files
try:
    movie_dict = pickle.load(open('models/movie_dict.pkl', 'rb'))
    movies_df = pd.DataFrame(movie_dict)
    cv = pickle.load(open('models/vectorizer.pkl', 'rb'))
    vectors = pickle.load(open('models/vectors.pkl', 'rb'))
except FileNotFoundError:
    raise Exception("Model files not found. Ensure you are running this from the correct directory.")

ps = PorterStemmer()

# Re-define our mood mappings
mood_profiles = {
    "Want to cry": "drama romance emotional tragic tearjerker heartbreak grief",
    "Need to laugh": "comedy hilarious funny laugh spoof satire stupid goofy",
    "Edge of my seat": "thriller suspense tension twist mystery crime intense",
    "Turn my brain off": "action explosion blockbuster popcorn dumb fun giant",
    "Feel inspired": "biography inspiring triumph success underdog true story hope",
    "Get scared": "horror scary ghost demon slasher blood nightmare terror",
    "Fall in love": "romance romantic comedy love relationship wedding couple",
    "Go on a journey": "adventure fantasy epic quest journey magic world discover"
}

# Define the data structure we expect from the frontend
class RecommendationRequest(BaseModel):
    mood: str
    era: str
    length: str
    language: str

def stem(text):
    return " ".join([ps.stem(word) for word in text.split()])

@app.get("/")
def read_root():
    return {"message": "CineMatch API is running!"}

@app.post("/recommend")
def get_recommendation(req: RecommendationRequest):
    if req.mood not in mood_profiles:
        raise HTTPException(status_code=400, detail="Invalid mood selected")

    # Core logic: Vectorize mood and find matches
    seed_text = stem(mood_profiles[req.mood])
    mood_vector = cv.transform([seed_text]).toarray()
    mood_distances = cosine_similarity(mood_vector, vectors)[0]

    # Get top 5 matches
    movies_list = sorted(list(enumerate(mood_distances)), reverse=True, key=lambda x: x[1])[0:5]

    # Format the response with all movie details
    recommendations = []
    for i in movies_list:
        movie_data = movies_df.iloc[i[0]]
            
            # Handle the overview (since we turned it into a list during data cleaning)
        overview_text = movie_data['overview']
        if isinstance(overview_text, list):
            overview_text = " ".join(overview_text).capitalize()

        recommendations.append({
                "id": int(movie_data['id']),
                "title": movie_data['title'],
                "match_score": float(round(i[1], 2)) if 'i' in locals() else 100,
                "overview": overview_text,
                "director": movie_data['director'],
                "release_year": int(movie_data['release_year']) if pd.notna(movie_data['release_year']) else "Unknown",
                "runtime": int(movie_data['runtime']) if pd.notna(movie_data['runtime']) else "?",
                "original_language": movie_data['original_language'],
                "genres": movie_data['genres'],
                "rating": round(movie_data['vote_average'], 1) if pd.notna(movie_data['vote_average']) else "N/A",
                "cast": movie_data['cast'] if isinstance(movie_data['cast'], list) else []
            })
            
        return {"recommendations": recommendations}

    return {"recommendations": recommendations}

@app.get("/random")
def get_random_movie():
    # Pick a completely random index from the dataframe
    random_idx = random.randint(0, len(movies_df) - 1)
    movie_data = movies_df.iloc[random_idx]
    
    # Handle the overview formatting
    overview_text = movie_data['overview']
    if isinstance(overview_text, list):
        overview_text = " ".join(overview_text).capitalize()

    # Return it in the exact same format as the normal recommendations
    return {
        "recommendations": [{
            "id": int(movie_data['id']),
            "title": movie_data['title'],
            "match_score": 100, # It's a surprise, so it's a 100% match!
            "overview": overview_text,
            "director": movie_data['director'],
            "release_year": int(movie_data['release_year']) if pd.notna(movie_data['release_year']) else "Unknown",
            "runtime": int(movie_data['runtime']) if pd.notna(movie_data['runtime']) else "?",
            "original_language": movie_data['original_language'],
            "genres": movie_data['genres']
        }]
    }