import os
import base64
import json
import getpass
from datetime import datetime
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def encrypt_to_json(input_filename):
    try:
        with open(input_filename, 'rb') as f:
            plaintext = f.read()
    except FileNotFoundError:
        print(f"Error: {input_filename} not found.")
        return

    password = getpass.getpass("Enter encryption password: ").encode()

    # Salt (16 bytes) and IV (12 bytes for GCM)
    salt = os.urandom(16)
    iv = os.urandom(12)

    # Key derivation
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=1000000,
    )
    key = kdf.derive(password)

    # AES-GCM Encryption
    aesgcm = AESGCM(key)
    ciphertext = aesgcm.encrypt(iv, plaintext, None)

    # Structure data for JSON
    output_data = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "salt": base64.b64encode(salt).decode('utf-8'),
        "iv": base64.b64encode(iv).decode('utf-8'),
        "ciphertext": base64.b64encode(ciphertext).decode('utf-8')
    }

    # Output filename
    output_filename = f"{datetime.now().strftime('%Y-%m-%d')}.json"

    with open(output_filename, 'w') as f:
        json.dump(output_data, f, indent=4)
    
    print(f"Success! Encrypted JSON saved as: {output_filename}")

if __name__ == "__main__":
    encrypt_to_json("text.txt")