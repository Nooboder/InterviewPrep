// check if array is sorted ?

// which array is sorted andd which is not?

// Interviewer wants to know element comparison****

const arr1 = [1,2,3,5,4]

const arr2 =[1,2,3,4,5]


let sorted = true;

for(let i =1 ; i<arr1.length ; i++){
    if(arr1[i]<arr1[i-1]){
        sorted = false;
        break;
    }
}

console.log(sorted);
