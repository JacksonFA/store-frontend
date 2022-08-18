import { GetServerSideProps, NextPage } from 'next'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { Product } from './model'
import { http } from '../http'

interface ProductsListPageProps {
  products: Product[]
}

const ProductsListPage: NextPage<ProductsListPageProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Listagem de produtos</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={4}>
      {products.map(product => (
        <Grid key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia style={{ paddingTop: '56%'}} image={product.image_url} />
            <CardContent>
              <Typography component="h2" variant="h5" gutterBottom>
                {product.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href="/products/[slug]" as={`/products/${product.slug}`} passHref>
                <Button size='small' color='primary' component="a">Detalhes</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
    </div>
  )
}

export default ProductsListPage

export const getServerSideProps: GetServerSideProps<ProductsListPageProps> = async (context) => {
  const { data: products } = await http.get('products')
  return { props: { products } };
}