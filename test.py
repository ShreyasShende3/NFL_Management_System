import requests
from bs4 import BeautifulSoup, Comment
import pandas as pd

team_data = ['crd', 'atl', 'rav', 'buf', 'car', 'chi', 'cin', 'cle', 'dal', 'den', 'det', 'gnb', 'htx', 'clt', 'jax', 'kan', 'mia', 'min', 'nwe', 'nor', 'nyg', 'nyj', 'rai', 'phi', 'pit', 'sdg', 'sfo', 'sea', 'ram', 'tam', 'oti', 'was']
year = ["2021", "2022", "2023"]

# Initialize an empty DataFrame
final_dataframe = pd.DataFrame()

for current_year in year:
    for current_team in team_data:
        # URL of the webpage
        url = "https://www.pro-football-reference.com/teams/" + current_team + "/" + current_year + "_roster.htm"
        print(url)
        # Get the HTML content
        response = requests.get(url)
        content = response.content

        # Parse the HTML content
        soup = BeautifulSoup(content, "html.parser")

        # Find the commented-out HTML
        commented_html = soup.find_all(string=lambda text: isinstance(text, Comment))
        uncommented_soup = BeautifulSoup(str(commented_html), 'html.parser')
        print(uncommented_soup)
        # Find the target table
        table = uncommented_soup.find("table")
        print(table)



