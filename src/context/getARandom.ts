export default function getRandom(arr: string[]){
    const len = arr.length;
    const random = Math.round(Math.random() * len) + 1;

    return arr[random]
}