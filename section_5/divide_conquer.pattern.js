/**
 * ===== DIVIDE AND CONQUER PATTERN TUSHUNTIRISH =====
 * 
 * Divide and Conquer - katta muammoni kichik qismlarga bo'lib,
 * har bir qismni alohida hal qilib, so'ngra natijalarni birlashtiramiz.
 * 
 * 3 BOSQICH:
 * 1. DIVIDE (BO'L) - Muammoni kichik qismlarga ajrat
 * 2. CONQUER (HAL QIL) - Har bir qismni rekursiv hal qil
 * 3. COMBINE (BIRLASHTIR) - Natijalarni birlashtirib, yakuniy javobni olish
 */


// ============================================
// MISOL 1: BINARY SEARCH (Ikkilik Qidirish)
// ============================================
/**
 * Binary Search - DIVIDE AND CONQUER ning eng sodda misoli
 * 
 * Asil muammo: Sorted array-da elementni topish
 * DIVIDE: Array ni yarmasiga bo'lish
 * CONQUER: O'rta elementni tekshirish
 * COMBINE: Qaysi yarim qismi to'g'ri ekanini bilanish
 */

function binarySearch_RecursiveExplained(arr, target, left = 0, right = arr.length - 1) {
    console.log(`\n🔍 SEARCH: target=${target}, left=${left}, right=${right}`);
    
    if (left > right) {
        return -1; // Topilmadi
    }

    // 1️⃣ DIVIDE: O'rta nuqtani toping
    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];
    
    console.log(`   Array chunk: [${arr.slice(left, right + 1)}], mid_index=${mid}, mid_value=${midValue}`);

    // 2️⃣ CONQUER: O'rta element bilan solishtir
    if (midValue === target) {
        console.log(`   ✅ TOPILDI! Index: ${mid}`);
        return mid; // Topildi!
    }
    
    if (midValue > target) {
        // Chap yarimda qidirish
        console.log(`   ${midValue} > ${target} → CHAPGA QID`);
        return binarySearch_RecursiveExplained(arr, target, left, mid - 1);
    } else {
        // O'ng yarimda qidirish
        console.log(`   ${midValue} < ${target} → O'NGGA QID`);
        return binarySearch_RecursiveExplained(arr, target, mid + 1, right);
    }
}

// TEST:
console.log("========== BINARY SEARCH ==========");
const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sortedArr);
console.log("Javob:", binarySearch_RecursiveExplained(sortedArr, 13));


// ============================================
// MISOL 2: MERGE SORT (Birlashtiruvchi Saralash)
// ============================================
/**
 * Merge Sort - Divide and Conquer ning klassik misoli
 * 
 * DIVIDE: Array ni ikki teng qismga bo'l (rekursiv)
 * CONQUER: Har bir qism o'z ichida saralangan bo'ladi
 * COMBINE: Ikkita saralangan qismni birlashtirib, kattaroq saralangan array ol
 * 
 * Vaqt Complexity: O(n log n) - TEZROQ!
 */

function mergeSort_Explained(arr, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}📥 DIVIDE: [${arr}]`);

    // 1️⃣ BASE CASE: Agar array 1 elementdan kam/teng bo'lsa, tayyor
    if (arr.length <= 1) {
        console.log(`${indent}✅ BASE CASE: [${arr}] tayyor`);
        return arr;
    }

    // 2️⃣ DIVIDE: Array ni yarmasiga bo'l
    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    console.log(`${indent}└─ Chap: [${leftArr}]`);
    console.log(`${indent}└─ O'ng: [${rightArr}]`);

    // 3️⃣ CONQUER: Rekursiv hal qil
    const leftSorted = mergeSort_Explained(leftArr, depth + 1);
    const rightSorted = mergeSort_Explained(rightArr, depth + 1);

    // 4️⃣ COMBINE: Birlashtirib saralab
    return merge_Explained(leftSorted, rightSorted, indent);
}

function merge_Explained(left, right, indent = "") {
    const result = [];
    let i = 0, j = 0;

    console.log(`${indent}🔗 MERGE: [${left}] + [${right}]`);

    // Ikkita array ni solishtirishing birlashtiring
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Qolgan elementlarni qo'sh
    result.push(...left.slice(i), ...right.slice(j));
    console.log(`${indent}   = [${result}] ✅`);

    return result;
}

// TEST:
console.log("\n========== MERGE SORT ==========");
const unsortedArr = [38, 27, 43, 3, 9, 82, 10];
console.log("Boshlang'ich array:", unsortedArr);
const sortedResult = mergeSort_Explained(unsortedArr);
console.log("Saralangan:", sortedResult);


// ============================================
// MISOL 3: QUICK SORT (Tez Saralash)
// ============================================
/**
 * Quick Sort - In-place Divide and Conquer
 * 
 * DIVIDE: Array ni pivot atrofida bo'l (kattalar va kichiklar)
 * CONQUER: Har bir qismni rekursiv saralab
 * COMBINE: O'z joyida saralanib ketadi
 * 
 * Vaqt Complexity: O(n log n) o'rtacha, O(n²) eng yomon
 */

function quickSort_Explained(arr, low = 0, high = arr.length - 1, depth = 0) {
    const indent = "  ".repeat(depth);

    if (low < high) {
        console.log(`${indent}🎯 QUICKSORT: [${arr.slice(low, high + 1)}]`);

        // 1️⃣ DIVIDE: Pivot toping (partition)
        const pi = partition_Explained(arr, low, high, indent);

        console.log(`${indent}   Pivot index: ${pi}, Pivot value: ${arr[pi]}`);
        console.log(`${indent}   Chap: [${arr.slice(low, pi)}], O'ng: [${arr.slice(pi + 1, high + 1)}]`);

        // 2️⃣ CONQUER: Ikkala qismni rekursiv saralab
        quickSort_Explained(arr, low, pi - 1, depth + 1);
        quickSort_Explained(arr, pi + 1, high, depth + 1);
    }

    return arr;
}

function partition_Explained(arr, low, high, indent = "") {
    const pivot = arr[high];
    let i = low - 1;

    console.log(`${indent}   Pivot: ${pivot}`);

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// TEST:
console.log("\n========== QUICK SORT ==========");
const quickArr = [64, 34, 25, 12, 22, 11, 90];
console.log("Boshlang'ich array:", quickArr);
quickSort_Explained(quickArr);
console.log("Saralangan:", quickArr);


// ============================================
// MISOL 4: POWER FUNCTION (Kuch hisoblash)
// ============================================
/**
 * DIVIDE AND CONQUER bilan eksponent hisoblash
 * 
 * Oddiy yo'l: 2^10 = 2*2*2*2*2*2*2*2*2*2 (10 marta)
 * D&C yo'li: 2^10 = (2^5)^2 = (2^2)^2 * 2 (TEZ!)
 */

function power_Recursive(base, exp) {
    console.log(`  power(${base}, ${exp})`);

    // BASE CASE
    if (exp === 0) return 1;
    if (exp === 1) return base;

    // DIVIDE: Eksponentni yarmasiga bo'l
    if (exp % 2 === 0) {
        // Juft: 2^10 = (2^5)^2
        const half = power_Recursive(base, exp / 2);
        return half * half;
    } else {
        // Toq: 2^9 = 2 * (2^4)^2
        const half = power_Recursive(base, Math.floor(exp / 2));
        return base * half * half;
    }
}

// TEST:
console.log("\n========== POWER FUNCTION ==========");
console.log("2^10 = ", power_Recursive(2, 10));
console.log("Taqqoslash: oddiy usul 10 ta ko'paytirish, D&C usul 4 ta ko'paytirish!");


// ============================================
// QAYTARISH: JADVAL VA TAQQOSLASH
// ============================================
console.log("\n\n========== D&C PATTERN TAQQOSLASH ==========");
console.log(`
┌─────────────────┬──────────────┬────────────────────────────────────┐
│ Algoritm        │ Vaqt         │ Tavsif                             │
├─────────────────┼──────────────┼────────────────────────────────────┤
│ Binary Search   │ O(log n)     │ Sorted arrayda qidirish - TEZROQ   │
│ Merge Sort      │ O(n log n)   │ Ikki qismni birlashtirib saralash   │
│ Quick Sort      │ O(n log n)   │ Pivot atrofida in-place saralash    │
│ Power Function  │ O(log n)     │ Eksponent ni yarmasiga bo'lish      │
└─────────────────┴──────────────┴────────────────────────────────────┘

🔑 DIVIDE AND CONQUER MANTIQIY:
  1. Muammoni kichik qismlarga BO'L
  2. Har bir qismni HAL QIL (rekursiv)
  3. Natijalarni BIRLASHTIR

💡 FOYDA:
  ✅ Vaqt complexity kamayadi (O(n²) → O(n log n))
  ✅ Parallel processing mumkin
  ✅ Cache friendlier
`);

