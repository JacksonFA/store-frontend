import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import Head from 'next/head'
import { Product } from '../../model'
import { http } from '../../../http'
import axios from 'axios'
import Link from 'next/link'

interface ProductDetailPageProps {
  product: Product
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>{product.name} - Detalhes do produtos</title>
      </Head>
      <Card key={product.id}>
        <CardHeader title={product.name} subheader={`R$ ${product.price}`} />
        <CardActions>
          <Link href="/products/[slug]/order" as={`/products/${product.slug}/order`} passHref>
            <Button size='small' color='primary' component="a">Comprar</Button>
          </Link>
        </CardActions>
        <CardMedia style={{ paddingTop: '56%'}} image={product.image_url} />
        <CardContent>
          <Typography component="p" variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetailPage

export const getStaticProps: GetStaticProps<ProductDetailPageProps, { slug: string }> = async (context) => {
  const { slug } = context.params!
  try {
    const { data: product } = await http.get(`products/${slug}`)
    return { props: { product }, revalidate: 1 * 60 * 2 }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true}
    }
    throw e
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get('products')
  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug,
    }
  }))
  return { paths, fallback: 'blocking' }
}