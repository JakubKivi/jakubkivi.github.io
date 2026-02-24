import base64
import json
import getpass
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def decrypt_from_json(input_json_filename):
    try:
        with open(input_json_filename, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {input_json_filename} not found.")
        return

    # Decode Base64 strings back to bytes
    salt = base64.b64decode(data['salt'])
    iv = base64.b64decode(data['iv'])
    ciphertext = base64.b64decode(data['ciphertext'])

    password = getpass.getpass("Enter decryption password: ").encode()

    # Re-derive the same key
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=1000000,
    )
    key = kdf.derive(password)

    # AES-GCM Decryption
    aesgcm = AESGCM(key)
    try:
        plaintext = aesgcm.decrypt(iv, ciphertext, None)
        
        output_filename = "decrypted_entry.txt"
        with open(output_filename, 'wb') as f:
            f.write(plaintext)
        print(f"Success! Content saved to: {output_filename}")
        
    except Exception:
        print("Decryption failed! Likely a wrong password.")

if __name__ == "__main__":
    # Update this filename to match your generated JSON file
    target_file = input("Enter the name of the JSON file to decrypt (e.g., 2026-02-24.json): ")
    decrypt_from_json(target_file)