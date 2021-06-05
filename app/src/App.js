import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error404 from "./routes/404";
import Menu from "./routes/Menu";
import OrderConfirm from "./routes/OrderConfirm";
import Kitchen from "./routes/Kitchen";
import Manager from "./routes/Manager";
import ManagerWaiters from "./routes/ManagerWaiters";
import Waiter from "./routes/Waiter";
import WaiterOrders from "./routes/WaiterOrders";
import WaiterItems from "./routes/WaiterItems";
import WaiterTables from "./routes/WaiterTables";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/order_confirm/:id" exact component={OrderConfirm} />
        <Route path="/kitchen" exact component={Kitchen} />
        <Route path="/manager" exact component={Manager} />
        <Route path="/manager/waiters" exact component={ManagerWaiters} />
        <Route path="/waiter" exact component={Waiter} />
        <Route path="/waiter/orders" exact component={WaiterOrders} />
        <Route path="/waiter/items" exact component={WaiterItems} />
        <Route path="/waiter/table" exact component={WaiterTables} />
        <Route path="/" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
