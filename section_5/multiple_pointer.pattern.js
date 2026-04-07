function sumZero(numbers) {
    let left = 0;
    let right = numbers.length - 1;
    while (left <= right) {
        let sum = numbers[left] + numbers[right];
        if (sum === 0) {
            return [numbers[left], numbers[right]];
        } else if (sum > 0) {
            right--;
        } else {
            left++;
        }
    }

}