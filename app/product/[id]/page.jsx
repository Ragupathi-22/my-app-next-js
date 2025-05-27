"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [productData, setProductData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    if (product) {
      setProductData(product);
      setMainImage(product.image?.[0] || null);
      setIsVideo(false);

      // Extract video URL from HTML if present
      if (product.video) {
        setVideoUrl(product.video);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side: Main Image or Video and Thumbnails */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              {isVideo && videoUrl ? (
                <video
                  controls
                  width="100%"
                  className="w-full h-auto object-cover rounded-lg"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={mainImage}
                  alt="Product"
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setMainImage(image);
                    setIsVideo(false);
                  }}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt="Thumbnail"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}

              {/* Video Thumbnail */}
              {videoUrl && (
                <div
                  onClick={() => {
                    setIsVideo(true);
                    setMainImage(null);
                  }}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 relative"
                >
                  <video
                    className="w-full h-auto object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={videoUrl + "#t=0.1"} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Image
                      src={assets.play_icon}
                      alt="Play"
                      width={40}
                      height={40}
                      className="opacity-80"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    className="h-3 w-3"
                    src={
                      index <
                      Math.floor(Math.round(productData.average_rating))
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    alt="star_icon"
                  />
                ))}
              </div>
              <p>{Math.round(productData.average_rating).toFixed(1)}</p>
            </div>
            <p
              className="text-gray-600 mt-3"
              dangerouslySetInnerHTML={{ __html: productData.description }}
            ></p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50">
                      {productData?.brand?.map((b) => b.name).join(", ")}
                    </td>
                  </tr>
                  {productData?.attributes?.map((attribute, index) => (
                    <tr key={index}>
                      <td className="text-gray-600 font-medium">
                        {attribute.name}
                      </td>
                      <td className="text-gray-800/50">
                        {attribute.options.join(", ")}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">
                      {productData.category}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(productData._id);
                  router.push("/cart");
                }}
                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {(showAll ? products : products.slice(0, 5)).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
            >
              See more
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
