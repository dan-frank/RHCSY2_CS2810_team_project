module.exports = async (req, res) => {
    const io = res.locals["socketio"];

    try{
        const {orderId} = req.params;
        io.emit("callWaiterCalled", orderId);
    
    }catch(err){
        console.error(err.message);
    }
}