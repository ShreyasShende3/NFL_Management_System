import pandas as pd

df = pd.read_csv("nfl_financial_data.csv")

# Remove dollar signs and commas, then convert to numeric
df['NFL 2021 Payout'] = pd.to_numeric(df['NFL 2021 Payout'].replace('[\$,]', '', regex=True))
df['2021 Total Ticket Earning'] = pd.to_numeric(df['2021 Total Ticket Earning'].replace('[\$,]', '', regex=True))
df['Spending (2021)'] = pd.to_numeric(df['Spending (2021)'].replace('[\$,]', '', regex=True))

df['NFL 2022 Payout'] = pd.to_numeric(df['NFL 2022 Payout'].replace('[\$,]', '', regex=True))
df['2022 Total Ticket Earning'] = pd.to_numeric(df['2022 Total Ticket Earning'].replace('[\$,]', '', regex=True))
df['Spending (2022)'] = pd.to_numeric(df['Spending (2022)'].replace('[\$,]', '', regex=True))

df['NFL 2023 Payout'] = pd.to_numeric(df['NFL 2023 Payout'].replace('[\$,]', '', regex=True))
df['2023 Total Ticket Earning'] = pd.to_numeric(df['2023 Total Ticket Earning'].replace('[\$,]', '', regex=True))
df['Spending (2023)'] = pd.to_numeric(df['Spending (2023)'].replace('[\$,]', '', regex=True))

# Initialize a list to store the results
total = []
total1 =[]
total2 = []
# Iterate over the rows of the DataFrame
for index, row in df.iterrows():
    total_value = row['NFL 2021 Payout'] + row['2021 Total Ticket Earning'] - row['Spending (2021)']
    total_value1 = row['NFL 2022 Payout'] + row['2022 Total Ticket Earning'] - row['Spending (2022)']
    total_value2 = row['NFL 2023 Payout'] + row['2023 Total Ticket Earning'] - row['Spending (2023)']

    total.append('${:,.0f}'.format(total_value))
    total1.append('${:,.0f}'.format(total_value1))
    total2.append('${:,.0f}'.format(total_value2))
# Display the results
df.insert(17, 'Total Profit/Loss 2021', total)
df.insert(18, 'Total Profit/Loss 2022', total1)
df.insert(19, 'Total Profit/Loss 2023', total2)

df.to_csv('nfl_financial_data.csv', index=False)