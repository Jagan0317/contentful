import { useState } from "react";
import { client } from "@/lib/contentful";
import Head from "next/head";
import Recipecard from "@/components/Card";
import styles from "@/styles/Home.module.css";

export default function Home({ recipes }) {
  const [recipeList, setRecipeList] = useState(recipes);

  return (
    <>
      <Head>
        <title>Contentful Next.js Recipe App</title>
        <meta name="description" content="Recipe cookbook app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        {recipeList.map((recipe, i) => (
          <Recipecard
            key={recipe.sys.id || i}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: response.items,
      revalidate: 70,
    },
  };
};
