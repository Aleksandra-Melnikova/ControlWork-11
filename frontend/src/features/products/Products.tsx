import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ProductItem from "./Product.tsx";
import { fetchProducts, fetchProductsOnCategory } from "./productsThunk.ts";
import { selectFetchLoading, selectProductsItems } from "./productsSlice.ts";
import { selectCategoriesItems } from "../categories/categoriesSlice.ts";
import { fetchCategories } from "../categories/categoriesThunk.ts";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsItems);
  const isFetchProductsLoading = useAppSelector(selectFetchLoading);
  const categories = useAppSelector(selectCategoriesItems);

  const fetchAllProducts = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllProducts();
  }, [dispatch]);

  const fetchProductsOnId = async (id: string) => {
    await dispatch(fetchProductsOnCategory(id));
  };

  return (
    <>
      <div className="container row justify-content-between mt-5 px-0">
        <div className="col-3">
          <div className="fs-4">
            <ul className="nav flex-column text-start ">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={() => fetchAllProducts()}
                >
                  All
                </a>
              </li>
              {categories.map((item) => (
                <li key={item._id} className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => fetchProductsOnId(item._id)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-9">
          <>
            {isFetchProductsLoading ? (
              <Loader />
            ) : (
              <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-5">
                <>
                  {products.length > 0 ? (
                    <>
                      {products.map((product) => (
                        <ProductItem
                          price={product.price}
                          title={product.title}
                          image={product.image}
                          key={product._id}
                          id={product._id}
                        />
                      ))}
                      )
                    </>
                  ) : (
                    <p> No products</p>
                  )}
                </>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Products;
