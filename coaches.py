import pandas as pd
from bs4 import BeautifulSoup
import requests

url = "https://pro-football-reference.com/years/2021/coaches.htm"

response = requests.get(url)
content = response.content

soup = BeautifulSoup(content, "html.parser")

# Find all tables with the id "coaches"
tables = soup.find_all("table", id="coaches")

# Create an empty list to store the data
data = []

# Define the list of seasons
seasons = ["2021", "2022", "2023"]

# Iterate over each season
for season in seasons:
    # Iterate over each table in the ResultSet
    for table in tables:
        # Find all rows in the current table
        rows = table.find_all("tr")

        # Iterate over each row
        for row in rows:
            # Extract the text content of "Coach" and "Team" columns
            coach = row.find("th", {"data-stat": "coach"})
            team = row.find("td", {"data-stat": "team"})

            # Append the extracted data to the list with the current season
            if coach and team:
                data.append([coach.get_text(strip=True), team.get_text(strip=True), season])

# Create a DataFrame from the extracted data
df = pd.DataFrame(data, columns=["Coach", "Team", "Season_ID"])

df.to_csv("coaches.csv", index=False)
