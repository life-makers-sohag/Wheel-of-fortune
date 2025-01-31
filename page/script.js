// دالة لإضافة ذكر جديد
function addZekr() {
    const zekrInput = document.getElementById("zekr-input");
    const zekrText = zekrInput.value.trim();

    if (zekrText) {
        // استرجاع الأذكار الحالية من localStorage
        let azkar = JSON.parse(localStorage.getItem("azkar")) || [];

        // إضافة الذكر الجديد إلى القائمة
        azkar.push(zekrText);

        // حفظ الأذكار المحدثة في localStorage
        localStorage.setItem("azkar", JSON.stringify(azkar));

        // تحديث عرض الأذكار
        displayAzkar();

        // مسح حقل الإدخال
        zekrInput.value = "";
    }
}

// دالة لعرض الأذكار المحفوظة
function displayAzkar() {
    const azkarList = document.getElementById("azkar-list");
    azkarList.innerHTML = ""; // مسح القائمة الحالية

    // استرجاع الأذكار من localStorage
    const azkar = JSON.parse(localStorage.getItem("azkar")) || [];

    // عرض الأذكار في القائمة
    azkar.forEach((zekr, index) => {
        const li = document.createElement("li");
        li.textContent = zekr;
        azkarList.appendChild(li);
    });
}

// دالة لتحميل الذكر الحالي من localStorage
function loadCurrentDhikr() {
    const azkar = JSON.parse(localStorage.getItem("azkar")) || [];
    if (azkar.length > 0) {
        document.getElementById("dhikr-text").textContent = azkar[0]; // عرض أول ذكر كذكر افتراضي
    }
}

// عند تحميل الصفحة
window.onload = function () {
    if (window.location.pathname.includes("azkar.html")) {
        displayAzkar(); // عرض الأذكار في صفحة azkar.html
    } else {
        loadCurrentDhikr(); // تحميل الذكر الحالي في الصفحة الرئيسية
    }
};

// التفاعل مع المسبحة
let count = 0;
const countDisplay = document.getElementById("count");

document.getElementById("increment-btn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

document.getElementById("reset-btn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
});

document.getElementById("open-dhikr-btn").addEventListener("click", () => {
    window.location.href = "azkar.html"; // الانتقال إلى صفحة الأذكار
});

function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-280px";
    } else {
        sidebar.style.left = "0px";
    }
}
