const b64ToUint8 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

async function decryptEntry() {
  const date = document.getElementById("journalDate").value;
  const pwd = document.getElementById("journalPwd").value;
  const out = document.getElementById("journalOutput");

  if (!pwd) return;

  try {
    file = `diary/${date}.json`;
    const res = await fetch(file);

    if (!res.ok) {
      out.textContent = "No entry for a given date";
      return;
    }

    const data = await res.json();

    // Import password
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(pwd),
      "PBKDF2",
      false,
      ["deriveKey"],
    );

    // Derive key
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: b64ToUint8(data.salt),
        iterations: 1000000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    );

    // Decrypt content
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b64ToUint8(data.iv) },
      key,
      b64ToUint8(data.ciphertext),
    );

    out.textContent = new TextDecoder().decode(decrypted);
  } catch (e) {
    out.textContent = "Invalid password";
  }
}
