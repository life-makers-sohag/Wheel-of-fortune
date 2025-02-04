document.addEventListener("DOMContentLoaded", async function () {
    const challengePopup = document.getElementById("challenge-popup");
    const challengeText1 = document.getElementById("challenge-text-1");
    const challengeText2 = document.getElementById("challenge-text-2");
    const checkmark1 = document.getElementById("checkmark-1");
    const checkmark2 = document.getElementById("checkmark-2");
  
    const acceptChallenge = document.getElementById("accept-challenge");
    const acceptChallenge2 = document.getElementById("accept-challenge-2");
    const declineChallenge = document.getElementById("decline-challenge");
    const declineChallenge2 = document.getElementById("decline-challenge-2");
  
    const floatingMessage = document.getElementById("floating-message");
    const floatingMessageText = document.getElementById("floating-message-text");
    const floatingCheck = document.getElementById("floating-check");
  
    const acceptMusic = document.getElementById("accept-music");
    const declineMusic = document.getElementById("decline-music");
  
    // رابط التحديات من جوجل شيت
    const SHEET_URL = "https://script.google.com/macros/s/AKfycbyEg96YO6H56kKPwDKfSSA5VaCdIC_j8VaEpNRt9Hpv6cM_pHT2AfnGgJTL2TN1ESw1/exec";
  
    // متغيرات لتخزين نصوص التحديات الحالية
    let currentChallenge1 = "";
    let currentChallenge2 = "";
  
    // لتخزين بيانات البطاقة التي تم النقر عليها
    // الخاصية type تأخذ القيمة "accept" أو "decline"
    let currentAction = null;
  
    // تحميل التحديات من جوجل شيت
    async function loadChallenges() {
      try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
  
        if (data.challenges && data.challenges.length >= 1) {
          const challenge1 = data.challenges[1][0] || "لا يوجد تحدي";
          const challenge2 = data.challenges[1][1] || "لا يوجد تحدي";
  
          // إذا تغير التحدي، يتم إعادة تعيين النتائج
          if (challenge1 !== currentChallenge1 || challenge2 !== currentChallenge2) {
            resetActivity();
            currentChallenge1 = challenge1;
            currentChallenge2 = challenge2;
          }
  
          challengeText1.textContent = challenge1;
          challengeText2.textContent = challenge2;
          challengePopup.style.display = "flex";
  
          // استرجاع النتيجة من الجلسات السابقة للبطاقة الأولى
          if (localStorage.getItem('challenge1Result')) {
            const res1 = localStorage.getItem('challenge1Result');
            checkmark1.textContent = res1 === 'accepted' ? "✔" : "✘";
            checkmark1.style.display = 'inline';
            challengeText1.style.visibility = "visible";
          }
          // استرجاع النتيجة من الجلسات السابقة للبطاقة الثانية
          if (localStorage.getItem('challenge2Result')) {
            const res2 = localStorage.getItem('challenge2Result');
            checkmark2.textContent = res2 === 'accepted' ? "✔" : "✘";
            checkmark2.style.display = 'inline';
            challengeText2.style.visibility = "visible";
          }
        } else {
          challengeText1.textContent = "لم يتم العثور على تحديات!";
          challengeText2.textContent = "";
        }
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل التحديات:", error);
        challengeText1.textContent = "لم نتمكن من تحميل التحديات. حاول لاحقًا!";
        challengeText2.textContent = "";
      }
    }
  
    // إعادة تعيين الحالة عند تجديد التحدي
    function resetActivity() {
      localStorage.removeItem('challenge1Result');
      localStorage.removeItem('challenge2Result');
      checkmark1.style.display = 'none';
      checkmark2.style.display = 'none';
      challengeText1.style.visibility = "hidden";
      challengeText2.style.visibility = "hidden";
    }
  
    // دالة لتعيين نتيجة التحدي وتحديث المؤشر
    function setChallengeResult(challengeText, indicator, storageKey, result) {
      // result: "accepted" أو "declined"
      indicator.style.display = 'inline';
      indicator.textContent = result === 'accepted' ? "✔" : "✘";
      localStorage.setItem(storageKey, result);
      challengeText.style.visibility = "visible";
    }
  
    // عند الضغط على "قد التحدي" (القبول)
    function acceptChallengeHandler(challengeText, indicator, storageKey) {
      currentAction = { challengeText, indicator, storageKey, type: 'accept' };
      floatingMessageText.textContent = challengeText.textContent;
      floatingMessage.style.display = "block";
      // إعادة ضبط المؤشر إلى البداية وتشغيل الصوت مرة واحدة
      acceptMusic.currentTime = 0;
      acceptMusic.play();
    }
  
    // عند الضغط على "مش قد التحدي" (الرفض)
    function declineChallengeHandler(challengeText, indicator, storageKey) {
      currentAction = { challengeText, indicator, storageKey, type: 'decline' };
      floatingMessageText.textContent = challengeText.textContent;
      floatingMessage.style.display = "block";
      // إعادة ضبط المؤشر إلى البداية وتشغيل الصوت مرة واحدة
      declineMusic.currentTime = 0;
      declineMusic.play();
    }
  
    // أحداث أزرار البطاقات
    acceptChallenge.addEventListener("click", function () {
      acceptChallengeHandler(challengeText1, checkmark1, 'challenge1Result');
    });
    acceptChallenge2.addEventListener("click", function () {
      acceptChallengeHandler(challengeText2, checkmark2, 'challenge2Result');
    });
    declineChallenge.addEventListener("click", function () {
      declineChallengeHandler(challengeText1, checkmark1, 'challenge1Result');
    });
    declineChallenge2.addEventListener("click", function () {
      declineChallengeHandler(challengeText2, checkmark2, 'challenge2Result');
    });
  
    /* عند الضغط على زر "✔" في النافذة العائمة:
       - إذا كان الإجراء الأصلي "accept" نعتبر النتيجة قبول،
         وإلا نعتبر النتيجة رفض.
       تُحدَّث النتيجة ويتم عرض علامة واحدة فقط في المؤشر. */
    floatingCheck.addEventListener("click", function () {
      if (currentAction) {
        if (currentAction.type === 'accept') {
          setChallengeResult(currentAction.challengeText, currentAction.indicator, currentAction.storageKey, 'accepted');
          floatingMessageText.textContent = "تم قبول التحدي بنجاح!";
        } else {
          // المستخدم اختار رفض التحدي ولكنه ضغط على ✔، فنعتبر النتيجة رفض
          setChallengeResult(currentAction.challengeText, currentAction.indicator, currentAction.storageKey, 'declined');
          floatingMessageText.textContent = "خطأ: لم يتم قبول التحدي!";
        }
        floatingMessage.style.display = "none";
        currentAction = null;
      }
    });
  
    // تحميل التحديات عند بدء تشغيل الصفحة وتحديثها كل دقيقة
    loadChallenges();
    setInterval(loadChallenges, 60000);
  });
  
  // دوال القائمة الجانبية (حسب الحاجة)
  function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuIcon.innerHTML = "☰";
    } else {
      sidebar.classList.add("open");
      menuIcon.innerHTML = "✖";
    }
  }
  document.addEventListener("click", function (event) {
    var sidebar = document.getElementById("sidebar");
    var menuIcon = document.querySelector(".menu-icon");
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
      sidebar.classList.remove("open");
      menuIcon.innerHTML = "☰";
    }
  });
  