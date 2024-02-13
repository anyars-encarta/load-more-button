import { useState, useEffect } from 'react';
import './styles.css';

const LoadMoreData = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    // const [errorMessage, setErrorMessage] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);
            
            const result = await response.json();

            console.log(result);
            
            if (result && result.products && result.products.length) {
                if (count === 0) {
                    setProducts(result.products);
                } else {
                    setProducts((prevData) => [...prevData, ...result.products]);
                }
                
                setLoading(false);
            }

        } catch (e) {
            // setErrorMessage(e.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [count]);

    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
    }, [products]);

    if (loading) {
        return <div>Loading products! Please wait...</div>
    }

    // if (errorMessage !== null) {
    //     return (
    //       <div>
    //         Error occured!
    //         {errorMessage}
    //       </div>
    //     );
    // }

    return (
        <div className='load-more-container'>
            <div className='product-container'>
                {products && products.length
                 ? products.map((item) => (
                            <div className='product' key={item.id}>
                                <img src={item.thumbnail} alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                            ))
                        : null}
            </div>
            <div className='button-container'>
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Products</button>
                {
                    disableButton ? <p>You have reached to 100 products</p> : null
                }
            </div>
        </div>
    );
};

export default LoadMoreData;