const fs = require('fs');
let myData;

const days = ['SUNDAY' , 'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']

let answer = [
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    },
    {
        total : 0,
        count : 0,
        avg : 0
    }
    ]

fs.readFile('data.json',((err, data) => {
    if (err){
        console.log(err)
    }else {
        myData = JSON.parse(data)
        calculation()
    }
}))

function calculation() {
    myData.map(item => {
        let totalPrice = 0

        const ordersPrice = item.orderLines.map(order => order.quantity * order.unitPrice)
        for (let i = 0; i < ordersPrice.length; i++) {
            totalPrice += ordersPrice[i]
        }

        let day = new Date(item.creationDate).getDay()

        answer[day].count += 1
        answer[day].total += totalPrice

    })

    answer = answer.map((item,index) => {
        const finalTotal = Math.round(item.total*100)/100

        const ans = {}
        const day = days[index]

        ans[day] = {
            total : finalTotal,
            count : item.count,
            avg :  finalTotal != 0 ? Math.round(finalTotal/item.count*100)/100 : 0
        }

        return ans
    })
    console.log(answer)
    return answer
}
