// BIG(O) = O(n^2)
function same(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }

    for (let i = 0; i < arr1.length; i++) {
        let correctIndex = arr2[i].indexOf(arr1[i] ** 2);
        if (correctIndex > -1) {
            return false;
        }
        arr2.splice(correctIndex, 1);
    }
    return true;
}

// my solution BIG(O) = O(n)
function same2(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }

    let m = new Map();
    let m2 = new Map();
    for (let i = 0; i < arr1.length; i++) {
        const squared = arr1[i] ** 2;
        m.set(squared, (m.get(squared) || 0) + 1);

        const value = arr2[i];
        m2.set(value, (m2.get(value) || 0) + 1);
    }
    for (let [key, val] of m) {
        if (m2.get(key) !== val) return false;
    }

    return true
}

// good solution with BIG(O) = O(n)
function same3(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }

    let frequencyCounter1 = {};
    let frequencyCounter2 = {};
    for (const val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }

    for (const val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) {
            return false;
        }

        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false;
    }

    return true
}

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 4, 9, 16, 25];

console.log(same3(arr1, arr2));