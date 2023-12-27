import pandas as pd
from bs4 import BeautifulSoup
import requests

def scrape_passing(url, desired_columns_passing):
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")

    # Find the table with id="passing"
    table = soup.find("table", id="passing")

    # Extract column headers
    headers = [th.get_text(strip=True) for th in table.find("thead").find_all("th")][1:]

    # Extract data rows
    data = []
    for row in table.find("tbody").find_all("tr"):
        row_data = [td.get_text(strip=True) for td in row.find_all("td")]
        data.append(row_data)

    # Create a Pandas DataFrame with all columns
    df = pd.DataFrame(data, columns=headers)

    # Extract only the desired columns
    df_selected = df[desired_columns_passing]

    # Remove rows where all values are None
    df_selected = df_selected.dropna(how='all')

    # Limit the DataFrame to 60 rows
    df_selected = df_selected.head(60)

    # Add a new column "Season" with the corresponding year value
    df_selected['Season'] = year

    return df_selected

# Example usage:
years = ["2021", "2022", "2023"]
desired_columns_passing = ['Player', 'Tm', 'G', 'Cmp', 'Cmp%', 'Yds', 'TD', 'Int', 'Sk']
passing_df = []

for year in years:
    url = f"https://www.pro-football-reference.com/years/{year}/passing.htm"
    df = scrape_passing(url, desired_columns_passing)
    passing_df.append(df)

# Concatenate all DataFrames into one
combined_df = pd.concat(passing_df, ignore_index=True)

combined_df.to_csv('nfl_passing_stats.csv',index=False)

def scrape_receiving(url, desired_columns_receiving):
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")

    # Find the table with id="passing"
    table = soup.find("table", id="receiving")

    # Extract column headers
    headers = [th.get_text(strip=True) for th in table.find("thead").find_all("th")][1:]

    # Extract data rows
    data = []
    for row in table.find("tbody").find_all("tr"):
        row_data = [td.get_text(strip=True) for td in row.find_all("td")]
        data.append(row_data)

    # Create a Pandas DataFrame with all columns
    df = pd.DataFrame(data, columns=headers)

    # Extract only the desired columns
    df_selected = df[desired_columns_receiving]

    # Remove rows where all values are None
    df_selected = df_selected.dropna(how='all')

    # Limit the DataFrame to 60 rows
    df_selected = df_selected.head(60)

    # Add a new column "Season" with the corresponding year value
    df_selected['Season'] = year

    return df_selected

years = ["2021", "2022", "2023"]
desired_columns_receiving = ['Player', 'Tm', 'G', 'Rec', 'Ctch%', 'Yds', 'TD', 'Fmb']
receiving_df = []

for year in years:
    url = f"https://www.pro-football-reference.com/years/{year}/receiving.htm"
    df1 = scrape_receiving(url, desired_columns_receiving)
    receiving_df.append(df1)

# Concatenate all DataFrames into one
combined_df1 = pd.concat(receiving_df, ignore_index=True)

combined_df1.to_csv("nfl_receiving_stats.csv", index=False)

def scrape_rushing(url, desired_columns_rushing):
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")

    # Find the table with id="passing"
    table = soup.find("table", id="rushing")

    # Extract column headers
    headers = [th.get_text(strip=True) for th in table.find("thead").find_all("th")][5:]

    # Extract data rows
    data = []
    for row in table.find("tbody").find_all("tr"):
        row_data = [td.get_text(strip=True) for td in row.find_all("td")]
        data.append(row_data)

    # Create a Pandas DataFrame with all columns
    df = pd.DataFrame(data, columns=headers)

    # Extract only the desired columns
    df_selected = df[desired_columns_rushing]

    # Remove rows where all values are None
    df_selected = df_selected.dropna(how='all')

    # Limit the DataFrame to 60 rows
    df_selected = df_selected.head(60)

    # Add a new column "Season" with the corresponding year value
    df_selected['Season'] = year

    return df_selected

years = ["2021", "2022", "2023"]
desired_columns_rushing = ['Player', 'Tm', 'G', 'Att', 'Yds', 'TD', 'Fmb']
rushing_df = []

for year in years:
    url = f"https://www.pro-football-reference.com/years/{year}/rushing.htm"
    df2 = scrape_rushing(url, desired_columns_rushing)
    rushing_df.append(df2)

# Concatenate all DataFrames into one
combined_df2 = pd.concat(rushing_df, ignore_index=True)

combined_df2.to_csv("nfl_rushing_stats.csv",index=False)

def scrape_defense(url, desired_columns):
    response = requests.get(url)
    content = response.content
    soup = BeautifulSoup(content, "html.parser")

    # Find the table with id="passing"
    table = soup.find("table", id="defense")

    # Extract column headers
    headers = [th.get_text(strip=True) for th in table.find("thead").find_all("th")][8:]

    # Extract data rows
    data = []
    for row in table.find("tbody").find_all("tr"):
        row_data = [td.get_text(strip=True) for td in row.find_all("td")]
        data.append(row_data)

    # Create a Pandas DataFrame with all columns
    df = pd.DataFrame(data, columns=headers)

    # Extract only the desired columns
    df_selected = df[desired_columns]

    # Remove rows where all values are None
    df_selected = df_selected.dropna(how='all')

    # Limit the DataFrame to 60 rows
    df_selected = df_selected.head(60)

    # Add a new column "Season" with the corresponding year value
    df_selected['Season'] = year

    return df_selected

years = ["2021", "2022", "2023"]
desired_columns_defense = ['Player', 'Tm', 'G', 'Int', 'Solo']
defense_df = []

for year in years:
    url = f"https://www.pro-football-reference.com/years/{year}/defense.htm"
    df = scrape_defense(url, desired_columns_defense)
    defense_df.append(df)

# Concatenate all DataFrames into one
combined_df3 = pd.concat(defense_df, ignore_index=True)

combined_df3.to_csv("nfl_defense_stats.csv",index=False)

