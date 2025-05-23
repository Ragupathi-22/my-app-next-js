import { NextResponse } from "next/server";

export async function GET() {
    // Disable SSL certificate validation (DEV ONLY!)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const siteUrl = process.env.NEXT_PUBLIC_WC_SITE_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  const url = `${siteUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

  try {
    const res = await fetch(url);
    const data :any = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
