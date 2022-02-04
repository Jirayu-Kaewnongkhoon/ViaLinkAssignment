const removeDuplicates = (nums) => {

    // ใช้สำหรับรันข้อมูลใน arrays 'nums'
    let index = 0;


    // วนลูปจนกว่าตำแหน่งของ index จะไปตรงกับค่า null อันแรก
    do {

        // กรณีที่ index วนจนครบ array 'nums'
        // นั่นคือ มันไม่มีเลขซ้ำแล้ว
        // ให้จบลูป
        if (index == nums.length) break;

        // ใช้เป็นเลขที่จะเอาไปค่าซ้ำใน array
        const num = nums[index];


        // หาตำแหน่งสุดท้ายของเลขซ้ำ
        const position = nums.lastIndexOf(num);


        // ถ้าตำแหน่งที่ได้มา เป็นตำแหน่งของตัวมันเอง
        // หมายความว่ามันไม่มีเลขซ้ำ
        // ให้มันขึ้นรอบใหม่ เพื่อเปลี่ยนเลข
        if (position == index) {
            index++;
            continue;
        }


        // ถ้าไม่เข้าเงื่อนไขข้างบน คือ เจอเลขซ้ำ
        // ให้ตัดเลขซ้ำที่ตำแหน่งนั้นออก
        // แล้ว push 'null' เข้าไปข้างหลัง
        nums.splice(position, 1);
        nums.push(null);


    } while (index != nums.indexOf(null));


    // ชุดตัวเลขที่ตัดเลขซ้ำออกใน array หลังการ modify จะอยู่ในช่วงก่อนค่า null
    // ถ้ากรณีที่ไม่มีเลขซ้ำถูกตัดออก ก็จะ return nums.length คืนไป
    const newLength = nums.indexOf(null) != -1 ? nums.indexOf(null) : nums.length;

    return newLength;
}


// ---------------------------------TEST---------------------------------

const nums = [1, 1, 2]; // Input array
const expectedNums = [1, 2]; // The expected answer with correct length
// OUTPUT = [1, 2, null];


// const nums = [0,0,1,1,1,2,2,3,3,4];
// const expectedNums = [0,1,2,3,4];
// OUTPUT = [0,1,2,3,4,null,null,null,null,null]


const k = removeDuplicates(nums); // Calls your implementation

console.assert(k == expectedNums.length);

for (let i = 0; i < k; i++) {
    console.assert(nums[i] == expectedNums[i]);
}

console.log(`OUTPUT: ${k}, nums: `, nums);