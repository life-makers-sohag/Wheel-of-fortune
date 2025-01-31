// عرض وإخفاء القائمة الجانبية
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}


// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", function (event) {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove("open");
        menuIcon.innerHTML = "☰"; // تغيير الأيقونة عند الإغلاق
    }
});




// تحميل الأذكار من التخزين المحلي عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadAzkar();
});

// إضافة ذكر جديد
function addZekr() {
    let zekrInput = document.getElementById("zekr-input").value.trim();
    let zekrCount = document.getElementById("zekr-count").value;
    let azkarList = document.getElementById("azkar-list");

    if (zekrInput === "" || zekrCount === "" || zekrCount <= 0) {
        alert("الرجاء إدخال ذكر صحيح وعدد التكرار.");
        return;
    }

    let card = document.createElement("div");
    card.classList.add("azkar-card");

    card.innerHTML = `
        <span>${zekrInput} - ${zekrCount} مرات</span>
        <button class="delete-btn" onclick="deleteZekr(this)">حذف</button>
    `;

    azkarList.appendChild(card);

    saveAzkar();

    // مسح المدخلات بعد الإضافة
    document.getElementById("zekr-input").value = "";
    document.getElementById("zekr-count").value = "";
}

// حذف الذكر
function deleteZekr(btn) {
    btn.parentElement.remove();
    saveAzkar();
}

// حفظ الأذكار في LocalStorage
function saveAzkar() {
    let azkarItems = document.querySelectorAll(".azkar-card span");
    let azkarArray = [];

    azkarItems.forEach(item => {
        azkarArray.push(item.textContent);
    });

    localStorage.setItem("azkarList", JSON.stringify(azkarArray));
}

// تحميل الأذكار المحفوظة عند فتح الموقع
function loadAzkar() {
    let azkarList = document.getElementById("azkar-list");
    let storedAzkar = JSON.parse(localStorage.getItem("azkarList")) || [];

    storedAzkar.forEach(zekr => {
        let card = document.createElement("div");
        card.classList.add("azkar-card");
        card.innerHTML = `
            <span>${zekr}</span>
            <button class="delete-btn" onclick="deleteZekr(this)">حذف</button>
        `;
        azkarList.appendChild(card);
    });
}
// دالة لتحميل الذكر المحدد
function loadSelectedDhikr(dhikrText) {
    document.getElementById("dhikr-text").textContent = dhikrText;
    document.getElementById("dhikr-count").textContent = "عدد التكرار: 33"; // يمكن تغيير العدد حسب الحاجة
}

// عند النقر على ذكر من الأذكار المحفوظة
document.addEventListener("DOMContentLoaded", function () {
    const azkarList = document.getElementById("azkar-list");
    if (azkarList) {
        azkarList.addEventListener("click", function (event) {
            if (event.target.tagName === "LI") {
                const selectedDhikr = event.target.textContent;
                localStorage.setItem("selectedDhikr", selectedDhikr);
                window.location.href = "../index.html"; // الانتقال إلى الصفحة الرئيسية
            }
        });
    }

    // تحميل الذكر المحدد عند فتح الصفحة
    const selectedDhikr = localStorage.getItem("selectedDhikr");
    if (selectedDhikr) {
        loadSelectedDhikr(selectedDhikr);
    }
});