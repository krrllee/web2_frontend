import axios from 'axios';

export async function GetAllOrders(){
    return await axios.get(process.env.REACT_APP_API_URL+'/api/order/getAllOrders');
}
