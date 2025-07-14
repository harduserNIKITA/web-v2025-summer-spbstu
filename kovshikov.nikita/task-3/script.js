function findMedian(arr) {
    if (arr.length === 0) {
        return null;
    }

    const sortedArr = [...arr].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 !== 0) {
        return sortedArr[middleIndex];
    }
    return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
}

let stringArray = prompt('Задайте массив чисел идущих через пробел');
let arr = stringArray.split(" ").map(Number);

console.log('Исходный массив:' + arr);
console.log('Его медиана:' + findMedian(arr));