const b64ToUint8 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

var logged = false;

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
    logged = true;
  } catch (e) {
    out.textContent = "Invalid password";
    logged = false;
  }
}

function onChangeDateDiary() {
  if (logged) {
    decryptEntry();
  }
}

function arrowDiary(direction) {
  const dateInput = document.getElementById("journalDate");
  var date = new Date(dateInput.value);

  var min = new Date(dateInput.getAttribute("min"));
  var max = new Date(dateInput.getAttribute("max"));
  min.setDate(min.getDate() + 1);
  max.setDate(max.getDate() - 1);

  if (!direction) {
    //lewo
    if (min.getTime() === date.getTime()) {
      document.getElementById("diaryArrowLeft").classList.add("arrow-inactive");
    } else {
      document
        .getElementById("diaryArrowRight")
        .classList.remove("arrow-inactive");
    }

    dateInput.stepDown(1);
  } else {
    if (max.getTime() === date.getTime()) {
      document
        .getElementById("diaryArrowRight")
        .classList.add("arrow-inactive");
    } else {
      document
        .getElementById("diaryArrowLeft")
        .classList.remove("arrow-inactive");
    }
    //prawo
    dateInput.stepUp(1);
  }

  if (logged) {
    decryptEntry();
  }
}
