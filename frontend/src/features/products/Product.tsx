import { Link } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";

interface Props {
  title: string;
  price: number;
  id: string;
  image?: string;
}

const ProductItem: React.FC<Props> = ({ title, price, id, image }) => {
  return (
    <div className="card " style={{ width: "300px", minHeight: "300px" }}>
      <div
        className="w-100 h-50 d-flex align-items-center "
        style={{ width: "300px", minHeight: "150px", overflow: "hidden" }}
      >
        <img
          className="card-img-top"
          style={{ width: "auto", height: "150px" }}
          src={`${apiUrl}/${image}`}
          alt={title}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price}</p>
        <Link to={`/products/${id}`} className="btn btn-primary">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
