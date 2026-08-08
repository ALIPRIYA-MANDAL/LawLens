from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_contract(prompt):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)

    except json.JSONDecodeError:
        raise ValueError(
            "AI returned invalid JSON."
        )