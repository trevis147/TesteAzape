import { relativeTimeRounding } from "moment";
import Order from "../models/Order";

class DashboardsController {
    async getDashboard(req, res) {
        try {
            let averageticket = 0;

            const orders = await Order.find()

            let ordersTotal = orders.reduce((ret, x) => ret + x._doc.payment.amount, 0).toFixed(2);
            let salesTotal = orders.filter((x) => x.status === 'paid').reduce((ret, y) => ret + y._doc.payment.amount, 0).toFixed(2);
            let salesCount = orders.filter((x) => x.status === 'paid').length

            if (ordersTotal > 0)
                averageticket =  (ordersTotal / salesCount).toFixed(2)

            return res.status(200).json({
                "orders_total": ordersTotal,
                "orders_count": orders.length,
                "sales_total": salesTotal,
                "sales_count": salesCount,
                "average_ticket": averageticket,
                orders
            })
        }
        catch (err) {
            throw err
        }
    }
}
export default new DashboardsController();