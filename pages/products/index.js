import { useEffect, useState } from "react";
import axios from "axios";

import jsreport from "jsreport";

import Product from "@/Models/ProductSchema";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const handleFilter = async (filter) => {
    try {
      const response = await axios.get("/api/products", {
        params: { filter },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await Product.find();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleReport = async () => {
    try {
      const report = await jsreport.render({
        template: {
          content: `
            <h1>Products Report</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {{#each products}}
                  <tr>
                    <td>{{this.name}}</td>
                    <td>{{this.type}}</td>
                    <td>{{this.price}}</td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          `,
          engine: "handlebars",
          recipe: "chrome-pdf",
        },
        data: {
          products,
        },
      });

      window.open(
        `data:application/pdf;base64,${report.content.toString("base64")}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Products Page</h1>
      <button onClick={() => handleReport()}>Generate Report</button>
      <div>
        <label htmlFor="filter">Filter by Type:</label>
        <select id="filter" onChange={(e) => handleFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;