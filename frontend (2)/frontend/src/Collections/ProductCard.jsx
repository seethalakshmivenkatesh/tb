import React, { useContext } from 'react';
import { Button, Card, Image, Typography } from 'antd';
import { CartContext } from '../CartContext';

const { Meta } = Card;
const { Paragraph } = Typography;

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      hoverable
      style={{ width: 220 }}
      cover={
        <Image
          alt={product?.name}
          src={product?.image}
          style={{ height: 220, objectFit: 'cover' }}
          preview={{ mask: 'Click to Preview' }} />
      }>
      <Meta title={product?.name} description={`Rating: ${product?.rating}⭐`} />
      <Paragraph>{product?.description}</Paragraph>
      <Paragraph strong>{product?.price}</Paragraph>
      <Button type="primary" block onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard;
