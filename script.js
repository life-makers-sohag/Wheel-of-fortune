// const spinButton = document.getElementById('spin-btn');
// const wheelImage = document.getElementById('wheel-image');
// const messagePopup = document.getElementById('message-popup');
// const popupMessage = document.getElementById('popup-message');
// const closePopup = document.getElementById('close-popup');
// const loader = document.getElementById('loader'); // مؤشر التحميل

// // متغيرات الحالة
// let motivationalMessages = [];
// let displayedMessages = new Set();
// let isMessagesLoaded = false;

// // Google Sheets API بيانات الشيت
// const SPREADSHEET_ID = "10-LoxNU-9B8ZyZWns7LK2Oa41G_wHJLHO5DUZNkeuWQ"; // معرف الشيت
// const SHEET_NAME = "Data"; // اسم الورقة
// const API_KEY = "AIzaSyBB4YDK5-vUSSAAcGKThaHP2KPMtv_Sb04"; // مفتاح API

// // تحميل الرسائل باستخدام Google Sheets API
// async function loadMotivationalMessages() {
//     loader.style.display = 'block'; // إظهار مؤشر التحميل
//     try {
//         const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
//         const response = await fetch(url);

//         if (!response.ok) throw new Error('فشل في جلب الرسائل');

//         const data = await response.json();
//         motivationalMessages = data.values.flat(); // افترض أن الرسائل في العمود الأول
//         isMessagesLoaded = true;
//     } catch (error) {
//         console.error('خطأ أثناء جلب الرسائل:', error);
//         displayPopup('⚠️ حدث خطأ أثناء تحميل الرسائل. الرجاء المحاولة لاحقًا.');
//     } finally {
//         loader.style.display = 'none'; // إخفاء مؤشر التحميل
//     }
// }

// // عرض الرسالة العائمة
// function displayPopup(message) {
//     popupMessage.textContent = message;
//     messagePopup.style.display = 'flex';
// }

// // بدء التدوير
// function startSpinning() {
//     const rotationBase = parseInt(spinButton.getAttribute('data-rotation')) || 0;
//     const randomDegree = Math.floor(Math.random() * 360) + (rotationBase * 1000);

//     spinButton.setAttribute('data-rotation', rotationBase + 1);
//     wheelImage.style.transition = 'transform 4s ease-out';
//     wheelImage.style.transform = `rotate(${randomDegree}deg)`;

//     // إخفاء الرسائل العائمة أثناء التدوير
//     messagePopup.style.display = 'none';
// }

// // عند انتهاء التدوير
// function handleSpinEnd() {
//     if (!motivationalMessages.length) {
//         displayPopup('⚠️ لم يتم تحميل الرسائل بعد. الرجاء المحاولة مرة أخرى.');
//         return;
//     }

//     // اختيار رسالة عشوائية وغير مكررة
//     let randomMessage;
//     do {
//         randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
//     } while (displayedMessages.has(randomMessage) && displayedMessages.size < motivationalMessages.length);

//     displayedMessages.add(randomMessage);
//     if (displayedMessages.size === motivationalMessages.length) displayedMessages.clear();

//     displayPopup(randomMessage);
// }

// // أحداث الأزرار
// spinButton.addEventListener('click', async () => {
//     if (!isMessagesLoaded) {
//         displayPopup('⚠️ الرجاء الانتظار... يتم تحميل الرسائل.');
//         await loadMotivationalMessages();
//     }
//     startSpinning();
// });

// wheelImage.addEventListener('transitionend', handleSpinEnd);
// closePopup.addEventListener('click', () => (messagePopup.style.display = 'none'));

// // تحميل الرسائل عند بدء الصفحة
// loadMotivationalMessages();




// const spinButton = document.getElementById('spin-btn');
// const wheelImage = document.getElementById('wheel-image');
// const messagePopup = document.getElementById('message-popup');
// const popupMessage = document.getElementById('popup-message');
// const closePopup = document.getElementById('close-popup');

// // بيانات الرسائل
// let motivationalMessages = [];
// let displayedMessages = []; // تخزين الرسائل المعروضة مسبقًا
// let isSpinning = false; // حالة التدوير لمنع عرض الرسائل المتعددة أثناء التدوير
// let speedMultiplier = 1; // عامل السرعة لزيادة السرعة مع كل ضغط
// let pressureStrength = 0.5; // بداية قوة الضغط
// let pressureInterval; // متغير لتخزين الinterval لزيادة السرعة
// let spinCount = 0; // عدد مرات الضغط المتتالي
// let rotateValue = 0; // قيمة التدوير المستمر

// // تحميل الرسائل من Google Sheets API
// const SPREADSHEET_ID = "10-LoxNU-9B8ZyZWns7LK2Oa41G_wHJLHO5DUZNkeuWQ";
// const SHEET_NAME = "Data";
// const API_KEY = "AIzaSyBB4YDK5-vUSSAAcGKThaHP2KPMtv_Sb04";

// async function loadMessages() {
//     try {
//         const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:A100?key=${API_KEY}`);
//         const data = await response.json();
//         motivationalMessages = data.values.flat();
//         // خلط الرسائل بشكل عشوائي
//         shuffleMessages();

//         // استرجاع الرسائل المعروضة مسبقًا من الـ LocalStorage
//         const storedDisplayedMessages = JSON.parse(localStorage.getItem('displayedMessages')) || [];
//         displayedMessages = storedDisplayedMessages;
//         motivationalMessages = motivationalMessages.filter(msg => !displayedMessages.includes(msg)); // إزالة الرسائل المعروضة مسبقًا
//     } catch (error) {
//         console.error("Failed to load messages:", error);
//         motivationalMessages = ["⚠️ لم نتمكن من تحميل الرسائل. حاول لاحقًا!"];
//     }
// }

// // خلط الرسائل بشكل عشوائي
// function shuffleMessages() {
//     for (let i = motivationalMessages.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [motivationalMessages[i], motivationalMessages[j]] = [motivationalMessages[j], motivationalMessages[i]]; // تبادل العناصر
//     }
// }

// // عرض الرسالة العائمة
// function displayPopup(message) {
//     popupMessage.textContent = message;
//     messagePopup.style.display = 'flex';
// }

// // تدوير العجلة بناءً على قوة الضغط
// function startSpinning() {
//     if (isSpinning) return; // إذا كانت العجلة تدور، لا تبدأ التدوير مرة أخرى

//     isSpinning = true; // تعيين حالة التدوير إلى "تدور"
    
//     // زيادة السرعة وقوة الضغط تدريجيًا
//     pressureStrength += 0.5; // زيادة قوة الضغط
//     speedMultiplier *= 0.9; // تقليل مدة التدوير بنسبة 10% لزيادة السرعة

//     rotateValue += Math.random() * 360 + 1000 * pressureStrength; // التدوير العشوائي بناءً على قوة الضغط
//     const duration = 4 * speedMultiplier; // تحديد مدة التدوير بناءً على السرعة المتزايدة

//     const rotation = `rotate(${rotateValue}deg)`;
//     wheelImage.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.8, 0.25, 1)`; // إضافة تأثير cubic-bezier
//     wheelImage.style.transform = rotation;

//     setTimeout(() => {
//         showNextMessage();
//         isSpinning = false; // إعادة تعيين حالة التدوير بعد توقف العجلة
//     }, duration * 1000); // تأخير الرسالة بناءً على مدة التدوير
// }

// // عرض الرسالة التالية
// function showNextMessage() {
//     if (motivationalMessages.length === 0) {
//         displayPopup("⚠️ لم يتم تحميل رسائل جديده.");
//         return;
//     }

//     const message = motivationalMessages.pop(); // أخذ الرسالة العشوائية الأولى
//     displayedMessages.push(message); // إضافة الرسالة المعروضة إلى قائمة الرسائل المعروضة

//     // حفظ الرسائل المعروضة في الـ LocalStorage
//     localStorage.setItem('displayedMessages', JSON.stringify(displayedMessages));

//     displayPopup(message);

//     // إذا كانت هناك رسائل متبقية، يتم خلط الرسائل مرة أخرى
//     if (motivationalMessages.length === 0) {
//         displayPopup("لقد تم عرض جميع الرسائل!");
//     }
// }

// // زيادة سرعة التدوير أثناء الضغط المستمر
// function increaseRotationSpeed() {
//     if (!isSpinning) {
//         // إذا كانت العجلة متوقفة، نبدأ التدوير
//         startSpinning();
//     }

//     spinCount++; // زيادة عدد الضغطات المتتالية

//     // زيادة السرعة تدريجيًا أثناء الضغط
//     pressureStrength += 0.1; // زيادة قوة الضغط بشكل تدريجي
//     speedMultiplier *= 0.98; // زيادة السرعة تدريجيًا

//     // إذا استمر الضغط، نواصل زيادة السرعة
//     pressureInterval = setInterval(() => {
//         pressureStrength += 0.1;
//         speedMultiplier *= 0.98;
//     }, 500); // زيادة السرعة كل نصف ثانية
// }

// // إيقاف زيادة السرعة عندما يتوقف الضغط
// function stopRotationIncrease() {
//     clearInterval(pressureInterval); // إيقاف زيادة السرعة
//     if (!isSpinning) {
//         startSpinning(); // عند التوقف عن الضغط، نبدأ التدوير مرة أخرى لتكمل العجلة الدوران
//     }
// }

// // إعداد الأزرار
// spinButton.addEventListener('mousedown', increaseRotationSpeed); // عندما يبدأ الضغط
// spinButton.addEventListener('mouseup', stopRotationIncrease); // عند التوقف عن الضغط
// spinButton.addEventListener('click', startSpinning);
// closePopup.addEventListener('click', () => (messagePopup.style.display = 'none'));

// // تحميل الرسائل عند بدء الصفحة
// loadMessages();


// const spinButton = document.getElementById('spin-btn');
// const wheelImage = document.getElementById('wheel-image');
// const messagePopup = document.getElementById('message-popup');
// const popupMessage = document.getElementById('popup-message');
// const closePopup = document.getElementById('close-popup');

// // بيانات الرسائل
// let motivationalMessages = [];
// let displayedMessages = JSON.parse(localStorage.getItem('displayedMessages')) || []; // الرسائل المعروضة مسبقًا
// let isSpinning = false;
// let speedMultiplier = 1;
// let pressureStrength = 0.5;
// let rotateValue = 0;

// // بيانات Google Sheets
// const SPREADSHEET_ID = "10-LoxNU-9B8ZyZWns7LK2Oa41G_wHJLHO5DUZNkeuWQ";
// const SHEET_NAME = "Data";
// const API_KEY = "AIzaSyBB4YDK5-vUSSAAcGKThaHP2KPMtv_Sb04";

// // تحميل الرسائل من Google Sheets API
// async function loadMessages() {
//     try {
//         const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:A100?key=${API_KEY}`);
//         const data = await response.json();
//         const newMessages = data.values ? data.values.flat() : [];

//         // التحقق من الرسائل الجديدة فقط
//         motivationalMessages = newMessages.filter(msg => !displayedMessages.includes(msg));

//         if (motivationalMessages.length === 0) {
//             if (newMessages.length === 0) {
//                 // لا توجد رسائل جديدة في الشيت
//                 displayPopup("⚠️ لا توجد رسائل مضافة حديثًا.");
//             } else {
//                 // تم عرض كل الرسائل بالفعل
//                 displayPopup("✅ لقد تم عرض جميع الرسائل.");
//             }
//         } else {
//             shuffleMessages();
//         }
//     } catch (error) {
//         console.error("Failed to load messages:", error);
//         displayPopup("⚠️ لم نتمكن من تحميل الرسائل. حاول لاحقًا!");
//     }
// }

// // خلط الرسائل بشكل عشوائي
// function shuffleMessages() {
//     for (let i = motivationalMessages.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [motivationalMessages[i], motivationalMessages[j]] = [motivationalMessages[j], motivationalMessages[i]];
//     }
// }

// // عرض الرسالة العائمة
// function displayPopup(message) {
//     popupMessage.textContent = message;
//     messagePopup.style.display = 'flex';
// }

// // تدوير العجلة
// function startSpinning() {
//     if (isSpinning || motivationalMessages.length === 0) {
//         if (motivationalMessages.length === 0) {
//             displayPopup("⚠️ لا توجد رسائل جديدة للعرض.");
//         }
//         return;
//     }

//     isSpinning = true;
//     pressureStrength += 0.5;
//     speedMultiplier *= 0.9;

//     rotateValue += Math.random() * 360 + 1000 * pressureStrength;
//     const duration = 4 * speedMultiplier;

//     const rotation = `rotate(${rotateValue}deg)`;
//     wheelImage.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.8, 0.25, 1)`;
//     wheelImage.style.transform = rotation;

//     setTimeout(() => {
//         showNextMessage();
//         isSpinning = false;
//     }, duration * 1000);
// }

// // عرض الرسالة التالية
// function showNextMessage() {
//     if (motivationalMessages.length === 0) {
//         displayPopup("لقد تم عرض جميع الرسائل.");
//         return;
//     }

//     const message = motivationalMessages.pop();
//     displayedMessages.push(message);

//     // حفظ الرسائل المعروضة في LocalStorage
//     localStorage.setItem('displayedMessages', JSON.stringify(displayedMessages));

//     displayPopup(message);
// }

// // إعداد الأزرار
// spinButton.addEventListener('click', startSpinning);
// closePopup.addEventListener('click', () => (messagePopup.style.display = 'none'));

// // تحميل الرسائل عند بدء الصفحة
// loadMessages();



// تحديد العناصر اللازمة
const welcomePopup = document.getElementById('welcome-popup');
const welcomeMessage = document.getElementById('welcome-message');
const closeWelcome = document.getElementById('close-welcome');

// إغلاق نافذة الترحيب
closeWelcome.addEventListener('click', () => {
    welcomePopup.style.display = 'none';
});



// دالة الحصول على التوقيت الحالي بالميلي ثانية
function getCurrentTimestamp() {
    return Date.now();
}

// استدعاء الرسالة الترحيبية عند تحميل الصفحة إذا مرت ثلاث ساعات منذ آخر ظهور
window.onload = () => {
    const lastWelcomeTimestamp = localStorage.getItem('lastWelcomeTimestamp');
    const now = getCurrentTimestamp();
    const threeHours = 3 * 60 * 60 * 1000; // ثلاث ساعات بالميلي ثانية

    if (!lastWelcomeTimestamp || (now - lastWelcomeTimestamp) > threeHours) {
        setWelcomeMessage();
        localStorage.setItem('lastWelcomeTimestamp', now);
    }
};


// // دالة الحصول على التاريخ بصيغة "YYYY-MM-DD"
// function getTodayDate() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

// // استدعاء الرسالة الترحيبية عند تحميل الصفحة مرة واحدة في اليوم
// window.onload = () => {
//     const lastWelcomeDate = localStorage.getItem('lastWelcomeDate');
//     const todayDate = getTodayDate();
    
//     if (lastWelcomeDate !== todayDate) {
//         setWelcomeMessage();
//         localStorage.setItem('lastWelcomeDate', todayDate);
//     }
// };




// // استدعاء الرسالة الترحيبية عند تحميل الصفحة
// window.onload = () => {
//     setWelcomeMessage();
// };

const spinButton = document.getElementById('spin-btn');
const wheelImage = document.getElementById('wheel-image');
const messagePopup = document.getElementById('message-popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

// بيانات الرسائل
let motivationalMessages = [];
let displayedMessages = JSON.parse(localStorage.getItem('displayedMessages')) || []; // الرسائل المعروضة مسبقًا
let isSpinning = false;
let speedMultiplier = 1;
let pressureStrength = 0.5;
let rotateValue = 0;

// بيانات Google Sheets
const SPREADSHEET_ID = "10-LoxNU-9B8ZyZWns7LK2Oa41G_wHJLHO5DUZNkeuWQ";
const SHEET_NAME = "Data";
const API_KEY = "AIzaSyBB4YDK5-vUSSAAcGKThaHP2KPMtv_Sb04";

// تحميل الرسائل من Google Sheets API
async function loadMessages() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:A100?key=${API_KEY}`);
        const data = await response.json();
        const newMessages = data.values ? data.values.flat() : [];

        // التحقق من الرسائل الجديدة فقط
        motivationalMessages = newMessages.filter(msg => !displayedMessages.includes(msg));

        if (motivationalMessages.length === 0) {
            if (newMessages.length === 0) {
                // لا توجد رسائل جديدة في الشيت
                displayPopup("لا توجد رسائل مضافة حديثًا.");
            } else {
                // تم عرض كل الرسائل بالفعل
                displayPopup("لقد تم عرض جميع الرسائل.");
            }
        } else {
            shuffleMessages();
        }
    } catch (error) {
        console.error("Failed to load messages:", error);
        displayPopup("لم نتمكن من تحميل الرسائل. حاول لاحقًا!");
    }
}

// خلط الرسائل بشكل عشوائي
function shuffleMessages() {
    for (let i = motivationalMessages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [motivationalMessages[i], motivationalMessages[j]] = [motivationalMessages[j], motivationalMessages[i]];
    }
}

// عرض الرسالة العائمة
function displayPopup(message) {
    popupMessage.textContent = message;
    messagePopup.style.display = 'flex';
}

// تدوير العجلة
function startSpinning() {
    if (isSpinning || motivationalMessages.length === 0) {
        if (motivationalMessages.length === 0) {
            displayPopup("لا توجد رسائل جديدة للعرض.");
        }
        return;
    }

    isSpinning = true;
    pressureStrength += 0.5;
    speedMultiplier *= 0.9;

    rotateValue += Math.random() * 360 + 1000 * pressureStrength;
    const duration = 4 * speedMultiplier;

    const rotation = `rotate(${rotateValue}deg)`;
    wheelImage.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.8, 0.25, 1)`;
    wheelImage.style.transform = rotation;

    setTimeout(() => {
        showNextMessage();
        isSpinning = false;
    }, duration * 1000);
}

// عرض الرسالة التالية
function showNextMessage() {
    if (motivationalMessages.length === 0) {
        displayPopup("لقد تم عرض جميع الرسائل.");
        return;
    }

    const message = motivationalMessages.pop();
    displayedMessages.push(message);

    // حفظ الرسائل المعروضة في LocalStorage
    localStorage.setItem('displayedMessages', JSON.stringify(displayedMessages));

    displayPopup(message);
}

// إعداد الأزرار
spinButton.addEventListener('click', startSpinning);
closePopup.addEventListener('click', () => (messagePopup.style.display = 'none'));

// تحميل الرسائل عند بدء الصفحة
loadMessages();


function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");

    if (sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        menuIcon.innerHTML = "☰"; // تغيير الأيقونة عند الإغلاق
    } else {
        sidebar.classList.add("open");
        menuIcon.innerHTML = "✖"; // تغيير الأيقونة عند الفتح
    }
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
