import time

import requests
from bs4 import BeautifulSoup, Comment
import pandas as pd

team_data = ['crd', 'atl', 'rav', 'buf', 'car', 'chi', 'cin', 'cle', 'dal', 'den', 'det', 'gnb', 'htx', 'clt', 'jax', 'kan', 'mia', 'min', 'nwe', 'nor', 'nyg', 'nyj', 'rai', 'phi', 'pit', 'sdg', 'sfo', 'sea', 'ram', 'tam', 'oti', 'was']
year = ["2021", "2022", "2023"]

# Initialize an empty DataFrame
final_dataframe = pd.DataFrame()

player_id_counter = 1

for current_year in year:
    for abbreviation in team_data:
        # URL of the webpage
        url = "https://www.pro-football-reference.com/teams/" + abbreviation + "/" + current_year + "_roster.htm"

        # Get the HTML content
        response = requests.get(url)
        content = response.content

        # Parse the HTML content
        soup = BeautifulSoup(content, "html.parser")

        # Find the commented-out HTML
        commented_html = soup.find_all(string=lambda text: isinstance(text, Comment))
        uncommented_soup = BeautifulSoup(str(commented_html), 'html.parser')

        # Find the target table
        table = uncommented_soup.find("table")

        # Initialize data list
        data = []

        if table:
            thead = table.find("thead")
            if thead:
                header_row = thead.find("tr")
                if header_row:
                    headers = [header.get_text(strip=True) for header in header_row.find_all("th")]
                    headers.insert(0, "PlayerID")  # Add PlayerID as the first header
                    data.append(headers)

                    for row in table.find_all("tr")[1:-1]:  # Skip the header row and the last row
                        columns = row.find_all(["th", "td"])

                        # Generate a unique PlayerID for each player
                        player_id = f"Player_{player_id_counter:04d}"
                        player_id_counter += 1

                        row_data = [player_id] + [col.get_text(strip=True) for col in columns]
                        data.append(row_data)

                    # Create a DataFrame for the current team and year
                    team_dataframe = pd.DataFrame(data[1:], columns=data[0])

                    # Append the current team DataFrame to the final DataFrame
                    final_dataframe = pd.concat([final_dataframe, team_dataframe], ignore_index=True)

                    time.sleep(2)

                    # Print something after each iteration
                    print(f"Data for {abbreviation} in {current_year} processed.")
                else:
                    print(f"No header row found for {abbreviation} in {current_year}.")
            else:
                print(f"No thead found for {abbreviation} in {current_year}.")
        else:
            print(f"No table found for {abbreviation} in {current_year}.")

# Print the shape of the final DataFrame
print("Shape of the final DataFrame:", final_dataframe.shape)

final_dataframe.to_csv("players.csv",index=False)

