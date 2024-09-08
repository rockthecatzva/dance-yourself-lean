## Stonk Server API

|route|type|args|description|
|---|---|---|---|
|/reactview|GET||
|/|GET||
/dates/maxdates|GET|n/a|max date for each type of candle data: 5/15/30/60/D/M/W|
|/comparison|POST|{tickers: strin[];res?: string;targetDates: [string, string];comparisonDates: [string, string];column?: string;};|
/rankcount/:ticker/:hiOrLow|GET| /rankcount/GOOG/LOWEST| HIGHST or LOWEST. It's the Xth LOWEST/HIGHEST day, representing X consecutive days|
/consecutive/:ticker/:startdate|GET|Uses `getSeriesOfValuesJoinedWithComparison`. For a given ticker, what are the daily % changes vs prev day|/consecutive/AAPL/2020-01-01|

