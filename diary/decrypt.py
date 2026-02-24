import base64
import json
import tkinter as tk
from tkinter import simpledialog
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

def get_password_gui(prompt_text):
    root = tk.Tk()
    root.withdraw()
    password = simpledialog.askstring("Password Required", prompt_text, show='*')
    root.destroy()
    
    if not password:
        print("Password input canceled.")
        exit()
        
    return password.strip().encode('utf-8')

def decrypt_from_json(input_json_filename):
    try:
        with open(input_json_filename, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {input_json_filename} not found.")
        return

    salt = base64.b64decode(data['salt'])
    iv = base64.b64decode(data['iv'])
    ciphertext = base64.b64decode(data['ciphertext'])

    password = get_password_gui("Enter decryption password:")

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=1000000,
    )
    key = kdf.derive(password)

    aesgcm = AESGCM(key)
    try:
        plaintext = aesgcm.decrypt(iv, ciphertext, None)
        
        output_filename = "decrypted_entry.txt"
        with open(output_filename, 'wb') as f:
            f.write(plaintext)
        print(f"Success! Content saved to: {output_filename}")
        
    except Exception:
        print("Decryption failed! Wrong password or corrupted data.")

if __name__ == "__main__":
    target_file = input("Enter JSON filename (e.g., 2026-02-24.json): ")
    decrypt_from_json(target_file)