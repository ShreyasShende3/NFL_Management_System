import pandas as pd
import requests
from bs4 import BeautifulSoup
import os

years = ["2021", "2022", "2023"]
data = []

for year in years:
    url = f"https://www.pro-football-reference.com/years/{year}/games.htm"
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")
    table = soup.find("table", id="games")
    rows = table.find_all("tr")

    # Check if the first row contains a header element
    is_header_row = "th" in rows[0].find_all(["th", "td"])

    # Skip the first row if it's a header row
    rows = rows[0:] if is_header_row else rows

    boxscore_links = table.find_all("a", href=lambda href: href and "boxscore" in href)
    match_ids = [os.path.basename(link["href"]).replace(".htm", "") for link in boxscore_links]

    for row, match_id in zip(rows, match_ids):
        game_date = row.find("td", {"data-stat": "game_date"})
        winner_team = row.find("td", {"data-stat": "winner"})
        loser_team = row.find("td", {"data-stat": "loser"})
        pts_win = row.find("td", {"data-stat": "pts_win"})
        pts_lose = row.find("td", {"data-stat": "pts_lose"})

        # Skip the row if any of the required data is missing
        if not (game_date and winner_team and loser_team and pts_win and pts_lose):
            continue

        game_date = game_date.text.strip()
        winner = winner_team.text.strip()
        loser = loser_team.text.strip()
        pts_w = pts_win.text.strip()
        pts_l = pts_lose.text.strip()

        data.append([winner, loser, pts_w, pts_l, game_date])

# Create DataFrame
df = pd.DataFrame(data, columns=['Winner Team','Loser Team','Pts_W', 'Pts_L', 'match_date'])
df.to_csv("results.csv", index=False)
