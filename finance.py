import pandas as pd
from bs4 import BeautifulSoup
import requests

years = ["2021", "2022", "2023"]

data = []

for year in years:
    url = f"https://www.spotrac.com/nfl/cap/{year}/"
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")

    # Find the table rows
    table_rows = soup.select('tbody tr.parent')

    # Extract data from each row for the current year
    for row in table_rows:
        columns = row.find_all('td')
        team_name = columns[1].find('span', class_='xs-hide').text.strip()
        total_cap_span = columns[7].find('span', style='display:none')
        total_cap_numeric = total_cap_span.text.strip() if total_cap_span else ''
        total_cap_formatted = '${:,}'.format(int(total_cap_numeric.replace(',', ''))) if total_cap_numeric else ''

        # Check if the team is already in the data list
        existing_team = next((item for item in data if item['Team Name'] == team_name), None)

        if existing_team:
            # Update the existing team entry with Total Cap for the current year
            existing_team[f'Total Cap ({year})'] = total_cap_formatted
        else:
            # Append a new entry for the team
            data.append({
                'Team Name': team_name,
                f'Total Cap ({year})': total_cap_formatted,
            })

# Create a DataFrame from the extracted data
df = pd.DataFrame(data)

# Print the DataFrame
df.to_csv('nfl_financial_data.csv',index=False)
