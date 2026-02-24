import os
import base64
import json
import tkinter as tk
from tkinter import simpledialog, messagebox
from datetime import datetime
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

def get_date_gui():
    root = tk.Tk()
    root.withdraw()
    default_date = datetime.now().strftime("%Y-%m-%d")
    date_str = simpledialog.askstring("Date Selection", "Enter date (YYYY-MM-DD):", initialvalue=default_date)
    root.destroy()
    
    if not date_str:
        print("Date input canceled.")
        exit()
        
    return date_str

def encrypt_to_json(input_filename):
    try:
        with open(input_filename, 'rb') as f:
            plaintext = f.read()
    except FileNotFoundError:
        print(f"Error: {input_filename} not found.")
        return

    # Get date via GUI
    date_str = get_date_gui()
    
    try:
        entry_date = datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        print("Invalid date format. Use YYYY-MM-DD.")
        return
        
    output_filename = f"{date_str}.json"
    
    # Check if file exists and prompt for overwrite
    if os.path.exists(output_filename):
        root = tk.Tk()
        root.withdraw()
        overwrite = messagebox.askyesno("File Exists", f"{output_filename} already exists. Overwrite?")
        root.destroy()
        if not overwrite:
            print("Operation canceled by user.")
            return

    password = get_password_gui("Enter encryption password:")

    # Append date and footer to the plaintext
    header = f"{entry_date.strftime('%A, %B %d, %Y')}\n\n".encode('utf-8')
    footer = b"\n\nEnd of entry."
    full_plaintext = header + plaintext + footer

    salt = os.urandom(16)
    iv = os.urandom(12)

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=1000000,
    )
    key = kdf.derive(password)

    aesgcm = AESGCM(key)
    ciphertext = aesgcm.encrypt(iv, full_plaintext, None)

    output_data = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "salt": base64.b64encode(salt).decode('utf-8'),
        "iv": base64.b64encode(iv).decode('utf-8'),
        "ciphertext": base64.b64encode(ciphertext).decode('utf-8')
    }

    with open(output_filename, 'w') as f:
        json.dump(output_data, f, indent=4)
    
    print(f"Success! Encrypted JSON saved as: {output_filename}")

if __name__ == "__main__":
    encrypt_to_json("text.txt")