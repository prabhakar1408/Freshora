/**
 * Product catalog — local images in ./images/; remote URLs where no local asset.
 */
const PRODUCT_CATALOG = [
  { id: 'alphonso-mango', name: 'Alphonso Mangoes (1 kg)', price: 120, category: 'fruits', image: './images/mango.png' },
  { id: 'watermelon', name: 'Watermelon (whole)', price: 45, category: 'fruits', image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'green-grapes', name: 'Green Grapes (500g)', price: 90, category: 'fruits', image: './images/grapes.png' },
  { id: 'pomegranate', name: 'Pomegranate (4 pcs)', price: 150, category: 'fruits', image: './images/pomegranate.png' },
  { id: 'strawberry', name: 'Strawberry (250g)', price: 130, category: 'fruits', image: './images/strawberry.png' },
  { id: 'banana-bunch', name: 'Banana Bunch (1 dozen)', price: 55, category: 'fruits', image: './images/banana-bunch.png' },
  { id: 'kiwi-pack', name: 'Kiwi (6 pcs)', price: 140, category: 'fruits', image: './images/kiwi.png' },
  { id: 'papaya', name: 'Ripe Papaya (1 pc)', price: 60, category: 'fruits', image: './images/papaya.png' },
  { id: 'organic-tomato', name: 'Organic Tomatoes (1 kg)', price: 35, category: 'vegetables', image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'spinach', name: 'Fresh Spinach (250g)', price: 25, category: 'vegetables', image: './images/spinach.png' },
  { id: 'carrot', name: 'Carrots (1 kg)', price: 45, category: 'vegetables', image: './images/carrots.png' },
  { id: 'broccoli', name: 'Broccoli (500g)', price: 55, category: 'vegetables', image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'bell-pepper', name: 'Color Bell Peppers (500g)', price: 85, category: 'vegetables', image: 'https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'onion-bag', name: 'Onions (1 kg)', price: 30, category: 'vegetables', image: './images/onions.png' },
  { id: 'cucumber', name: 'Cucumber (500g)', price: 28, category: 'vegetables', image: './images/cucumber.png' },
  { id: 'milk-1l', name: 'Cow Milk (1 L)', price: 56, category: 'dairy', image: './images/milk.png' },
  { id: 'greek-yogurt', name: 'Greek Yogurt (400g)', price: 80, category: 'dairy', image: './images/greek-yogurt.png' },
  { id: 'paneer', name: 'Fresh Paneer (200g)', price: 95, category: 'dairy', image: './images/paneer.png' },
  { id: 'butter-100g', name: 'Salted Butter (100g)', price: 52, category: 'dairy', image: './images/butter.png' },
  { id: 'orange-juice', name: 'Cold-Pressed Orange Juice', price: 70, category: 'juices', image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'berry-smoothie', name: 'Mixed Berry Smoothie', price: 95, category: 'juices', image: 'https://images.pexels.com/photos/5947035/pexels-photo-5947035.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'apple-juice', name: 'Apple Juice (1 L)', price: 65, category: 'juices', image: 'https://images.pexels.com/photos/5946773/pexels-photo-5946773.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'mango-lassi', name: 'Mango Lassi (300ml)', price: 55, category: 'juices', image: 'https://images.pexels.com/photos/5947034/pexels-photo-5947034.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 'coconut-water', name: 'Tender Coconut Water', price: 45, category: 'juices', image: 'https://images.pexels.com/photos/5945615/pexels-photo-5945615.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
];

function getProductById(id) {
  return PRODUCT_CATALOG.find((p) => p.id === id) || null;
}
