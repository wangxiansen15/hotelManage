import { combineReducers } from "redux-immutable";
import { reducer as Order } from '../pages/order/store';
import { reducer as CommodityList } from '../pages/commodity/store';
import { reducer as BaseInformation } from '../pages/baseInformation/store';
import { reducer as Comment } from '../pages/comment/store';
import { reducer as Coupon } from '../pages/Coupon/store';
import { reducer as Goods } from '../pages/Goods/store';
import { reducer as Product } from '../pages/product/store';
import { reducer as Login } from '../pages/login/store';
import { reducer as TenantInfo } from '../pages/tenantInfo/store';

const reducer = combineReducers({
    order: Order,
    commodity: CommodityList,
    baseInformation: BaseInformation,
    comment: Comment,
    coupon: Coupon,
    goods:Goods,
    product: Product,
    login: Login,
    tenantInfo: TenantInfo
});

export default reducer;