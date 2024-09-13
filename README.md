This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Using the system

## Gas

You need to provide your user some Gas. While on the testnet, you can get gas from the
faucet. After creating your user, click on the profile, then on wallet, and copy your
wallet address. Then paste it into the command below before running it.

```
curl --location --request POST 'https://faucet.testnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "YOUR_WALLET_ADDRESS"
    }
}'
```

# Smart contract related commands

## To create a new kula: sui client ptb --move-call 0xf7bcc87292cbdb5834056dff059768f8ea66663f5b241fbe2b0956c2fa03c4dc::community::create_kula_community

'"kula"' --gas-budget 50000000

kula id: 0x2dd732cadd794c191e739d077fe282ba3c2753e79e64f1aea54bbe673a364b30,

## to register a member, we need to reference a kula and the recipient address

sui client ptb --move-call 0xf7bcc87292cbdb5834056dff059768f8ea66663f5b241fbe2b0956c2fa03c4dc::community::register_member @0x2dd732cadd794c191e739d077fe282ba3c2753e79e64f1aea54bbe673a364b30 @0x91df52529ad7463e25891b6b3da0d2ae95236860e70f7a98551ff83a52266252

https://suiscan.xyz/testnet/tx/9LyBtmTXWmEuC85WwaNQsZtSJh55Dg1S9h6dUHfeHK11

Member is then associated with a kula (community) and we also created GiftCap to allow the access control, making it possible for us to only allow that specific user to create gift.

## to create a gift for a memeber, we need to pass the GiftCap, KulaID and recipient address. Note, the GiftCap has to be owned by the transaction sender (meaning the sender needs to be a member).

sui client ptb --move-call 0xf7bcc87292cbdb5834056dff059768f8ea66663f5b241fbe2b0956c2fa03c4dc::community::create_gift @0x86b54cf3a2cc6dd14561af94413a1fa98ee9f34112cb2f1d8607f91b3a7b420c @0x2dd732cadd794c191e739d077fe282ba3c2753e79e64f1aea54bbe673a364b30 @0x223e0c9d6e816715218a10b380fb89dfa2e3e385f47803aaeef50dbdd1757aa2 '"Gift One"' '"Example gift"' --gas-budget 50000000
