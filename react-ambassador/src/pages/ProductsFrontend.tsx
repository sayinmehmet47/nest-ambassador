import React, { Suspense, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Filters } from '../models/filters';
import { Product } from '../models/product';
import { useGetProductsQuery } from '../services/products';

const ProductsFrontend = () => {
  const { data: productData, isLoading, isSuccess } = useGetProductsQuery('');
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);

  const [filters, setFilters] = useState<Filters>({
    s: '',
    sort: '',
    page: 1,
  });
  const [lastPage, setLastPage] = useState(0);
  const perPage = 9;

  useEffect(() => {
    setFilteredProducts(productData);

    let products = productData?.filter(
      (p: Product) =>
        p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
        p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
    );

    if (filters.sort === 'asc') {
      products?.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return 1;
        }

        if (a.price < b.price) {
          return -1;
        }

        return 0;
      });
    } else if (filters.sort === 'desc') {
      products?.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return -1;
        }

        if (a.price < b.price) {
          return 1;
        }

        return 0;
      });
    }
    const productsLength = Math.ceil(isSuccess && products.length);
    setLastPage(productsLength as number);
    setLastPage(Math.ceil(products?.length / perPage));
    setFilteredProducts(
      products?.slice(0, filters.page * perPage) as Array<Product>
    );
  }, [filters, productData]);

  const handleSearch = (e: any) => {
    setFilters({
      ...filters,
      page: 1,
      s: e.target.value,
    });
  };

  const sort = (sort: string) => {
    setFilters({
      ...filters,
      page: 1,
      sort,
    });
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
          <div className="col-md-12 mb-4 d-flex justify-content-around container">
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
                lastPage === filters.page ? 'disabled' : ''
              }`}
              type="button"
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              LOAD MORE
            </button>
          </div>
        </main>
      </Layout>
    </Suspense>
  );
};

export default ProductsFrontend;
