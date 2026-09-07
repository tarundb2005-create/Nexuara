with open("frontend/src/data/data.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('time: "TBA"', 'time: "10.30 AM"')
content = content.replace('venue: "TBA"', 'venue: "3rd floor MB"')

with open("frontend/src/data/data.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
