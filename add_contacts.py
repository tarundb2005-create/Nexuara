import re

with open("frontend/src/data/data.js", "r", encoding="utf-8") as f:
    text = f.read()

contacts = {
    "tech-01": "+91 63692 69993", # Debugging
    "tech-02": "+91 86101 69634", # Prompt Gen
    "tech-03": "+91 78069 35866", # Tech quiz
    "tech-04": "+91 73074 80264", # Project Expo
    "non-01": "+91 73395 35030, +91 73059 22915", # Treasure hunt
    "non-02": "+91 95001 69745", # Reverse Pictionary
    "non-03": "+91 86820 83783", # Brand battle
    "non-04": "+91 97888 82341", # Case study
    "non-05": "+91 86109 02429"  # Esports
}

for event_id, contact in contacts.items():
    # Find the block for this event_id and append contact after venue
    pattern = r'(id:\s*"' + event_id + r'".*?venue:\s*"[^"]*")'
    replacement = r'\1,\n      contact: "' + contact + r'"'
    text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open("frontend/src/data/data.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Done")
