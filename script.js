// SOS Button
const sosButton = document.getElementById("sosButton");

sosButton.addEventListener("click", function () {
    const confirmSOS = confirm(
        "🚨 EMERGENCY ALERT\n\nDo you want to activate SOS?"
    );

    if (confirmSOS) {
        alert(
            "🚨 SOS ACTIVATED!\n\nEmergency assistance has been requested."
        );
        document.getElementById("whatsappSOS").click();
                if (contacts.length > 0) {
            alert("📞 Emergency contacts are ready to be notified.");
        } else {
            alert("⚠️ No emergency contacts added yet.");
        }
    }
});


// Share Location Button
const shareLocationButton = document.getElementById("shareLocation");
shareLocationButton.addEventListener("click", function () {

    if (!navigator.geolocation) {
        alert("❌ Location services are not supported by this browser.");
        return;
    }

   
    alert("📍 Getting your location...");

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationLink =
                `https://www.google.com/maps?q=${latitude},${longitude}`;
                const savedContacts =
  JSON.parse(localStorage.getItem("emergencyContacts")) || [];

const contactDetails = savedContacts.length
  ? savedContacts
      .map((contact, index) => `${index + 1}. ${contact.name} - ${contact.phone}`)
      .join("\n")
  : "No emergency contacts saved yet.";

            const message =`

                📍 My current location:
https://www.google.com/maps?q=${latitude},${longitude}

📞 Emergency Contacts:
${contactDetails}`;
navigator.clipboard.writeText(message);

alert(
    "📍 LOCATION READY!\n\n" +
    "Emergency location message copied successfully.\n\n" +
    "You can now paste it into WhatsApp or any messaging app."
);
        },

        function () {
            alert(
                "❌ Unable to get your location.\n\nPlease allow location permission and try again."
            );
        }
    );
});

// Emergency Contacts Section
const emergencyContactsButton = document.getElementById("emergencyContacts");
const contactsSection = document.getElementById("contactsSection");
const addContactButton = document.getElementById("addContact");
let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
emergencyContactsButton.addEventListener("click", function () {
    contactsSection.style.display = "block";

    contactsSection.scrollIntoView({
        behavior: "smooth"
    });
});
// Nearby Help
const nearbyHelpButton = document.getElementById("nearbyHelp");

nearbyHelpButton.addEventListener("click", function () {
  if (!navigator.geolocation) {
    alert("❌ Location services are not supported by this browser.");
    return;
  }

  alert("📍 Finding nearby police stations...");

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const mapsUrl =
        `https://www.google.com/maps/search/?api=1&query=police+station+near+${latitude},${longitude}`;

      window.location.href = mapsUrl;
    },
    function () {
      alert("❌ Unable to get your location. Please allow location access.");
    }
  );
});
addContactButton.addEventListener("click", function () {
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();

    if (name === "" || phone === "") {
        alert("⚠️ Please enter both name and phone number.");
        return;
    }

    contacts.push({
        name: name,
        phone: phone
    });
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));

    displayContacts();

    document.getElementById("contactName").value = "";
    document.getElementById("contactPhone").value = "";
});

function displayContacts() {
    const contactList = document.getElementById("contactList");

    contactList.innerHTML = "";

    contacts.forEach(function (contact, index) {

        const card = document.createElement("div");
        card.className = "contact-card";

        card.innerHTML = `
            <div class="contact-info">
                <strong>👤 ${contact.name}</strong>
                <small>📱 ${contact.phone}</small>
            </div>

            <div class="contact-actions">
                <button class="call-btn"
                    onclick="window.location.href='tel:${contact.phone}'">
                    📞
                </button>

                <button class="delete-btn"
                    onclick="deleteContact(${index})">
                    🗑️
                </button>
            </div>
        `;

        contactList.appendChild(card);
    });
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
    displayContacts();
}
const whatsappSOSButton = document.getElementById("whatsappSOS");

whatsappSOSButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("❌ Location services are not supported by this browser.");
    return;
  }

  alert("📍 Getting your location...");

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const locationLink =
        `https://www.google.com/maps?q=${latitude},${longitude}`;

      const savedContacts =
        JSON.parse(localStorage.getItem("emergencyContacts")) || [];

      const contactDetails = savedContacts.length
        ? savedContacts
            .map((contact, index) =>
              `${index + 1}. ${contact.name} - ${contact.phone}`
            )
            .join("\n")
        : "No emergency contacts saved yet.";

     const message = `🚨 EMERGENCY! I need help.
📍 My current location:
${locationLink}

📞 Emergency Contacts:
${contactDetails}`;

      const whatsappUrl =
        `https://wa.me/?text=${encodeURIComponent(message)}`;

      window.location.href = whatsappUrl;
    },
    function () {
      alert("❌ Unable to get your location. Please allow location access.");
    }
  );
});
const imSafeButton = document.getElementById("imSafeButton");

imSafeButton.addEventListener("click", function () {
  const safeMessage =
    "✅ I am safe now. Please do not worry.";

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(safeMessage)}`;

  window.location.href = whatsappUrl;
});
const safetyTimerButton = document.getElementById("safetyTimer");
const timerStatus = document.getElementById("timerStatus");

let safetyTimerId = null;
let secondsLeft = 30;

safetyTimerButton.addEventListener("click", function () {
  if (safetyTimerId) {
    clearInterval(safetyTimerId);
    safetyTimerId = null;
    secondsLeft = 30;

    timerStatus.textContent = "Safety timer cancelled.";
    safetyTimerButton.textContent = "⏱ Start 30-Second Safety Timer";
    return;
  }

  timerStatus.textContent = `Safety timer: ${secondsLeft} seconds remaining.`;
  safetyTimerButton.textContent = "❌ Cancel Safety Timer";

  safetyTimerId = setInterval(function () {
    secondsLeft--;

    timerStatus.textContent =
      `Safety timer: ${secondsLeft} seconds remaining.`;

    if (secondsLeft === 0) {
      clearInterval(safetyTimerId);
      safetyTimerId = null;
      secondsLeft = 30;

      timerStatus.textContent =
        "🚨 Timer finished. Preparing your SOS WhatsApp message.";

      safetyTimerButton.textContent =
        "⏱ Start 30-Second Safety Timer";

      document.getElementById("whatsappSOS").click();
    }
  }, 1000);
});