const inputApple = 10;


// ใช้เช็คว่าจำนวนแอปเปิ้ลหาร 2 ลงตัวไหม
const isDivisibleByTwo = (apple) => {
    return apple % 2 == 0;
}


// ใช้เช็คว่าจำนวนแอปเปิ้ลหาร 3 ลงตัวไหม
const isDivisibleByThree = (apple) => {
    return apple % 3 == 0;
}


// ===วิธีที่ใช้กินแอปเปิ้ล===

// กิน 1 ลูก
const eatOne = () => {
    numOfApple -= 1;
}

// กินครึ่งนึงจากทั้งหมด
const eatHalf = () => {
    numOfApple = numOfApple / 2;
}

// กิน 2 ใน 3
const eatTwoOfThree = () => {
    numOfApple -= 2 * (numOfApple / 3);
}


// ใช้เก็บจำนวนวันที่น้อยที่สุดที่ใช้กินแอปเปิ้ล
let minDay = 0;


// ใช้เก็บค่าจำนวนแอปเปิ้ล
let numOfApple = inputApple;


// วนลูปจบกว่าจำนวนแอปเปิ้ลจะเป็น 0
while (numOfApple != 0) {

    // เริ่มวัน ก็ให้ minDay + 1
    minDay++;
    

    // ถ้าจำนวนแอปเปิ้ล หาร 2 และ 3 ไม่ลงตัว
    // จะให้กิน 1 ลูก 
    if (!isDivisibleByTwo(numOfApple) && !isDivisibleByThree(numOfApple)) {

        eatOne();
        continue;
        
    }
    

    // ถ้าจำนวนแอปเปิ้ล หารทั้ง 2 และ 3 ลงตัว
    // เลือกกิน ครึ่งนึง หรือ 2 ใน 3 ก็ได้
    // ในที่นี้ให้กินครึ่งนึง
    if (isDivisibleByTwo(numOfApple) && isDivisibleByThree(numOfApple)) {
        
        eatHalf();
        continue;

    }


    // ถ้าจำนวนแอปเปิ้ล หาร 2 ลงตัว แต่หาร 3 ไม่ลงตัว
    if (isDivisibleByTwo(numOfApple)) {

        const numNextDay = numOfApple - 1;
        const numNextTwoDay = (numOfApple - 1) - (2 * ((numOfApple - 1) / 3));

        // จะเช็คก่อนว่า จำนวนที่เหลือรอบถัดไป และ 2 รอบถัดไป หาร 3 ลงตัวไหม
        // ถ้าลงตัว จะให้กิน 1 ลูก
        if (isDivisibleByThree(numNextDay) && isDivisibleByThree(numNextTwoDay)) {

            eatOne();
            continue;

        }


        // ถ้าไม่เข้าเงื่อนไขด้านบน
        // จะให้กินครึ่งนึง
        eatHalf();
        continue;

    }

    
    // ถ้าจำนวนแอปเปิ้ล หาร 3 ลงตัว แต่หาร 2 ไม่ลงตัว
    // จะให้กิน 2 ใน 3
    if (isDivisibleByThree(numOfApple)) {

        eatTwoOfThree();
        continue;

    }
    
}
    
console.log('OUTPUT: ', minDay);