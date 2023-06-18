import { Router} from 'express';

import multer from 'multer';
import uploadConfig from './config/multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { AuthUserController } from './controllers/user/AuthUserController';

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import {ListByCategoryController } from './controllers/product/ListByCategoryController';
import {CreateOrderController} from './controllers/order/CreateOrderController';
import {RemoveOrderController} from './controllers/order/RemoveOrderController';
import {AddItemController} from './controllers/order/AddItemController';

import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router(); //crio uma instância do elemento Router

const upload = multer(uploadConfig.upload("./tmp")); // Definição de pasta de upload


//------Rotas para User--------//

router.post('/user', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/userinfo', isAuthenticated, new DetailUserController().handle);


//----ROTAS PARA CATEGORY-----//

router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/listcategory', isAuthenticated, new ListCategoryController().handle);


//-----Rotas para PRODUCT----//

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

router.post('/order', isAuthenticated, new CreateOrderController().handle);

//-------Rotas para 0rder-----//

router.post('/order', isAuthenticated, new CreateOrderController().handle);

router.delete('/deleteorder', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);

router.delete('/order/delete', isAuthenticated, new RemoveItemController().handle);

router.put('/sendorder', isAuthenticated, new SendOrderController().handle);

router.get('/detailorder', isAuthenticated, new DetailOrderController().handle);

router.get('/listorder', isAuthenticated, new ListOrderController().handle);

router.get('/finishorder', isAuthenticated, new FinishOrderController().handle);

 // exportação do objeto router para acesso de outros arquivos
export { router };