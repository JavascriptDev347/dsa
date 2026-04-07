// First my solution
function countUniqueNumbers(arr) {
    let s = new Set(arr)
    return s.size
}

// second solution with multiple pointer pattern
function countUniqueNumbers2(arr) {
    if (arr.length === 0) return 0;
    let i = 0
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j]
        }
    }
    return i + 1
}

console.log(countUniqueNumbers2([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // return 5