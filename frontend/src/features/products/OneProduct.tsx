
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { getProduct } from './productsThunk.ts';
import { selectFetchOneLoading, selectOneProduct } from './productsSlice.ts';

const OneProduct = () => {;
  const dispatch = useAppDispatch();
  const params = useParams();
  const isLoading = useAppSelector(selectFetchOneLoading)
  const product = useAppSelector(selectOneProduct);

  useEffect(() => {
    if (params.productsId ) {
      dispatch(getProduct(params.productsId));
    }
  }, [dispatch, params.productsId]);

  return (
    product && (
      <>
        {isLoading ? (
          <Loader />
        ) : (

<>
          <div className="container mt-5 ">
            <div className="my-5 shadow rounded">
              <div className=" shadow-sm  p-3 rounded border-0">
                <div className="d-flex flex-column">
                  <h5 className=" fw-semibold fs-4 my-2">{product.title}</h5>
                  <div className={'row d-flex mt-2'}>
                    <div
                      className="col-lg-6 col-xl-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center text-primary">
                      {product.image ? (
                        <img
                          src={
                            product.image ? `${apiUrl}/${product.image}` : undefined
                          }
                          alt={product.title}
                          className="w-100 h-auto mb-3 rounded"
                        />
                      ) : (
                        <i className="bi bi-chat-left-text-fill"></i>
                      )}
                    </div>
                    <div
                      className={
                        'col-lg-6 col-xl-6 col-md-6 col-sm-12 d-flex flex-column'
                      }
                    >
                      <p className=" flex-grow-1">
                        {product.description ? product.description : null}
                      </p>
                      <p className="text-muted">
                        Price: {product.price} $
                      </p>
                      <hr/>
                      <p>Name: {product.user.displayName}</p>
                      <p> Phone: {product.user.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></>
        )}
      </>
    )
  );
};

export default OneProduct;
