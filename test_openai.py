import os
from dotenv import load_dotenv
from src.ai_reviewer import test_openai_connection

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    print("API key loaded successfully!")
else:
    print("API key not found.")



result = test_openai_connection()

print("OpenAI response:")
print(result)