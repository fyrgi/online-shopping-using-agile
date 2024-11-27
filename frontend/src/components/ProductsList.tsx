// ProductsList.tsx
import { Item } from "./ItemCard.tsx";
import '../ItemList.css';
import { useParams } from 'react-router-dom';

// Hårdkodade produktdata för olika kategorier
const itemsData: { [key: string]: Product[] } = {
  "woman-jackets": [
    { name: 'Beige Parkas', price: 1299.90, image: '/images/beige-parkas.png' },
    { name: 'Beige Coat', price: 1599.00, image: '/images/beige-coat.png' }
    
  ]
  
};

interface Product {
    name: string;
    price: number;
    image: string;
  }

export function ProductsList() {
  const { category } = useParams<{ category: string }>();
  const items = itemsData[category || "woman-jackets"]; 

  return (
    <div className="displayed-items">
      <h2 className="collection-title">
        {category ? `${category.replace('-', ' ').toUpperCase()}` : 'OUR COLLECTION'}
      </h2>
      <div className="item-list">
        {items.map((item, index) => (
          <div key={index} className="item-list-card">
            <Item
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList