const findIsland = (grid) => {

    // ใช้เก็บจำนวนเกาะที่เจอใน array 'grid'
    let numOfIsland = 0;


    // ใช้เก็บพื้นที่เกาะ (เลข 1 ใน array 'grid')
    let landList = [];


    // เป็น constant สำหรับเกาะ
    const ISLAND = '1';

    // ขอบของ grid
    // เอาไว้เช็คว่าเกาะนั้นๆ เกินขอบของ array 'grid' หรือไม่
    const RIGHTBOUND = grid[0].length;
    const BOTTOMBOUND = grid.length;
    const LEFTBOUND = 0;
    const TOPBOUND = 0;


    // ใช้เช็คว่าเกาะที่รับมา ถูกนับไปแล้วหรือยัง
    const isAlreadyCount = (land) => {
        return landList.find(val => val.i == land.i && val.j == land.j)
    }


    // เป็น recursive function
    // ใช้หาพื้นที่ของเกาะ (เลข 1 ที่อยู่ติดกันทั้งหมด)
    const findConnectedLand = (mainLand) => {

        // ถ้าเป็นเกาะที่เคยนับไปแล้ว (มีอยู่ใน array 'landList')
        // ไม่ต้องไปหาพื้นรอบด้านอีก
        if (isAlreadyCount(mainLand)) return;


        // ถ้าไม่เข้าเงื่อนไขด้านบน จะเพิ่มพื้นที่เกาะลง array 'landList'
        landList.push(mainLand);


        // ตำแหน่งรอบด้านของ mainLand (ขวา, ล่าง, ซ้าย, บน)
        // จะเช็คก่อนว่าแต่ละข้างเกินขอบของ array 'grid' หรือไม่
        // ถ้าไม่ ก็จะให้มันเก็บค่าตำแหน่งใน array 'grid' ของตัวเองไว้
        const rightLand = mainLand.j + 1 != RIGHTBOUND && grid[mainLand.i][mainLand.j + 1];
        const bottomLand = mainLand.i + 1 != BOTTOMBOUND && grid[mainLand.i + 1][mainLand.j];
        const leftLand = mainLand.j != LEFTBOUND && grid[mainLand.i][mainLand.j - 1];
        const topLand = mainLand.i != TOPBOUND && grid[mainLand.i - 1][mainLand.j];


        // เริ่มเช็คแต่ละด้าน ว่าเป็นเกาะหรือไม่
        // ถ้าเป็น ก็จะเรียกตัวมันเอง (findConnectedLand()) แล้วส่งตำแหน่งตัวเองไป
        // เพื่อให้ไปหาว่ารอบด้านมีเกาะ (เลข 1) อยู่อีกไหม
        if (rightLand === ISLAND) {
            
            const tempRightLand = { 
                i: mainLand.i, 
                j: mainLand.j + 1
            };
            
            findConnectedLand(tempRightLand);

        }

        if (bottomLand === ISLAND) {

            const tempBottomLand = { 
                i: mainLand.i + 1, 
                j: mainLand.j 
            };

            findConnectedLand(tempBottomLand);

        }

        if (leftLand === ISLAND) {

            const tempLeftLand = { 
                i: mainLand.i, 
                j: mainLand.j - 1 
            };

            findConnectedLand(tempLeftLand);

        }

        if (topLand === ISLAND) {

            
            const tempTopLand = { 
                i: mainLand.i - 1, 
                j: mainLand.j
            };

            findConnectedLand(tempTopLand);

        }
    }
    

    // ลูปใน array 'grid' เพื่อส่งตำแหน่ง
    for (let i = 0; i < grid.length; i++) {

        for (let j = 0; j < grid[i].length; j++) {
            

            // สนใจแค่ตำแหน่งที่เป็นเกาะ (เลข 1)
            if (grid[i][j] == ISLAND) {


                // ใช้เก็บพื้นที่ตำแหน่งปัจจุบัน (i, j)
                const mainLand = { i, j };


                // ถ้าตำแหน่งเกาะที่ i, j ยังไม่ถูกนับ (ไม่ได้อยู่ใน landList)
                // จำนวนเกาะ จะเพิ่มขึ้น 1
                if (!isAlreadyCount(mainLand)) numOfIsland++;


                // เอาตำแหน่งปัจจุบันไปหาพื้นเกาะรอบด้าน
                findConnectedLand(mainLand);

            }
            
        }
        
    }

    console.log('OUTPUT: ', numOfIsland);
}


// ---------------------------------TEST---------------------------------

const grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],   // 1
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];

// const grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],  // 3
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
// ]

findIsland(grid);