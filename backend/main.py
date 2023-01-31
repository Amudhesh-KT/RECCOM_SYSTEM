from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from hashing import Hash
from jwttoken import create_access_token
from oauth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import urllib
import json
from bson import json_util


app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app = FastAPI()


mongodb_uri = 'mongodb+srv://Amudhesh_KT:' + \
    urllib.parse.quote('Amudhesh@78') + \
                       '@recommendationsystem.bst8vqw.mongodb.net/test'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client["RecommendationSystem"]


class User(BaseModel):
    username: str
    company: str
    password: str
    email: object

class Userid(BaseModel):
    userid: int

class Login(BaseModel):
	username: str
	password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


@app.get("/")
def read_root(current_user: User = Depends(get_current_user)):
	return {"data": "Hello OWrld"}


@app.post('/register')
def create_user(request: User):
	hashed_pass = Hash.bcrypt(request.password)
	user_object = dict(request)
	user_object["password"] = hashed_pass
    # user_object["userid"] =  db["UserData"].count_documents({}) + 1
	user_id = db["UserData"].insert_one(
        {
        "id": db["UserData"].count_documents({}) + 1,
        "email_id":user_object["email"],
        "username": user_object["username"],
        "password": user_object["password"],
        # "confirmpassword":user_object["confirmpassword"]
        }
        )
	print(user_object)
	return {"res":"created"}
@app.get('/user')
def find_all_people():
        collection = db.UserData
        user = collection.find() 
        
        return json.loads(json_util.dumps(user))


@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
	user = db["UserData"].find_one({"username":request.username})
	if not user:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {request.username} username')
	if not Hash.verify(user["password"],request.password):
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
	access_token = create_access_token(data={"sub": user["username"] })
	return {"access_token": access_token, "token_type": "bearer"}