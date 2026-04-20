import Container from '@mui/material/Container'
import SectionHeader from '../common/SectionHeader'
import ProductCard from '../cards/ProductCard'
import ScrollIndicator from '../common/ScrollIndicator'
import { products } from '../../data/products'

export default function ProductsSection() {
  return (
    <section id="products" className="section products-section">
      <Container>
        <SectionHeader
          tag="PRODUCT LAB"
          title={<>Our <span className="gradient-text">Innovations</span></>}
          description="Six breakthrough products built from scratch — each solving a real-world problem with elegant technology."
        />
        <div className="products-grid">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i * 80} />
          ))}
        </div>
      </Container>
      <ScrollIndicator />
    </section>
  )
}
