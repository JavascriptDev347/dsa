/**
 * ===== LEETCODE MASALALAR - PATTERN BO'YICHA =====
 * 
 * Har bir pattern uchun EASY va MEDIUM masalalar
 * Bilan to'liq yechim va tushuntirish
 */


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ FREQUENCY COUNTER PATTERN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("┌─ FREQUENCY COUNTER PATTERN ─┐\n");

/**
 * EASY: LeetCode 1 - Two Sum
 * Link: https://leetcode.com/problems/two-sum/
 * 
 * Muammo: Array-da ikkita number topish, ularning yig'indisi target ga teng bo'lsin
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Tavsifi: nums[0] + nums[1] == 9, shuning uchun [0, 1] qaytaramiz
 * 
 * Yechim: Map (frequency counter) ishlatamiz
 * Vaqt: O(n), Memory: O(n)
 */

function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

console.log("EASY: Two Sum");
console.log("Input: [2,7,11,15], target=9");
console.log("Output:", twoSum([2,7,11,15], 9), "→ [0, 1] ✅\n");


/**
 * MEDIUM: LeetCode 49 - Group Anagrams
 * Link: https://leetcode.com/problems/group-anagrams/
 * 
 * Muammo: String array-ni group qil, har bir group-da anagramlar bo'lsin
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * Tavsifi: Anagramlar - bir xil harflarga ega
 * 
 * Yechim: Har string ni sort qilib, key sifatida ishlatamiz
 * Vaqt: O(n * k log k), k = string uzunligi
 */

function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // String ni sort qilib, key sifatida ishlatamiz
        const key = str.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

console.log("MEDIUM: Group Anagrams");
console.log("Input: ['eat','tea','tan','ate','nat','bat']");
const result = groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
console.log("Output:", result);
console.log("Tavsifi: Har group-da anagramlar ✅\n");


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ MULTIPLE POINTER PATTERN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("\n┌─ MULTIPLE POINTER PATTERN ─┐\n");

/**
 * EASY: LeetCode 125 - Valid Palindrome
 * Link: https://leetcode.com/problems/valid-palindrome/
 * 
 * Muammo: String palindrome bo'lishini tekshir (harflar va raqamlari)
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Tavsifi: Alphanumeric bo'lgan harflari tekshir (case-insensitive)
 * 
 * Yechim: Ikkita pointer (chap va o'ng) ishlatamiz
 * Vaqt: O(n), Memory: O(1)
 */

function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Non-alphanumeric characterlarni o'tkazib yuboramiz
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Case-insensitive solishtirish
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

console.log("EASY: Valid Palindrome");
console.log("Input: 'A man, a plan, a canal: Panama'");
console.log("Output:", isPalindrome("A man, a plan, a canal: Panama"), "→ true ✅\n");


/**
 * MEDIUM: LeetCode 15 - 3Sum
 * Link: https://leetcode.com/problems/3sum/
 * 
 * Muammo: Array-da uchta raqam topish, ularning yig'indisi 0 bo'lsin
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Tavsifi: Bir xil kombinatsiyalarni faqat bitta marta qaytaramiz
 * 
 * Yechim: 
 * 1. Array ni sort qilamiz
 * 2. Birinchi element ni loop-da olamiz
 * 3. Qolgan ikkita element uchun ikkita pointer ishlatamiz
 * 
 * Vaqt: O(n²), Memory: O(1) (sort esdan tashqari)
 */

function threeSum(nums) {
    const result = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Agar number musbat bo'lsa, yig'indi 0 bo'lolmaydi
        if (nums[i] > 0) break;
        
        // Dublikatlarni o'tkazib yuboramiz
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Dublikat left pointerlarni o'tkazib yuboramiz
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Dublikat right pointerlarni o'tkazib yuboramiz
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

console.log("MEDIUM: 3Sum");
console.log("Input: [-1,0,1,2,-1,-4]");
console.log("Output:", threeSum([-1,0,1,2,-1,-4]));
console.log("Tavsifi: Uchta raqam, yig'indisi 0 ✅\n");


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣ SLIDING WINDOW PATTERN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("\n┌─ SLIDING WINDOW PATTERN ─┐\n");

/**
 * EASY: LeetCode 643 - Maximum Average Subarray I
 * Link: https://leetcode.com/problems/maximum-average-subarray-i/
 * 
 * Muammo: k ta ketma-ket elementning maksimal o'rtachasini topish
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12.75
 * Tavsifi: Maksimal o'rtacha [12,-5,-6,50] = 51/4 = 12.75
 * 
 * Yechim: Sliding window bilan birinchi window hisob qilamiz, keyin siljitamiz
 * Vaqt: O(n), Memory: O(1)
 */

function findMaxAverage(nums, k) {
    let maxSum = 0;
    
    // Birinchi window-ni hisob qil
    for (let i = 0; i < k; i++) {
        maxSum += nums[i];
    }
    
    let currentSum = maxSum;
    
    // Sliding window
    for (let i = k; i < nums.length; i++) {
        currentSum = currentSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum / k;
}

console.log("EASY: Maximum Average Subarray I");
console.log("Input: [1,12,-5,-6,50,3], k=4");
console.log("Output:", findMaxAverage([1,12,-5,-6,50,3], 4), "→ 12.75 ✅\n");


/**
 * MEDIUM: LeetCode 3 - Longest Substring Without Repeating Characters
 * Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * 
 * Muammo: Takrorlansa'y character yo'q bo'lgan eng uzun substring-ni topish
 * Input: s = "abcabcbb"
 * Output: 3 ("abc")
 * Tavsifi: Birinchi takrorlash "abcab" da "a" takrorlansa'y, "abc" qoladi
 * 
 * Yechim: Sliding window + Set ishlatamiz
 * Vaqt: O(n), Memory: O(min(m, n))
 */

function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let left = 0;
    const charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        // Agar character set-da bo'lsa, chap pointerdan o'tkazib yuboramiz
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Character-ni set-ga qo'shamiz
        charSet.add(s[right]);
        
        // Maksimal length-ni update qilamiz
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

console.log("MEDIUM: Longest Substring Without Repeating Characters");
console.log("Input: 'abcabcbb'");
console.log("Output:", lengthOfLongestSubstring("abcabcbb"), "→ 3 ✅");
console.log("Tavsifi: 'abc' - takrorlansa'y character yo'q\n");


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4️⃣ DIVIDE AND CONQUER PATTERN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("\n┌─ DIVIDE AND CONQUER PATTERN ─┐\n");

/**
 * EASY: LeetCode 704 - Binary Search
 * Link: https://leetcode.com/problems/binary-search/
 * 
 * Muammo: Sorted array-da element-ni topish
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 * Tavsifi: Element index = 4
 * 
 * Yechim: Binary search - array ni yarmasiga bo'lish va solishtirish
 * Vaqt: O(log n), Memory: O(1)
 */

function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

console.log("EASY: Binary Search");
console.log("Input: [-1,0,3,5,9,12], target=9");
console.log("Output:", binarySearch([-1,0,3,5,9,12], 9), "→ 4 ✅\n");


/**
 * MEDIUM: LeetCode 23 - Merge k Sorted Lists
 * Link: https://leetcode.com/problems/merge-k-sorted-lists/
 * 
 * Muammo: k ta sorted linked list-ni bir xil sorted list-ga birlashtiramiz
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,1,3,4,4,5,6]
 * 
 * Yechim: Divide and conquer - listlarni yarmasiga bo'lib, birlashtiramiz
 * Vaqt: O(n log k), Memory: O(log k)
 */

// Array for simplicity (Linked List o'rniga)
function mergeKLists(lists) {
    if (lists.length === 0) return [];
    
    // Merge function
    function mergeTwo(list1, list2) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < list1.length && j < list2.length) {
            if (list1[i] <= list2[j]) {
                result.push(list1[i++]);
            } else {
                result.push(list2[j++]);
            }
        }
        
        return result.concat(list1.slice(i), list2.slice(j));
    }
    
    // Divide and Conquer
    function mergeHelper(l, r) {
        if (l === r) return lists[l];
        
        const mid = Math.floor((l + r) / 2);
        const left = mergeHelper(l, mid);
        const right = mergeHelper(mid + 1, r);
        
        return mergeTwo(left, right);
    }
    
    return mergeHelper(0, lists.length - 1);
}

console.log("MEDIUM: Merge k Sorted Lists");
console.log("Input: [[1,4,5],[1,3,4],[2,6]]");
console.log("Output:", mergeKLists([[1,4,5],[1,3,4],[2,6]]));
console.log("Tavsifi: k ta list-ni divide and conquer bilan birlashtiramiz ✅\n");


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// XULOSA JADVAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log(`
┌────────────────────────────────────────────────────────────────────────────────────┐
│ PATTERN BO'YICHA LEETCODE MASALALAR - XULOSA JADVAL                              │
├────────────────────────────────────────────────────────────────────────────────────┤
│ PATTERN                  │ EASY                              │ MEDIUM              │
├──────────────────────────┼───────────────────────────────────┼─────────────────────┤
│ FREQUENCY COUNTER        │ 1 - Two Sum                       │ 49 - Group Anagrams │
│                          │ O(n) vaqt, O(n) memory            │ O(nk log k)         │
│                          │ Map data structure                │ Sort + Map          │
├──────────────────────────┼───────────────────────────────────┼─────────────────────┤
│ MULTIPLE POINTER         │ 125 - Valid Palindrome            │ 15 - 3Sum           │
│                          │ O(n) vaqt, O(1) memory            │ O(n²) vaqt          │
│                          │ Ikkita pointer (chap/o'ng)        │ Sort + ikkita ptr   │
├──────────────────────────┼───────────────────────────────────┼─────────────────────┤
│ SLIDING WINDOW           │ 643 - Max Avg Subarray I          │ 3 - Longest Substr  │
│                          │ O(n) vaqt, O(1) memory            │ O(n) vaqt, O(m)     │
│                          │ Fixed window size                 │ Dynamic window size │
├──────────────────────────┼───────────────────────────────────┼─────────────────────┤
│ DIVIDE AND CONQUER       │ 704 - Binary Search               │ 23 - Merge k Lists  │
│                          │ O(log n) vaqt, O(1) memory        │ O(n log k)          │
│                          │ Sorted array-da qidirish         │ Recursive merge     │
└────────────────────────────────────────────────────────────────────────────────────┘

🎯 QISQA TAVSIF:

1️⃣ FREQUENCY COUNTER:
   • HashMap/Set ishlatib, character/number miqdori xisoblanadi
   • Two Sum: Complement topish uchun Map
   • Group Anagrams: Sorted string-ni key sifatida ishlatish

2️⃣ MULTIPLE POINTER:
   • Ikkita pointer chap va o'ngdan yoki ikkita pointer turli joydan
   • Valid Palindrome: Ikkita pointer yaqinlashadi
   • 3Sum: Birinchi element + ikkita pointer

3️⃣ SLIDING WINDOW:
   • Oyna siljitib, qo'shimcha/olib tashlab update qilish
   • Fixed window: Har doim k ta element
   • Dynamic window: Condition-ga qarab window o'zgaradi

4️⃣ DIVIDE AND CONQUER:
   • Muammoni kichik qismlarga bo'lib, rekursiv hal qilish
   • Binary Search: Array-ni yarmasiga bo'lish
   • Merge k Lists: k ta listni birlashtirib hal qilish

💡 MASLAHAT:
   • Masalani tushuntirish uchun brute force bilan boshlang
   • Undan keyin pattern-ni aniqlab, optimize qiling
   • Time va memory complexity-ni taqqoslang
`);

