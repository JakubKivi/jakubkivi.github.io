import os
import sys
import base64
import json
import tkinter as tk
from tkinter import simpledialog, messagebox, filedialog

def show_fatal_error(msg):
    root = tk.Tk()
    root.withdraw()
    messagebox.showerror("Dependency Error", msg)
    root.destroy()
    sys.exit()

try:
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.exceptions import InvalidTag
except ImportError:
    show_fatal_error("Missing dependency. Please run:\npip install cryptography")

def decrypt_flow():
    # Initialize hidden main window for dialogs
    root = tk.Tk()
    root.withdraw()

    # 1. Select JSON file
    input_json_path = filedialog.askopenfilename(
        title="Select JSON file to decrypt",
        filetypes=[("JSON Files", "*.json"), ("All Files", "*.*")]
    )

    if not input_json_path:
        sys.exit()

    # 2. Read and parse JSON
    try:
        with open(input_json_path, 'r') as f:
            data = json.load(f)
            
        salt = base64.b64decode(data['salt'])
        iv = base64.b64decode(data['iv'])
        ciphertext = base64.b64decode(data['ciphertext'])
    except Exception as e:
        messagebox.showerror("Error", f"Failed to read or parse JSON file:\n{e}")
        sys.exit()

    # 3. Get password
    filename = os.path.basename(input_json_path)
    password = simpledialog.askstring(
        "Password Required", 
        f"Enter decryption password for:\n{filename}", 
        show='*'
    )
    
    if not password:
        sys.exit()

    password_bytes = password.strip().encode('utf-8')

    # 4. Decrypt data
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=1000000,
    )
    key = kdf.derive(password_bytes)
    aesgcm = AESGCM(key)

    try:
        plaintext = aesgcm.decrypt(iv, ciphertext, None)
        
        # 5. Save output safely
        output_filename = os.path.join(os.path.dirname(input_json_path), "decrypted_entry.txt")
        
        if os.path.exists(output_filename):
            if not messagebox.askyesno("Overwrite", f"The file {os.path.basename(output_filename)} already exists.\nDo you want to overwrite it?"):
                sys.exit()

        with open(output_filename, 'wb') as f:
            f.write(plaintext)
            
        messagebox.showinfo("Success", f"Content successfully decrypted and saved to:\n{output_filename}")
        
    except (InvalidTag, Exception):
        messagebox.showerror("Decryption Failed", "Wrong password or corrupted data.")

if __name__ == "__main__":
    decrypt_flow()