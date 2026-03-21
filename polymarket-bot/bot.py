"""
Polymarket Bot - uses py-clob-client to interact with the Polymarket CLOB API.
"""

import os
from dotenv import load_dotenv
from py_clob_client.client import ClobClient
from py_clob_client.clob_types import ApiCreds

load_dotenv()

HOST = os.getenv("POLYMARKET_HOST", "https://clob.polymarket.com")
KEY = os.getenv("POLYMARKET_KEY")
SECRET = os.getenv("POLYMARKET_SECRET")
PASSPHRASE = os.getenv("POLYMARKET_PASSPHRASE")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CHAIN_ID = int(os.getenv("CHAIN_ID", "137"))


def get_client() -> ClobClient:
    """Create and return an authenticated ClobClient."""
    creds = ApiCreds(api_key=KEY, api_secret=SECRET, api_passphrase=PASSPHRASE)
    return ClobClient(HOST, key=PRIVATE_KEY, chain_id=CHAIN_ID, creds=creds)


def fetch_markets(client: ClobClient):
    """Fetch and print available markets."""
    markets = client.get_markets()
    print(f"Fetched {len(markets.get('data', []))} markets")
    return markets


def main():
    client = get_client()
    print("Connected to Polymarket CLOB API")
    markets = fetch_markets(client)
    for market in (markets.get("data") or [])[:5]:
        print(f"  {market.get('question', 'N/A')} — {market.get('condition_id', '')}")


if __name__ == "__main__":
    main()
