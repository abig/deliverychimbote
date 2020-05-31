import Head from 'next/head'

export default ({ children }) => {
  const title = 'Delivery Chimbote'
  const description =
    "Encuentra negocios en Chimbote que te pueden llevar lo que necesites a la puerta de tu casa."
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.png" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-dch.png" />
      {children}
    </Head>
  )
}
