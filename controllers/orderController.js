import Order from "../models/order.js";

export function createOrder(req,res){
    
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return;
    }
    const body = req.body;
    const orderDate = {
        orderId : "",
        email : req.user.email,
        name : body.name,
        address : body.address,
        phoneNumber : body.phoneNumber,
        billItems : [],
        total : 0
    };
    Order.find()
        .sort({
            date : -1,   
        })
        .limit(1).then((lastBills) => {
            
            if (lastBills.length == 0) {
                orderDate.orderId = "ORD0001";
            }else{
        
                const lastBill = lastBills[0];
        
                const lastOrderId = lastBill.orderId; //"ORD0061"
                const lastOrderNumber = lastOrderId.replace("ORD",""); //"0061"
                const lastOrderNuberInt = parseInt(lastOrderNumber); //61
                const newOrderNumberInt = lastOrderNuberInt + 1; //62
                const newOrderNumberStr = newOrderNumberInt.toString().padStart(4,'0'); //"0062"
                orderDate.orderId = "ORD" + newOrderNumberStr;
            }
        
            const order = new Order(orderDate);
            order.save().then(()=>{
                res.json({
                    message : "Order saved successfully"
                });
            }).catch((err) =>{
                console.log(err);
                res.status(500).json({
                    message : "Order not saved"
                });
            });
        });
    
}

export function getOrders(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return;
    }

    if(req.user.role == "admin"){
        Order.find().then(
            (orders)=>{
                res.json(orders)
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message : "Orders not fount"
                })
            }
        )
    }else{
        Order.find({
            email : req.user.email
        }).then(
            (orders)=>{
                res.json(orders)
            }
        ).catch(
            (err)=>{
                res.status(500).json({
                    message : "Orders not found"
                })
            }
        )
    }
}