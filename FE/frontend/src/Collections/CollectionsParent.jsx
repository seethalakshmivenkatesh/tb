
import React from 'react';
import CollectionsProduct from './CollectionsProduct';

import J1 from '../images/J1.jpg';
import J2 from '../images/J2.jpg';
import J3 from '../images/J3.jpeg';
import J9 from '../images/J9.avif';
import J5 from '../images/J5.jpg';
import J6 from '../images/J6.jpg';
import J7 from '../images/J7.webp';
import J8 from '../images/J8.jpg';

const collectionData = [
  { name: 'Rolyal Jercy-2024', image: J1, rating: 4.5, price: '₹500', description: 'Official 2024 RCB jersey with bold red and navy design.' },
  { name: 'Royal Jercy-2023', image: J2, rating: 3.8, price: '₹650', description: 'Sleek 2023 edition jersey with modern styling and comfort.' },
  { name: 'Royal Jercy-2008', image: J3, rating: 3.5, price: '₹350', description: 'Retro 2008 RCB jersey, a classic piece for true fans.The First..' },
  { name: 'The Lion Logo', image: J9, rating: 4.6, price: '₹10,000', description: 'Exclusive lion emblem logo jersey, limited collector’s edition.' },
  { name: 'Royal Jercy-2010', image: J5, rating: 4.1, price: '₹400', description: '2010 vintage jersey with iconic red and gold highlights.' },
  { name: 'Royal Jercy-2015', image: J6, rating: 3.9, price: '₹450', description: 'Comfortable and durable 2015 RCB fan jersey.Royal Jercy ever.' },
  { name: 'Royal Jercy-2020', image: J7, rating: 3.6, price: '₹700', description: '2020 RCB jersey with sharp contrast and premium fabric.' },
  { name: 'Royal Greenish Jercy', image: J8, rating: 4.5, price: '₹499', description: 'Green RCB jersey for Go Green initiative matches.Play Bold.' },
];

function CollectionsParent() {
  return <CollectionsProduct data={collectionData} />;
}

export default CollectionsParent;
