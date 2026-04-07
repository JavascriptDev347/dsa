// valid anagram

// FIRST SOLUTION WITH MAP
function validAnagram1(str1, str2) {
    if (str1.length !== str2.length) return false;
    let map = new Map()
    for (let item of str1) {
        map.set(item, (map.get(item) || 0) + 1)
    }
    for (let s of str2) {
        if (!map.has(s) || map.get(s) === 0) {
            return false
        } else {
            map.set(s, map.get(s) - 1)
        }
    }
    return true
}

validAnagram1('hello', 'salom')

function validAnagram2(str1, str2) {
    if (str1.length !== str2.length) return false;

    let f1 = {}
    let f2 = {}

    let s1_arr = str1.split('')
    let s2_arr = str2.split('')

    for (const val of s1_arr) {
        f1[val] = (f1[val] || 0) + 1
    }

    for (const val of s2_arr) {
        f2[val] = (f2[val] || 0) + 1
    }

    for (let key in f1) {
        if (!(key in f2)) {
            return false
        }
        if (f2[key] !== f1[key]) return false;
    }
    return true
}

console.log(validAnagram2('hello', 'salom'))