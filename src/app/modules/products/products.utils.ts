import { productModel } from "./products.model"

const findLastProductId = async ()=>{
    const LastProductId = await productModel.findOne({}, { productId: 1, _id: 0 }).sort({ created_at: -1 }).lean();
    return LastProductId?.productId;
}

const createProductId = async () => {
    const lastProductId = await findLastProductId();

   return (parseInt(lastProductId || '0') + 1).toString().padStart(4, '0')
}


export const productUtil = {
    createProductId
}