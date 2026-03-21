from py_clob_client.client import ClobClient
from dotenv import load_dotenv
import os, json

load_dotenv()

client = ClobClient(
    host="https://clob.polymarket.com",
    chain_id=137,
    key=os.getenv("PRIVATE_KEY"),
    signature_type=2,
    funder=os.getenv("FUNDER_ADDRESS")
)

creds = client.create_or_derive_api_creds()
print("✅ Auth başarılı!")
print(json.dumps(creds, indent=2))

# .env'e yaz
with open(".env", "a") as f:
    f.write(f'\nPOLY_API_KEY={creds["apiKey"]}')
    f.write(f'\nPOLY_SECRET={creds["secret"]}')
    f.write(f'\nPOLY_PASSPHRASE={creds["passphrase"]}')

print("✅ Credentials .env'e kaydedildi!")
