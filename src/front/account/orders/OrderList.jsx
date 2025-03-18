import Skeleton from "react-loading-skeleton";

function OrderList() {

    function ShowLoader() {
        var indents = [];
        for (var i = 1; i <= 3; i++) {
            indents.push(
                <div className="row rounded"  key={'order-' + i}>
                    <Skeleton height={40} />
                </div>
            )
        }
        return indents;
    }
    return (
        <>
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Orders</h5>
            </div>
            <div className="card-body">

                <div className="order-list">
                    <div className="row text-center order-header">
                        <div className="col-4">Order ID</div>
                        <div className="col-2">date</div>
                        <div className="col-2">QTY</div>
                        <div className="col-2">Amount</div>
                        <div className="col-2">status</div>
                    </div>

                    <div className="row text-center order-box py-2 rounded mt-2">
                        <div className="col-4">785784795</div>
                        <div className="col-2">99/99/9999</div>
                        <div className="col-2">5</div>
                        <div className="col-2">$89</div>
                        <div className="col-2">Pending</div>
                    </div>
                    <ShowLoader />
                </div>
            </div>

        </>
    )
}

export default OrderList;