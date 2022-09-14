import React, { Suspense, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Filters } from '../models/filters';
import { Product } from '../models/product';
import { useGetProductsFromBackendQuery } from '../services/products';

const ProductsBackend = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    sort: '',
    page: 1,
  });
  const { data: productData, isLoading } = useGetProductsFromBackendQuery({
    search: filters.search,
    sort: filters.sort,
    page: filters.page,
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [last_page, setLastPage] = useState(0);

  useEffect(() => {
    setFilteredProducts((prev) =>
      productData ? prev.concat(productData.data) : []
    );
    setLastPage(productData ? productData.last_page : 0);
  }, [productData]);

  const handleSearch = (e: any) => {
    setFilters({
      ...filters,
      page: 1,
      search: e.target.value,
    });
    setFilteredProducts([]);
  };

  const sort = (sort: string) => {
    setFilters({
      ...filters,
      page: 1,
      sort,
    });
    setFilteredProducts([]);
  };

  const handleLoadMore = () => {
    setFilters({ ...filters, page: filters.page + 1 });
  };

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    >
      {' '}
      <Layout>
        <main>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Album example</h1>
                <p className="lead text-muted">
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don’t simply skip over it entirely.
                </p>
                <p>
                  <a href="#" className="btn btn-primary my-2">
                    Main call to action
                  </a>
                  <a href="#" className="btn btn-secondary my-2">
                    Secondary action
                  </a>
                </p>
              </div>
            </div>
          </section>
          <div className="col-md-12 mb-4 d-flex justify-content-around container ">
            <form className="d-flex container" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              ></input>
            </form>
            <div className="input-group-append">
              <select
                className="form-select"
                onChange={(e) => sort(e.target.value)}
              >
                <option>Select</option>
                <option value="asc">Price Ascending</option>
                <option value="desc">Price Descending</option>
              </select>
            </div>
          </div>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {filteredProducts?.map((product) => {
                  return (
                    <div className="col">
                      <div className="card shadow-sm">
                        <img
                          src={product.image}
                          alt="alt"
                          className="img-fluid img-thumbnail"
                        />

                        <div className="card-body">
                          <p className="card-text">{product.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                              >
                                Edit
                              </button>
                            </div>
                            <small className="text-muted">9 mins</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 container">
            <button
              className={`btn btn-success ${
                filters.page === last_page ? 'disabled' : ''
              }`}
              type="button"
              onClick={handleLoadMore}
            >
              LOAD MORE
            </button>
          </div>
        </main>
      </Layout>
    </Suspense>
  );
};

export default ProductsBackend;
