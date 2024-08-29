import requests
from bs4 import BeautifulSoup


def fetchSession():
    login_url = 'https://users.premierleague.com/'
    # Session to persist cookies across requests
    session = requests.Session()
    session.headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, '
                                     'like Gecko) Chrome/127.0.0.0 Safari/537.36', 'Cookie':
                           'csrftoken=kwiBFZXoZguKx6hitwbw7KUKm5uZsYsA;'}

    # Make a GET request to the login page to get the CSRF token.
    # Token is for a bs account, don't mind pushing
    response = session.get(login_url, headers={'Cookie':
                                                   'csrftoken=kwiBFZXoZguKx6hitwbw7KUKm5uZsYsA;'})
    # Parse the response to find the CSRF token from the hidden input field
    soup = BeautifulSoup(response.text, 'html.parser')
    # Might need later
    token = soup.find('input', {'name': 'csrfmiddlewaretoken'})['value']
    if token:
        login_data = {
            "csrfmiddlewaretoken": token,
            "login": "vidishraj97@gmail.com",
            "password": "Iamcoming_403",
            "app": "plfpl-web",
            "redirect_uri": "https://fantasy.premierleague.com/",
        }

        # Perform the login
        response = session.post(login_url, data=login_data, headers={"Referer": login_url})
        print(response)

    return session

