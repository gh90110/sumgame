function numberToWords(number) {
    if (number === 0) return "صفر";
    const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
    const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const teens = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
    const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
    const scales = ["", "هزار", "میلیون", "میلیارد"];

    function convertGroup(num) {
        if (num === 0) return "";
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " و " + ones[num % 10] : "");
        return hundreds[Math.floor(num / 100)] + (num % 100 !== 0 ? " و " + convertGroup(num % 100) : "");
    }

    let result = [];
    let scaleIndex = 0;
    while (number > 0) {
        const group = number % 1000;
        if (group !== 0) {
            result.unshift(convertGroup(group) + (scaleIndex > 0 ? " " + scales[scaleIndex] : ""));
        }
        number = Math.floor(number / 1000);
        scaleIndex++;
    }

    return result.join(" و ").trim();
}


document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');
    const testButton = document.getElementById('testButton');


    convertButton.addEventListener('click', () => {
        const number = parseInt(numberInput.value, 10);
        if (!isNaN(number) && number >= 0 && number <= 999999999999) {
            resultDiv.textContent = numberToWords(number);
        } else {
            resultDiv.textContent = "عدد معتبر وارد کنید.";
        }
    });
    testButton.addEventListener('click', () => {
        window.location.href = 'test.html';
    });

});
