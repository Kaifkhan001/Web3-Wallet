export default function getSixRandom(arr: string[], Neededvalue: string){
    console.log("Array coming:- ",arr);
    const newArr: string[] = [];
    while(newArr.length < 6){
        const ran = Math.floor(Math.random() * arr.length);
        if(!newArr.includes(arr[ran])){
            newArr.push(arr[ran]);
        }
    } 
    console.log("New 6 size arr :- ", newArr);
    console.log("The main value:- ", Neededvalue);
    if(!newArr.includes(Neededvalue)) {
    const num = Math.floor(Math.random() * 6);
    newArr[num] = Neededvalue;
    };
    console.log("6th place:- ", newArr[5]);
    console.log("Whole new arr:- ", newArr);
    return newArr;
}