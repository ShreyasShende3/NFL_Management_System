import pandas as pd
from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/List_of_current_National_Football_League_stadiums"

response = requests.get(url)
content = response.content

soup = BeautifulSoup(content, "html.parser")

# Find all tables on the page
tables = soup.find_all("table")

# Select the second table (index 1)
table = tables[1]

# Extract column headers
headers = [header.get_text(strip=True) for header in table.find_all("th", scope="col")]

# Create an empty list to store the data
data = []

# Find all rows in the table
rows = table.find_all("tr")

# Iterate over each row
for row in rows:
    # Extract the text content of each cell in the row
    cells = row.find_all(["th", "td"])
    row_data = [cell.get_text(strip=True) for cell in cells]

    # Append the row data to the list
    data.append(row_data)

# Create a DataFrame from the extracted data, skipping the header row
df = pd.DataFrame(data[1:], columns=headers)

# Remove unwanted columns
unwanted_columns = ["Image", "Surface", "Ref(s)"]
df = df.drop(columns=unwanted_columns, errors="ignore")
df.to_csv("nfl_stadiums.csv", index=False)
