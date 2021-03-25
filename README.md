# Delivery Chimbote

This project is forked from the original, designed for Copenhagen. It's source code is visible in [GitHub](https://github.com/covid19-group/dinecph).

## Prerequisites

You will need:

1. An idea of how to set up a [Next.js](https://nextjs.org/) web-app.
2. An API key to use Google Maps + Geocode (see [Maps documentation](https://developers.google.com/maps/documentation/javascript/tutorial)). Due to not being able to restrict usage of the API key being used server-side, the repository is currently setup with two Google API keys: one is being used on the client – therefore publicly visible – so it can be domain-restricted; the other is only used server-side, not publicly visible, and not domain-restricted. You may want to change this setup depending on how you choose to deploy.
3. An Airtable base with the same form fields as are used on the map and list pages. You'll need an API key + a base key (the ID of your Airtable base) as well.

## Setup

1. Run `yarn`.
2. Copy the template file `.env.example` to `.env.local` and populate with keys from earlier.
3. Done.

## Development

Run `yarn dev` to start the development loop.

## Deployment

This project is deployed with [Vercel](https://vercel.com) but it could be deployed wherever.

## Local projects

- [x] [Copenhagen](https://dinecph.dk)
- [x] [Berlin](https://dineinberlin.com)
- [x] [Portugal](https://jantarada.pt)
- [x] [Lima](https://llegamosatucasa.com)
- [x] [Honduras](https://vamosatucasa.com)
- [ ] Your city
