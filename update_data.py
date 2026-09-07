import re

with open("frontend/src/data/data.js", "r", encoding="utf-8") as f:
    text = f.read()

# Replace dates
text = re.sub(r'date:\s*".*?"', 'date: "30 Sep 2026"', text)

# Remove prize fields completely
text = re.sub(r'\s*prize:\s*".*?",', '', text)

with open("frontend/src/data/data.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Done")
