import React, { useEffect, useState } from "react";
import FileInput from "./FileInput.tsx";
import { IProductMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/UserSlice.ts";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import { selectCategoriesItems } from "../categories/categoriesSlice.ts";
import { selectCreateLoading } from "./productsSlice.ts";
import { createProduct } from "./productsThunk.ts";
import { toast } from "react-toastify";
import { fetchCategories } from "../categories/categoriesThunk.ts";

const initialState = {
  title: "",
  description: "",
  image: null,
  price: 0,
  category: "",
};

const PoroductForm = () => {
  const [form, setForm] = useState<IProductMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectCreateLoading);
  const category = useAppSelector(selectCategoriesItems);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        form.title.trim().length === 0 ||
        form.description.trim().length === 0 ||
        !form.image
      ) {
        toast.error("Please fill all fields");
      } else if (form.price < 0) {
        toast.error("Price cannot be a negative number");
      } else if (typeof form.price === "number") {
        toast.error(" Prise must be number");
      } else {
        await dispatch(createProduct({ productMutation: form })).unwrap();
        setForm({ ...initialState });
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prevState: IProductMutation) => ({ ...prevState, [name]: value }));
  };

  const onInputSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let categoryID: string;
    category.map((c) => {
      if (c.title === value) categoryID = c._id;
    });
    setForm((prevState: IProductMutation) => ({
      ...prevState,
      [name]: categoryID,
    }));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: IProductMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div
        style={{ maxWidth: "500px" }}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">New product</h3>

        <form onSubmit={onFormSubmit}>
          <div className="form-group mb-3">
            {category.length > 0 ? (
              <select
                required
                id="category"
                value={form.category}
                onChange={onInputSelectChange}
                name="category"
                className="form-select"
              >
                <option className="fs-5" value="" disabled>
                  Select a category
                </option>
                {category.map((c) => (
                  <option key={c.title} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            ) : null}
            <label htmlFor="category" className="form-label">
              {" "}
              Category
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={onInputChange}
              className={`form-control `}
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={onInputChange}
              className={`form-control `}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="mb-3">
            <input
              type={"number"}
              min={0}
              name="price"
              id="price"
              value={form.price}
              onChange={onInputChange}
              className={`form-control`}
            />
            <label htmlFor="description">Price</label>
          </div>

          <div className="mb-3">
            <FileInput
              id="image"
              name="image"
              label="Изображение"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control`}
            />
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Save"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default PoroductForm;
