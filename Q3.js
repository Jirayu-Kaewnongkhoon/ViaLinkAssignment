// แปลงค่า input data ให้เป็น binary
const convertToBinary = (data) => {

    return data.map(val => {

        let binary = val.toString(2);

        // เติม 0 ให้ binary ครบ 8 ตัว 
        if (binary.length != 8) {

            for (let length = binary.length; length < 8; length++) {
                const ZERO = '0';
                binary = ZERO.concat(binary);
            }

        }

        return binary;
    });

}

const binaryValidCheck = (data) => {
    
    // ใช้เก็บ binary ของ input data
    let binaryList = [];

    // ใช้เก็บจำนวน byte ของแต่ละ binary
    let byteList = [];


    // ใช้เข็คว่า byte ต่อไปต้องเริ่มด้วย 10 หรือไม่
    let mustFollowedByOneZero = false;


    // ใช้นับจำนวนรอบ byte ที่ต้องเริ่มด้วย 10
    let round = 0;

    
    // บันทึกค่า binary ที่ได้ลง binaryList
    binaryList = convertToBinary(data);


    // เริ่มเช็ค binary แต่ละตัว ว่าตรงกฎหรือไม่
    for (let index = 0; index < binaryList.length; index++) {

        // กรณีที่เป็น byte ที่ต้องเริ่มด้วย 10
        if (mustFollowedByOneZero) {


            // หาตำแหน่งของ 10 ใน binary
            // ถ้าเป็น 0 คือ binary นั้น เริ่มด้วย 10
            if (binaryList[index].indexOf('10') == 0) {

                // ใส่ค่า true ลง byteList (ใส่อะไรก็ได้ เอาไว้ log check เฉยๆ)
                // ลบจำนวนรอบ
                byteList[index] = true;
                round--;

                // ถ้าจำนวนรอบเป็น 0
                // คือ มีจำนวน byte ที่เริ่มด้วย 10 ครบแล้ว
                // ก็จะ set ให้ mustFollowedByOneZero เป็น false (ไม่ต้องเช็คอีก)
                if (round == 0) mustFollowedByOneZero = false;

                continue;

            } else {

                // กรณี byte ที่ตาม ไม่ได้เริ่มด้วย 10
                // ใส่ค่า false ลง byteList (เอาไว้เช็คตอนท้าย)
                byteList[index] = false;
                continue;

            }

        } else {
        
            // เช็คตัวแรกของ binary ว่าเป็น 0 หรือไม่
            // ถ้าเป็น 0 คือ binary นั้น เป็น 1-byte char
            if (binaryList[index].charAt(0) == '0') {
                byteList[index] = 1;
                continue;
            }


            // เช็ค binary ว่าเริ่มด้วย 11 หรือไม่
            // ถ้าใช่ คือ binary นั้น เป็น n-byte char
            if (binaryList[index].indexOf('11') == 0) {
                
                // หาตำแหน่งของ 0 ตัวแรกที่อยู่ใน binary
                const zeroPosition = binaryList[index].indexOf('0');

                // ถ้าไม่เจอ 0 คือ ไม่เข้ากฎ n-byte char
                if (zeroPosition == -1) {

                    // ใส่ค่า false ลง byteList (เอาไว้เช็คตอนท้าย)
                    byteList[index] = false;
                    continue;

                } else {

                    // ถ้าเจอ 0 ก็จะได้จำนวนเลข 1 ที่อยู่ข้างหน้า
                    // ซึ่งก็คือจำนวน byte 
                    // ใส่ค่าจำนวน byte ลง byteList (เอาไว้ log check เฉยๆ)
                    byteList[index] = zeroPosition;

                    // set รอบของ byte 10 ที่จะตามมา
                    round = zeroPosition - 1;

                    // set ให้ mustFollowedByOneZero เป็น true
                    // เพื่อเอาไปเช็คเงื่อนไข การมี byte 10 ตาม
                    mustFollowedByOneZero = true;
                    continue;

                }

            }

            // ถ้าเช็คเงื่อนไขด้านบนแล้ว
            // ไม่ได้เริ่มด้วย 0 (1-byte)
            // ไม่ได้เริ่มด้วย 110, 1110, ... (n-byte)
            // ก็คือไม่เป็นไปตามกฎ ใส่ false ลง byteList เลย
            byteList[index] = false;
        
        }

    }


    // กรณีที่ยังติดเงื่อนไขการมี byte 10 อยู่
    // หมายความว่าไม่เป็นไปตามกฎ
    // ก็เท่ากับว่า invalid data
    if (mustFollowedByOneZero) return false;


    // ถ้าใน byteList มีจุดที่ทำให้ไม่เป็นไปตามกฎ (เป็น false)
    // ก็คือ เป็น invalid data
    // ถ้าไม่มี ก็จะเป็น valid data
    return byteList.includes(false) ? false : true;

}

// ---------------------------------TEST---------------------------------
const data = [197,130,1];
// const data = [235,140,4];

console.log('OUTPUT:', binaryValidCheck(data));
