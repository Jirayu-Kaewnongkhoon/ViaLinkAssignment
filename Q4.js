const findMaxProfit = (prices) => {

    // ใช้บันทึกกรณี transaction ทั้งหมดที่สามารถเกิดขึ้นได้
    const shouldBuy = [];


    // ใช้บันทึก transaction ที่ทำให้เกิด profit มากที่สุด (ใช้ log check)
    let transactions = [];


    // ใช้บันทึกค่า profit ที่มากที่สุดที่ทำได้จาก transaction ที่เกิดขึ้น
    let maxProfit = 0;


    // วนลูปเพื่อหาความเป็นไปได้ทั้งหมดของ transaction
    prices.forEach((price, day) => {

        for(let tempDay = day + 1; tempDay <= prices.length; tempDay++) {


            // จะสนใจแค่ transaction ที่มีราคาขายมากกว่าราคซื้อ
            if (price < prices[tempDay]) {


                // สร้าง object เก็บข้อมูล transaction
                const transaction = { buyDay: day, sellDay: tempDay, profit: prices[tempDay] - price, buyVal: price, sellVal: prices[tempDay] };
                

                // บันทึกลง array
                shouldBuy.push(transaction);


                // เนื่องจากการทำ 1 transaction ก็อาจมีโอกาสทำ profit ได้มากสุด
                // จึงต้อง save เอาไว้เทียบกับ transaction อื่นๆ หรือ เทียบกับกรณีที่ทำ 2 transaction
                if (transaction.profit > maxProfit) {

                    maxProfit = transaction.profit;
                    transactions = [];
                    transactions.push(transaction);

                }
            }

        }

    })

    // กรณีทำ 2 transaction
    // จับคู่ transaction เพื่อหาอันที่ทำ profit ได้มากสุด
    shouldBuy.forEach((transaction, index) => {
        
        for (let tempIndex = index + 1; tempIndex < shouldBuy.length; tempIndex++) {
            

            // ใช้เก็บ transaction ชั่วคราว ไว้ใช้เทียบกับ array 'transactions' ว่าอันไหน มาก/น้อย กว่ากัน
            const tempTransactions = [];

            const firstTransaction = transaction;
            const secondTransaction = shouldBuy[tempIndex];


            // เริ่มจับคู่ทีละตัว โดยบันทึกไว้ใน array transaction ชั่วคราว
            tempTransactions.push(firstTransaction);
            

            // โดยจะจับคู่จากวันซื้อของ transaction ที่ 2 จะต้องเกิดหลังจากวันขายของ transaction ที่ 1
            if (secondTransaction.buyDay > firstTransaction.sellDay) {


                // ถ้าเข้าเงื่อนไข ก็บันทึกลง array transaction ชั่วคราว
                tempTransactions.push(secondTransaction);


                // เอา profit ของทั้ง 2 transaction มารวมกัน
                const tempProfit = firstTransaction.profit + secondTransaction.profit;
        

                // เช็คกับ maxProfit ที่เคยทำได้ ว่ามากกว่าไหม?
                if (tempProfit > maxProfit) {
                    
                    // ถ้ามากกว่า ก็บันทึก transaction และเปลี่ยนค่า maxProfit
                    transactions = tempTransactions;
                    maxProfit = tempProfit;

                }

            }

        }

    })

    return maxProfit;
}

// ---------------------------------TEST---------------------------------
const prices = [3,3,5,0,0,3,1,4];
// const prices = [1,2,3,4,5];

console.log('OUTPUT:', findMaxProfit(prices));