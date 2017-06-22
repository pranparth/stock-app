def select_all_from_articles(conn):
    c = conn.cursor()
    new_text = []
    ids = []
    for data in c.execute('Select * from articletext'):
        new_text.append(data[1])
        ids.append(data[0])
    big_array = np.array([ids,new_text]).T
    return big_array
def get_all_tickers(conn):
    c = conn.cursor()
    tickers = []
    for data in c.execute('Select * from articleticker'):
        tickers.append(data[1])
    return np.array(tickers)
def get_all_articles_for_ids(conn, ids):
    c = conn.cursor()
    articles = []
    for _id in ids:
        t = (_id,)
        c.execute('SELECT body FROM articletext WHERE id=?', t)
        res = c.fetchone()
        articles.append(res[0])
    return np.array([ids,articles]).T    

def get_all_ids_for_ticker(conn,ticker):
    c = conn.cursor()
    t = (ticker,)
    c.execute('SELECT id FROM articleticker WHERE ticker=?', t)
    res = np.array(c.fetchall())[:,0]
    return res
def convert_dates_from_seconds(dates):
    new_dates = []
    for date in dates:
        nd = datetime(1970, 1, 1) + timedelta(seconds=float(date))
        new_dates.append(nd)
    return new_dates
def get_all_dates_for_ids(conn,ids):
    c = conn.cursor()
    dates = []
    for _id in ids:
        t = (_id,)
        c.execute('SELECT date FROM articledate WHERE id=?', t)
        res = c.fetchone()
        dates.append(res[0])
    dates = convert_dates_from_seconds(dates)
    return np.array([ids,dates]).T