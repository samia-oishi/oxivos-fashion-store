import { motion } from "motion/react";
import { Link, useLoaderData } from "react-router";

export const Home = () => {
  const { categories, featuredProducts, products } = useLoaderData();
  const getProduct = (index) => products[index] || products[0];
  const heroProduct = featuredProducts[0] || getProduct(0);
  const menProduct = getProduct(7);
  const womenProduct = getProduct(3);
  const accessoriesProduct = getProduct(9);
  const secondHeroProduct = getProduct(10);
  const storyProduct = getProduct(11);
  const moodProducts = [getProduct(5), getProduct(8), getProduct(12)];
  const quoteProduct = getProduct(14);
  const newsletterProduct = getProduct(13);
  const collectionProducts = [
    getProduct(1),
    getProduct(2),
    getProduct(4),
    getProduct(6),
  ];
  const sectionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="bg-white">
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        className="relative min-h-[560px] overflow-hidden bg-[#c8aa91]"
      >
        {heroProduct && (
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
          />
        )}
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative flex min-h-[560px] flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-medium uppercase tracking-[0.28em]">
            New season essentials
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
            Luxury In Every Stitch.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-6">
            Discover refined everyday pieces designed for comfort, confidence,
            and modern style.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex h-12 items-center rounded-md bg-white px-7 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#f6efe6]"
            >
              Shop now
            </Link>
            <Link
              to="/products?newArrival=true"
              className="inline-flex h-12 items-center rounded-md border border-white px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <h2 className="text-center text-3xl font-semibold">
          Explore Our Collections
        </h2>
        {categories.length === 0 ? (
          <p className="mt-6 text-center text-gray-600">No categories found.</p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Link
              to="/products?category=men"
              className="group flex flex-col justify-end"
            >
              <h3 className="text-center text-2xl font-semibold">MEN</h3>
              <p className="mx-auto mt-2 max-w-xs text-center text-sm text-gray-600">
                Clean essentials and easy layers for everyday dressing.
              </p>
              {menProduct && (
                <div className="mt-6 overflow-hidden rounded-md">
                  <img
                    src={menProduct.image}
                    alt={menProduct.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <span className="mt-5 inline-flex h-11 items-center justify-center rounded-md border border-black px-5 text-sm font-medium transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Shop Men
              </span>
            </Link>

            <Link to="/products?category=women" className="group block">
              {womenProduct && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={womenProduct.image}
                    alt={womenProduct.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <h3 className="mt-6 text-center text-2xl font-semibold">
                WOMEN
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-center text-sm text-gray-600">
                Dresses, soft tailoring, and polished wardrobe staples.
              </p>
              <span className="mt-5 flex h-11 items-center justify-center rounded-md border border-black px-5 text-sm font-medium transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Shop Women
              </span>
            </Link>

            <Link
              to="/products?category=accessories"
              className="group flex flex-col justify-end"
            >
              <h3 className="text-center text-2xl font-semibold">
                ACCESSORIES
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-center text-sm text-gray-600">
                Bags, scarves, and simple finishing touches.
              </p>
              {accessoriesProduct && (
                <div className="mt-6 overflow-hidden rounded-md">
                  <img
                    src={accessoriesProduct.image}
                    alt={accessoriesProduct.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <span className="mt-5 inline-flex h-11 items-center justify-center rounded-md border border-black px-5 text-sm font-medium transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Shop Accessories
              </span>
            </Link>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 bg-[#f6efe6] px-6 py-10 text-center md:grid-cols-3"
      >
        <div>
          <h3 className="font-semibold">Sustainable Materials</h3>
          <p className="mt-2 text-sm text-gray-600">
            Thoughtful fabrics selected for everyday wear.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Local Delivery Support</h3>
          <p className="mt-2 text-sm text-gray-600">
            Easy shopping experience from cart to checkout.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Simple Return Policy</h3>
          <p className="mt-2 text-sm text-gray-600">
            Customer-friendly service for confident buying.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#c8aa91] px-6 py-16"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          {secondHeroProduct && (
            <div className="overflow-hidden rounded-md">
              <img
                src={secondHeroProduct.image}
                alt={secondHeroProduct.name}
                className="aspect-[5/4] w-full object-cover transition-transform duration-200 hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="md:pl-8">
            <p className="text-sm uppercase tracking-[0.25em] text-white">
              Classy. Confident. Contemporary.
            </p>
            <h2 className="mt-5 text-4xl font-semibold text-white">
              Effortless looks for every day.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/90">
              Build your wardrobe with comfortable pieces that move from casual
              plans to polished moments.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex h-12 items-center rounded-md bg-white px-7 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#f6efe6]"
            >
              Shop now
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">New Collection</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fresh arrivals selected from the latest collection.
            </p>
          </div>
          <Link
            to="/products?newArrival=true"
            className="inline-flex h-10 items-center rounded-md border border-black px-4 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
          >
            View all
          </Link>
        </div>

        {collectionProducts.length === 0 ? (
          <p className="mt-8 text-gray-600">No new products found.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collectionProducts.map((product) => (
              <article key={product.id} className="group">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-3 font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-600">৳{product.price}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-3 inline-flex h-10 items-center rounded-md border border-black px-4 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  View details
                </Link>
              </article>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#f6efe6] px-6 py-16"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          {storyProduct && (
            <div className="overflow-hidden rounded-md">
              <img
                src={storyProduct.image}
                alt={storyProduct.name}
                className="aspect-[5/4] w-full object-cover transition-transform duration-200 hover:scale-[1.03]"
              />
            </div>
          )}
          <div>
            <h2 className="text-3xl font-semibold">
              Thoughtfully Crafted, Responsibly Made
            </h2>
            <p className="mt-6 text-sm leading-6 text-gray-700">
              Premium quality pieces made for repeat wear. Every product is
              selected to feel useful, comfortable, and easy to style.
            </p>
            <p className="mt-5 text-sm leading-6 text-gray-700">
              Clean silhouettes and soft textures keep the collection polished
              without feeling complicated.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex h-11 items-center rounded-md border border-black px-5 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
            >
              Learn more
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white px-6 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-gray-500">
            Curated edits
          </p>
          <h2 className="mt-3 text-center text-3xl font-semibold">
            Shop By Mood
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Link to="/products?category=women" className="group block">
              {moodProducts[0] && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={moodProducts[0].image}
                    alt={moodProducts[0].name}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold">Soft Everyday</h3>
              <p className="mt-2 text-sm text-gray-600">
                Easy pieces for calm mornings, coffee plans, and daily wear.
              </p>
              <span className="mt-5 inline-flex h-10 items-center rounded-md border border-black px-4 text-sm transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Explore edit
              </span>
            </Link>

            <Link to="/products?category=men" className="group block">
              {moodProducts[1] && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={moodProducts[1].image}
                    alt={moodProducts[1].name}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold">Clean Layers</h3>
              <p className="mt-2 text-sm text-gray-600">
                Polished shirts, jackets, and relaxed layers for every day.
              </p>
              <span className="mt-5 inline-flex h-10 items-center rounded-md border border-black px-4 text-sm transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Explore edit
              </span>
            </Link>

            <Link to="/products?category=footwear" className="group block">
              {moodProducts[2] && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={moodProducts[2].image}
                    alt={moodProducts[2].name}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold">Weekend Ready</h3>
              <p className="mt-2 text-sm text-gray-600">
                Comfortable footwear and finishing touches for plans outside.
              </p>
              <span className="mt-5 inline-flex h-10 items-center rounded-md border border-black px-4 text-sm transition-colors duration-200 group-hover:bg-black group-hover:text-white">
                Explore edit
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#fbf7f1] px-6 py-16"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="max-w-md">
            <p className="text-2xl leading-snug">
              “The texture feels incredible and the fit makes every outfit look
              considered.”
            </p>
            <p className="mt-6 text-sm text-gray-600">Sophia Rahman</p>
            <Link
              to="/products"
              className="mt-8 inline-flex h-11 items-center rounded-md border border-black px-5 text-sm font-medium transition-colors duration-200 hover:bg-black hover:text-white"
            >
              Shop customer favorites
            </Link>
          </div>

          {quoteProduct && (
            <div className="overflow-hidden rounded-md">
              <img
                src={quoteProduct.image}
                alt={quoteProduct.name}
                className="aspect-[5/4] w-full object-cover transition-transform duration-200 hover:scale-[1.03]"
              />
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#f6efe6] px-6 py-12"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-md bg-white p-6 md:grid-cols-[0.8fr_1fr] md:p-8">
          {newsletterProduct && (
            <img
              src={newsletterProduct.image}
              alt={newsletterProduct.name}
              className="h-64 w-full rounded-md object-cover md:h-72"
            />
          )}

          <div>
            <h2 className="text-3xl font-semibold">Join & Enjoy 15% Off</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-gray-700">
              Be first to hear about new arrivals, styling edits, and seasonal
              offers from Oxivos.
            </p>
            <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-md border border-[#d8c8b8] bg-white px-4 text-sm outline-none transition-colors duration-200 focus:border-black"
              />
              <button
                type="button"
                className="h-11 rounded-md bg-black px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
