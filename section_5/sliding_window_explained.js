i/**
 * ===== SLIDING WINDOW PATTERN TUSHUNTIRISH =====
 * 
 * Sliding Window - bu array/string da uzunligi o'zgarmaydigan "oyna"ni siljitib, 
 * optimal yechimni tezda topish usuli.
 * 
 * FOYDASI: O'rtacha O(n) vaqt complexity bilan ishlaydi, nested loops o'rniga O(n²) dan o'tib.
 */


// ============================================
// FUNKSIYA 1: BRUTE FORCE (Noto'g'ri - Sekin)
// ============================================
function maxSubArray_BruteForce(arr, num) {
    if (num > arr.length) return null;

    let max = -Infinity;
    
    // Har bir position da (i)
    for (let i = 0; i < arr.length - num + 1; i++) {
        let temp = 0;
        
        // Oynaning ichidagi barcha elementlarni qo'shamiz
        for (let j = 0; j < num; j++) {
            temp += arr[i + j];
        }

        if (temp > max) {
            max = temp;
        }
    }
    return max;
}

// MISOL: [1, 2, 5, 2, 8, 1, 5], num=2
// Window 1: [1, 2]    = 3
// Window 2: [2, 5]    = 7
// Window 3: [5, 2]    = 7
// Window 4: [2, 8]    = 10  ← MAX
// Window 5: [8, 1]    = 9
// Window 6: [1, 5]    = 6
// Javob: 10

console.log("Brute Force:", maxSubArray_BruteForce([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log("Time Complexity: O(n*m) - SEKIN!");


// =============================================
// FUNKSIYA 2: SLIDING WINDOW (To'g'ri - Tez)
// =============================================
function maxSubArray_SlidingWindow(arr, num) {
    if (num > arr.length) return null;

    let max = 0;
    let temp = 0;

    // Birinchi window ni hisob qilamiz
    for (let i = 0; i < num; i++) {
        temp += arr[i];
    }
    max = temp;

    // Oynani o'ng tomonga siljitamiz
    for (let i = num; i < arr.length; i++) {
        // SLING: Chap elementni olib tashla, o'ng elementni qo'sh
        temp = temp - arr[i - num] + arr[i];
        max = Math.max(max, temp);
    }

    return max;
}

// TUSHUNTIRISH:
// [1, 2, 5, 2, 8, 1, 5], num=2
// 
// Boshlang'ich: temp = 1+2 = 3, max = 3
// 
// Iteratsiya 1 (i=2): temp = 3 - 1 + 5 = 7, max = 7
// Iteratsiya 2 (i=3): temp = 7 - 2 + 2 = 7, max = 7
// Iteratsiya 3 (i=4): temp = 7 - 5 + 8 = 10, max = 10 ✓
// Iteratsiya 4 (i=5): temp = 10 - 2 + 1 = 9, max = 10
// Iteratsiya 5 (i=6): temp = 9 - 8 + 5 = 6, max = 10
// Javob: 10

console.log("\nSliding Window:", maxSubArray_SlidingWindow([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log("Time Complexity: O(n) - TEZROQ!");



