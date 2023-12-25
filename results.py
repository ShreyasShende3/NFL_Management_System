import pandas as pd
import numpy as np
df = pd.read_csv('match_results.csv')

ptr1 = 0
ptr2 = 1

df['Result'] = ''  # Add a new column for results

while ptr2 < len(df):
    score1 = df['Score'].iloc[ptr1]
    score2 = df['Score'].iloc[ptr2]

    if score1 > score2:
        df.at[ptr1, 'Result'] = 'WIN'
        df.at[ptr2, 'Result'] = 'LOSE'
    elif score1 < score2:
        df.at[ptr1, 'Result'] = 'LOSE'
        df.at[ptr2, 'Result'] = 'WIN'
    else:
        df.at[ptr1, 'Result'] = 'DRAW'
        df.at[ptr2, 'Result'] = 'DRAW'

    ptr1 += 2
    ptr2 += 2

# Display the updated DataFrame
#df.to_csv('match_results.csv',index=False)

df['Abb'] = df['Match_ID'].str[9:]
data = {
    'TeamName': [
        'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills',
        'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns',
        'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers',
        'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs',
        'Miami Dolphins', 'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints',
        'New York Giants', 'New York Jets', 'Las Vegas Raiders', 'Philadelphia Eagles',
        'Pittsburgh Steelers', 'Los Angeles Chargers', 'San Francisco 49ers', 'Seattle Seahawks',
        'Los Angeles Rams', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders',
        'Washington Football Team'
    ],
    'Abbreviation': [
        'CRD', 'ATL', 'RAV', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GNB', 'HTX',
        'CLT', 'JAX', 'KAN', 'MIA', 'MIN', 'NWE', 'NOR', 'NYG', 'NYJ', 'RAI', 'PHI', 'PIT', 'SDG',
        'SFO', 'SEA', 'RAM', 'TAM', 'OTI', 'WAS','WAS'
    ]
}

df['Abbreviation'] = df['Team Name'].map(data)
team_mapping = dict(zip(data['TeamName'], data['Abbreviation']))

# Map the 'Team Name' column to 'Abbreviation'
df['Abbreviation'] = df['Team Name'].map(team_mapping).str.lower()

df.to_csv('match_results.csv',index=False)