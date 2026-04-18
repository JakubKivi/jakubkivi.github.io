import os
import sys
import base64
import json
import tkinter as tk
from datetime import datetime

try:
    from tkcalendar import Calendar
except ImportError:
    print("pip install tkcalendar")
    sys.exit()

try:
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.exceptions import InvalidTag
except ImportError:
    print("pip install cryptography")
    sys.exit()

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

class EncryptorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Text Encryptor")
        self.root.geometry("400x450") 
        
        self.password = None
        self.current_frame = None
        
        self.show_password_screen()

    def clear_window(self):
        if self.current_frame:
            self.current_frame.destroy()
        self.current_frame = tk.Frame(self.root)
        self.current_frame.pack(fill="both", expand=True, padx=20, pady=20)

    def show_password_screen(self):
        self.clear_window()
        
        tk.Label(self.current_frame, text="Enter encryption password:").pack(pady=(80, 10))
        
        self.pw_entry = tk.Entry(self.current_frame, show='*', width=30)
        self.pw_entry.pack(pady=10)
        self.pw_entry.focus()
        
        self.root.bind('<Return>', lambda e: self.submit_password())
        tk.Button(self.current_frame, text="Submit", command=self.submit_password).pack(pady=20)

    def validate_password(self, password_bytes):
        validate_path = os.path.join(SCRIPT_DIR, "validate.json")
        
        # Create validation file if it doesn't exist yet
        if not os.path.exists(validate_path):
            salt = os.urandom(16)
            iv = os.urandom(12)
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=1000000,
            )
            key = kdf.derive(password_bytes)
            aesgcm = AESGCM(key)
            ciphertext = aesgcm.encrypt(iv, b"VALID_PASSWORD", None)
            
            with open(validate_path, 'w') as f:
                json.dump({
                    "salt": base64.b64encode(salt).decode('utf-8'),
                    "iv": base64.b64encode(iv).decode('utf-8'),
                    "ciphertext": base64.b64encode(ciphertext).decode('utf-8')
                }, f)
            return True

        with open(validate_path, 'r') as f:
            data = json.load(f)
            
        salt = base64.b64decode(data['salt'])
        iv = base64.b64decode(data['iv'])
        ciphertext = base64.b64decode(data['ciphertext'])
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=1000000,
        )
        key = kdf.derive(password_bytes)
        aesgcm = AESGCM(key)
        
        try:
            aesgcm.decrypt(iv, ciphertext, None)
            return True
        except InvalidTag:
            return False
        except Exception:
            return False

    def submit_password(self):
        pw = self.pw_entry.get().strip()
        if pw:
            password_bytes = pw.encode('utf-8')
            if self.validate_password(password_bytes):
                self.password = password_bytes
                self.root.unbind('<Return>')
                self.show_main_screen()
            else:
                self.show_message_screen("Incorrect password.", self.show_password_screen)
        else:
            self.show_message_screen("Password cannot be empty.", self.show_password_screen)

    def show_main_screen(self):
        self.clear_window()
        
        self.cal = Calendar(self.current_frame, selectmode='day', date_pattern='yyyy-mm-dd')
        self.cal.pack(pady=20)
        
        tk.Button(self.current_frame, text="Encrypt & Save", command=self.check_encryption, height=2, width=20).pack(pady=10)

    def show_message_screen(self, message, next_action_callback):
        self.clear_window()
        
        tk.Label(self.current_frame, text=message, wraplength=350, justify="center").pack(pady=(100, 20))
        
        self.root.bind('<Return>', lambda e: next_action_callback())
        tk.Button(self.current_frame, text="OK", command=lambda: [self.root.unbind('<Return>'), next_action_callback()], width=15).pack(pady=10)

    def show_confirmation_screen(self, message, yes_callback, no_callback):
        self.clear_window()
        
        tk.Label(self.current_frame, text=message, wraplength=350, justify="center").pack(pady=(100, 20))
        
        btn_frame = tk.Frame(self.current_frame)
        btn_frame.pack(pady=10)
        
        tk.Button(btn_frame, text="Yes", command=yes_callback, width=10).pack(side="left", padx=10)
        tk.Button(btn_frame, text="No", command=no_callback, width=10).pack(side="right", padx=10)

    def check_encryption(self):
        date_str = self.cal.get_date()
        self.input_path = os.path.join(SCRIPT_DIR, "text.txt")
        self.output_path = os.path.join(SCRIPT_DIR, f"{date_str}.json")

        if not os.path.exists(self.input_path):
            self.show_message_screen(f"Error: {self.input_path} not found.", self.show_main_screen)
            return

        try:
            self.entry_date = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            self.show_message_screen("Error: Invalid date format.", self.show_main_screen)
            return

        if os.path.exists(self.output_path):
            self.show_confirmation_screen(
                f"{self.output_path} already exists. Overwrite?",
                self.execute_encryption,
                self.show_main_screen
            )
        else:
            self.execute_encryption()

    def execute_encryption(self):
        try:
            with open(self.input_path, 'rb') as f:
                plaintext = f.read()

            header = f"{self.entry_date.strftime('%A, %B %d, %Y')}\n\n".encode('utf-8')
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
            key = kdf.derive(self.password)

            aesgcm = AESGCM(key)
            ciphertext = aesgcm.encrypt(iv, full_plaintext, None)

            output_data = {
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "salt": base64.b64encode(salt).decode('utf-8'),
                "iv": base64.b64encode(iv).decode('utf-8'),
                "ciphertext": base64.b64encode(ciphertext).decode('utf-8')
            }

            with open(self.output_path, 'w') as f:
                json.dump(output_data, f, indent=4)
            
            self.show_message_screen(f"Success! Encrypted JSON saved as:\n{self.output_path}", self.show_main_screen)
            
        except Exception as e:
            self.show_message_screen(f"An error occurred:\n{str(e)}", self.show_main_screen)

if __name__ == "__main__":
    root = tk.Tk()
    app = EncryptorApp(root)
    root.mainloop()